"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

export default function AddSong() {
  const [songbookName, setSongbookName] = useState("");
  const [songNumber, setSongNumber] = useState("");
  const [songName, setSongName] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setMessage("You must be logged in to add a song.");
      return;
    }
    setMessage("");

    // Check if the song already exists
    const { data: existingSong } = await supabase
      .from("songs")
      .select("id")
      .eq("songbook_name", songbookName)
      .eq("song_number", songNumber)
      .single();

    if (existingSong) {
      setMessage("This song already exists in the database.");
      return;
    }

    // Insert new song
    const { error } = await supabase.from("songs").insert({
      songbook_name: songbookName,
      song_number: parseInt(songNumber),
      song_name: songName,
    });

    if (error) {
      console.error("Error inserting song:", error);
      setMessage("Failed to add song.");
      return;
    }

    setMessage("Song added successfully!");
    setSongbookName("");
    setSongNumber("");
    setSongName("");
  };

  if (!user) {
    return <p>Please log in to add songs.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Add New Song</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="songbookName" className="block mb-1">
            Songbook Name:
          </label>
          <input
            type="text"
            id="songbookName"
            value={songbookName}
            onChange={(e) => setSongbookName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="songNumber" className="block mb-1">
            Song Number:
          </label>
          <input
            type="number"
            id="songNumber"
            value={songNumber}
            onChange={(e) => setSongNumber(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="songName" className="block mb-1">
            Song Name:
          </label>
          <input
            type="text"
            id="songName"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Song
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
