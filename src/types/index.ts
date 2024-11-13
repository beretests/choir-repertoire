export interface Song {
    id: string;
    name: string;
    songbook_name: string;
    song_number: string;
    recordings: Recording[];
  }
  
  export interface Recording {
    id: string;
    voice_part: string;
    url: string;
  }
  
  export interface Schedule {
    id: string;
    date: string;
    songs: Song;
  }