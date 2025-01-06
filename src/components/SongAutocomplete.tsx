// 'use client';

// import React, { useState } from 'react';
// import { Autocomplete, TextField } from '@mui/material';
// import { useAuth } from '@/contexts/AuthContext';
// import { useSnackbar } from '@/contexts/SnackbarContext';
// import { Song } from '@/types';

// // interface Song {
// //   id: string;
// //   song_name: string;
// // }

// interface SongAutocompleteProps {
//   onSongSelect: (song: Song | null) => void;
//   onAddNew: () => void;
// }

// export default function SongAutocomplete({ onSongSelect, onAddNew }: SongAutocompleteProps) {
//   const { supabase } = useAuth();
//   const { showSnackbar } = useSnackbar();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [songs, setSongs] = useState<Song[]>([]);

//   const handleSongSearch = async (value: string) => {
//     setSearchTerm(value);
//     if (value.length > 2) {
//       const { data, error } = await supabase
//         .from('songs')
//         .select('id, song_name, songbook_id, song_category_id, song_number')
//         .ilike('song_name', `%${value}%`)
//         .limit(10);

//       if (data) {
//         setSongs([{ id: 'add-new', song_name: 'Add New Song', song_category: {id:'-', name:'None'}, song_number: '-', songbooks: {id:'-', name:''}}, ...data]);
//       }

//       if (error) {
//         showSnackbar((error as Error).message, 'error');
//       }
//     }
//   };

//   const handleSongSelect = (event: React.SyntheticEvent, value: Song | null) => {
//     if (value && value.id === 'add-new') {
//       onAddNew();
//     } else {
//       onSongSelect(value);
//     }
//   };

//   return (
//     <Autocomplete
//       options={songs}
//       getOptionLabel={(option) => option.song_name}
//       onInputChange={(event, value) => handleSongSearch(value)}
//       onChange={handleSongSelect}
//       renderInput={(params) => (
//         <TextField {...params} value={searchTerm} label="Search Songs" fullWidth />
//       )}
//     />
//   );
// }

'use client';

import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { Song, Songbook, SongCategory } from '@/types';

interface SongAutocompleteProps {
  onSongSelect: (song: Song | null) => void;
  onAddNew: () => void;
}

export default function SongAutocomplete({ onSongSelect, onAddNew }: SongAutocompleteProps) {
  const { supabase } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState<Song[]>([
    {
      id: 'add-new',
      song_name: 'Add New Song',
      song_number: '-',
      songbooks: { id: '-', name: '' },
      song_category: { id: '-', name: 'None' },
    },
  ]);

  const handleSongSearch = async (value: string) => {
    setSearchTerm(value);
    if (value.length > 2) {
      const { data, error } = await supabase
        .from('songs')
        .select(
          'id, song_name, song_number, songbooks:songbook_id(id, name), song_category:song_category_id(id, name)'
        )
        .ilike('song_name', `%${value}%`)
        .limit(10);

      if (data) {
        const formattedData: Song[] = data.map((item: any) => ({
          id: item.id,
          song_name: item.song_name,
          song_number: item.song_number,
          songbooks: item.songbooks,
          song_category: item.song_category,
        }));

        setSongs([
          {
            id: 'add-new',
            song_name: 'Add New Song',
            song_number: '-',
            songbooks: { id: '-', name: '' },
            song_category: { id: '-', name: 'None' },
          },
          ...formattedData,
        ]);
      }

      if (error) {
        showSnackbar((error as Error).message, 'error');
      }
    }
  };

  const handleSongSelect = (event: React.SyntheticEvent, value: Song | null) => {
    if (value && value.id === 'add-new') {
      onAddNew();
    } else {
      onSongSelect(value);
    }
  };

  return (
    <Autocomplete
      options={songs}
      getOptionLabel={(option) => option.song_name}
      onInputChange={(event, value) => handleSongSearch(value)}
      onChange={handleSongSelect}
      renderInput={(params) => (
        <TextField {...params} value={searchTerm} label="Search Songs" fullWidth />
      )}
    />
  );
}
