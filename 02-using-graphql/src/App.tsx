import React, { useEffect, useState } from 'react';
import './App.css';

export const App: React.FC = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query allPeople {
            allPeople {
              people {
                name
              }
            }
          }`,
        operationName: 'allPeople',
      }),
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const Loading: React.FC = () => {
    return <p>Loading...</p>;
  };

  return (
    <main>
      <h1>🤠 New sheriff in town</h1>

      {!data ? (
        <Loading />
      ) : (
        <pre className='data-box'>{JSON.stringify(data, null, 2)}</pre>
      )}
    </main>
  );
};
