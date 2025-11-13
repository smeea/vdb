import { useState } from "react";
import {
  DeckSelectAdvTableHeader,
  DeckSelectAdvTableRow,
  ResultClanImage,
  Button,
} from "@/components";
import { ANY, CRYPT, DECKID, INVENTORY_TYPE, LIBRARY, MASTER, NAME, TAGS } from "@/constants";
import { decksSort, getClan } from "@/utils";

const DeckSelectAdvTable = ({
  allTagsOptions,
  tagsFilter,
  setTagsFilter,
  short,
  decks = {},
  sortMethod,
  onClick,
  handleClose,
  selectedDecks,
  setSelectedDecks,
  isSelectedAll,
  setIsSelectedAll,
}) => {
  const INITIAL_SHOW = 30;
  const [showAll, setShowAll] = useState();
  const [invFilter, setInvFilter] = useState(ANY);
  const [revFilter, setRevFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [clanFilter, setClanFilter] = useState(ANY);

  const clanOptions = [
    {
      value: ANY,
      label: "ANY",
    },
    {
      value: "",
      label: "NONE",
    },
  ];

  const allDecksClans = Object.values(decks).reduce((acc, deck) => {
    const clan = getClan(deck[CRYPT]);
    if (clan && !acc.includes(clan)) acc.push(clan);
    return acc;
  }, []);

  allDecksClans.toSorted().forEach((i) => {
    clanOptions.push({
      value: i.toLowerCase(),
      label: <ResultClanImage value={i} />,
    });
  });

  const isCardInDeck = (deck, query) => {
    const normalizedQuery = query
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

    return Object.values({ ...deck[CRYPT], ...deck[LIBRARY] }).some((card) => {
      const normalizedCardName = card.c[NAME]
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");

      return normalizedCardName.includes(normalizedQuery);
    });
  };

  const isDeckNameMatch = (deck, query) => {
    const normalizedNameFilter = query
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
    const normalizedDeckName = deck[NAME]
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

    return normalizedDeckName.includes(normalizedNameFilter);
  };

  const filtered = Object.values(decks).filter((deck) => {
    if (invFilter !== ANY && deck[INVENTORY_TYPE] !== invFilter) return false;

    const clan = getClan(deck[CRYPT]) || "";
    if (clanFilter !== ANY && clan.toLowerCase() !== clanFilter) return false;

    if (
      nameFilter.length > 2 &&
      !(isDeckNameMatch(deck, nameFilter) || isCardInDeck(deck, nameFilter))
    )
      return false;

    if (tagsFilter.some((tag) => !deck[TAGS].includes(tag))) return false;

    if (!revFilter && deck[MASTER]) return false;

    return true;
  });

  const sortedDecks = decksSort(filtered, sortMethod);

  const toggleSelect = (deckid) => {
    setSelectedDecks((prevState) => ({
      ...prevState,
      [deckid]: !prevState[deckid],
    }));
  };

  const toggleSelectAll = () => {
    if (isSelectedAll) {
      setSelectedDecks({});
      setIsSelectedAll(!isSelectedAll);
    } else {
      setSelectedDecks(() => {
        const selected = {};
        sortedDecks.forEach((d) => {
          selected[d[DECKID]] = true;
        });

        return selected;
      });
      setIsSelectedAll(!isSelectedAll);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <table className="border-bgSecondary sm:border dark:border-bgSecondaryDark">
        <DeckSelectAdvTableHeader
          allTagsOptions={allTagsOptions}
          clanOptions={clanOptions}
          setClanFilter={setClanFilter}
          setInvFilter={setInvFilter}
          setNameFilter={setNameFilter}
          setRevFilter={setRevFilter}
          setTagsFilter={setTagsFilter}
          clanFilter={clanFilter}
          invFilter={invFilter}
          revFilter={revFilter}
          tagsFilter={tagsFilter}
          toggleSelectAll={toggleSelectAll}
          isSelectedAll={isSelectedAll}
          short={short}
        />
        <tbody>
          {sortedDecks
            .filter((_, idx) => showAll || idx < INITIAL_SHOW)
            .map((deck) => {
              return (
                <DeckSelectAdvTableRow
                  key={deck[DECKID]}
                  deck={deck}
                  onClick={onClick}
                  handleClose={handleClose}
                  allTagsOptions={allTagsOptions}
                  selectedDecks={selectedDecks}
                  toggleSelect={toggleSelect}
                  revFilter={revFilter}
                  short={short}
                />
              );
            })}
        </tbody>
      </table>
      {!showAll && sortedDecks.length > INITIAL_SHOW && (
        <div className="flex justify-center">
          <Button onClick={() => setShowAll(true)}>
            Show All ({sortedDecks.length - INITIAL_SHOW} left)
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeckSelectAdvTable;
