'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { Song } from '@/types';

interface NewSongFormProps {
  onSongCreated: (song: Song) => void;
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
      setSongName('');
      setSongbookId('');
      setSongNumber('');
      setSongCategoryId('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white px-4 py-4 w-[80%] rounded-lg">
      <TextField
        label="Song Name"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        fullWidth
        required
      />
      <FormControl fullWidth required>
        <InputLabel className="select-focused">Songbook</InputLabel>
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
        <InputLabel className="select-focused">Song Category</InputLabel>
        <Select value={songCategoryId} onChange={(e) => setSongCategoryId(e.target.value)}>
          {songCategories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {(category.name[0].toUpperCase() + category.name.slice(1)).replace(/_/g, ' ')}
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
