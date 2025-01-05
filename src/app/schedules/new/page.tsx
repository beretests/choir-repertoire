'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import NewScheduleForm from '@/components/NewScheduleForm';
import CircularProgress from '@mui/material/CircularProgress';

const NewSchedulePage: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user?.email) {
      router.push('/login');
    }
  }, [user]);

  if (loading) return <CircularProgress />;
  if (!user) return null;

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 min-h-screen text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Create New Schedule</h1>
      <NewScheduleForm />
    </div>
  );
};

export default NewSchedulePage;
