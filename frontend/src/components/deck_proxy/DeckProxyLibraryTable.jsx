import { DeckProxyLibraryTableRow } from "@/components";
import { ID } from "@/constants";

const DeckProxyLibraryTable = ({
  inventoryType,
  handleClick,
  cards,
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
}) => {
  return (
    <table className="w-full border-bgSecondary sm:border dark:border-bgSecondaryDark">
      <tbody>
        {cards.map((card) => {
          return (
            <DeckProxyLibraryTableRow
              key={card.c[ID]}
              inventoryType={inventoryType}
              card={card}
              handleClick={handleClick}
              proxySelected={proxySelected}
              handleProxySelector={handleProxySelector}
              handleProxyCounter={handleProxyCounter}
              handleSetSelector={handleSetSelector}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckProxyLibraryTable;
