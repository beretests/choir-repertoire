// 'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import CircularProgress from '@mui/material/CircularProgress';

interface DateListProps {
  year: number;
  month: number;
  onDateSelect: (date: string) => void;
}

export default function DateList({ year, month, onDateSelect }: DateListProps) {
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchDates() {
      const startDate = new Date(year, month, 1).toISOString().split('T')[0];
      const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('schedules')
        .select('schedule_date')
        .gte('schedule_date', startDate)
        .lte('schedule_date', endDate)
        .order('schedule_date');

      if (error) {
        console.error('Error fetching dates:', error);
        setLoading(false);
        return;
      }

      setDates(data.map((item) => item.schedule_date));
      setLoading(false);
    }

    fetchDates();
  }, [year, month]);

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <CircularProgress />
      ) : (
        <ul className="flex flex-wrap gap-4">
          {dates.map((date) => (
            <li key={date}>
              <button
                onClick={() => onDateSelect(date)}
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transform hover:scale-105"
              >
                {new Date(date + 'T00:00:00').toLocaleDateString()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
