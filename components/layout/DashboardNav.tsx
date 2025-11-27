'use client'; // ⬅️ This is required to use NextAuth client functions

import Link from 'next/link';
import { signOut } from 'next-auth/react'; // ⬅️ Import the signOut function

// Dummy data for navigation items (assuming you have this defined elsewhere)
const navItems = [
    { href: '/dashboard', label: 'Home' },
    { href: '/profile', label: 'Profile' },
    // Add other nav items as needed
];

export const DashboardNav = () => {
    
    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/auth/signin' }); 
        // Note: You can change the callbackUrl to whatever page you want the user to land on.
    };

    return (
        // Use flex and justify-between to space out the elements
        <nav className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            
            {/* Left Side: Logo and Navigation Links */}
            <div className="flex items-center gap-6">
                <p className="text-lg font-semibold text-slate-900">Health Dashboard</p>
                
                {/* Main Navigation Links */}
                <ul className="flex gap-4 text-sm text-slate-500">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link className="transition hover:text-slate-900" href={item.href}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Side: Sign Out Link */}
            <div className='flex items-center'>
                <button
                    onClick={handleSignOut}
                    className='text-sm font-medium text-slate-500 transition hover:text-slate-900'
                >
                    Sign Out
                </button>
            </div>
        </nav>
    );
};