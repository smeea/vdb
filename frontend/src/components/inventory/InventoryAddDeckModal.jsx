import React, { useState, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import Select from 'react-select';
import EyeFill from '@/assets/images/icons/eye-fill.svg';
import Shuffle from '@/assets/images/icons/shuffle.svg';
import PinAngleFill from '@/assets/images/icons/pin-angle-fill.svg';
import At from '@/assets/images/icons/at.svg';
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
  Input,
} from '@/components';
import { getClan, decksSort } from '@/utils';
import { useApp, deckStore, inventoryStore, deckUpdate } from '@/context';

const InventoryAddDeckModal = ({ handleClose }) => {
  const { isDesktop, isMobile } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;

  const [sortMethod, setSortMethod] = useState('byName');
  const [showDeck, setShowDeck] = useState();
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
    let cryptInInventory;
    let libraryInInventory;

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
    const clan = getClan(deck.crypt);

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
        <tr
          className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
            idx % 2
              ? 'bg-bgThird dark:bg-bgThirdDark'
              : 'bg-bgPrimary dark:bg-bgPrimaryDark'
          }`}
        >
          {!isMobile && (
            <td>
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
            <td className="min-w-[50px]">
              <div className="flex justify-center">
                {clan && <ResultClanImage value={clan} />}
              </div>
            </td>
          )}
          <td className="w-[230px] sm:w-[250px]">
            <div
              className="flex justify-between truncate text-fgName dark:text-fgNameDark"
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
                  <EyeFill />
                </Tooltip>
              </div>
            </td>
          )}
          {!isMobile && (
            <td className="min-w-[100px] whitespace-nowrap">
              {new Date(deck.timestamp).toISOString().slice(0, 10)}
            </td>
          )}
          {!isMobile && (
            <td className="w-full">
              <DeckTags deck={deck} defaultTagsOptions={defaultTagsOptions} />
            </td>
          )}
          <td className="min-w-[110px]">
            <div className="flex justify-end space-x-1">
              <InventoryDeckAddButton deck={deck} inInventory={inInventory} />
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
        <table className="border-y border-bgSecondary dark:border-bgSecondaryDark sm:border-x">
          <thead>
            <tr>
              {!isMobile && <th className="inventory"></th>}
              {!isMobile && <th className="min-w-[50px]"></th>}
              <th className="min-w-[230px] sm:min-w-[250px]">
                <Input
                  placeholder="Filter by Name"
                  type="text"
                  name="text"
                  autoComplete="off"
                  spellCheck="false"
                  value={nameFilter}
                  onChange={handleChangeNameFilter}
                />
              </th>
              {isDesktop && <th className="min-w-[40px]"></th>}
              {!isMobile && <th className="min-w-[100px]"></th>}
              {!isMobile && (
                <th className="w-full">
                  <Select
                    classNamePrefix="border-bgSecondary dark:border-bgSecondary react-select-tags"
                    isMulti
                    options={defaultTagsOptions}
                    onChange={handleChangeTagsFilter}
                    defaultValue={tagsFilter}
                    placeholder="Filter by Tags"
                  />
                </th>
              )}
              <th className="min-w-[110px]">
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
