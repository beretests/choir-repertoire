"use client";

import { useAuth } from "./AuthProvider";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-gray-100 dark:bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Choir Repertoire
        </Link>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <button
              onClick={signOut}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
