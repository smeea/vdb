import {
  Checkbox,
  DeckCardQuantityTd,
  DeckProxyTableSetSelect,
  ResultLibraryTableRowCommon,
  Tr,
} from "@/components";
import { HARD, ID, LIBRARY, PRINT, SET, SOFT } from "@/constants";
import { inventoryStore, usedStore } from "@/context";
import { getHardTotal, getSoftMax } from "@/utils";
import { useSnapshot } from "valtio";

const DeckProxyLibraryTableRow = ({
  handleClick,
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
  inventoryType,
  card,
}) => {
  const inventoryLibrary = useSnapshot(inventoryStore)[LIBRARY];
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const inInventory = inventoryLibrary[card.c[ID]]?.q ?? 0;
  const softUsedMax = getSoftMax(usedLibrary[SOFT][card.c[ID]]) ?? 0;
  const hardUsedTotal = getHardTotal(usedLibrary[HARD][card.c[ID]]) ?? 0;

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
      <ResultLibraryTableRowCommon card={card.c} handleClick={handleClick} inDeck />
      <DeckProxyTableSetSelect
        className="max-sm:hidden"
        card={card.c}
        handleSetSelector={handleSetSelector}
        value={proxySelected[card.c[ID]]?.[SET]}
      />
    </Tr>
  );
};

export default DeckProxyLibraryTableRow;
