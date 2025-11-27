'use client';

import { useState } from 'react';
import { CredentialsSignInForm } from './CredentialsSignInForm'; // Adjust the import path as needed
import { CredentialsSignUpForm } from './CredenstialsSignup'; // Adjust the import path as needed

// Define the two possible view modes
type AuthMode = 'signIn' | 'signUp';

export const AuthToggleContainer = () => {
  const [mode, setMode] = useState<AuthMode>('signIn'); // Default to Sign In

  const handleToggle = () => {
    // Toggle the mode based on the current state
    setMode((prevMode) => (prevMode === 'signIn' ? 'signUp' : 'signIn'));
  };

  const isSignInMode = mode === 'signIn';

  return (
    <div className="flex flex-col items-center">

      {/* Render the active form based on the state */}
      <div className="w-full max-w-sm p-2 bg-white rounded-2xl">
        {isSignInMode ? <CredentialsSignInForm /> : <CredentialsSignUpForm />}
      </div>

      {/* Toggle Button */}
      <div className="mt-6 text-sm">
        <span className="text-slate-600">
          {isSignInMode ? "Don't have an account?" : 'Already have an account?'}
        </span>
        <button
          onClick={handleToggle}
          className="ml-2 font-semibold text-blue-600 hover:text-blue-800 transition duration-150"
        >
          {isSignInMode ? 'Sign Up' : 'Sign In'}
        </button>
      </div>
    </div>
  );
};