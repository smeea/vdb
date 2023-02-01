import React from 'react';
import { useSnapshot } from 'valtio';
import {
  UsedPopover,
  DeckCardQuantity,
  ResultLibraryTableRowCommon,
  DeckDrawProbability,
  DiffQuantityDiff,
  Tooltip,
} from '@/components';
import { getHardTotal, getSoftMax } from '@/utils';
import {
  useApp,
  deckStore,
  usedStore,
  inventoryStore,
  deckCardChange,
} from '@/context';

const DiffLibraryTableRow = ({
  cardChange,
  deckid,
  cardsFrom,
  cardsTo,
  isEditable,
  placement,
  showInfo,
  libraryTotal,
  inReview,
  card,
  idx,
  handleClick,
}) => {
  const { inventoryMode, isMobile } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedLibrary = useSnapshot(usedStore).library;
  const softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]);
  const hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]);
  const inInventory = inventoryLibrary[card.c.Id]?.q ?? 0;
  const qFrom = cardsFrom[card.c.Id] ? cardsFrom[card.c.Id].q : 0;
  const qTo = cardsTo[card.c.Id] ? cardsTo[card.c.Id].q : 0;

  return (
    <tr
      className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
        idx % 2
          ? 'bg-bgThird dark:bg-bgThirdDark'
          : 'bg-bgPrimary dark:bg-bgPrimaryDark'
      }`}
    >
      {isEditable || inReview ? (
        <>
          {inventoryMode && decks && !inReview ? (
            <td className="quantity">
              <Tooltip
                placement="right"
                overlay={<UsedPopover cardid={card.c.Id} />}
              >
                <DeckCardQuantity
                  card={card.c}
                  q={qFrom}
                  deckid={cardChange ? null : deckid}
                  cardChange={cardChange ?? deckCardChange}
                  inInventory={inInventory}
                  softUsedMax={softUsedMax}
                  hardUsedTotal={hardUsedTotal}
                  inventoryType={decks[deckid].inventoryType}
                />
              </Tooltip>
            </td>
          ) : (
            <td className="quantity">
              <DeckCardQuantity
                card={card.c}
                q={qFrom}
                deckid={cardChange ? null : deckid}
                cardChange={cardChange ?? deckCardChange}
              />
            </td>
          )}
        </>
      ) : (
        <td className="quantity-no-buttons">{qFrom ? qFrom : null}</td>
      )}
      <td className={`w-[42px] min-w-[35px] text-lg ${!isMobile && ''}`}>
        <DiffQuantityDiff qFrom={qFrom} qTo={qTo} />
      </td>
      <ResultLibraryTableRowCommon
        card={card.c}
        handleClick={handleClick}
        placement={placement}
        inDeck
      />
      {showInfo && (
        <td className="w-9 text-right text-fgSecondary dark:text-fgSecondaryDark">
          <DeckDrawProbability
            cardName={card.c.Name}
            N={libraryTotal}
            n={4}
            k={card.q}
          />
        </td>
      )}
    </tr>
  );
};

export default DiffLibraryTableRow;
