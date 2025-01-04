import { useEffect, useState } from 'react';
// import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Recording } from '@/types';
import { useSnackbar } from '@/contexts/SnackbarContext';

interface AddRecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  songId: string;
  onRecordingAdded: (newRecording: Recording) => void;
}

export default function AddRecordingModal({
  isOpen,
  onClose,
  songId,
  onRecordingAdded,
}: AddRecordingModalProps) {
  const { showSnackbar } = useSnackbar();
  const [file, setFile] = useState<File | null>(null);
  const [voicePart, setVoicePart] = useState<string>('');
  const [voiceParts, setVoiceParts] = useState<{ id: string; name: string }[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const { supabase } = useAuth();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const fetchFormData = async () => {
    const { data: voicePartsData, error: voicePartsError } = await supabase
      .from('voice_part')
      .select('id, name');

    if (voicePartsError) {
      console.error('Error fetching voiceParts:', voicePartsError);
      showSnackbar(`Error fetching voiceParts: ${voicePartsError}`, 'error');
    } else {
      setVoiceParts(voicePartsData);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file || !voicePart) {
      showSnackbar('No file or voice part selected!', 'error');
      return;
    }

    setUploading(true);

    try {
      // Upload file to Supabase Storage
      const fileName = `${songId}_${voicePart}_${Date.now()}.mp3`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('ctk-choir-recordings')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('ctk-choir-recordings')
        .getPublicUrl(fileName);

      if (!urlData) throw new Error('Failed to get public URL');

      const { data: recordingData, error: dbError } = await supabase
        .from('recordings')
        .insert({
          song_id: songId,
          voice_part_id: voicePart,
          url: urlData.publicUrl,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      onRecordingAdded(recordingData);
      onClose();
      showSnackbar('Recording added successfully', 'success');
    } catch (error) {
      console.error('Error adding recording:', error);
      showSnackbar((error as Error).message, 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add New Recording</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="voice-part-label">Voice Part</InputLabel>
            <Select
              labelId="voice-part-label"
              value={voicePart}
              onChange={(e) => setVoicePart(e.target.value)}
              required
            >
              {voiceParts.map((voicePart) => (
                <MenuItem key={voicePart.id} value={voicePart.id}>
                  {voicePart.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <input
            type="file"
            accept="audio/mp3"
            onChange={handleFileChange}
            required
            className="mt-4"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Add Recording'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
