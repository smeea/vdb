import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { TwdHallFameTournamentsPlayer } from '@/components';

const TwdHallOfFameTournaments = () => {
  const [players, setPlayers] = useState();

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/twd/hall_of_fame`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
      });
  }, []);

  const byWins = (a, b) => {
    return Object.keys(players[b]).length - Object.keys(players[a]).length;
  };

  const byName = (a, b) => {
    return a.localeCompare(b);
  };

  return (
    <div className="hof-tournaments-container mx-auto space-y-1.5">
      {players && (
        <>
          {Object.keys(players)
            .sort(byName)
            .sort(byWins)
            .map((player) => (
              <Disclosure key={player}>
                <TwdHallFameTournamentsPlayer
                  name={player}
                  decks={players[player]}
                />
              </Disclosure>
            ))}
        </>
      )}
    </div>
  );
};

export default TwdHallOfFameTournaments;
