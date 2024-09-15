import React, { useState } from 'react';
import { FlexGapped, DiffCryptTable, ResultModal, DeckCryptHeader } from '@/components';
import { useApp } from '@/context';
import { useModalCardController, useKeyDisciplines, useDeckCrypt } from '@/hooks';

const ReviewCrypt = ({ cardChange, cardsFrom, cardsTo }) => {
  const { cryptDeckSort, changeCryptDeckSort, isMobile } = useApp();
  const [showInfo, setShowInfo] = useState(false);

  const sortMethods = {
    Capacity: 'C',
    Clan: 'CL',
    Group: 'G',
    Name: 'N',
    'Quantity ': 'Q ', // SPACE SUFFIX IS INTENTIONAL
    Sect: 'S',
  };

  const { crypt, cryptSide, cryptTotal, sortedCards, sortedCardsSide } = useDeckCrypt(
    cardsFrom,
    cryptDeckSort,
    cardsTo,
  );

  const { disciplinesSet, keyDisciplines } = useKeyDisciplines(crypt);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards, sortedCardsSide);

  return (
    <FlexGapped
      className={`flex-col ${
        !isMobile ? 'sticky bg-bgPrimary dark:bg-bgPrimaryDark sm:top-10' : ''
      }`}
    >
      <div>
        <DeckCryptHeader
          sortMethods={sortMethods}
          sortMethod={cryptDeckSort}
          setSortMethod={changeCryptDeckSort}
          showInfo={showInfo}
          setShowInfo={setShowInfo}
          cards={crypt}
          cardChange={cardChange}
          isEditable
        />
        <DiffCryptTable
          isEditable
          cardChange={cardChange}
          handleModalCardOpen={handleModalCardOpen}
          cards={sortedCards}
          cardsFrom={cardsFrom}
          cardsTo={cardsTo}
          showInfo={showInfo}
          cryptTotal={cryptTotal}
          disciplinesSet={disciplinesSet}
          keyDisciplines={keyDisciplines}
        />
      </div>
      {Object.keys(cryptSide).length > 0 && (
        <div className="opacity-60 dark:opacity-50">
          <div className="flex items-center justify-between font-bold">Side Crypt</div>
          <DiffCryptTable
            isEditable
            cardChange={cardChange}
            handleModalCardOpen={handleModalSideCardOpen}
            cards={sortedCardsSide}
            cardsFrom={cardsFrom}
            cardsTo={cardsTo}
            disciplinesSet={disciplinesSet}
            keyDisciplines={keyDisciplines}
          />
        </div>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
        />
      )}
    </FlexGapped>
  );
};

export default ReviewCrypt;
