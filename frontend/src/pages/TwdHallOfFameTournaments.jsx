import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { TwdHallFameTournamentsPlayer } from 'components';

const TwdHallOfFameTournaments = () => {
  const [players, setPlayers] = useState(undefined);

  useEffect(() => {
    const url = `${process.env.API_URL}twd/hall_of_fame`;
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
    <div className="hof-tournaments-container mx-auto px-0 p-md-3">
      {players && (
        <Accordion alwaysOpen>
          {Object.keys(players)
            .sort(byName)
            .sort(byWins)
            .map((player) => (
              <TwdHallFameTournamentsPlayer
                key={player}
                name={player}
                decks={players[player]}
              />
            ))}
        </Accordion>
      )}
    </div>
  );
};

export default TwdHallOfFameTournaments;
