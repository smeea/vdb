import React, { useState, useEffect } from 'react';
import { Container, Accordion } from 'react-bootstrap';
import { TwdHallFamePlayer } from 'components';

const TwdHallOfFame = (props) => {
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
    <Container className="hall-of-fame-container px-0 p-md-3">
      {players && (
        <Accordion alwaysOpen>
          {Object.keys(players)
            .sort(byName)
            .sort(byWins)
            .map((player) => (
              <TwdHallFamePlayer
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

export default TwdHallOfFame;
