import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { AuthToggleContainer } from '@/components/auth/AuthToggle';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { authOptions } from '@/lib/auth';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-6 px-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Welcome back</p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900">Sign in to Health Node</h1>
        <p className="mt-2 text-sm text-slate-500">
          Use your Google account or email + password credentials configured for this environment.
        </p>
        <div className="mt-6 flex justify-center">
          <GoogleSignInButton />
        </div>
        <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-wide text-slate-400">
          <span className="h-px flex-1 bg-slate-100" />
          or
          <span className="h-px flex-1 bg-slate-100" />
        </div>
        <AuthToggleContainer />
      </section>
    </main>
  );
}

