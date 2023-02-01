import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import EyeFill from '@/assets/images/icons/eye-fill.svg';
import Shuffle from '@/assets/images/icons/shuffle.svg';
import PinAngleFill from '@/assets/images/icons/pin-angle-fill.svg';
import At from '@/assets/images/icons/at.svg';
import {
  DeckCrypt,
  DeckLibrary,
  DeckTags,
  InventoryDeckAddButton,
  InventoryDeckDeleteButton,
  ResultClanImage,
  Tooltip,
  Button,
} from '@/components';
import { getClan } from '@/utils';
import { useApp, inventoryStore, deckUpdate } from '@/context';

const InventoryAddDeckRow = ({ deck, defaultTagsOptions, idx }) => {
  const { isDesktop, isMobile } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const [showDeck, setShowDeck] = useState();

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

  const toggleInventoryState = (deckid) => {
    if (!deck.inventoryType) {
      deckUpdate(deckid, 'inventoryType', 's');
    } else if (deck.inventoryType === 's') {
      deckUpdate(deckid, 'inventoryType', 'h');
    } else if (deck.inventoryType === 'h') {
      deckUpdate(deckid, 'inventoryType', '');
    }
  };

  return (
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
            (deck.master || (deck.branches && deck.branches.length > 0)) && (
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
          <InventoryDeckDeleteButton deck={deck} inInventory={inInventory} />
        </div>
      </td>
    </tr>
  );
};

export default InventoryAddDeckRow;
