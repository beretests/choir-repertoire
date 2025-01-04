// 'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import RecordingList from './RecordingList';
import { Song } from '@/types';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import NewSongForm from './NewSongForm';
import { useAuth } from '@/contexts/AuthContext';
import { useSnackbar } from '@/contexts/SnackbarContext';

export default function SongList({ date }: { date: string }) {
  const { showSnackbar } = useSnackbar();
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [categories, setCategories] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const [showNewSongForm, setShowNewSongForm] = useState<string | null>(null);

  const colors = [
    'bg-blue-200 dark:bg-blue-600 hover:bg-blue-300 dark:hover:bg-blue-700',
    'bg-purple-200 dark:bg-purple-600 hover:bg-purple-300 dark:hover:bg-purple-700',
    'bg-pink-200 dark:bg-pink-600 hover:bg-pink-300 dark:hover:bg-pink-700',
    'bg-red-200 dark:bg-red-600 hover:bg-red-300 dark:hover:bg-red-700',
  ];

  const toggleSection = (section: keyof typeof categories) => {
    setCategories((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  async function fetchCategories() {
    const { data, error } = await supabase.from('song_category').select('name');
    if (error) {
      showSnackbar((error as Error).message, 'error');
      console.error('Error fetching song categories:', error);
      setLoading(false);
      return;
    }
    if (data) {
      const result = data.reduce<Record<string, boolean>>((acc, item) => {
        acc[item.name] = false;
        return acc;
      }, {});
      setCategories(result);
      setLoading(false);
    }
  }

  async function fetchSongs() {
    const { data, error } = await supabase
      .from('schedule_songs')
      .select(
        `
          songs (
            id,
            song_name,
            song_number,
            songbooks (id, name),
            song_category (id, name)
          ),
          schedules!inner (id)
        `
      )
      .eq('schedules.schedule_date', date)
      .order('songs(song_name)');

    if (error) {
      showSnackbar((error as Error).message, 'error');
      console.error('Error fetching songs:', error);
      setLoading(false);
      return;
    }

    if (data) {
      const newData = data.map(({ schedules, ...rest }) => rest);
      const transformData = (data: any[]): Song[] => {
        return data.map((item) => ({
          id: item.songs.id,
          song_name: item.songs.song_name,
          song_number: item.songs.song_number,
          songbooks: item.songs.songbooks,
          song_category: item.songs.song_category,
        }));
      };
      setSongs(transformData(newData) as unknown as Song[]);
      setLoading(false);
    }
  }

  const handleNewSongCreated = async (newSong: { id: string; song_name: string }) => {
    const { data, error } = await supabase
      .from('songs')
      .select('*, songbooks (id, name), song_category (id, name)')
      .eq('id', newSong.id)
      .single();

    if (error) {
      showSnackbar((error as Error).message, 'error');
      console.error('Error fetching new song data:', error);
      return;
    }

    if (data) {
      showSnackbar(
        `${data.song_name[0].toUpperCase() + data.song_name.slice(1)} added successfully to ${(
          data.song_category.name[0].toUpperCase() + data.song_category.name.slice(1)
        ).replace(/_/g, ' ')}`,
        'success'
      );
      const formattedSong: Song = {
        id: data.id,
        song_name: data.song_name,
        song_number: data.song_number,
        songbooks: data.songbooks,
        song_category: data.song_category,
      };

      setSongs((prevSongs) => [...prevSongs, formattedSong]);
      setShowNewSongForm(null);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSongs();
  }, [date]);

  return (
    <>
      <h3 className="text-lg font-semibold mb-4 underline">{date}</h3>
      {Object.keys(categories).map((category, index) => {
        const categorySongs = songs.filter((song) => song?.song_category?.name === category);

        if (categorySongs.length > 0) {
          return (
            <div key={category}>
              {loading ? (
                <CircularProgress />
              ) : (
                <section key={category}>
                  <button
                    onClick={() => toggleSection(category)}
                    className={`text-md font-semibold w-full text-left px-4 py-2 mt-4 transition-colors ${
                      colors[index % colors.length]
                    }`}
                  >
                    {category.replace(/_/g, ' ').toUpperCase()} {categories.category ? '▲' : '▼'}
                  </button>
                  {categories[category] && (
                    <ul className="space-y-4">
                      {categorySongs.map((song) => (
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
                              {song.songbooks.name} #{song.song_number}
                            </p>
                          </button>
                          {selectedSong === song.id && (
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                              <RecordingList songId={song.id} songName={song.song_name} />
                            </div>
                          )}
                        </li>
                      ))}
                      {user?.email && (
                        <li>
                          <Button
                            type="button"
                            onClick={() =>
                              setShowNewSongForm(showNewSongForm === category ? null : category)
                            }
                            variant="contained"
                            color="primary"
                            className="mt-4"
                          >
                            {showNewSongForm === category
                              ? 'Cancel'
                              : `Add New ${category.replace(/_/g, ' ')}`}
                          </Button>
                        </li>
                      )}
                    </ul>
                  )}
                  {user?.email && showNewSongForm === category && (
                    <div className="mt-4 flex justify-center">
                      <NewSongForm onSongCreated={handleNewSongCreated} />
                    </div>
                  )}
                </section>
              )}
            </div>
          );
        }
        return null;
      })}
    </>
  );
}
