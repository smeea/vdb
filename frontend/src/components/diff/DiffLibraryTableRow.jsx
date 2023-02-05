import React from 'react';
import { useSnapshot } from 'valtio';
import {
  UsedPopover,
  DeckCardQuantity,
  ResultLibraryTableRowCommon,
  DeckDrawProbability,
  DiffQuantityDiff,
  ConditionalTooltip,
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
      <td className={isEditable ? 'min-w-[75px]' : 'min-w-[40px]'}>
        <ConditionalTooltip
          placement="bottom"
          overlay={<UsedPopover cardid={card.c.Id} />}
          disabled={!inventoryMode}
        >
          <DeckCardQuantity
            card={card.c}
            q={qFrom}
            deckid={cardChange ? null : deckid}
            cardChange={cardChange ?? deckCardChange}
            inInventory={inInventory}
            softUsedMax={softUsedMax}
            hardUsedTotal={hardUsedTotal}
            inventoryType={decks[deckid]?.inventoryType}
            isEditable={isEditable}
          />
        </ConditionalTooltip>
      </td>
      <td className="w-[42px] min-w-[35px] text-lg">
        <DiffQuantityDiff qFrom={qFrom} qTo={qTo} />
      </td>
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
