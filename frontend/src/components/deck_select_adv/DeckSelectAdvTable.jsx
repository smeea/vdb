import React, { useState, useMemo } from 'react';
import { getClan, decksSort } from '@/utils';
import {
  DeckSelectAdvTableRow,
  DeckSelectAdvTableHeader,
  ResultClanImage,
} from '@/components';

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
  const [invFilter, setInvFilter] = useState('any');
  const [revFilter, setRevFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [clanFilter, setClanFilter] = useState('any');

  const allDecksClans = [];
  Object.values(decks).map((deck) => {
    const clan = getClan(deck.crypt);

    if (clan && !allDecksClans.includes(clan)) {
      allDecksClans.push(clan);
    }
  });

  const clanOptions = [
    {
      value: 'any',
      name: 'clan',
      label: 'ANY',
    },
    {
      value: '',
      name: 'clan',
      label: 'NONE',
    },
  ];

  allDecksClans.sort().forEach((i) => {
    clanOptions.push({
      value: i.toLowerCase(),
      name: 'clan',
      label: <ResultClanImage value={i} />,
    });
  });

  const cardInDeck = (deck, query) => {
    const normalizedQuery = query
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');

    for (const id of Object.keys(deck.crypt)) {
      const normalizedCardName = deck.crypt[id].c['Name']
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');

      if (normalizedCardName.includes(normalizedQuery)) {
        return true;
      }
    }

    for (const id of Object.keys(deck.library)) {
      const normalizedCardName = deck.library[id].c['Name']
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');

      if (normalizedCardName.includes(normalizedQuery)) {
        return true;
      }
    }
  };

  const sortedDecks = useMemo(() => {
    if (Object.values(decks).length > 0) {
      let filtered = Object.values(decks);

      if (invFilter !== 'any') {
        filtered = filtered.filter((deck) => deck.inventoryType === invFilter);
      }

      if (clanFilter !== 'any') {
        filtered = filtered.filter((deck) => {
          const clan = getClan(deck.crypt) || '';
          return clan.toLowerCase() === clanFilter;
        });
      }

      if (nameFilter) {
        filtered = filtered.filter((deck) => {
          const normalizedNameFilter = nameFilter
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '');
          const normalizedDeckName = deck.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '');

          if (normalizedDeckName.includes(normalizedNameFilter)) return true;

          if (cardInDeck(deck, nameFilter)) {
            return true;
          }
        });
      }

      if (tagsFilter) {
        filtered = filtered.filter((deck) => {
          let counter = 0;
          tagsFilter.map((tag) => {
            if (deck.tags && deck.tags.includes(tag)) counter += 1;
          });
          if (counter >= tagsFilter.length) return true;
        });
      }

      if (!revFilter) {
        filtered = filtered.filter((deck) => !deck.master);
      }

      return decksSort(filtered, sortMethod);
    } else return [];
  }, [
    decks,
    invFilter,
    clanFilter,
    nameFilter,
    tagsFilter,
    revFilter,
    sortMethod,
  ]);

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
        sortedDecks.map((d) => {
          selected[d.deckid] = true;
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
        nameFilter={nameFilter}
        revFilter={revFilter}
        tagsFilter={tagsFilter}
        toggleSelectAll={toggleSelectAll}
        isSelectedAll={isSelectedAll}
        short={short}
      />
      <tbody>
        {sortedDecks.map((deck, idx) => {
          return (
            <DeckSelectAdvTableRow
              key={deck.deckid}
              deck={deck}
              idx={idx}
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
