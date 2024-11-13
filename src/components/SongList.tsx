// // "use client";

// // import { useState, useEffect } from "react";
// // import { supabase } from "@/lib/supabase";
// // import RecordingList from "./RecordingList";

// // interface Song {
// //   id: string;
// //   songbook_name: string;
// //   song_number: number;
// //   song_name: string;
// // }

// // export default function SongList({ date }: { date: string }) {
// //   const [songs, setSongs] = useState<Song[]>([]);
// //   const [selectedSong, setSelectedSong] = useState<string | null>(null);

// //   useEffect(() => {
// //     async function fetchSongs() {
// //       const { data, error } = await supabase
// //         .from("schedule_songs")
// //         .select(
// //           `
// //           songs (
// //             id,
// //             songbook_name,
// //             song_number,
// //             song_name
// //           ),
// //           schedules!inner (id)
// //         `
// //         )
// //         .eq("schedules.schedule_date", date)
// //         .order("songs(song_name)");

// //       if (error) {
// //         console.error("Error fetching songs:", error);
// //         return;
// //       }

// //       setSongs(data.map((item) => item.songs[0]));
// //     }

// //     fetchSongs();
// //   }, [date]);

// //   return (
// //     <div className="mt-4">
// //       <h5 className="text-lg font-semibold mb-2">Songs</h5>
// //       <ul className="space-y-2">
// //         {songs.map((song) => (
// //           <li key={song.id}>
// //             <button
// //               onClick={() => setSelectedSong(song.id)}
// //               className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
// //             >
// //               {song.songbook_name} #{song.song_number}: {song.song_name}
// //             </button>
// //           </li>
// //         ))}
// //       </ul>
// //       {selectedSong && <RecordingList songId={selectedSong} />}
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase";
// import RecordingList from "./RecordingList";

// interface Song {
//   id: string;
//   songbook_name: string;
//   song_number: number;
//   song_name: string;
// }

// export default function SongList({ date }: { date: string }) {
//   const [songs, setSongs] = useState<Song[]>([]);
//   const [selectedSong, setSelectedSong] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchSongs() {
//       setLoading(true);
//       setError(null);

//       const { data, error } = await supabase
//         .from("schedule_songs")
//         .select(
//           `
//           songs (
//             id,
//             songbook_name,
//             song_number,
//             song_name
//           ),
//           schedules!inner (id)
//         `
//         )
//         .eq("schedules.schedule_date", date)
//         .order("songs(song_name)");

//       if (error) {
//         console.error("Error fetching songs:", error);
//         setError("Failed to fetch songs");
//         setLoading(false);
//         return;
//       }

//       if (data) {
//         // Ensure data is correctly typed and mapped
//         const formattedSongs: Song[] = data
//           .map((item: any) => item.songs)
//           .filter((song): song is Song => !!song);
//         setSongs(formattedSongs);
//       }

//       setLoading(false);
//     }

//     fetchSongs();
//   }, [date]);

//   if (loading) return <div>Loading songs...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="mt-4">
//       <h5 className="text-lg font-semibold mb-2">Songs</h5>
//       {songs.length === 0 ? (
//         <p>No songs scheduled for this date.</p>
//       ) : (
//         <ul className="space-y-2">
//           {songs.map((song) => (
//             <li key={song.id}>
//               <button
//                 onClick={() => setSelectedSong(song.id)}
//                 className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
//               >
//                 {song.songbook_name} #{song.song_number}: {song.song_name}
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//       {selectedSong && <RecordingList songId={selectedSong} />}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import RecordingList from "./RecordingList";
import { list } from "postcss";

interface Song {
  id: string;
  songbook_name: string;
  song_number: string;
  song_name: string;
}

export default function SongList({ date }: { date: string }) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSongs() {
      //   setLoading(true);
      //   setError(null);

      const { data, error } = await supabase
        .from("schedule_songs")
        .select(
          `
          songs (
            id,
            songbook_name,
            song_number,
            song_name
          ),
          schedules!inner (id)
        `
        )
        .eq("schedules.schedule_date", date)
        .order("songs(song_name)");

      if (error) {
        console.error("Error fetching songs:", error);
        // setError("Failed to fetch songs");
        // setLoading(false);
        return;
      }

      if (data) {
        // Ensure data is correctly typed and mapped
        const formattedSongs: Song[] = data
          .map((item: any) => item.songs)
          .filter((song): song is Song => !!song);
        setSongs(formattedSongs);
      }

      //   setLoading(false);
    }

    fetchSongs();
  }, [date]);

  return (
    <div>
      <ul className="space-y-4">
        {songs.map((song) => (
          <li
            key={song.id}
            className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => setSelectedSong(song.id)}
              className="w-full text-left px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
            >
              <h3 className="text-lg font-semibold">{song.song_name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {song.songbook_name} #{song.song_number}
              </p>
            </button>
            {selectedSong === song.id && (
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                <RecordingList songId={song.id} songName={song.song_name} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
