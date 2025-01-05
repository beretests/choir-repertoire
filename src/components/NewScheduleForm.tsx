'use client';

import React, { useState } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAuth } from '@/contexts/AuthContext';
import NewSongForm from './NewSongForm';
import { useSnackbar } from '@/contexts/SnackbarContext';

interface Song {
  id: string;
  song_name: string;
}

export default function NewScheduleForm() {
  const { supabase } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState<Song[]>([]);

  const handleDateChange = (date: Date | null) => {
    setScheduleDate(date);
  };

  const handleSongSearch = async (value: string) => {
    setSearchTerm(value);
    if (value.length > 2) {
      const { data, error } = await supabase
        .from('songs')
        .select('id, song_name')
        .ilike('song_name', `%${value}%`)
        .limit(10);

      if (data) {
        setSongs(data);
      }

      if (error) {
        showSnackbar((error as Error).message, 'error');
      }
    }
  };

  const handleSongSelect = (event: React.SyntheticEvent, value: Song | null) => {
    if (value) {
      setSelectedSongs([...selectedSongs, value]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!scheduleDate) {
      showSnackbar('Please select a date for the schedule', 'error');
      return;
    }

    try {
      const { data: scheduleData, error: scheduleError } = await supabase
        .from('schedules')
        .insert({ schedule_date: scheduleDate.toISOString() })
        .select();

      if (scheduleError || !scheduleData) {
        throw new Error('Error creating schedule: ' + scheduleError?.message);
      }

      const scheduleId = scheduleData[0].id;

      const scheduleSongs = selectedSongs.map((song) => ({
        schedule_id: scheduleId,
        song_id: song.id,
      }));

      const { error: songError } = await supabase.from('schedule_songs').insert(scheduleSongs);

      if (songError) {
        throw new Error('Error adding songs to schedule: ' + songError.message);
      }

      showSnackbar('Schedule created successfully', 'success');
      setScheduleDate(null);
      setSelectedSongs([]);
      setSearchTerm('');
    } catch (error) {
      showSnackbar((error as Error).message, 'error');
    }
  };

  const [showNewSongForm, setShowNewSongForm] = useState(false);

  const handleNewSongCreated = (newSong: Song) => {
    setSelectedSongs([...selectedSongs, newSong]);
    setShowNewSongForm(false);
    showSnackbar(`New song "${newSong.song_name}" added successfully`, 'success');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg p-4 w-[80%] mx-auto">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Schedule Date"
            value={scheduleDate}
            onChange={handleDateChange}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </LocalizationProvider>

        <Autocomplete
          options={songs}
          getOptionLabel={(option) => option.song_name}
          onInputChange={(event, value) => handleSongSearch(value)}
          onChange={handleSongSelect}
          renderInput={(params) => (
            <TextField {...params} value={searchTerm} label="Search Songs" fullWidth />
          )}
        />

        <div>
          <h3 className="font-bold mb-2 text-black">Selected Songs:</h3>
          <ul>
            {selectedSongs.map((song) => (
              <li key={song.id} className="text-black">
                {song.song_name}
              </li>
            ))}
          </ul>
        </div>

        <Button
          type="button"
          onClick={() => setShowNewSongForm((prev) => !prev)}
          variant="outlined"
          className="mr-4"
        >
          {showNewSongForm ? 'Cancel' : 'Add New Song'}
        </Button>

        <Button type="submit" variant="contained" color="primary">
          Create Schedule
        </Button>
      </form>
      <div className="flex justify-center mt-8">
        {showNewSongForm && <NewSongForm onSongCreated={handleNewSongCreated} />}
      </div>
    </>
  );
}
