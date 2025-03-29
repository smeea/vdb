import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  DeckCardQuantityTd,
  DeckCardToggleInventoryStateTd,
  DeckDrawProbability,
  ResultCryptTableRowCommon,
} from '@/components';
import { CRYPT, HARD, ID, NAME, SOFT } from '@/constants';
import { deckCardChange, inventoryStore, useApp, usedStore } from '@/context';
import { useSwipe } from '@/hooks';
import { getHardTotal, getSoftMax, getSwipedBg } from '@/utils';

const DeckCryptTableRow = ({
  handleClick,
  card,
  disciplinesSet,
  keyDisciplines,
  showInfo,
  cryptTotal,
  inSearch,
  inMissing,
  noDisciplines,
  shouldShowModal,
  inSide,
  isEditable,
  deckid,
  inventoryType,
}) => {
  const { inventoryMode, isDesktop } = useApp();
  const usedCrypt = useSnapshot(usedStore)[CRYPT];
  const inventoryCrypt = useSnapshot(inventoryStore)[CRYPT];

  const { isSwiped, swipeHandlers } = useSwipe(
    () => deckCardChange(deckid, card.c, card.q - 1),
    () => deckCardChange(deckid, card.c, card.q + 1),
    isEditable,
  );

  const inInventory = inventoryCrypt[card.c[ID]]?.q ?? 0;
  const softUsedMax = getSoftMax(usedCrypt[SOFT][card.c[ID]]) ?? 0;
  const hardUsedTotal = getHardTotal(usedCrypt[HARD][card.c[ID]]) ?? 0;

  return (
    <tr
      {...swipeHandlers}
      className={twMerge(
        'border-bgSecondary dark:border-bgSecondaryDark h-[38px] border-y',
        getSwipedBg(isSwiped),
      )}
    >
      {inventoryMode && inventoryType && !inMissing && !inSearch && isDesktop && (
        <DeckCardToggleInventoryStateTd
          isEditable={isEditable}
          card={card}
          deckid={deckid}
          inventoryType={inventoryType}
        />
      )}
      <DeckCardQuantityTd
        card={card.c}
        cardChange={deckCardChange}
        deckid={deckid}
        disabledTooltip={!inventoryMode}
        hardUsedTotal={hardUsedTotal}
        inInventory={inInventory}
        inMissing={inMissing}
        inventoryType={inventoryType}
        isEditable={isEditable}
        q={card.q}
        softUsedMax={softUsedMax}
      />
      <ResultCryptTableRowCommon
        card={card.c}
        handleClick={handleClick}
        keyDisciplines={keyDisciplines}
        disciplinesSet={disciplinesSet}
        inSearch={inSearch}
        shouldShowModal={shouldShowModal}
        noDisciplines={noDisciplines}
        inDeck
      />
      {showInfo && (
        <td className="min-w-[45px] text-right sm:p-1">
          {!inSide && (
            <DeckDrawProbability cardName={card.c[NAME]} N={cryptTotal} n={4} k={card.q} />
          )}
        </td>
      )}
    </tr>
  );
};

export default DeckCryptTableRow;
