'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface SearchParamsHandlerProps {
  setStatus: (status: 'success' | 'error' | null) => void;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SearchParamsHandler({ setStatus, setMessage }: SearchParamsHandlerProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const statusParam = searchParams.get('status') as 'success' | 'error' | null;
    const messageParam = searchParams.get('message');
    //
    if (statusParam && messageParam) {
      setStatus(statusParam);
      setMessage(messageParam);
    }
  }, [searchParams, setStatus, setMessage]);

  return null;
}
