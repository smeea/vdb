import { DeckProxyCryptTableRow } from "@/components";
import { ID } from "@/constants";
import { getKeyDisciplines } from "@/utils";

const DeckProxyCryptTable = ({
  handleClick,
  inventoryType,
  cards,
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
}) => {
  const { disciplinesSet, keyDisciplines } = getKeyDisciplines(cards);

  return (
    <table className="w-full border-bgSecondary sm:border dark:border-bgSecondaryDark">
      <tbody>
        {cards.map((card) => {
          return (
            <DeckProxyCryptTableRow
              key={card.c[ID]}
              inventoryType={inventoryType}
              disciplinesSet={disciplinesSet}
              keyDisciplines={keyDisciplines}
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

export default DeckProxyCryptTable;
