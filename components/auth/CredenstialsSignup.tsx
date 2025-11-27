'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
// NOTE: We remove 'signIn' as we will handle registration via a standard API route.
// After successful sign-up, you might automatically sign the user in using 'signIn'.

export const CredentialsSignUpForm = () => {
  const router = useRouter();
  
  // 1. Add state for the new Name field
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // 2. Call your custom Next.js API route for user registration
      const response = await fetch('/api/auth/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      setIsSubmitting(false);

      if (!response.ok) {
        // Handle server-side errors (e.g., user already exists, invalid data)
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed. Please check your details.');
        return;
      }
      
      // 3. Optional: Automatically sign the user in after successful registration
      // If you want to automatically log the user in after signup, uncomment and adjust:
      /*
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/dashboard'
      });

      if (signInResult?.error) {
        // Handle auto-sign-in error
        setError('Registration successful, but automatic sign-in failed: ' + signInResult.error);
        return;
      }
      */

      // 4. Redirect to dashboard or a confirmation page
      router.push('/dashboard'); 

    } catch (err) {
      setIsSubmitting(false);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Name Field */}
      <div className="space-y-2 text-left">
        <label className="text-sm font-medium text-slate-600" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-slate-900 focus:outline-none"
          disabled={isSubmitting}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your Full Name"
          type="text"
          value={name}
        />
      </div>

      {/* Email Field (existing) */}
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

      {/* Password Field (existing) */}
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
      
      {/* Submit Button (updated text) */}
      <button
        className="w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  );
};