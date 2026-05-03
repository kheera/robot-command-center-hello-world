import { useState, useEffect, useRef } from 'react';
import { helloService } from '../services/helloService';

export const useHello = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // Prevent double-fetch in React.StrictMode (development)
    if (hasFetchedRef.current) {
      return;
    }
    hasFetchedRef.current = true;

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

    // Cleanup function to abort the request if component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  return { message, loading, error };
};
