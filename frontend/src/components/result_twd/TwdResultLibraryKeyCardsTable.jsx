import React from 'react';
import { ResultModal, TwdResultLibraryKeyCardsTableRow } from '@/components';
import { GROUPED_TYPE, ASCII_NAME } from '@/utils/constants';
import { useApp } from '@/context';
import { countCards, librarySort } from '@/utils';
import { useModalCardController } from '@/hooks';

const TwdResultLibraryKeyCardsTable = ({ library }) => {
  const { isMobile, setShowFloatingButtons } = useApp();
  const sortedLibrary = librarySort(Object.values(library), GROUPED_TYPE);
  const libraryTotal = countCards(sortedLibrary);
  const keyCards = sortedLibrary.filter((card) => card.q >= 4);
  keyCards.sort((a, b) => a.c[ASCII_NAME] - b.c[ASCII_NAME]);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(keyCards);

  const handleClick = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  const handleClose = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  return (
    <div>
      <div className="flex items-center font-bold px-1 h-[30px]">
        {isMobile ? `Library [${libraryTotal}]` : 'Key cards:'}
      </div>
      <table className="border-x border-bgSecondary dark:border-bgSecondaryDark">
        <tbody>
          {keyCards.map((card, idx) => {
            return (
              <TwdResultLibraryKeyCardsTableRow
                key={card.c.Id}
                card={card}
                idx={idx}
                handleClick={handleClick}
              />
            );
          })}
        </tbody>
      </table>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default TwdResultLibraryKeyCardsTable;
