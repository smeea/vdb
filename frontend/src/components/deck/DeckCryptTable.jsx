import { DeckCryptTableRow } from "@/components";
import { DECKID, ID, INVENTORY_TYPE } from "@/constants";
import { getIsEditable } from "@/utils";

const DeckCryptTable = ({
  deck,
  disciplinesSet,
  keyDisciplines,
  cards,
  showInfo,
  cryptTotal,
  handleClick,
  inSearch,
  inMissing,
  noDisciplines,
  shouldShowModal,
}) => {
  const isEditable = getIsEditable(deck);

  return (
    <table className="border-bgSecondary dark:border-bgSecondaryDark w-full sm:border">
      <tbody>
        {cards.map((card) => {
          return (
            <DeckCryptTableRow
              key={card.c[ID]}
              handleClick={handleClick}
              card={card}
              disciplinesSet={disciplinesSet}
              keyDisciplines={keyDisciplines}
              showInfo={showInfo}
              cryptTotal={cryptTotal}
              inSearch={inSearch}
              noDisciplines={noDisciplines}
              inMissing={inMissing}
              shouldShowModal={shouldShowModal}
              isEditable={isEditable}
              deckid={deck[DECKID]}
              inventoryType={deck[INVENTORY_TYPE]}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckCryptTable;
