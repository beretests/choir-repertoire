import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Recording } from '@/types';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '@/contexts/AuthContext';
import AddRecordingModal from './AddRecordingModal';

interface RecordingListProps {
  songId: string;
  songName: string;
}

export default function RecordingList({ songId, songName }: RecordingListProps) {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchRecordings() {
      const { data, error } = await supabase
        .from('recordings')
        .select(`id, url, voice_part (name)`)
        .eq('song_id', songId);

      if (error) {
        console.error('Error fetching recordings:', error);
        setLoading(false);
        return;
      }

      const transformData = (data: any[]): Recording[] => {
        return data.map((item) => ({
          id: item.id,
          url: item.url,
          voice_part: item.voice_part,
        }));
      };

      setRecordings(transformData(data || []));
      setLoading(false);
    }

    fetchRecordings();
  }, [songId]);

  const handleDownload = (url: string, voicePart: string) => {
    const fileName = `${songName.replace(/\s+/g, '_')}_${voicePart}.mp3`;
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => console.error('Download failed:', error));
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <ul className="space-y-6">
          {recordings.map((recording) => (
            <li
              key={recording.id}
              className="flex flex-col sm:flex-row sm:items-center sm:space-x-4"
            >
              <span className="font-medium mb-2 sm:mb-0">{recording.voice_part?.name}:</span>
              <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:flex-grow space-y-2 sm:space-y-0 sm:space-x-4">
                <audio controls src={recording.url} className="w-full sm:w-auto sm:flex-grow" />
                <button
                  onClick={() => handleDownload(recording.url, recording.voice_part?.name)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 w-full sm:w-auto"
                >
                  Download
                </button>
              </div>
            </li>
          ))}
          {user?.email && (
            <li>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              >
                Add new recording
              </button>
            </li>
          )}
        </ul>
      )}
      {user?.email && (
        <AddRecordingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          songId={songId}
          onRecordingAdded={(newRecording) => setRecordings([...recordings, newRecording])}
        />
      )}
    </>
  );
}
