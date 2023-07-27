import React, { useState, useMemo } from 'react';
import { Menu } from '@headlessui/react';
import { useSnapshot } from 'valtio';
import Download from '@/assets/images/icons/download.svg';
import {
  DeckSelectAdvModalTotal,
  DeckSelectAdvModalTableRow,
  DeckSelectAdvModalTableHeader,
  ResultClanImage,
  Modal,
  MenuItems,
  MenuItem,
  MenuButton,
} from '@/components';
import { getClan, decksSort } from '@/utils';
import { useApp, deckStore } from '@/context';
import { deckServices } from '@/services';

const DeckSelectAdvModal = ({ onClick, setShow, allTagsOptions, short }) => {
  const { isMobile, setShowFloatingButtons } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const [sortMethod, setSortMethod] = useState('byName');
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [selectedDecks, setSelectedDecks] = useState({});
  const [invFilter, setInvFilter] = useState('any');
  const [revFilter, setRevFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [tagsFilter, setTagsFilter] = useState([]);
  const [clanFilter, setClanFilter] = useState('any');

  const handleClose = () => {
    setShow(false);
    setShowFloatingButtons(true);
  };

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

  const exportSelected = (format) => {
    const target = {};
    Object.keys(selectedDecks)
      .filter((deckid) => selectedDecks[deckid])
      .map((deckid) => {
        target[deckid] = decks[deckid];
      });

    deckServices.exportDecks(target, format);
  };

  return (
    <Modal
      noPadding={isMobile}
      handleClose={handleClose}
      size={short ? 'md' : 'xl'}
      title="Select Deck"
    >
      <div className="flex flex-col gap-3 sm:gap-5">
        <div>
          {!short && (
            <DeckSelectAdvModalTotal
              tagsFilter={tagsFilter}
              setTagsFilter={setTagsFilter}
            />
          )}
          <table className="border-bgSecondary dark:border-bgSecondaryDark sm:border">
            <DeckSelectAdvModalTableHeader
              allTagsOptions={allTagsOptions}
              clanOptions={clanOptions}
              setSortMethod={setSortMethod}
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
                  <DeckSelectAdvModalTableRow
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
        </div>
        {!short && (
          <div className="flex justify-end max-sm:flex-col max-sm:p-2 max-sm:pt-0">
            <Menu as="div" className="relative">
              <MenuButton
                title="Export Selected"
                icon={<Download />}
                text="Export Selected"
              />
              <MenuItems>
                <MenuItem onClick={() => exportSelected('text')}>Text</MenuItem>
                <MenuItem onClick={() => exportSelected('lackey')}>
                  Lackey
                </MenuItem>
                <MenuItem onClick={() => exportSelected('jol')}>JOL</MenuItem>
                <MenuItem onClick={() => exportSelected('xlsx')}>
                  Excel
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DeckSelectAdvModal;
