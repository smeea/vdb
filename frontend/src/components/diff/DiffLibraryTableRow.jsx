import React from 'react';
import { useSnapshot } from 'valtio';
import {
  DeckCardQuantityTd,
  DeckDrawProbability,
  DiffQuantityDiff,
  ResultLibraryTableRowCommon,
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
  showInfo,
  libraryTotal,
  card,
  idx,
  handleClick,
}) => {
  const { inventoryMode } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedLibrary = useSnapshot(usedStore).library;
  const softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]);
  const hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]);
  const inInventory = inventoryLibrary[card.c.Id]?.q ?? 0;
  const qFrom = cardsFrom[card.c.Id]?.q ?? 0;
  const qTo = cardsTo[card.c.Id]?.q ?? 0;

  return (
    <tr
      className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
        idx % 2
          ? 'bg-bgThird dark:bg-bgThirdDark'
          : 'bg-bgPrimary dark:bg-bgPrimaryDark'
      }`}
    >
      <DeckCardQuantityTd
        card={card.c}
        cardChange={cardChange ?? deckCardChange}
        deckid={cardChange ? null : deckid}
        disabledTooltip={!inventoryMode}
        hardUsedTotal={hardUsedTotal}
        inInventory={inInventory}
        inventoryType={decks?.[deckid]?.inventoryType}
        isEditable={isEditable}
        q={qFrom}
        softUsedMax={softUsedMax}
      />
      <DiffQuantityDiff qFrom={qFrom} qTo={qTo} />
      <ResultLibraryTableRowCommon
        card={card.c}
        handleClick={handleClick}
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
