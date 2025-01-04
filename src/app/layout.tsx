import './globals.css';
import { Inter } from 'next/font/google';
import ThemeProvider from '@/contexts/ThemeProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { SnackbarProvider } from '@/contexts/SnackbarContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <SnackbarProvider>
              <Header />
              {children}
            </SnackbarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
