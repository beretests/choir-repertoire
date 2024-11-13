// import YearList from "@/components/YearList";
// import ThemeToggle from "@/components/ThemeToggle";

// export default function Home() {
//   return (
//     <main className="container mx-auto p-4 min-h-screen bg-white dark:bg-dark text-black dark:text-dark">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold">Choir Repertoire</h1>
//         <ThemeToggle />
//       </div>
//       <YearList />
//     </main>
//   );
// }

// "use client";

// import { useAuth } from "@/components/AuthProvider";
// import YearList from "@/components/YearList";
// import ThemeToggle from "@/components/ThemeToggle";
// import AddSong from "@/components/AddSong";
// import AddSongRecording from "@/components/AddSongRecording";
// import Link from "next/link";

// export default function Home() {
//   const { user, signOut } = useAuth();

//   return (
//     <main className="container mx-auto p-4 min-h-screen bg-white dark:bg-dark text-black dark:text-dark">
//       <div className="flex justify-between items-center mb-4">
//         {/* <h1 className="text-3xl font-bold">Choir Repertoire</h1> */}
//         <div className="flex items-center space-x-4">
//           {/* <ThemeToggle /> */}
//           {/* {user ? (
//             <button
//               onClick={signOut}
//               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Log Out
//             </button>
//           ) : (
//             <>
//               <Link
//                 href="/login"
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Log In
//               </Link>
//               <Link
//                 href="/signup"
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//               >
//                 Sign Up
//               </Link>
//             </>
//           )} */}
//         </div>
//       </div>
//       <YearList />
//       {user && (
//         <>
//           <AddSong />
//           <AddSongRecording />
//         </>
//       )}
//     </main>
//   );
// }

"use client";

import { useAuth } from "@/components/AuthProvider";
import YearList from "@/components/YearList";
import MonthList from "@/components/MonthList";
import DateList from "@/components/DateList";
import SongList from "@/components/SongList";
import AddSong from "@/components/AddSong";
import AddSongRecording from "@/components/AddSongRecording";
import { useState, useRef } from "react";

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
        <YearList
          onYearSelect={(year) => {
            setSelectedYear(year);
            scrollToRef(monthsRef);
          }}
        />
      </section>

      {selectedYear && (
        <section id="months" ref={monthsRef} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Months</h2>
          <MonthList
            year={selectedYear}
            onMonthSelect={(month) => {
              setSelectedMonth(month);
              scrollToRef(datesRef);
            }}
          />
        </section>
      )}

      {selectedMonth !== null && (
        <section id="dates" ref={datesRef} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Dates</h2>
          <DateList
            year={selectedYear!}
            month={selectedMonth}
            onDateSelect={(date) => {
              setSelectedDate(date);
              scrollToRef(songsRef);
            }}
          />
        </section>
      )}

      {selectedDate && (
        <section id="songs" ref={songsRef} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Songs</h2>
          <SongList date={selectedDate} />
        </section>
      )}

      {user && (
        <>
          <AddSong />
          <AddSongRecording />
        </>
      )}
    </main>
  );
}
