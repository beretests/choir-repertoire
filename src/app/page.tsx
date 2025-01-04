'use client';

import YearList from '@/components/YearList';
import MonthList from '@/components/MonthList';
import DateList from '@/components/DateList';
import SongList from '@/components/SongList';
import { useState, useRef, useEffect } from 'react';
import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (user?.email) {
      showSnackbar(`Welcome back, ${user?.email}!`, 'success');
    }
  }, [user]);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthsRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);
  const songsRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="p-4 lg:px-28 min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <section id="years" className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Program - Song List</h1>
        <h5 className="text-lg font-semibold mb-4">
          Select a year to view the available repertoire
        </h5>
        <Suspense fallback={<CircularProgress />}>
          <YearList
            onYearSelect={(year) => {
              setSelectedYear(year);
              scrollToRef(monthsRef);
            }}
          />
        </Suspense>
      </section>

      {selectedYear && (
        <section id="months" ref={monthsRef} className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Select a month</h2>
          <Suspense fallback={<CircularProgress />}>
            <MonthList
              year={selectedYear}
              onMonthSelect={(month) => {
                setSelectedMonth(month);
                scrollToRef(datesRef);
              }}
            />
          </Suspense>
        </section>
      )}

      {selectedMonth !== null && (
        <section id="dates" ref={datesRef} className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Select a date</h2>
          <Suspense fallback={<CircularProgress />}>
            <DateList
              year={selectedYear!}
              month={selectedMonth}
              onDateSelect={(date) => {
                setSelectedDate(date);
                scrollToRef(songsRef);
              }}
            />
          </Suspense>
        </section>
      )}

      {selectedDate && (
        <section id="songs" ref={songsRef} className="mb-8">
          <h2 className="text-lg font-semibold mb-4">
            Select a song to view the available part recordings
          </h2>
          <Suspense fallback={<CircularProgress />}>
            <SongList date={selectedDate} />
          </Suspense>
        </section>
      )}
    </main>
  );
}
