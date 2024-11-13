"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddSongSchedule() {
  const [date, setDate] = useState("");
  const [songId, setSongId] = useState("");
  const [songs, setSongs] = useState<Array<{ id: string; song_name: string }>>(
    []
  );
  const [message, setMessage] = useState("");

  const fetchSongs = async () => {
    const { data, error } = await supabase
      .from("songs")
      .select("id, song_name")
      .order("song_name");

    if (error) {
      console.error("Error fetching songs:", error);
      return;
    }
    setSongs(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Check if the schedule already exists
    const { data: existingSchedule } = await supabase
      .from("schedule_songs")
      .select("id")
      .eq("schedules.date", date)
      .eq("song_id", songId)
      .single();

    if (existingSchedule) {
      setMessage("This song is already scheduled for this date.");
      return;
    }

    // Insert new schedule
    const { data: scheduleData, error: scheduleError } = await supabase
      .from("schedules")
      .insert({ date })
      .select("id")
      .single();

    if (scheduleError) {
      console.error("Error inserting schedule:", scheduleError);
      setMessage("Failed to add schedule.");
      return;
    }

    if (!scheduleData) {
      console.error("No schedule data returned");
      setMessage("Failed to add schedule.");
      return;
    }

    const { error: scheduleSongError } = await supabase
      .from("schedule_songs")
      .insert({ schedule_id: scheduleData.id, song_id: songId });

    if (scheduleSongError) {
      console.error("Error inserting schedule_song:", scheduleSongError);
      setMessage("Failed to add song to schedule.");
      return;
    }

    setMessage("Song scheduled successfully!");
    setDate("");
    setSongId("");
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Add Song Schedule</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block mb-1">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="song" className="block mb-1">
            Song:
          </label>
          <select
            id="song"
            value={songId}
            onChange={(e) => setSongId(e.target.value)}
            required
            className="w-full p-2 border rounded"
            onFocus={fetchSongs}
          >
            <option value="">Select a song</option>
            {songs.map((song) => (
              <option key={song.id} value={song.id}>
                {song.song_name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Schedule
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
