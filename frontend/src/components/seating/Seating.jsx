import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import { SeatingModal } from 'components';
import { useApp } from 'context';
import standardDecksData from 'assets/data/standardDecks.json';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomDeck = (decks) => {
  return decks[getRandomInt(decks.length)];
};

const getRandomTable = (decks) => {
  return decks.sort(() => Math.random() - 0.5);
};

const Seating = ({ setShow }) => {
  const { setShowFloatingButtons } = useApp();

  const [standardDecks, setStandardDecks] = useImmer(
    Object.keys(standardDecksData)
      .sort((a, b) => standardDecksData[a].localeCompare(standardDecksData[b]))
      .map((deckid) => ({
        deckid: deckid,
        name: standardDecksData[deckid],
        state: true,
      }))
  );

  const [customDecks, setCustomDecks] = useImmer([]);
  // Object.keys(standardDecks)
  //   .sort((a, b) => standardDecks[a].localeCompare(standardDecks[b]))
  //   .map((deckid) => ({
  //     deckid: deckid,
  //     name: standardDecks[deckid],
  //     state: true,
  //   }))
  // );

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
          const src = [];
          if (withCustom) src.push(...customDecks);
          if (withStandard) src.push(...standardDecks);
          if (!src.length > 0) return { name: 'ERROR', deckid: null };
          const randomDeck = getRandomDeck(src);
          return { name: randomDeck.name, deckid: randomDeck.deckid };
        } else {
          return { name: d.name };
        }
      });

    const results = [options[0], ...getRandomTable(options.slice(1))];
    results[getRandomInt(results.length)].first = true;
    setSeating(results);
  };

  const [withCustom, setWithCustom] = useState(true);
  const [withStandard, setWithStandard] = useState(true);

  const toggleCustom = (i) => {
    setCustomDecks((draft) => {
      draft[i].state = !draft[i].state;
      return draft;
    });
  };

  const toggleStandard = (i) => {
    setStandardDecks((draft) => {
      draft[i].state = !draft[i].state;
      return draft;
    });
  };

  const addCustomDeck = (name) => {
    setCustomDecks((draft) => {
      draft.unshift({ deckid: null, name: name, state: true });
      return draft;
    });
  };

  return (
    <>
      {showModal && (
        <SeatingModal
          addCustomDeck={addCustomDeck}
          decks={decks}
          handleClose={handleCloseModal}
          customDecks={customDecks}
          standardDecks={standardDecks}
          reshuffle={reshuffle}
          seating={seating}
          setDeck={setDeck}
          show={showModal}
          toggleCustom={toggleCustom}
          toggleStandard={toggleStandard}
          withCustom={withCustom}
          withStandard={withStandard}
          setWithCustom={setWithCustom}
          setWithStandard={setWithStandard}
        />
      )}
    </>
  );
};

export default Seating;
