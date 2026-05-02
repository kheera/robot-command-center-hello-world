import { useState, useEffect } from 'react';
import { helloService } from '../services/helloService';

export const useHello = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchMessage = async () => {
      try {
        setLoading(true);
        const data = await helloService.fetchHelloMessage(abortController.signal);
        setMessage(data.message);
        setError(null);
      } catch (err) {
        // Don't set error if the request was aborted
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();

    return () => {
      abortController.abort();
    };
  }, []);

  return { message, loading, error };
};
