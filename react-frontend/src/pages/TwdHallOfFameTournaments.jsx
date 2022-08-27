import React, { useState, useEffect } from 'react';
import { Container, Accordion } from 'react-bootstrap';
import { TwdHallFameTournamentsPlayer } from 'components';

const TwdHallOfFameTournaments = (props) => {
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
    <Container className="hof-tournaments-container px-0 p-md-3">
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
    </Container>
  );
};

export default TwdHallOfFameTournaments;
