import { DiffLibraryTableRow } from '@/components';
import { ID } from '@/constants';

const DiffLibraryTable = ({
  cardChange,
  deckid,
  cards,
  cardsFrom,
  cardsTo,
  isEditable,
  showInfo,
  libraryTotal,
  handleClick,
}) => {
  return (
    <table className="border-bgSecondary dark:border-bgSecondaryDark w-full sm:border">
      <tbody>
        {cards.map((card) => {
          return (
            <DiffLibraryTableRow
              cardChange={cardChange}
              deckid={deckid}
              cardsFrom={cardsFrom}
              cardsTo={cardsTo}
              isEditable={isEditable}
              showInfo={showInfo}
              libraryTotal={libraryTotal}
              key={card.c[ID]}
              card={card}
              handleClick={handleClick}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default DiffLibraryTable;
