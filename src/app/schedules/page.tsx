import React from 'react';
import Link from 'next/link';

const SchedulesPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Schedules</h1>
      <Link
        href="/schedules/new"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create New Schedule
      </Link>
      {/* Add a list of existing schedules here */}
    </div>
  );
};

export default SchedulesPage;
