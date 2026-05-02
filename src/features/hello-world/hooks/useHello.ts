import { useState, useEffect } from 'react';
import { helloService } from '../services/helloService';

export const useHello = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true);
        const data = await helloService.fetchHelloMessage();
        setMessage(data.message);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  return { message, loading, error };
};
