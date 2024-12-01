
export interface Songbook {
  id: string;
  name: string;
}

export interface SongCategory {
  id: string;
  name: string;
}

export interface VoicePart {
  id: string;
  name: string;
}

export interface Song {
  id: string;
  song_name: string;
  song_number: string;
  songbooks: Songbook;
  song_category: SongCategory;
}

export interface Recording {
  id: string;
  voice_part: VoicePart;
  url: string;
}