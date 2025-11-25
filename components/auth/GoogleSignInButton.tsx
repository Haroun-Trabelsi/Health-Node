'use client';

import { signIn } from 'next-auth/react';

export const GoogleSignInButton = () => (
  <button
    className="flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
    type="button"
  >
    Continue with Google
  </button>
);
