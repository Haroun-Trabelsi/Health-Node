import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { authOptions } from '@/lib/auth';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-6 px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Welcome back</p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900">Sign in to Health Node</h1>
        <p className="mt-2 text-sm text-slate-500">
          Secure sign-in is powered by NextAuth with Google OAuth and JWT sessions.
        </p>
        <div className="mt-6 flex justify-center">
          <GoogleSignInButton />
        </div>
      </div>
    </main>
  );
}

