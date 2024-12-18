import React from 'react';
import {
  ResultModal,
  TwdResultLibraryKeyCardsTableRow,
  ResultLibraryCost,
  ResultLegalIcon,
} from '@/components';
import { POOL, BLOOD, X, ID, BANNED, GROUPED_TYPE, ASCII } from '@/constants';
import { useApp } from '@/context';
import { librarySort } from '@/utils';
import { useDeckLibrary, useModalCardController } from '@/hooks';

const TwdResultLibraryKeyCardsTable = ({ library, withHeader }) => {
  const { isMobile, setShowFloatingButtons } = useApp();
  const sortedLibrary = librarySort(Object.values(library), GROUPED_TYPE);
  const keyCards = sortedLibrary
    .filter((card) => card.q >= 4)
    .toSorted((a, b) => a.c[ASCII] - b.c[ASCII]);

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

  const { libraryTotal, hasBanned, poolTotal, bloodTotal } = useDeckLibrary(library);

  return (
    <div>
      <div className="flex h-[30px] items-center justify-between gap-1.5 px-1 font-bold text-fgSecondary dark:text-whiteDark">
        {withHeader ? (
          <>
            <div className="whitespace-nowrap">
              {isMobile ? 'L' : 'Library'} [{libraryTotal}], Keys:
            </div>
            {hasBanned && <ResultLegalIcon type={BANNED} />}
            <div className="flex gap-1.5 sm:gap-3">
              <div className="flex items-center gap-1" title="Total Blood Cost">
                <ResultLibraryCost card={{ [BLOOD]: X }} className="h-[30px] pb-1" />
                <div>{bloodTotal}</div>
              </div>
              <div className="flex items-center gap-1" title="Total Pool Cost">
                <ResultLibraryCost card={{ [POOL]: X }} className="h-[30px]" />
                <div>{poolTotal}</div>
              </div>
            </div>
          </>
        ) : (
          'Key Cards:'
        )}
      </div>
      <table className="border-x border-bgSecondary dark:border-bgSecondaryDark">
        <tbody>
          {keyCards.map((card) => {
            return (
              <TwdResultLibraryKeyCardsTableRow
                key={card.c[ID]}
                card={card}
                handleClick={handleClick}
                shouldShowModal={shouldShowModal}
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
