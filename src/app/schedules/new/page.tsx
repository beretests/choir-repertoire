'use client';

import ScheduleForm from '@/components/ScheduleForm';

const NewSchedulePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 min-h-screen text-black dark:text-white">
      <ScheduleForm />
    </div>
  );
};

export default NewSchedulePage;
