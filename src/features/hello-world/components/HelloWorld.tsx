import { useHello } from '../hooks/useHello';

export const HelloWorld = () => {
  const { message, loading, error } = useHello();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};
