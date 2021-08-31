import React, { useEffect, useState } from 'react';
import { useBookQuery } from './books.generated';
import './App.css';

export const App: React.FC = () => {
  const [author, setAuthor] = useState<string>();
  const { data, isLoading } = useBookQuery({
    author,
  });

  const Loading: React.FC = () => {
    return <p>Loading...</p>;
  };

  return (
    <main>
      <h1>Rocks! 👌</h1>
      <input placeholder="Author..." onChange={(e) => setAuthor(e.target.value)} />
      <pre className='data-box'>
        {!data ? <Loading /> : JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
};
