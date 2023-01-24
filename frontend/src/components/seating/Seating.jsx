import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { SeatingModal } from '@/components';
import { initFromStorage, setLocalStorage } from '@/services/storageServices.js';
import { useApp } from '@/context';
import standardDecksData from '@/assets/data/standardDecks.json';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomDeck = (players) => {
  return players[getRandomInt(players.length)];
};

const getRandomTable = (players) => {
  return players.sort(() => Math.random() - 0.5);
};

const Seating = ({ setShow }) => {
  const { setShowFloatingButtons } = useApp();

  const [showModal, setShowModal] = useState(true);
  const [seating, setSeating] = useState();
  const [withCustom, setWithCustom] = useState();
  const [withStandard, setWithStandard] = useState();
  const [customDecks, setCustomDecks] = useImmer([]);
  const [standardDecks, setStandardDecks] = useImmer(
    Object.keys(standardDecksData)
      .sort((a, b) => standardDecksData[a].localeCompare(standardDecksData[b]))
      .map((deckid) => ({
        deckid: deckid,
        name: standardDecksData[deckid],
        state: true,
      }))
  );

  const [players, setPlayers] = useImmer([
    { name: 'Player 1', random: false, state: true },
    { name: 'Player 2', random: false, state: true },
    { name: 'Player 3', random: false, state: true },
    { name: 'Player 4', random: false, state: true },
    { name: 'Player 5', random: false, state: true },
  ]);

  const initPlayers = (players) => {
    setPlayers((draft) => {
      players.map((p, idx) => {
        draft[idx] = p;
      });
      return draft;
    });
  };

  const initCustomDecks = (decks) => {
    setCustomDecks((draft) => {
      decks.map((d, idx) => {
        draft[idx] = d;
      });
      return draft;
    });
  };

  const setPlayer = (i, value) => {
    setPlayers((draft) => {
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
    const options = players
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

  const removeCustomDeck = (i) => {
    setCustomDecks((draft) => {
      draft.splice(i, 1);
      return draft;
    });
  };

  useLayoutEffect(() => {
    initFromStorage('seatingCustomDecks', [], initCustomDecks);
    initFromStorage('seatingPlayers', undefined, (val) => {
      if (val) initPlayers(val);
    });
    initFromStorage('seatingStandardDecks', undefined, (val) => {
      if (val) setStandardDecks(val);
    });
    initFromStorage('seatingWithCustom', true, setWithCustom);
    initFromStorage('seatingWithStandard', true, setWithStandard);
  }, []);

  useEffect(() => {
    setLocalStorage('seatingCustomDecks', customDecks);
    setLocalStorage('seatingPlayers', players);
    setLocalStorage('seatingStandardDecks', standardDecks);
    setLocalStorage('seatingWithCustom', withCustom);
    setLocalStorage('seatingWithStandard', withStandard);
  }, [customDecks, standardDecks, withCustom, withStandard, players]);

  return (
    <>
      {showModal && (
        <SeatingModal
          addCustomDeck={addCustomDeck}
          removeCustomDeck={removeCustomDeck}
          customDecks={customDecks}
          handleClose={handleCloseModal}
          players={players}
          reshuffle={reshuffle}
          seating={seating}
          setPlayer={setPlayer}
          setWithCustom={setWithCustom}
          setWithStandard={setWithStandard}
          standardDecks={standardDecks}
          toggleCustom={toggleCustom}
          toggleStandard={toggleStandard}
          withCustom={withCustom}
          withStandard={withStandard}
        />
      )}
    </>
  );
};

export default Seating;
