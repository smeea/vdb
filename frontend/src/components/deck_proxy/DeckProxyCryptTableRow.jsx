import {
  Checkbox,
  DeckCardQuantityTd,
  DeckProxyTableSetSelect,
  ResultCryptTableRowCommon,
  Tr,
} from "@/components";
import { CRYPT, HARD, ID, PRINT, SET, SOFT } from "@/constants";
import { inventoryStore, useApp, usedStore } from "@/context";
import { getHardTotal, getSoftMax } from "@/utils";
import { useSnapshot } from "valtio";

const DeckProxyCryptTableRow = ({
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
  disciplinesSet,
  keyDisciplines,
  inventoryType,
  card,
  handleClick,
}) => {
  const { isWide } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore)[CRYPT];
  const usedCrypt = useSnapshot(usedStore)[CRYPT];
  const inInventory = inventoryCrypt[card.c[ID]]?.q ?? 0;
  const softUsedMax = getSoftMax(usedCrypt[SOFT][card.c[ID]]) ?? 0;
  const hardUsedTotal = getHardTotal(usedCrypt[HARD][card.c[ID]]) ?? 0;

  return (
    <Tr key={card.c[ID]}>
      <td className="min-w-[30px]">
        <div className="flex items-center justify-center">
          <Checkbox
            value={card.c[ID]}
            name={PRINT}
            checked={proxySelected[card.c[ID]]?.[PRINT]}
            onChange={handleProxySelector}
          />
        </div>
      </td>
      <DeckCardQuantityTd
        card={card.c}
        cardChange={handleProxyCounter}
        deckid={null}
        hardUsedTotal={hardUsedTotal}
        inInventory={inInventory}
        inProxy
        inventoryType={inventoryType}
        isEditable
        isSelected={proxySelected[card.c[ID]]?.[PRINT]}
        q={proxySelected[card.c[ID]] ? proxySelected[card.c[ID]].q : 0}
        softUsedMax={softUsedMax}
      />
      <ResultCryptTableRowCommon
        card={card.c}
        handleClick={handleClick}
        keyDisciplines={keyDisciplines}
        disciplinesSet={disciplinesSet}
        noDisciplines={!isWide}
        inDeck
      />
      <DeckProxyTableSetSelect
        className="max-sm:hidden"
        card={card.c}
        handleSetSelector={handleSetSelector}
        value={proxySelected[card.c[ID]]?.[SET]}
      />
    </Tr>
  );
};

export default DeckProxyCryptTableRow;
