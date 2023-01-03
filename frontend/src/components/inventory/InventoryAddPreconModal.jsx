import React, { useState, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import GiftFill from 'assets/images/icons/gift-fill.svg';
import {
  DeckCrypt,
  DeckLibrary,
  DeckSelectSortForm,
  InventoryDeckAddButton,
  InventoryDeckDeleteButton,
  ResultLibraryClan,
  Tooltip,
  Modal,
} from 'components';
import { decksSort } from 'utils';
import { useApp, inventoryStore } from 'context';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';

const InventoryAddDeckModal = ({ handleClose }) => {
  const { preconDecks, playtest, isDesktop, isMobile } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;

  const [sortMethod, setSortMethod] = useState('byDate');
  const [showDeck, setShowDeck] = useState();
  const [nameFilter, setNameFilter] = useState('');
  const [setFilter, setSetFilter] = useState('');

  const handleChangeNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const handleChangeSetFilter = (event) => {
    setSetFilter(event.target.value);
  };

  const sortedDecks = useMemo(() => {
    if (Object.values(preconDecks).length > 0) {
      let filtered = Object.values(preconDecks).filter((i) => {
        const set = i.deckid.split(':')[0];
        return playtest || set !== 'PLAYTEST';
      });

      if (nameFilter) {
        filtered = filtered.filter((deck) => {
          if (deck.name.toLowerCase().indexOf(nameFilter.toLowerCase()) >= 0)
            return true;
        });
      }

      if (setFilter) {
        filtered = filtered.filter((deck) => {
          const set = deck.deckid.split(':')[0];
          if (
            setsAndPrecons[set].name
              .toLowerCase()
              .indexOf(setFilter.toLowerCase()) >= 0
          )
            return true;
        });
      }

      return decksSort(filtered, sortMethod);
    } else {
      return [];
    }
  }, [preconDecks, nameFilter, setFilter, sortMethod]);

  const deckRows = sortedDecks.map((deck, idx) => {
    let cryptInInventory;
    let libraryInInventory;

    if (deck.crypt) {
      Object.keys(deck.crypt).map((cardid) => {
        if (deck.crypt[cardid].q > 0) {
          if (inventoryCrypt[cardid]) {
            const inInventory = Math.floor(
              inventoryCrypt[cardid].q / deck.crypt[cardid].q
            );
            if (!cryptInInventory || inInventory < cryptInInventory) {
              cryptInInventory = inInventory;
            }
          } else {
            cryptInInventory = 0;
          }
        }
      });
    }

    if (deck.library) {
      Object.keys(deck.library).map((cardid) => {
        if (deck.library[cardid].q > 0) {
          if (inventoryLibrary[cardid]) {
            const inInventory = Math.floor(
              inventoryLibrary[cardid].q / deck.library[cardid].q
            );
            if (!libraryInInventory || inInventory < libraryInInventory) {
              libraryInInventory = inInventory;
            }
          } else {
            libraryInInventory = 0;
          }
        }
      });
    }

    if (cryptInInventory === undefined) cryptInInventory = libraryInInventory;
    if (libraryInInventory === undefined) libraryInInventory = cryptInInventory;
    const inInventory = Math.min(cryptInInventory, libraryInInventory);
    const [set, precon] = deck.deckid.split(':');
    const clans = setsAndPrecons[set].precons[precon].clan.split('/');

    const clanImages = clans.map((clan, idx) => {
      return (
        <div className="inline" key={idx}>
          {clan === 'Bundle' ? (
            <div className="inline dark:brightness-[0.65]">
              <GiftFill />
            </div>
          ) : clan === 'Mix' ? null : (
            <ResultLibraryClan value={clan} />
          )}
        </div>
      );
    });

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
            <td className="clan">{clanImages.length > 0 && clanImages}</td>
          )}
          <td className="name text-fgName dark:text-fgNameDark">
            <div
              className="text-overflow name flex justify-between"
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
                        <DeckCrypt inAdvSelect={true} deck={deck} />
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
          <td className="set">
            {isMobile ? (
              <>
                <div>{setsAndPrecons[set].name}</div>
                <div className="flex justify-end text-xs">
                  {setsAndPrecons[set].date.slice(0, 4)}
                </div>
              </>
            ) : (
              <>
                {setsAndPrecons[set].date.slice(0, 4)}
                <span>–</span>
                {setsAndPrecons[set].name}
              </>
            )}
          </td>
          <td className="buttons">
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
      title="Import Precon to Inventory"
    >
      <div>
        <table className="inv-import-precons-table border-bgSecondary dark:border-bgSecondaryDark sm:border">
          <thead>
            <tr>
              {!isMobile && <th className="clan"></th>}
              <th className="name text-fgName dark:text-fgNameDark">
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
              <th className="set">
                <input
                  placeholder="Filter by Set"
                  type="text"
                  name="text"
                  autoComplete="off"
                  spellCheck="false"
                  value={setFilter}
                  onChange={handleChangeSetFilter}
                />
              </th>
              <th className="buttons">
                <div className="flex items-center justify-end">
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
