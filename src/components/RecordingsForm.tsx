import { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import { supabase } from '@/lib/supabase';
import { VoicePart } from '@/types';
import CircularProgress from '@mui/material/CircularProgress';

interface RecordingsFormProps {
  songId: string | null;
}

const RecordingsForm: React.FC<RecordingsFormProps> = ({ songId }) => {
  const [url, setUrl] = useState('');
  const [selectedVoicePart, setSelectedVoicePart] = useState<VoicePart | null>(null);
  const [voiceParts, setVoiceParts] = useState<VoicePart[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVoiceParts();
  }, []);

  const fetchVoiceParts = async () => {
    try {
      const { data } = await supabase.from('voice_parts').select('*');
      setVoiceParts(data || []);
    } catch (error) {
      setError('Failed to fetch voice parts');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!songId) return;
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from('recordings').insert({
        song_id: songId,
        voice_part_id: selectedVoicePart?.id,
        url,
      });

      if (error) throw error;
      setUrl('');
      setSelectedVoicePart(null);
    } catch (error) {
      setError('Failed to add recording');
    } finally {
      setLoading(false);
    }
  };

  // if (!songId) return null;
  if (!songId || songId === '') return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Add Recording</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Recording URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          fullWidth
        />
        <Autocomplete
          options={voiceParts}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Voice Part" required />}
          value={selectedVoicePart}
          onChange={(_, newValue) => setSelectedVoicePart(newValue)}
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress /> : 'Add Recording'}
        </Button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default RecordingsForm;
