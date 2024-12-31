import { supabase } from '@/lib/supabase';
import { Song } from '@/types';
import { Recording } from '@/types';


export async function searchSongs(searchTerm: string): Promise<Song[]> {
  const { data, error } = await supabase
    .from('songs')
    .select('*, songbooks(name)')
    .ilike('song_name', `%${searchTerm}%`);

  if (error) throw error;
  return data;
}

export async function addSong(songData: Omit<Song, 'id' | 'created_at'>): Promise<Song> {
  const { data, error } = await supabase
    .from('songs')
    .insert(songData)
    .single();

  if (error) throw error;
  return data;
}

export async function addRecording(recordingData: Omit<Recording, 'id' | 'created_at'>): Promise<Recording> {
  const { data, error } = await supabase
    .from('recordings')
    .insert(recordingData)
    .single();

  if (error) throw error;
  return data;
}

export async function createSchedule(date: Date, songIds: string[]): Promise<void> {
  const { data: schedule, error: scheduleError } = await supabase
    .from('schedules')
    .insert({ schedule_date: date })
    .select()
    .single();

  if (scheduleError) throw scheduleError;

  if (!schedule) throw new Error('Failed to create schedule');
  const scheduleSongs = songIds.map(songId => ({
    schedule_id: schedule.id,
    song_id: songId,
  }));

  const { error: scheduleSongsError } = await supabase
    .from('schedule_songs')
    .insert(scheduleSongs);

  if (scheduleSongsError) throw scheduleSongsError;
}