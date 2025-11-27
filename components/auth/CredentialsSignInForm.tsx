'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export const CredentialsSignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/dashboard'
    });

    setIsSubmitting(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    router.push('/dashboard');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2 text-left">
        <label className="text-sm font-medium text-slate-600" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none"
          disabled={isSubmitting}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          type="email"
          value={email}
        />
      </div>
      <div className="space-y-2 text-left">
        <label className="text-sm font-medium text-slate-600" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none"
          disabled={isSubmitting}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          type="password"
          value={password}
        />
      </div>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      <button
        className="w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in with email'}
      </button>
    </form>
  );
};




