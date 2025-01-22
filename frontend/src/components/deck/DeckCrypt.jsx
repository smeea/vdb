import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { DeckCryptTable, DeckCryptHeader, ResultModal, FlexGapped } from '@/components';
import { useApp } from '@/context';
import { getKeyDisciplines } from '@/utils';
import { useModalCardController, useDeckCrypt } from '@/hooks';
import { CRYPT, CAPACITY, CLAN, GROUP, NAME, QUANTITYx, SECT } from '@/constants';

const DeckCrypt = ({ inSearch, inPreview, inMissing, noDisciplines, deck }) => {
  const { setShowFloatingButtons, cryptDeckSort, changeCryptDeckSort, isMobile } = useApp();
  const [showInfo, setShowInfo] = useState(false);

  const sortMethods = {
    [CAPACITY]: 'C',
    [CLAN]: 'CL',
    [GROUP]: 'G',
    [NAME]: 'N',
    [QUANTITYx]: 'Q',
    [SECT]: 'S',
  };

  const { crypt, cryptSide, sortedCards, sortedCardsSide, cryptTotal } = useDeckCrypt(
    deck[CRYPT],
    cryptDeckSort,
  );

  const { disciplinesSet, keyDisciplines } = getKeyDisciplines(deck[CRYPT]);

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
        !inPreview &&
          !inMissing &&
          !inSearch &&
          !isMobile &&
          'sticky bg-bgPrimary dark:bg-bgPrimaryDark sm:top-10',
      )}
    >
      <div>
        <DeckCryptHeader
          cards={crypt}
          deck={deck}
          inMissing={inMissing}
          setShowInfo={setShowInfo}
          setSortMethod={changeCryptDeckSort}
          showInfo={showInfo}
          sortMethod={cryptDeckSort}
          sortMethods={sortMethods}
        />
        <DeckCryptTable
          deck={deck}
          handleClick={handleClick}
          cards={sortedCards}
          cryptTotal={cryptTotal}
          showInfo={showInfo}
          disciplinesSet={disciplinesSet}
          keyDisciplines={keyDisciplines}
          inSearch={inSearch}
          inMissing={inMissing}
          noDisciplines={noDisciplines}
          shouldShowModal={shouldShowModal}
        />
      </div>
      {Object.keys(cryptSide).length > 0 && (
        <div className="opacity-60 dark:opacity-50">
          <div className="flex h-[42px] items-center bg-bgSecondary p-2 font-bold dark:bg-bgSecondaryDark">
            Side Crypt
          </div>
          <DeckCryptTable
            deck={deck}
            handleClick={handleClickSide}
            cards={sortedCardsSide}
            disciplinesSet={disciplinesSet}
            showInfo={showInfo}
            keyDisciplines={keyDisciplines}
            noDisciplines={noDisciplines}
            inSearch={inSearch}
            inMissing={inMissing}
            shouldShowModal={shouldShowModal}
            inSide
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

export default DeckCrypt;
