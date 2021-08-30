import React from 'react';
import { useQuery } from 'react-query';
import './App.css';

export const App: React.FC = () => {
  const { isLoading, error, data } = useQuery('people', () =>
    fetch('https://swapi.dev/api/people')
      .then((res) => res.json())
      .then(({ results }) =>
        results.map((result: { name: string }) => result.name)
      )
  );

  const Loading: React.FC = () => {
    return <p>Loading...</p>;
  };

  return (
    <main>
      <h1>👴🏻 Good Ol' REST</h1>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <pre className='error-box'>{JSON.stringify(error, null, 2)}</pre>
      ) : (
        <pre className='data-box'>{JSON.stringify(data, null, 2)}</pre>
      )}
    </main>
  );
};
