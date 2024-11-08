import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FlexGapped, DiffCryptTable, ResultModal, DeckCryptHeader } from '@/components';
import { useApp } from '@/context';
import { getIsEditable } from '@/utils';
import { useModalCardController, useKeyDisciplines, useDeckCrypt } from '@/hooks';
import { CRYPT, DECKID, CAPACITY, CLAN, GROUP, NAME, QUANTITYx, SECT } from '@/constants';

const DiffCrypt = ({ cardsTo, deck }) => {
  const { isMobile, cryptDeckSort, changeCryptDeckSort, setShowFloatingButtons } = useApp();
  const [showInfo, setShowInfo] = useState(false);
  const cardsFrom = deck[CRYPT];
  const isEditable = getIsEditable(deck);

  const sortMethods = {
    [CAPACITY]: 'C',
    [CLAN]: 'CL',
    [GROUP]: 'G',
    [NAME]: 'N',
    [QUANTITYx]: 'Q',
    [SECT]: 'S',
  };

  const {
    crypt,
    cryptSide,
    sortedCards,
    sortedCardsSide,
    hasBanned,
    hasLimited,
    hasPlaytest,
    hasIllegalDate,
    hasWrongGroups,
    cryptGroups,
    cryptTotal,
  } = useDeckCrypt(cardsFrom, cryptDeckSort, cardsTo);

  const { disciplinesSet, keyDisciplines } = useKeyDisciplines(crypt);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards, sortedCardsSide);

  const handleClick = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  const handleClickSide = (card) => {
    handleModalSideCardOpen(card);
    setShowFloatingButtons(false);
  };

  const handleClose = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  return (
    <FlexGapped
      className={twMerge(
        'flex-col',
        !isMobile && 'sticky bg-bgPrimary dark:bg-bgPrimaryDark sm:top-10',
      )}
    >
      <div>
        <DeckCryptHeader
          cards={crypt}
          cryptGroups={cryptGroups}
          cryptTotal={cryptTotal}
          deckid={deck[DECKID]}
          hasBanned={hasBanned}
          hasIllegalDate={hasIllegalDate}
          hasLimited={hasLimited}
          hasPlaytest={hasPlaytest}
          hasWrongGroups={hasWrongGroups}
          isEditable={isEditable}
          setShowInfo={setShowInfo}
          setSortMethod={changeCryptDeckSort}
          showInfo={showInfo}
          sortMethod={cryptDeckSort}
          sortMethods={sortMethods}
        />
        <DiffCryptTable
          handleClick={handleClick}
          deckid={deck[DECKID]}
          cards={sortedCards}
          cardsFrom={cardsFrom}
          cardsTo={cardsTo}
          cryptTotal={cryptTotal}
          showInfo={showInfo}
          isEditable={isEditable}
          disciplinesSet={disciplinesSet}
          keyDisciplines={keyDisciplines}
        />
      </div>
      {Object.keys(cryptSide).length > 0 && (
        <div className="opacity-60 dark:opacity-50">
          <div className="flex items-center justify-between font-bold">Side Crypt</div>
          <DiffCryptTable
            handleClick={handleClickSide}
            deckid={deck[DECKID]}
            cards={sortedCardsSide}
            cardsFrom={cardsFrom}
            cardsTo={cardsTo}
            isEditable={isEditable}
            disciplinesSet={disciplinesSet}
            keyDisciplines={keyDisciplines}
          />
        </div>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleClose}
        />
      )}
    </FlexGapped>
  );
};

export default DiffCrypt;
