'use client';

import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, loading, logout } = useAuth();
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      showSnackbar('Logged out successfully', 'success');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      showSnackbar('Error logging out. Please try again.', 'error');
    }
  };

  return (
    <header className="bg-gray-100 dark:bg-gray-800 py-4 px-4 sm:px-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-2 sm:mb-0"
        >
          CTK Choir
        </Link>
        <div className="flex items-right space-x-2 sm:space-x-4 items-center">
          {loading ? (
            <CircularProgress />
          ) : user?.email ? (
            <>
              <span className="mr-4">Welcome, {user?.email}</span>
              <button
                onClick={() => handleLogout()}
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}
