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
        const data = await helloService.fetchHelloMessage();
        
        // Only update state if not aborted
        if (!abortController.signal.aborted) {
          setMessage(data.message);
          setError(null);
        }
      } catch (err) {
        // Only update state if not aborted
        if (!abortController.signal.aborted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        // Only update state if not aborted
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMessage();

    // Cleanup function to prevent state updates after unmount
    // In React.StrictMode (dev), this will be called when the first mount is cleaned up,
    // then the effect runs again with a new AbortController for the second mount
    return () => {
      abortController.abort();
    };
  }, []);

  return { message, loading, error };
};
