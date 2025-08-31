import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import standardDecksData from "@/assets/data/standardDecks.json";
import { SeatingModal } from "@/components";
import { DECKID, NAME, RANDOM, STATE } from "@/constants";
import { useApp } from "@/context";
import { getLocalStorage, setLocalStorage } from "@/services/storageServices";

const CUSTOM_DECKS = "seatingCustomDecks";
const STANDARD_DECKS = "seatingStandardDecks";
const WITH_CUSTOM = "seatingWithCustom";
const WITH_STANDARD = "seatingWithStandard";
const PLAYERS = "seatingPlayers";

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
  const { setShowFloatingButtons } = useApp();
  const [seating, setSeating] = useState();
  const [withCustom, setWithCustom] = useState(getLocalStorage(WITH_CUSTOM) ?? true);
  const [withStandard, setWithStandard] = useState(getLocalStorage(WITH_STANDARD) ?? true);
  const [customDecks, setCustomDecks] = useImmer(getLocalStorage(CUSTOM_DECKS) ?? []);
  const [standardDecks, setStandardDecks] = useImmer(
    getLocalStorage(STANDARD_DECKS) ??
      Object.keys(standardDecksData)
        .toSorted((a, b) => standardDecksData[a].localeCompare(standardDecksData[b], "en"))
        .map((deckid) => ({
          [DECKID]: deckid,
          [NAME]: standardDecksData[deckid],
          [STATE]: true,
        })),
  );
  const [players, setPlayers] = useImmer(
    getLocalStorage(PLAYERS) ?? [
      { [NAME]: "Player 1", [RANDOM]: false, [STATE]: true },
      { [NAME]: "Player 2", [RANDOM]: false, [STATE]: true },
      { [NAME]: "Player 3", [RANDOM]: false, [STATE]: true },
      { [NAME]: "Player 4", [RANDOM]: false, [STATE]: true },
      { [NAME]: "Player 5", [RANDOM]: false, [STATE]: true },
    ],
  );

  const setPlayer = (i, value) => {
    setPlayers((draft) => {
      draft[i] = value;
    });
  };

  const addPlayer = () => {
    setPlayers((draft) => {
      draft.push({
        [NAME]: `Player ${draft.length + 1}`,
        [RANDOM]: false,
        [STATE]: true,
      });
    });
  };

  const delPlayer = (i) => {
    setPlayers((draft) => {
      draft.splice(i, 1);
    });
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

  const toggleCustom = (i) => {
    setCustomDecks((draft) => {
      draft[i][STATE] = !draft[i][STATE];
    });
  };

  const toggleStandard = (i) => {
    setStandardDecks((draft) => {
      draft[i][STATE] = !draft[i][STATE];
    });
  };

  const addCustomDeck = (name) => {
    setCustomDecks((draft) => {
      draft.unshift({ [DECKID]: null, [NAME]: name, [STATE]: true });
    });
  };

  const removeCustomDeck = (i) => {
    setCustomDecks((draft) => {
      draft.splice(i, 1);
    });
  };

  useEffect(() => {
    setLocalStorage(CUSTOM_DECKS, customDecks);
    setLocalStorage(PLAYERS, players);
    setLocalStorage(STANDARD_DECKS, standardDecks);
    setLocalStorage(WITH_CUSTOM, withCustom);
    setLocalStorage(WITH_STANDARD, withStandard);
  }, [customDecks, standardDecks, withCustom, withStandard, players]);

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
