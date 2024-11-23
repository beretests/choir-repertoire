"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import RecordingList from "./RecordingList";

interface Song {
  id: string;
  songbook_name: string;
  song_number: string;
  song_name: string;
}

export default function SongList({ date }: { date: string }) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [visibleSections, setVisibleSections] = useState<{
    songs: boolean;
    massParts: boolean;
    psalm: boolean;
  }>({
    songs: false,
    massParts: false,
    psalm: false,
  });

  // Type the section parameter as a union of keys from visibleSections
  const toggleSection = (section: keyof typeof visibleSections) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    async function fetchSongs() {
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
        return;
      }

      if (data) {
        // Ensure data is correctly typed and mapped
        const formattedSongs: Song[] = data
          .map((item: any) => item.songs)
          .filter((song): song is Song => !!song);
        setSongs(formattedSongs);
      }
    }

    fetchSongs();
  }, [date]);

  const excludeSongbooks = [
    "Psalms for Sundays and Solemnities",
    "St. Anne's Mass",
  ];
  return (
    <div>
      {/* Songs Section */}
      <button
        onClick={() => toggleSection("songs")}
        className="text-md font-semibold w-full text-left px-4 py-2 bg-blue-200 dark:bg-blue-600 hover:bg-blue-300 dark:hover:bg-blue-700 transition-colors"
      >
        Songs {visibleSections.songs ? "▲" : "▼"}
      </button>
      {visibleSections.songs && (
        <ul className="space-y-4">
          {songs
            .filter(
              (song) =>
                !excludeSongbooks.some((songbook) =>
                  song.songbook_name.includes(songbook)
                )
            )
            .map((song) => (
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
      )}

      {/* Mass Parts Section */}
      <button
        onClick={() => toggleSection("massParts")}
        className="text-md font-semibold w-full text-left px-4 py-2 bg-purple-200 dark:bg-purple-600 hover:bg-purple-300 dark:hover:bg-purple-700 transition-colors mt-8"
      >
        Mass Parts {visibleSections.massParts ? "▲" : "▼"}
      </button>
      {visibleSections.massParts && (
        <ul className="space-y-4">
          {songs
            .filter((song) => song.songbook_name.includes("St. Anne's Mass"))
            .map((song) => (
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
      )}

      {/* Psalm Section */}
      <button
        onClick={() => toggleSection("psalm")}
        className="text-md font-semibold w-full text-left px-4 py-2 bg-pink-200 dark:bg-pink-600 hover:bg-pink-300 dark:hover:bg-pink-700 transition-colors mt-8"
      >
        Psalm {visibleSections.psalm ? "▲" : "▼"}
      </button>
      {visibleSections.psalm && (
        <ul className="space-y-4">
          {songs
            .filter((song) =>
              song.songbook_name.includes("Psalms for Sundays and Solemnities")
            )
            .map((song) => (
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
      )}
    </div>
  );
}
