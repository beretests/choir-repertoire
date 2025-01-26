'use client';

import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

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
    <header className="bg-gray-100 dark:bg-[#141A24] py-4 sm:px-6">
      <div className="mx-auto flex flex-col sm:flex-row items-center">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-2 sm:mb-0"
        >
          CTK Choir
        </Link>
        <div className="flex flex-grow sm:space-x-4 items-center gap-4 justify-around sm:justify-end">
          {loading ? (
            <CircularProgress />
          ) : user?.email ? (
            <>
              <span className="mr-4">Welcome, {user?.email}</span>
              <ThemeToggle />
              <button
                onClick={() => handleLogout()}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                <span className="hidden sm:inline mr-2">Log out</span>
                <LogoutIcon className="sm:hidden" />
              </button>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link
                href="/login"
                className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white text-sm sm:text-base rounded hover:bg-blue-600"
              >
                <span className="hidden sm:inline mr-2">Log in</span>
                <LoginIcon className="sm:hidden" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
