import { useState } from "react";
import { useSnapshot } from "valtio";
import { SeatingModal } from "@/components";
import {
  DECKID,
  NAME,
  RANDOM,
  SEATING_CUSTOM_DECKS,
  SEATING_STANDARD_DECKS,
  SEATING_WITH_CUSTOM,
  SEATING_WITH_STANDARD,
  STATE,
} from "@/constants";
import { settings, useApp } from "@/context";
import { SEATING_PLAYERS } from "../../constants";

const getRandomDeck = (players) => {
  return players[Math.floor(Math.random() * Math.floor(players.length))];
};

const randomizeArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Seating = ({ setShow }) => {
  const {
    [SEATING_STANDARD_DECKS]: standardDecks,
    [SEATING_CUSTOM_DECKS]: customDecks,
    [SEATING_WITH_CUSTOM]: withCustom,
    [SEATING_WITH_STANDARD]: withStandard,
    [SEATING_PLAYERS]: players,
  } = useSnapshot(settings);
  const { setShowFloatingButtons } = useApp();

  const [seating, setSeating] = useState();
  const setWithCustom = (value) => (settings[SEATING_WITH_CUSTOM] = value);
  const setWithStandard = (value) => (settings[SEATING_WITH_STANDARD] = value);

  const setPlayer = (i, value) => (settings[SEATING_PLAYERS][i] = value);
  const delPlayer = (i) => settings[SEATING_PLAYERS].splice(i, 1);
  const addPlayer = () => {
    settings[SEATING_PLAYERS] = [
      ...players,
      {
        [NAME]: `Player ${players.length + 1}`,
        [RANDOM]: false,
        [STATE]: true,
      },
    ];
  };

  const handleCloseModal = () => {
    setShow(false);
    setShowFloatingButtons(true);
  };

  const reshuffle = () => {
    const options = players
      .filter((d) => d[STATE])
      .map((d) => {
        if (d[RANDOM]) {
          const src = [];
          if (withCustom) src.push(...customDecks.filter((v) => v[STATE]));
          if (withStandard) src.push(...standardDecks.filter((v) => v[STATE]));
          if (!src.length > 0) return { [NAME]: "ERROR", [DECKID]: null };
          const randomDeck = getRandomDeck(src);
          return { [NAME]: randomDeck[NAME], [DECKID]: randomDeck[DECKID] };
        }
        return { [NAME]: d[NAME] };
      });

    if ([7, 11].includes(options.length)) {
      options.push({ name: "First oust from another table" });
    }

    const randomizedPlayers = randomizeArray(options);
    const tablesWithQty = getTablesWithQty(randomizedPlayers.length);
    const tablesWithPlayers = [];
    tablesWithQty.forEach((n) => {
      tablesWithPlayers.push(randomizedPlayers.slice(0, n));
      randomizedPlayers.splice(0, n);
    });

    setSeating(tablesWithPlayers);
  };

  const getTablesWithQty = (q) => {
    const fullTablesQty = Math.floor(q / 5);

    switch (q) {
      case 3:
        return [3];
      case 6:
        return [6];
    }

    let tables;
    switch (q % 5) {
      case 0:
        tables = Array(fullTablesQty).fill(5);
        break;
      case 1:
        tables = Array(fullTablesQty + 1).fill(5);
        tables.fill(4, tables.length - 4);
        break;
      case 2:
        tables = Array(fullTablesQty + 1).fill(5);
        tables.fill(4, tables.length - 3);
        break;
      case 3:
        tables = Array(fullTablesQty + 1).fill(5);
        tables.fill(4, tables.length - 2);
        break;
      case 4:
        tables = Array(fullTablesQty + 1).fill(5);
        tables.fill(4, tables.length - 1);
        break;
    }

    return tables;
  };

  const toggleCustom = (i) => (settings[SEATING_CUSTOM_DECKS][i][STATE] = !customDecks[i][STATE]);
  const toggleStandard = (i) =>
    (settings[SEATING_STANDARD_DECKS][i][STATE] = !standardDecks[i][STATE]);

  const addCustomDeck = (name) => {
    settings[SEATING_CUSTOM_DECKS] = [
      ...customDecks,
      { [DECKID]: null, [NAME]: name, [STATE]: true },
    ];
  };

  const removeCustomDeck = (i) => settings[SEATING_CUSTOM_DECKS].splice(i, 1);

  return (
    <SeatingModal
      addCustomDeck={addCustomDeck}
      removeCustomDeck={removeCustomDeck}
      customDecks={customDecks}
      handleClose={handleCloseModal}
      players={players}
      reshuffle={reshuffle}
      seating={seating}
      setPlayer={setPlayer}
      delPlayer={delPlayer}
      addPlayer={addPlayer}
      setWithCustom={setWithCustom}
      setWithStandard={setWithStandard}
      standardDecks={standardDecks}
      toggleCustom={toggleCustom}
      toggleStandard={toggleStandard}
      withCustom={withCustom}
      withStandard={withStandard}
    />
  );
};

export default Seating;
