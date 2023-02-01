import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import EyeFill from '@/assets/images/icons/eye-fill.svg';
import GiftFill from '@/assets/images/icons/gift-fill.svg';
import {
  DeckCrypt,
  DeckLibrary,
  InventoryDeckAddButton,
  InventoryDeckDeleteButton,
  ResultLibraryClan,
  Tooltip,
} from '@/components';
import { useApp, inventoryStore } from '@/context';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const InventoryAddPreconRow = ({ deck, idx }) => {
  const { isDesktop, isMobile } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const [showDeck, setShowDeck] = useState();

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
    <tr
      className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
        idx % 2
          ? 'bg-bgThird dark:bg-bgThirdDark'
          : 'bg-bgPrimary dark:bg-bgPrimaryDark'
      }`}
    >
      {!isMobile && (
        <td className="min-w-[50px] sm:min-w-[70px]">
          <div className="flex justify-center">
            {clanImages.length > 0 && clanImages}
          </div>
        </td>
      )}
      <td className="w-[135px] sm:w-[250px]">
        <div
          className="text-overflow flex justify-between text-fgName dark:text-fgNameDark"
          title={deck.name}
        >
          {deck.name}
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
              <EyeFill />
            </Tooltip>
          </div>
        </td>
      )}
      <td className="w-full text-fgThird dark:text-fgThirdDark">
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
      <td className="min-w-[110px]">
        <div className="flex justify-end space-x-1">
          <InventoryDeckAddButton deck={deck} inInventory={inInventory} />
          <InventoryDeckDeleteButton deck={deck} inInventory={inInventory} />
        </div>
      </td>
    </tr>
  );
};

export default InventoryAddPreconRow;
