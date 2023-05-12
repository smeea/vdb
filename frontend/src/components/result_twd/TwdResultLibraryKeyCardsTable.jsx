import React from 'react';
import {
  ResultModal,
  TwdResultLibraryKeyCardsTableRow,
  ResultLibraryCost,
  Warning,
} from '@/components';
import { GROUPED_TYPE, ASCII_NAME } from '@/utils/constants';
import { useApp } from '@/context';
import { countCards, librarySort } from '@/utils';
import { useDeckLibrary, useModalCardController } from '@/hooks';

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

  const { hasBanned, poolTotal, bloodTotal } = useDeckLibrary(library);

  return (
    <div>
      <div className="flex justify-between items-center sm:gap-3 font-bold px-1 h-[30px]">
        {isMobile ? (
          <>
            <div className="whitespace-nowrap">Library [{libraryTotal}]</div>
            {hasBanned && <Warning value={isMobile ? 'B' : 'BANNED'} />}
            <div className="flex gap-1.5 sm:gap-3">
              <div className="flex items-center gap-1" title="Total Blood Cost">
                <ResultLibraryCost valueBlood="X" className="h-[30px] pb-1" />
                <div>{bloodTotal}</div>
              </div>
              <div className="flex items-center gap-1" title="Total Pool Cost">
                <ResultLibraryCost valuePool="X" className="h-[30px]" />
                <div>{poolTotal}</div>
              </div>
            </div>
          </>
        ) : (
          'Key cards:'
        )}
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
