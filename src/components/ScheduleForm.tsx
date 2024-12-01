import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { supabase } from '@/lib/supabase';
import SongSearch from './SongSearch';
import AddNewSongForm from './AddNewSongForm';
import CircularProgress from '@mui/material/CircularProgress';

const ScheduleForm: React.FC = () => {
  const [scheduleDate, setScheduleDate] = useState('');
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [showAddNewSong, setShowAddNewSong] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: schedule, error: scheduleError } = await supabase
        .from('schedules')
        .insert({ schedule_date: scheduleDate })
        .select()
        .single();

      if (scheduleError) throw scheduleError;

      const scheduleSongs = selectedSongs.map((songId) => ({
        schedule_id: schedule.id,
        song_id: songId,
      }));

      const { error: scheduleSongsError } = await supabase
        .from('schedule_songs')
        .insert(scheduleSongs);

      if (scheduleSongsError) throw scheduleSongsError;

      // Reset form
      setScheduleDate('');
      setSelectedSongs([]);
    } catch (error) {
      setError('Failed to create schedule');
    } finally {
      setLoading(false);
    }
  };

  const handleSongSelect = (songId: string) => {
    setSelectedSongs((prev) => [...prev, songId]);
  };

  const handleNewSongAdded = (songName: string) => {
    handleSongSelect(songName);
    setShowAddNewSong(false);
  };

  return (
    <div className="space-y-6 ">
      <h1 className="text-3xl font-bold">Create New Schedule</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Schedule Date"
          type="date"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
          required
          fullWidth
          // InputLabelProps={{ shrink: true }}
        />
        <SongSearch onSongSelect={handleSongSelect} />
        <div>
          <h3 className="text-xl font-bold mb-2">Selected Songs:</h3>
          <ul className="list-disc pl-5">
            {selectedSongs.map((songId) => (
              <li key={songId}>{songId}</li>
            ))}
          </ul>
        </div>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress /> : 'Create Schedule'}
        </Button>
      </form>
      {error && <p className="text-red-500">{error}</p>}

      {!showAddNewSong ? (
        <Button variant="outlined" onClick={() => setShowAddNewSong(true)}>
          Add New Song
        </Button>
      ) : (
        <AddNewSongForm onSongAdded={handleNewSongAdded} />
      )}
    </div>
  );
};

export default ScheduleForm;
