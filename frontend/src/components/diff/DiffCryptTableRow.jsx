import React from 'react';
import { useSnapshot } from 'valtio';
import {
  UsedPopover,
  DeckCardQuantity,
  DeckDrawProbability,
  ResultCryptTableRowCommon,
  ConditionalTooltip,
  DiffQuantityDiff,
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
  placement,
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
      <ResultCryptTableRowCommon
        card={card.c}
        handleClick={handleClick}
        placement={placement}
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
