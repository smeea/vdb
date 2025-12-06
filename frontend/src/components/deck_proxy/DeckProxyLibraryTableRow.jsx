import {
  Checkbox,
  DeckCardQuantityTd,
  DeckProxyTableSetSelect,
  ResultLibraryTableRowCommon,
  Tr,
} from "@/components";
import { ID, PRINT, SET } from "@/constants";

const DeckProxyLibraryTableRow = ({
  handleClick,
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
  inventoryType,
  card,
}) => {
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
        inProxy
        inventoryType={inventoryType}
        isEditable
        isSelected={proxySelected[card.c[ID]]?.[PRINT]}
        q={proxySelected[card.c[ID]] ? proxySelected[card.c[ID]].q : 0}
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
