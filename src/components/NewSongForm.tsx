'use client';

import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';

interface NewSongFormProps {
  onSongCreated: (song: { id: string; song_name: string }) => void;
}

export default function NewSongForm({ onSongCreated }: NewSongFormProps) {
  const { supabase } = useAuth();
  const [songName, setSongName] = useState('');
  const [songbookId, setSongbookId] = useState('');
  const [songNumber, setSongNumber] = useState('');
  const [songCategoryId, setSongCategoryId] = useState('');
  const [songbooks, setSongbooks] = useState<{ id: string; name: string }[]>([]);
  const [songCategories, setSongCategories] = useState<{ id: string; name: string }[]>([]);

  const fetchFormData = async () => {
    const { data: songbooksData, error: songbooksError } = await supabase
      .from('songbooks')
      .select('id, name');

    if (songbooksError) {
      console.error('Error fetching songbooks:', songbooksError);
    } else {
      setSongbooks(songbooksData);
    }

    const { data: categoriesData, error: categoriesError } = await supabase
      .from('song_category')
      .select('id, name');

    if (categoriesError) {
      console.error('Error fetching song categories:', categoriesError);
    } else {
      setSongCategories(categoriesData);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('songs')
      .insert({
        song_name: songName,
        songbook_id: songbookId,
        song_number: songNumber,
        song_category_id: songCategoryId,
      })
      .select();

    if (error) {
      console.error('Error creating song:', error);
    } else if (data) {
      onSongCreated(data[0]);
      // Reset form
      setSongName('');
      setSongbookId('');
      setSongNumber('');
      setSongCategoryId('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        label="Song Name"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        fullWidth
        required
      />
      <FormControl fullWidth required>
        <InputLabel>Songbook</InputLabel>
        <Select value={songbookId} onChange={(e) => setSongbookId(e.target.value)}>
          {songbooks.map((songbook) => (
            <MenuItem key={songbook.id} value={songbook.id}>
              {songbook.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Song Number"
        value={songNumber}
        onChange={(e) => setSongNumber(e.target.value)}
        fullWidth
        required
      />
      <FormControl fullWidth required>
        <InputLabel>Song Category</InputLabel>
        <Select value={songCategoryId} onChange={(e) => setSongCategoryId(e.target.value)}>
          {songCategories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Create Song
      </Button>
    </form>
  );
}
