"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

export default function AddSongRecording() {
  const [songId, setSongId] = useState("");
  const [voicePart, setVoicePart] = useState("");
  const [url, setUrl] = useState("");
  const [songs, setSongs] = useState<Array<{ id: string; song_name: string }>>(
    []
  );
  const [message, setMessage] = useState("");
  const { user } = useAuth();

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
    if (!user) {
      setMessage("You must be logged in to add a recording.");
      return;
    }
    setMessage("");

    // Check if the recording already exists
    const { data: existingRecording } = await supabase
      .from("recordings")
      .select("id")
      .eq("song_id", songId)
      .eq("voice_part", voicePart)
      .single();

    if (existingRecording) {
      setMessage("A recording for this song and voice part already exists.");
      return;
    }

    // Insert new recording
    const { error } = await supabase
      .from("recordings")
      .insert({ song_id: songId, voice_part: voicePart, url });

    if (error) {
      console.error("Error inserting recording:", error);
      setMessage("Failed to add recording.");
      return;
    }

    setMessage("Recording added successfully!");
    setSongId("");
    setVoicePart("");
    setUrl("");
  };

  if (!user) {
    return <p>Please log in to add recordings.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Add Song Recording</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div>
          <label htmlFor="voicePart" className="block mb-1">
            Voice Part:
          </label>
          <input
            type="text"
            id="voicePart"
            value={voicePart}
            onChange={(e) => setVoicePart(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="url" className="block mb-1">
            Recording URL:
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Recording
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
