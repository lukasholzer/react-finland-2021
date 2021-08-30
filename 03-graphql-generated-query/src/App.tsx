import React, { useEffect, useState } from 'react';
import { useAllPeopleQuery } from './allPeople.generated';
import './App.css';

export const App: React.FC = () => {
  const { data, isLoading } = useAllPeopleQuery();

  const Loading: React.FC = () => {
    return <p>Loading...</p>;
  };

  return (
    <main>
      <h1>🤠 experienced sheriff in the city</h1>

      {!data ? (
        <Loading />
      ) : (
        <pre className='data-box'>{JSON.stringify(data.allPeople?.people, null, 2)}</pre>
      )}
    </main>
  );
};
