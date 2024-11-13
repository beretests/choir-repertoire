// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase";
// import MonthList from "../components/MonthList";

// export default function YearList() {
//   const [years, setYears] = useState<number[]>([]);
//   const [selectedYear, setSelectedYear] = useState<number | null>(null);

//   async function fetchYears() {
//     const { data, error } = await supabase
//       .from("schedules")
//       .select("schedule_date")
//       .order("schedule_date");

//     if (error) {
//       console.error("Error fetching years:", error);
//       return;
//     }

//     const uniqueYears = [
//       ...new Set(
//         data.map((item) => new Date(item.schedule_date).getFullYear())
//       ),
//     ];
//     console.log("Unique years: ", uniqueYears);
//     setYears(uniqueYears);
//   }

//   useEffect(() => {
//     fetchYears();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-2">Years</h2>
//       <ul className="space-y-2">
//         {years.map((year) => (
//           <li key={year}>
//             <button
//               onClick={() => setSelectedYear(year)}
//               className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-800"
//             >
//               {year}
//             </button>
//           </li>
//         ))}
//       </ul>
//       {selectedYear && <MonthList year={selectedYear} />}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface YearListProps {
  onYearSelect: (year: number) => void;
}

export default function YearList({ onYearSelect }: YearListProps) {
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    async function fetchYears() {
      const { data, error } = await supabase
        .from("schedules")
        .select("schedule_date")
        .order("schedule_date");

      if (error) {
        console.error("Error fetching years:", error);
        return;
      }

      const uniqueYears = [
        ...new Set(
          data.map((item) => new Date(item.schedule_date).getFullYear())
        ),
      ];
      console.log("Unique years: ", uniqueYears);
      setYears(uniqueYears);
    }

    fetchYears();
  }, []);

  return (
    <ul className="flex flex-wrap gap-4">
      {years.map((year) => (
        <li key={year}>
          <button
            onClick={() => onYearSelect(year)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transform hover:scale-105"
          >
            {year}
          </button>
        </li>
      ))}
    </ul>
  );
}
