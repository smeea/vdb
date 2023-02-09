import React, { useState, useMemo } from 'react';
import { Menu } from '@headlessui/react';
import { useSnapshot } from 'valtio';
import Select from 'react-select';
import Shuffle from '@/assets/images/icons/shuffle.svg';
import Download from '@/assets/images/icons/download.svg';
import PinAngleFill from '@/assets/images/icons/pin-angle-fill.svg';
import At from '@/assets/images/icons/at.svg';
import {
  DeckSelectAdvModalTotal,
  DeckSelectAdvModalTableRow,
  DeckSelectSortForm,
  DeckSelectAdvModalTagsFilter,
  ResultClanImage,
  Modal,
  MenuItems,
  MenuItem,
  MenuButton,
  Checkbox,
  Input,
} from '@/components';
import { getClan, decksSort } from '@/utils';
import { useApp, deckStore } from '@/context';
import { deckServices } from '@/services';

const DeckSelectAdvModal = ({ setShow, allTagsOptions }) => {
  const { cryptCardBase, inventoryMode, isMobile, isDesktop } = useApp();
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

  const handleChangeNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const handleChangeTagsFilter = (event) => {
    const tags = event.map((t) => t.value);
    setTagsFilter(tags);
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
    const clans = {};
    let cryptTotal = 0;

    Object.keys(deck.crypt).map((cardid) => {
      if (cardid != 200076) {
        const clan = cryptCardBase[cardid].Clan;

        if (clan in clans) {
          clans[cryptCardBase[cardid].Clan] += deck.crypt[cardid].q;
          cryptTotal += deck.crypt[cardid].q;
        } else {
          clans[cryptCardBase[cardid].Clan] = deck.crypt[cardid].q;
          cryptTotal += deck.crypt[cardid].q;
        }
      }
    });

    Object.keys(clans).forEach((c) => {
      if (clans[c] / cryptTotal > 0.5 && !allDecksClans.includes(c)) {
        allDecksClans.push(c);
      }
    });
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

  const invOptions = [
    {
      value: 'any',
      name: 'inventory',
      label: 'ANY',
    },
    {
      value: '',
      name: 'inventory',
      label: <At />,
    },
    {
      value: 's',
      name: 'inventory',
      label: <Shuffle />,
    },
    {
      value: 'h',
      name: 'inventory',
      label: <PinAngleFill />,
    },
  ];

  const sortedDecks = useMemo(() => {
    if (Object.values(decks).length > 0) {
      let filtered = Object.values(decks);

      if (invFilter !== 'any') {
        filtered = filtered.filter((deck) => deck.inventoryType === invFilter);
      }

      if (clanFilter !== 'any') {
        filtered = filtered.filter(
          (deck) => getClan(deck.crypt).toLowerCase() === clanFilter
        );
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
        filtered = filtered.filter((deck) => {
          if (!deck.master) return true;
        });
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
    <Modal handleClose={handleClose} size="xl" title="Select Deck">
      <div className="space-y-4">
        <div>
          <DeckSelectAdvModalTotal
            tagsFilter={tagsFilter}
            setTagsFilter={setTagsFilter}
          />
          <table className="border-bgSecondary dark:border-bgSecondaryDark sm:border">
            <thead>
              <tr>
                <th className="min-w-[30px]">
                  <Checkbox
                    name="selectAll"
                    checked={isSelectedAll}
                    onChange={toggleSelectAll}
                    className="justify-center"
                  />
                </th>
                {inventoryMode && !isMobile && (
                  <th>
                    <Select
                      classNamePrefix="no-dropdown react-select"
                      options={invOptions}
                      onChange={(e) => setInvFilter(e.value)}
                      value={invOptions.find((obj) => obj.value === invFilter)}
                      isSearchable={false}
                    />
                  </th>
                )}
                {!isMobile && (
                  <th>
                    <Select
                      classNamePrefix="no-dropdown react-select"
                      options={clanOptions}
                      onChange={(e) => setClanFilter(e.value)}
                      value={clanOptions.find(
                        (obj) => obj.value === clanFilter.toLowerCase()
                      )}
                      isSearchable
                    />
                  </th>
                )}
                <th className="min-w-[340px]">
                  <Input
                    className="w-full"
                    placeholder="Filter by Deck or Card Name"
                    type="text"
                    name="text"
                    autoComplete="off"
                    spellCheck="false"
                    value={nameFilter}
                    onChange={handleChangeNameFilter}
                  />
                </th>
                {isDesktop && <th />}
                {!isMobile && <th />}
                <th className="w-full">
                  <DeckSelectAdvModalTagsFilter
                    tagsFilter={tagsFilter}
                    handleChangeTagsFilter={handleChangeTagsFilter}
                    allTagsOptions={allTagsOptions}
                  />
                </th>
                <th>
                  <div className="flex justify-end space-x-1">
                    <Checkbox
                      name="revFilter"
                      label={isDesktop ? 'Show Revisions' : 'Rev'}
                      checked={revFilter}
                      onChange={() => setRevFilter(!revFilter)}
                    />
                    <DeckSelectSortForm onChange={setSortMethod} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedDecks.map((deck, idx) => {
                return (
                  <DeckSelectAdvModalTableRow
                    key={deck.deckid}
                    deck={deck}
                    idx={idx}
                    handleClose={handleClose}
                    allTagsOptions={allTagsOptions}
                    selectedDecks={selectedDecks}
                    toggleSelect={toggleSelect}
                    revFilter={revFilter}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end ">
          <Menu as="div" className="relative">
            <MenuButton
              title="Export Selected"
              icon={<Download />}
              text="Export Selected"
            />
            <MenuItems>
              <MenuItem>
                <div onClick={() => exportSelected('text')}>Text</div>
              </MenuItem>
              <MenuItem>
                <div onClick={() => exportSelected('lackey')}>Lackey</div>
              </MenuItem>
              <MenuItem>
                <div onClick={() => exportSelected('jol')}>JOL</div>
              </MenuItem>
              <MenuItem>
                <div onClick={() => exportSelected('xlsx')}>Excel</div>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </Modal>
  );
};

export default DeckSelectAdvModal;
