import { useState, useEffect } from 'react';
import { TextField, Autocomplete, Button } from '@mui/material';
import { supabase } from '@/lib/supabase';
import { Songbook, SongCategory } from '@/types';
import RecordingsForm from './RecordingsForm';
import CircularProgress from '@mui/material/CircularProgress';

interface AddNewSongFormProps {
  onSongAdded: (songName: string) => void;
}

const AddNewSongForm: React.FC<AddNewSongFormProps> = ({ onSongAdded }) => {
  const [songName, setSongName] = useState('');
  const [songNumber, setSongNumber] = useState('');
  const [songId, setSongId] = useState<string | null>(null);
  const [selectedSongbook, setSelectedSongbook] = useState<Songbook | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SongCategory | null>(null);
  const [songbooks, setSongbooks] = useState<Songbook[]>([]);
  const [categories, setCategories] = useState<SongCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSongbooksAndCategories();
  }, []);

  const fetchSongbooksAndCategories = async () => {
    try {
      const [{ data: songbooksData }, { data: categoriesData }] = await Promise.all([
        supabase.from('songbooks').select('*'),
        supabase.from('song_category').select('*'),
      ]);
      setSongbooks(songbooksData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      setError('Failed to fetch songbooks and categories');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('songs')
        .insert({
          song_name: songName,
          songbook_id: selectedSongbook?.id,
          song_number: songNumber,
          song_category_id: selectedCategory?.id,
        })
        .select()
        .single();

      if (error) throw error;
      onSongAdded(songName);
      setSongId(data.id);
    } catch (error) {
      setError('Failed to add new song');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Add New Song</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Song Name"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          required
          fullWidth
        />
        <Autocomplete
          options={songbooks}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Songbook" required />}
          value={selectedSongbook}
          onChange={(_, newValue) => setSelectedSongbook(newValue)}
        />
        <TextField
          label="Song Number"
          value={songNumber}
          onChange={(e) => setSongNumber(e.target.value)}
          required
          fullWidth
        />
        <Autocomplete
          options={categories}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Category" required />}
          value={selectedCategory}
          onChange={(_, newValue) => setSelectedCategory(newValue)}
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress /> : 'Add Song'}
        </Button>
      </form>
      {songId && <RecordingsForm songId={songId} />}
      {error && <p className="text-red-500">{error}</p>}
      {/* <RecordingsForm songId={null} /> */}
    </div>
  );
};

export default AddNewSongForm;
