import React, { useState, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import Select from 'react-select';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import Shuffle from 'assets/images/icons/shuffle.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import At from 'assets/images/icons/at.svg';
import {
  DeckCrypt,
  DeckLibrary,
  DeckTags,
  DeckSelectSortForm,
  InventoryDeckAddButton,
  InventoryDeckDeleteButton,
  ResultClanImage,
  Tooltip,
  Modal,
  Button,
  Checkbox,
} from 'components';
import { decksSort } from 'utils';
import { useApp, deckStore, inventoryStore, deckUpdate } from 'context';

const InventoryAddDeckModal = ({ handleClose }) => {
  const { cryptCardBase, isDesktop, isMobile } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;

  const [sortMethod, setSortMethod] = useState('byName');
  const [showDeck, setShowDeck] = useState(undefined);
  const [revFilter, setRevFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [tagsFilter, setTagsFilter] = useState([]);

  const handleChangeNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const handleChangeTagsFilter = (event) => {
    const tags = event.map((t) => t.value);
    setTagsFilter(tags);
  };

  const allTags = new Set();
  Object.keys(decks).map((deckid) => {
    if (decks[deckid].tags) {
      decks[deckid].tags.map((tag) => {
        allTags.add(tag);
      });
    }
  });

  const defaultTagsOptions = [...allTags].map((tag) => ({
    label: tag,
    value: tag,
  }));

  const sortedDecks = useMemo(() => {
    if (Object.values(decks).length > 0) {
      let filtered = Object.values(decks);

      if (nameFilter) {
        filtered = filtered.filter((deck) => {
          if (deck.name.toLowerCase().indexOf(nameFilter.toLowerCase()) >= 0)
            return true;
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
    } else {
      return [];
    }
  }, [decks, nameFilter, tagsFilter, revFilter, sortMethod]);

  const deckRows = sortedDecks.map((deck, idx) => {
    let cryptInInventory = null;
    let libraryInInventory = null;

    const clans = {};
    let cryptTotal = 0;

    Object.keys(deck.crypt).map((cardid) => {
      if (deck.crypt[cardid].q > 0) {
        if (inventoryCrypt[cardid]) {
          const inInventory = Math.floor(
            inventoryCrypt[cardid].q / deck.crypt[cardid].q
          );
          if (cryptInInventory === null || inInventory < cryptInInventory) {
            cryptInInventory = inInventory;
          }
        } else {
          cryptInInventory = 0;
        }
      }

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

    Object.keys(deck.library).map((cardid) => {
      if (deck.library[cardid].q > 0) {
        if (inventoryLibrary[cardid] && deck.library[cardid].q > 0) {
          const inInventory = Math.floor(
            inventoryLibrary[cardid].q / deck.library[cardid].q
          );
          if (libraryInInventory === null || inInventory < libraryInInventory) {
            libraryInInventory = inInventory;
          }
        } else {
          libraryInInventory = 0;
        }
      }
    });

    const inInventory = Math.min(cryptInInventory, libraryInInventory);

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
        <tr className={`result-${idx % 2 ? 'even' : 'odd'}`}>
          {!isMobile && (
            <td className="inventory">
              <Button onClick={() => toggleInventoryState(deck.deckid)}>
                <div
                  title={
                    deck.inventoryType === 's'
                      ? 'Flexible'
                      : deck.inventoryType === 'h'
                      ? 'Fixed'
                      : 'Virtual'
                  }
                >
                  {deck.inventoryType == 's' && <Shuffle />}
                  {deck.inventoryType == 'h' && <PinAngleFill />}
                  {!deck.inventoryType && <At />}
                </div>
              </Button>
            </td>
          )}
          {!isMobile && (
            <td className="clan">{clan && <ResultClanImage value={clan} />}</td>
          )}
          <td className="name">
            <div
              className="name flex justify-between truncate"
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
            <td className="preview">
              <div
                onMouseEnter={() => setShowDeck(deck.deckid)}
                onMouseLeave={() => setShowDeck(false)}
              >
                <Tooltip
                  placement="right"
                  show={showDeck === deck.deckid}
                  text={
                    <div className="flex flex-row">
                      <div
                        onClick={(event) => {
                          if (event.target === event.currentTarget)
                            setShowDeck(false);
                        }}
                        className="h-[80vh] overflow-y-auto md:basis-7/12"
                      >
                        <DeckCrypt deck={deck} inAdvSelect />
                      </div>
                      <div
                        onClick={(event) => {
                          if (event.target === event.currentTarget)
                            setShowDeck(false);
                        }}
                        className="h-[80vh] overflow-y-auto md:basis-5/12"
                      >
                        <DeckLibrary deck={deck} />
                      </div>
                    </div>
                  }
                >
                  <div>
                    <EyeFill />
                  </div>
                </Tooltip>
              </div>
            </td>
          )}
          {!isMobile && (
            <td className="date">
              {new Date(deck.timestamp).toISOString().slice(0, 10)}
            </td>
          )}
          {!isMobile && (
            <td className="tags">
              <DeckTags deck={deck} defaultTagsOptions={defaultTagsOptions} />
            </td>
          )}
          <td className="buttons">
            <div className="inline">
              <InventoryDeckAddButton deck={deck} inInventory={inInventory} />
            </div>
            <div className="inline">
              <InventoryDeckDeleteButton
                deck={deck}
                inInventory={inInventory}
              />
            </div>
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <Modal
      handleClose={handleClose}
      size="xl"
      dialogClassName={isMobile ? '' : null}
      title="Import Deck to Inventory"
    >
      <div>
        <table className="inv-import-decks-table">
          <thead>
            <tr>
              {!isMobile && <th className="inventory"></th>}
              {!isMobile && <th className="clan"></th>}
              <th className="name">
                <input
                  placeholder="Filter by Name"
                  type="text"
                  name="text"
                  autoComplete="off"
                  spellCheck="false"
                  value={nameFilter}
                  onChange={handleChangeNameFilter}
                />
              </th>
              {isDesktop && <th className="preview"></th>}
              {!isMobile && <th className="date"></th>}
              {!isMobile && (
                <th className="tags">
                  <Select
                    classNamePrefix="tags-filter react-select-tags"
                    isMulti
                    options={defaultTagsOptions}
                    onChange={handleChangeTagsFilter}
                    defaultValue={tagsFilter}
                    placeholder="Filter by Tags"
                  />
                </th>
              )}
              <th className="buttons">
                <div className="flex items-center justify-end">
                  <Checkbox
                    id="revFilter"
                    label={isMobile ? 'Rev' : 'Revisions'}
                    checked={revFilter}
                    onChange={() => setRevFilter(!revFilter)}
                  />
                  <DeckSelectSortForm onChange={setSortMethod} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{deckRows}</tbody>
        </table>
      </div>
    </Modal>
  );
};

export default InventoryAddDeckModal;
