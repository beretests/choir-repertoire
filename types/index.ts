// types/index.ts
export interface Song {
    id: string;
    song_name: string;
    songbook_id: string;
    song_number: string;
    song_category_id: string;
  }
  
  export interface Recording {
    id: string;
    song_id: string;
    voice_part: string;
    url: string;
  }
  
  export interface Schedule {
    id: string;
    schedule_date: string;
  }
  
  export interface ScheduleSong {
    id: string;
    schedule_id: string;
    song_id: string;
  }