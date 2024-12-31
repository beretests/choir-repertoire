'use client';

import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { CircularProgress } from '@mui/material';

export default function Header() {
  const { user, loading, logout } = useAuth();

  return (
    <header className="bg-gray-100 dark:bg-gray-800 py-4 px-4 sm:px-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-2 sm:mb-0"
        >
          CTK Choir
        </Link>
        <div className="flex items-right space-x-2 sm:space-x-4">
          {loading ? (
            <CircularProgress />
          ) : user?.email ? (
            <>
              <span className="mr-4">Welcome, {user?.email}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link
                href="/login"
                className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white text-sm sm:text-base rounded hover:bg-blue-600"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white text-sm sm:text-base rounded hover:bg-green-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
