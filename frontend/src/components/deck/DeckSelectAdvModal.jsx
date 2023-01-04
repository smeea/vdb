import React, { useState, useEffect } from 'react';
import { Menu } from '@headlessui/react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import Shuffle from 'assets/images/icons/shuffle.svg';
import Download from 'assets/images/icons/download.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import At from 'assets/images/icons/at.svg';
import X from 'assets/images/icons/x.svg';
import {
  DeckCrypt,
  DeckLibrary,
  DeckTags,
  DeckSelectAdvModalTotal,
  DeckDeleteButton,
  DeckHideButton,
  DeckFreezeButton,
  DeckBranchDeleteButton,
  DeckCopyUrlButton,
  DeckTogglePublicButton,
  DeckSelectSortForm,
  DeckSelectAdvModalTagsFilter,
  ResultClanImage,
  Tooltip,
  Modal,
  MenuItems,
  MenuItem,
  MenuButton,
  Button,
  ButtonFloat,
  Checkbox,
  Input,
} from 'components';
import { decksSort } from 'utils';
import { useApp, deckStore, deckUpdate } from 'context';
import { deckServices } from 'services';

const DeckSelectAdvModal = ({ allTagsOptions, handleClose }) => {
  const { cryptCardBase, inventoryMode, isNarrow, isMobile, isDesktop } =
    useApp();
  const decks = useSnapshot(deckStore).decks;
  const navigate = useNavigate();

  const [sortMethod, setSortMethod] = useState('byName');
  const [sortedDecks, setSortedDecks] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [selectedDecks, setSelectedDecks] = useState({});
  const [showDeck, setShowDeck] = useState();
  const [invFilter, setInvFilter] = useState('any');
  const [revFilter, setRevFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [tagsFilter, setTagsFilter] = useState([]);
  const [clanFilter, setClanFilter] = useState('any');

  const handleChangeNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const handleChangeTagsFilter = (event) => {
    const tags = event.map((t) => t.value);
    setTagsFilter(tags);
  };

  const handleOpen = (deckid) => {
    navigate(`/decks/${deckid}`);
    handleClose();
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

  useEffect(() => {
    if (Object.values(decks).length > 0) {
      let filtered = Object.values(decks);

      if (invFilter !== 'any') {
        filtered = filtered.filter((deck) => {
          return deck.inventoryType === invFilter;
        });
      }

      if (clanFilter !== 'any') {
        filtered = filtered.filter((deck) => {
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

          let clan = '';
          Object.keys(clans).forEach((c) => {
            if (clans[c] / cryptTotal > 0.5) {
              clan = c;
            }
          });

          if (clan.toLowerCase() === clanFilter) return true;
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
        filtered = filtered.filter((deck) => {
          if (!deck.master) return true;
        });
      }

      const sorted = decksSort(filtered, sortMethod);
      setSortedDecks(sorted);
      setSelectedDecks({});
    }
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

  const deckRows = sortedDecks.map((deck, idx) => {
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

    let clan;
    Object.keys(clans).forEach((c) => {
      if (clans[c] / cryptTotal > 0.5) {
        clan = c;
      }
    });

    const inventoryType = deck.inventoryType;
    const toggleInventoryState = (deckid) => {
      if (!inventoryType) {
        deckUpdate(deckid, 'inventoryType', 's');
      } else if (inventoryType === 's') {
        deckUpdate(deckid, 'inventoryType', 'h');
      } else if (inventoryType === 'h') {
        deckUpdate(deckid, 'inventoryType', '');
      }
    };

    return (
      <React.Fragment key={deck.deckid}>
        {decks[deck.deckid] && (
          <tr
            className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
              idx % 2
                ? 'bg-bgThird dark:bg-bgThirdDark'
                : 'bg-bgPrimary dark:bg-bgPrimaryDark'
            }`}
          >
            <td className="min-w-[30px]">
              <Checkbox
                checked={selectedDecks[deck.deckid] ?? false}
                onChange={() => toggleSelect(deck.deckid)}
                className="justify-center"
              />
            </td>
            {inventoryMode && !isMobile && (
              <td>
                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    onClick={() => toggleInventoryState(deck.deckid)}
                    title={
                      deck.inventoryType === 's'
                        ? 'Flexible'
                        : deck.inventoryType === 'h'
                        ? 'Fixed'
                        : 'Virtual'
                    }
                  >
                    {deck.inventoryType == 's' ? (
                      <Shuffle />
                    ) : deck.inventoryType == 'h' ? (
                      <PinAngleFill />
                    ) : (
                      <At />
                    )}
                  </Button>
                </div>
              </td>
            )}
            {!isMobile && (
              <td onClick={() => handleOpen(deck.deckid)}>
                <div className="flex justify-center">
                  {clan && <ResultClanImage value={clan} />}
                </div>
              </td>
            )}

            <td
              className="min-w-[340px] cursor-pointer"
              onClick={() => handleOpen(deck.deckid)}
            >
              <div
                className="flex justify-between text-fgName dark:text-fgNameDark"
                title={deck.name}
              >
                {deck.name}
                {deck.branchName &&
                  (deck.master ||
                    (deck.branches && deck.branches.length > 0)) && (
                    <div className="revision inline" title={deck.branchName}>
                      {deck.branchName}
                    </div>
                  )}
              </div>
            </td>
            {isDesktop && (
              <td className="min-w-[40px]">
                <div
                  className="flex justify-center"
                  onMouseEnter={() => setShowDeck(deck.deckid)}
                  onMouseLeave={() => setShowDeck(false)}
                >
                  <Tooltip
                    placement="right"
                    show={showDeck === deck.deckid}
                    overlay={
                      <div className="flex">
                        <div
                          onClick={(event) => {
                            if (event.target === event.currentTarget)
                              setShowDeck(false);
                          }}
                          className="h-[80vh] overflow-y-auto md:basis-1/2"
                        >
                          <DeckCrypt inAdvSelect={true} deck={deck} />
                        </div>
                        <div
                          onClick={(event) => {
                            if (event.target === event.currentTarget)
                              setShowDeck(false);
                          }}
                          className="h-[80vh] overflow-y-auto md:basis-1/2"
                        >
                          <DeckLibrary deck={deck} />
                        </div>
                      </div>
                    }
                  >
                    <EyeFill />
                  </Tooltip>
                </div>
              </td>
            )}
            {!isMobile && (
              <td
                className="min-w-[100px] cursor-pointer whitespace-nowrap"
                onClick={() => handleOpen(deck.deckid)}
              >
                {new Date(deck.timestamp).toISOString().slice(0, 10)}
              </td>
            )}
            <td className="w-full">
              <DeckTags deck={deck} allTagsOptions={allTagsOptions} />
            </td>
            <td>
              <div className="flex justify-end space-x-1">
                <DeckHideButton deck={deck} />
                {!isMobile && (
                  <>
                    <DeckFreezeButton deck={deck} />
                    <DeckTogglePublicButton deck={deck} />
                  </>
                )}
                {isDesktop && (
                  <>
                    <DeckCopyUrlButton deck={deck} noText isAuthor />
                    {revFilter &&
                    (deck.master ||
                      (deck.branches && deck.branches.length > 0)) ? (
                      <DeckBranchDeleteButton noText={true} deck={deck} />
                    ) : (
                      <DeckDeleteButton noText={true} deck={deck} />
                    )}
                  </>
                )}
              </div>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  });

  return (
    <>
      <Modal
        handleClose={handleClose}
        dialogClassName={isMobile ? '' : 'modal-x-wide'}
        title="Select Deck"
      >
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
                        value={invOptions.find(
                          (obj) => obj.value === invFilter
                        )}
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
                        isSearchable={!isMobile}
                      />
                    </th>
                  )}
                  <th className="min-w-[340px]">
                    <Input
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
                    {/* TODO check on mobile, className was '' */}
                    <div className="flex items-center justify-end">
                      <Checkbox
                        name="revFilter"
                        label={isDesktop ? 'Show Revisions' : 'Rev'}
                        checked={revFilter}
                        onChange={() => setRevFilter(!revFilter)}
                      />
                      <div className="flex justify-end">
                        <DeckSelectSortForm onChange={setSortMethod} />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>{deckRows}</tbody>
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
      {isNarrow && (
        <ButtonFloat onClick={handleClose} variant="bg-[#a06060] opacity-80">
          <X width="40" height="40" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
    </>
  );
};

export default DeckSelectAdvModal;
