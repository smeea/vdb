import React from 'react';
import { useSnapshot } from 'valtio';
import {
  DeckCardQuantityTd,
  DeckDrawProbability,
  DiffQuantityDiff,
  ResultCryptTableRowCommon,
} from '@/components';
import { getSoftMax, getHardTotal } from '@/utils';
import {
  useApp,
  usedStore,
  inventoryStore,
  deckStore,
  deckCardChange,
} from '@/context';

const DiffCryptTableRow = ({
  cardChange,
  deckid,
  cardsFrom,
  cardsTo,
  isEditable,
  showInfo,
  cryptTotal,
  card,
  idx,
  handleClick,
  disciplinesSet,
  keyDisciplines,
  nonKeyDisciplines,
  maxDisciplines,
}) => {
  const { inventoryMode } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const softUsedMax = getSoftMax(usedCrypt.soft[card.Id]);
  const hardUsedTotal = getHardTotal(usedCrypt.hard[card.Id]);
  const inInventory = inventoryCrypt[card.c.Id]?.q ?? 0;
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
        inMissing={inMissing}
        inventoryType={decks?.[deckid]?.inventoryType}
        isEditable={isEditable}
        q={qFrom}
        softUsedMax={softUsedMax}
      />
      <DiffQuantityDiff qFrom={qFrom} qTo={qTo} />
      <ResultCryptTableRowCommon
        card={card.c}
        handleClick={handleClick}
        maxDisciplines={maxDisciplines}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        disciplinesSet={disciplinesSet}
        inDeck
      />
      {showInfo && (
        <td className="w-9 text-right text-fgSecondary dark:text-fgSecondaryDark">
          <DeckDrawProbability
            cardName={card.c.Name}
            N={cryptTotal}
            n={4}
            k={card.q}
          />
        </td>
      )}
    </tr>
  );
};

export default DiffCryptTableRow;
