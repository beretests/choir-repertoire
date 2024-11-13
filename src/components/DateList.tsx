// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase";
// import SongList from "../components/SongList";

// export default function DateList({
//   year,
//   month,
// }: {
//   year: number;
//   month: number;
// }) {
//   const [dates, setDates] = useState<string[]>([]);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchDates() {
//       const startDate = new Date(year, month, 1).toISOString().split("T")[0];
//       const endDate = new Date(year, month + 1, 0).toISOString().split("T")[0];

//       const { data, error } = await supabase
//         .from("schedules")
//         .select("schedule_date")
//         .gte("schedule_date", startDate)
//         .lte("schedule_date", endDate)
//         .order("schedule_date");

//       if (error) {
//         console.error("Error fetching dates:", error);
//         return;
//       }

//       setDates(data.map((item) => item.schedule_date));
//     }

//     fetchDates();
//   }, [year, month]);

//   return (
//     <div className="mt-4">
//       <h4 className="text-lg font-semibold mb-2">Dates</h4>
//       <ul className="space-y-2">
//         {dates.map((date) => (
//           <li key={date}>
//             <button
//               onClick={() => setSelectedDate(date)}
//               className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//             >
//               {new Date(date + "T00:00:00").toLocaleDateString()}
//             </button>
//           </li>
//         ))}
//       </ul>
//       {selectedDate && <SongList date={selectedDate} />}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface DateListProps {
  year: number;
  month: number;
  onDateSelect: (date: string) => void;
}

export default function DateList({ year, month, onDateSelect }: DateListProps) {
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    async function fetchDates() {
      const startDate = new Date(year, month, 1).toISOString().split("T")[0];
      const endDate = new Date(year, month + 1, 0).toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("schedules")
        .select("schedule_date")
        .gte("schedule_date", startDate)
        .lte("schedule_date", endDate)
        .order("schedule_date");

      if (error) {
        console.error("Error fetching dates:", error);
        return;
      }

      setDates(data.map((item) => item.schedule_date));
    }

    fetchDates();
  }, [year, month]);

  return (
    <ul className="flex flex-wrap gap-4">
      {dates.map((date) => (
        <li key={date}>
          <button
            onClick={() => onDateSelect(date)}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transform hover:scale-105"
          >
            {new Date(date + "T00:00:00").toLocaleDateString()}
          </button>
        </li>
      ))}
    </ul>
  );
}
