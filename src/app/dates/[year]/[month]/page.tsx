import Link from "next/link";
import { supabase } from "@/lib/supabase";
// import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

type PageProps = {
  params: any; // Use 'any' temporarily to bypass type checking
};

export default async function DatePage({ params }: PageProps) {
  const { year, month } = params;

  const { data: schedules } = await supabase
    .from("schedules")
    .select("schedule_date")
    .eq("schedule_date", `${params.year}-${params.month.padStart(2, "0")}`)
    .order("date");
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Dates in {params.month}/{params.year}
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {schedules?.map((schedule) => (
          <li key={schedule.schedule_date}>
            <Link
              href={`/songs/${schedule.schedule_date}`}
              className="block p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800"
            >
              {new Date(schedule.schedule_date).toDateString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const runtime = "edge";
