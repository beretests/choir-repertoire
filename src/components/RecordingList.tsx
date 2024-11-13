// "use client";

// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabase";

// interface Recording {
//   id: string;
//   voice_part: string;
//   url: string;
// }

// export default function RecordingList({ songId }: { songId: string }) {
//   const [recordings, setRecordings] = useState<Recording[]>([]);

//   useEffect(() => {
//     async function fetchRecordings() {
//       const { data, error } = await supabase
//         .from("recordings")
//         .select("id, voice_part, url")
//         .eq("song_id", songId)
//         .order("voice_part");

//       if (error) {
//         console.error("Error fetching recordings:", error);
//         return;
//       }

//       setRecordings(data);
//     }

//     fetchRecordings();
//   }, [songId]);

//   const handleDownload = (url: string, fileName: string) => {
//     fetch(url)
//       .then((response) => response.blob())
//       .then((blob) => {
//         const blobUrl = window.URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = blobUrl;
//         link.download = fileName;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(blobUrl);
//       })
//       .catch((error) => console.error("Download failed:", error));
//   };

//   return (
//     <div className="mt-4">
//       <h6 className="text-lg font-semibold mb-2">Recordings</h6>
//       <ul className="space-y-2">
//         {recordings.map((recording) => (
//           <li key={recording.id} className="flex items-center space-x-2">
//             <span className="font-medium">{recording.voice_part}:</span>
//             <audio controls src={recording.url} className="w-64" />
//             <button
//               onClick={() =>
//                 handleDownload(recording.url, `${recording.voice_part}.mp3`)
//               }
//               className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
//             >
//               Download
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Recording {
  id: string;
  voice_part: string;
  url: string;
}

interface RecordingListProps {
  songId: string;
  songName: string;
}

export default function RecordingList({
  songId,
  songName,
}: RecordingListProps) {
  const [recordings, setRecordings] = useState<Recording[]>([]);

  useEffect(() => {
    async function fetchRecordings() {
      const { data, error } = await supabase
        .from("recordings")
        .select("id, voice_part, url")
        .eq("song_id", songId)
        .order("voice_part");

      if (error) {
        console.error("Error fetching recordings:", error);
        return;
      }

      setRecordings(data);
    }

    fetchRecordings();
  }, [songId]);

  // const handleDownload = (url: string, voicePart: string) => {
  //   const fileName = `${songName.replace(/\s+/g, "_")}_${voicePart}.mp3`;
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = fileName;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleDownload = (url: string, voicePart: string) => {
    const fileName = `${songName.replace(/\s+/g, "_")}_${voicePart}.mp3`;
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => console.error("Download failed:", error));
  };

  return (
    <ul className="space-y-4">
      {recordings.map((recording) => (
        <li key={recording.id} className="flex items-center space-x-4">
          <span className="font-medium">{recording.voice_part}:</span>
          <audio controls src={recording.url} className="flex-grow" />
          <button
            onClick={() => handleDownload(recording.url, recording.voice_part)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Download
          </button>
        </li>
      ))}
    </ul>
  );
}
