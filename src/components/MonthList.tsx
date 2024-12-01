'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import CircularProgress from '@mui/material/CircularProgress';

interface MonthListProps {
  year: number;
  onMonthSelect: (month: number) => void;
}

export default function MonthList({ year, onMonthSelect }: MonthListProps) {
  const [months, setMonths] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchMonths() {
      const { data, error } = await supabase
        .from('schedules')
        .select('schedule_date')
        .gte('schedule_date', `${year}-01-01`)
        .lt('schedule_date', `${year + 1}-01-01`)
        .order('schedule_date');

      if (error) {
        console.error('Error fetching months:', error);
        setLoading(false);
        return;
      }

      const uniqueMonths = [
        ...new Set(data.map((item) => new Date(item.schedule_date).getMonth())),
      ];
      setMonths(uniqueMonths);
      setLoading(false);
    }

    fetchMonths();
  }, [year]);

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <CircularProgress />
      ) : (
        <ul className="flex flex-wrap gap-4">
          {months.map((month) => (
            <li key={month}>
              <button
                onClick={() => onMonthSelect(month)}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transform hover:scale-105"
              >
                {new Date(year, month).toLocaleString('default', { month: 'long' })}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
