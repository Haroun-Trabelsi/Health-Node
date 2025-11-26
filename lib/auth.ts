import bcrypt from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';

import { connectToDatabase } from '@/lib/db';
import { appConfig } from '@/lib/config';
import { UserModel } from '@/models/User';

const isProduction = process.env.NODE_ENV === 'production';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const buildDefaultPreferences = () => ({
  unitSystem: 'metric' as const,
  notificationsEnabled: true,
  focusAreas: [] as string[]
});

type ProfileInput = {
  email?: string | null;
  name?: string | null;
  image?: string | null;
  provider?: string | null;
};

const ensureUserDocument = async (profile?: ProfileInput) => {
  if (!profile?.email) {
    return null;
  }

  await connectToDatabase();

  let user = await UserModel.findOne({ email: profile.email }).lean().exec();

  if (!user) {
    const created = await UserModel.create({
      email: profile.email,
      name: profile.name ?? 'New Health User',
      image: profile.image,
      preferences: buildDefaultPreferences(),
      provider: profile.provider ?? 'google'
    });
    return created.toObject();
  }

  const updates: Record<string, unknown> = {};

  if (profile.name && profile.name !== user.name) {
    updates.name = profile.name;
  }
  if (profile.image && profile.image !== user.image) {
    updates.image = profile.image;
  }
  if (profile.provider && profile.provider !== user.provider) {
    updates.provider = profile.provider;
  }

  if (Object.keys(updates).length) {
    user =
      (await UserModel.findByIdAndUpdate(user._id, { $set: updates }, { new: true }).lean().exec()) ??
      user;
  }

  return user;
};

export const authOptions: NextAuthOptions = {
  secret: appConfig.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/signin' },
  providers: [
    GoogleProvider({
      clientId: appConfig.GOOGLE_CLIENT_ID,
      clientSecret: appConfig.GOOGLE_CLIENT_SECRET,
      authorization: { params: { prompt: 'consent', access_type: 'offline', response_type: 'code' } }
    }),
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          throw new Error('Invalid credentials');
        }

        await connectToDatabase();
        const user = await UserModel.findOne({ email: parsed.data.email }).exec();

        if (!user?.passwordHash) {
          throw new Error('Invalid email or password');
        }

        const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash);

        if (!isValid) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image
        };
      }
    })
  ],
  cookies: {
    sessionToken: {
      name: isProduction ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isProduction
      }
    }
  },
  events: {
    async signIn(message) {
      await ensureUserDocument({ ...message.user, provider: message.account?.provider });
    }
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        const dbUser = await ensureUserDocument({ ...user, provider: account?.provider });

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.name = dbUser.name;
          token.email = dbUser.email;
        }

        return token;
      }

      if (!token.id && token.email) {
        await connectToDatabase();
        const dbUser = await UserModel.findOne({ email: token.email }).lean();

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.name = dbUser.name;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string | null,
          name: token.name
        };
      }
      return session;
    }
  }
};

