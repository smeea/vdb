import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import { DeckSeatingModal } from 'components';
import { useApp } from 'context';
import standardDecks from 'assets/data/standardDecks.json';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomDeck = (decks) => {
  return decks[getRandomInt(decks.length)];
};

const getRandomTable = (decks) => {
  return decks.sort(() => Math.random() - 0.5);
};

const DeckSeating = ({ setShow }) => {
  const { setShowFloatingButtons } = useApp();

  const [randomDecks, setRandomDecks] = useImmer(
    Object.keys(standardDecks)
      .sort((a, b) => standardDecks[a].localeCompare(standardDecks[b]))
      .map((deckid) => ({
        deckid: deckid,
        name: standardDecks[deckid],
        state: true,
      }))
  );

  const [decks, setDecks] = useImmer([
    { name: 'Player 1', random: false, state: true },
    { name: 'Player 2', random: false, state: true },
    { name: 'Player 3', random: false, state: true },
    { name: 'Player 4', random: false, state: true },
    { name: 'Player 5', random: false, state: true },
  ]);
  const [showModal, setShowModal] = useState(true);
  const [seating, setSeating] = useState();

  const setDeck = (i, value) => {
    setDecks((draft) => {
      draft[i] = value;
      return draft;
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShow(false);
    setShowFloatingButtons(true);
  };

  const reshuffle = () => {
    const options = decks
      .filter((d) => d.state)
      .map((d) => {
        if (d.random) {
          const randomDeck = getRandomDeck(randomDecks);
          return { name: randomDeck.name, deckid: randomDeck.deckid };
        } else {
          return { name: d.name };
        }
      });

    const results = [options[0], ...getRandomTable(options.slice(1))];
    results[getRandomInt(results.length)].first = true;
    setSeating(results);
  };

  return (
    <>
      {showModal && (
        <DeckSeatingModal
          decks={decks}
          setDeck={setDeck}
          randomDecks={randomDecks}
          setRandomDecks={setRandomDecks}
          show={showModal}
          handleClose={handleCloseModal}
          reshuffle={reshuffle}
          seating={seating}
        />
      )}
    </>
  );
};

export default DeckSeating;
