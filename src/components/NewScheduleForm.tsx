'use client';

import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAuth } from '@/contexts/AuthContext';
import NewSongForm from './NewSongForm';
import { useSnackbar } from '@/contexts/SnackbarContext';
import SongAutocomplete from './SongAutocomplete';
import { Song } from '@/types';
import { useRouter } from 'next/navigation';

export default function NewScheduleForm() {
  const { supabase } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const [showSongAutocomplete, setShowSongAutocomplete] = useState(false);
  const [showNewSongModal, setShowNewSongModal] = useState(false);
  const router = useRouter();

  const handleDateChange = (date: Date | null) => {
    setScheduleDate(date);
  };

  const handleSongSelect = (song: Song | null) => {
    if (song) {
      setSelectedSongs([...selectedSongs, song]);
      setShowSongAutocomplete(false);
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
      router.push('/');
    } catch (error) {
      showSnackbar((error as Error).message, 'error');
    }
  };

  const handleNewSongCreated = (newSong: Song) => {
    setSelectedSongs([...selectedSongs, newSong]);
    setShowNewSongModal(false);
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

        {showSongAutocomplete && (
          <SongAutocomplete
            onSongSelect={handleSongSelect}
            onAddNew={() => setShowNewSongModal(true)}
          />
        )}

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
          onClick={() => setShowSongAutocomplete(true)}
          variant="outlined"
          className="mr-4"
        >
          Add Song
        </Button>

        <Button type="submit" variant="contained" color="primary">
          Create Schedule
        </Button>
      </form>

      <Modal
        open={showNewSongModal}
        onClose={() => setShowNewSongModal(false)}
        aria-labelledby="new-song-modal"
        aria-describedby="modal-to-add-new-song"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg">
          <NewSongForm onSongCreated={handleNewSongCreated} />
        </Box>
      </Modal>
    </>
  );
}
