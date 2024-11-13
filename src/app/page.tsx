"use client";

import { useAuth } from "@/components/AuthProvider";
import YearList from "@/components/YearList";
import MonthList from "@/components/MonthList";
import DateList from "@/components/DateList";
import SongList from "@/components/SongList";
// import AddSong from "@/components/AddSong";
// import AddSongRecording from "@/components/AddSongRecording";
import { useState, useRef } from "react";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const { user } = useAuth();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthsRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);
  const songsRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="container mx-auto p-4 min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <section id="years" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Years</h2>
        <Suspense fallback={<LoadingSpinner />}>
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
          <h2 className="text-2xl font-bold mb-4">Months</h2>
          <Suspense fallback={<LoadingSpinner />}>
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
          <h2 className="text-2xl font-bold mb-4">Dates</h2>
          <Suspense fallback={<LoadingSpinner />}>
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
          <h2 className="text-2xl font-bold mb-4">Songs</h2>
          <Suspense fallback={<LoadingSpinner />}>
            <SongList date={selectedDate} />
          </Suspense>
        </section>
      )}

      {/* {user && (
        <>
          <AddSong />
          <AddSongRecording />
        </>
      )} */}
    </main>
  );
}
