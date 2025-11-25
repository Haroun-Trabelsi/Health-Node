import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDatabase } from '@/lib/db';
import { appConfig } from '@/lib/config';
import { UserModel } from '@/models/User';

const isProduction = process.env.NODE_ENV === 'production';

export const authOptions: NextAuthOptions = {
  secret: appConfig.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/signin' },
  providers: [
    GoogleProvider({
      clientId: appConfig.GOOGLE_CLIENT_ID,
      clientSecret: appConfig.GOOGLE_CLIENT_SECRET,
      authorization: { params: { prompt: 'consent', access_type: 'offline', response_type: 'code' } }
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
      if (!message.user?.email) {
        return;
      }

      await connectToDatabase();
      await UserModel.updateOne(
        { email: message.user.email },
        {
          $setOnInsert: {
            name: message.user.name ?? 'New Health User',
            preferences: {
              unitSystem: 'metric',
              notificationsEnabled: true,
              focusAreas: []
            }
          },
          $set: {
            image: message.user.image
          }
        },
        { upsert: true }
      );
    }
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        await connectToDatabase();
        const dbUser = await UserModel.findOne({ email: user.email }).lean();
        token.id = dbUser?._id?.toString() ?? token.sub;
        token.name = dbUser?.name ?? user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user = {
          ...session.user,
          id: token.id as string
        };
      }
      return session;
    }
  }
};

