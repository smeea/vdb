import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  DiffCryptTable,
  ResultModal,
  DeckCryptHeader,
  ButtonFloat,
} from '@/components';
import { useApp, deckStore } from '@/context';
import {
  useModalCardController,
  useKeyDisciplines,
  useDeckCrypt,
} from '@/hooks';

const DiffCrypt = ({ cardsFrom, cardsTo, deckid, isEditable }) => {
  const {
    cryptDeckSort,
    changeCryptDeckSort,
    isMobile,
    showFloatingButtons,
    setShowFloatingButtons,
  } = useApp();
  const changeTimer = useSnapshot(deckStore).cryptTimer;
  const [showInfo, setShowInfo] = useState(false);

  const sortMethods = {
    Capacity: 'C',
    'Clan ': 'CL ', // SPACE SUFFIX IS INTENTIONAL
    'Group ': 'G ', // SPACE SUFFIX IS INTENTIONAL
    Name: 'N',
    'Quantity ': 'Q ', // SPACE SUFFIX IS INTENTIONAL
    Sect: 'S',
  };

  const { crypt, cryptSide, cryptTotal, sortedCards, sortedCardsSide } =
    useDeckCrypt(cardsFrom, cryptDeckSort, changeTimer, cardsTo);

  const { disciplinesSet, keyDisciplines, nonKeyDisciplines, maxDisciplines } =
    useKeyDisciplines(crypt);

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards, sortedCardsSide);

  return (
    <>
      <DeckCryptHeader
        isEditable={isEditable}
        sortMethods={sortMethods}
        sortMethod={cryptDeckSort}
        setSortMethod={changeCryptDeckSort}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
        cards={crypt}
        deckid={deckid}
      />
      <DiffCryptTable
        handleModalCardOpen={handleModalCardOpen}
        deckid={deckid}
        cards={sortedCards}
        cardsFrom={cardsFrom}
        cardsTo={cardsTo}
        cryptTotal={cryptTotal}
        showInfo={showInfo}
        isEditable={isEditable}
        disciplinesSet={disciplinesSet}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        maxDisciplines={maxDisciplines}
      />
      {Object.keys(cryptSide).length > 0 && (
        <div className=" opacity-60 dark:opacity-50">
          <div className="flex items-center justify-between font-bold">
            Side Crypt
          </div>
          <DiffCryptTable
            handleModalCardOpen={handleModalSideCardOpen}
            deckid={deckid}
            cards={sortedCardsSide}
            cardsFrom={cardsFrom}
            cardsTo={cardsTo}
            isEditable={isEditable}
            disciplinesSet={disciplinesSet}
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
            maxDisciplines={maxDisciplines}
          />
        </div>
      )}
      {isMobile && isEditable && showFloatingButtons && (
        <ButtonFloat
          onClick={() => setShowAdd(true)}
          position="top"
          variant="primary"
        >
          <div className="flex items-center">
            <div className="text-[24px]">+</div>
            <div className="text-[28px]">C</div>
          </div>
        </ButtonFloat>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
        />
      )}
    </>
  );
};

export default DiffCrypt;
