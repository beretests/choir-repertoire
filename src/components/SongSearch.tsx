import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { supabase } from '@/lib/supabase';
import { Song } from '@/types';

interface SongSearchProps {
  onSongSelect: (songId: string) => void;
}

const SongSearch: React.FC<SongSearchProps> = ({ onSongSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState<Song[]>([]);

  const searchSongs = async (term: string) => {
    const { data } = await supabase
      .from('songs')
      .select(
        `
        id,
        song_name,
        song_number,
        songbooks (name),
        song_category (name)
      `
      )
      .or(`song_name.ilike.%${term}%,song_number.ilike.%${term}%`)
      .order('song_name');

    const transformData = (data: any[]): Song[] => {
      return data.map((item) => ({
        id: item.id,
        song_name: item.song_name,
        song_number: item.song_number,
        songbooks: item.songbooks,
        song_category: item.song_category,
      }));
    };

    setSongs(transformData(data || []));
  };

  return (
    <Autocomplete
      options={songs}
      getOptionLabel={(option) =>
        `${option.song_name} - ${option.songbooks.name} ${option.song_number}`
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Songs"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            searchSongs(e.target.value);
          }}
        />
      )}
      onChange={(_, newValue) => {
        if (newValue) {
          onSongSelect(newValue.id);
        }
      }}
    />
  );
};

export default SongSearch;
