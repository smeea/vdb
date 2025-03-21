import { useMemo, useState } from 'react';
import { DeckSelectAdvTableHeader, DeckSelectAdvTableRow, ResultClanImage } from '@/components';
import { ANY, CRYPT, DECKID, INVENTORY_TYPE, LIBRARY, MASTER, NAME, TAGS } from '@/constants';
import { decksSort, getClan } from '@/utils';

const DeckSelectAdvTable = ({
  allTagsOptions,
  tagsFilter,
  setTagsFilter,
  short,
  decks,
  sortMethod,
  onClick,
  handleClose,
  selectedDecks,
  setSelectedDecks,
  isSelectedAll,
  setIsSelectedAll,
}) => {
  const [invFilter, setInvFilter] = useState(ANY);
  const [revFilter, setRevFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [clanFilter, setClanFilter] = useState(ANY);

  const allDecksClans = [];
  Object.values(decks).forEach((deck) => {
    const clan = getClan(deck[CRYPT]);

    if (clan && !allDecksClans.includes(clan)) {
      allDecksClans.push(clan);
    }
  });

  const clanOptions = [
    {
      value: ANY,
      label: 'ANY',
    },
    {
      value: '',
      label: 'NONE',
    },
  ];

  allDecksClans.toSorted().forEach((i) => {
    clanOptions.push({
      value: i.toLowerCase(),
      label: <ResultClanImage value={i} />,
    });
  });

  const isCardInDeck = (deck, query) => {
    const normalizedQuery = query
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');

    return Object.values({ ...deck[CRYPT], ...deck[LIBRARY] }).some((card) => {
      const normalizedCardName = card.c[NAME]
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');

      return normalizedCardName.includes(normalizedQuery);
    });
  };

  const isDeckNameMatch = (deck, query) => {
    const normalizedNameFilter = query
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');
    const normalizedDeckName = deck[NAME]
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');

    return normalizedDeckName.includes(normalizedNameFilter);
  };

  const sortedDecks = useMemo(() => {
    if (Object.values(decks).length > 0) {
      let filtered = Object.values(decks);

      if (invFilter !== ANY) {
        filtered = filtered.filter((deck) => deck[INVENTORY_TYPE] === invFilter);
      }

      if (clanFilter !== ANY) {
        filtered = filtered.filter((deck) => {
          const clan = getClan(deck[CRYPT]) || '';
          return clan.toLowerCase() === clanFilter;
        });
      }

      if (nameFilter.length > 2) {
        filtered = filtered.filter((deck) => {
          if (isDeckNameMatch(deck, nameFilter)) return true;
          if (isCardInDeck(deck, nameFilter)) return true;
        });
      }

      if (tagsFilter) {
        filtered = filtered.filter((deck) => {
          let counter = 0;
          tagsFilter.forEach((tag) => {
            if (deck[TAGS].includes(tag)) counter += 1;
          });
          if (counter >= tagsFilter.length) return true;
        });
      }

      if (!revFilter) {
        filtered = filtered.filter((deck) => !deck[MASTER]);
      }

      return decksSort(filtered, sortMethod);
    }
    return [];
  }, [decks, invFilter, clanFilter, nameFilter, tagsFilter, revFilter, sortMethod]);

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
    <table className="border-bgSecondary dark:border-bgSecondaryDark sm:border">
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
        {sortedDecks.map((deck) => {
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
  );
};

export default DeckSelectAdvTable;
