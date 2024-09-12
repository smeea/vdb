import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { DeckCryptTable, DeckCryptHeader, ResultModal, FlexGapped } from '@/components';
import { useApp, miscStore } from '@/context';
import { useModalCardController, useKeyDisciplines, useDeckCrypt } from '@/hooks';

const DeckCrypt = ({ inSearch, inPreview, inMissing, noDisciplines, deck }) => {
  const { setShowFloatingButtons, cryptDeckSort, changeCryptDeckSort, isMobile } = useApp();
  const changeTimer = useSnapshot(miscStore).cryptTimer;
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;
  const [showInfo, setShowInfo] = useState(false);

  const sortMethods = {
    Capacity: 'C',
    Clan: 'CL',
    Group: 'G',
    Name: 'N',
    'Quantity ': 'Q', // SPACE SUFFIX IS INTENTIONAL
    Sect: 'S',
  };

  const { crypt, cryptSide, cryptTotal, sortedCards, sortedCardsSide } = useDeckCrypt(
    deck.crypt,
    cryptDeckSort,
    changeTimer,
  );

  const { disciplinesSet, keyDisciplines } = useKeyDisciplines(deck.crypt);

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
      className={`flex-col ${
        !inPreview && !inMissing && !inSearch && !isMobile
          ? 'sticky bg-bgPrimary dark:bg-bgPrimaryDark sm:top-10'
          : ''
      }`}
    >
      <div>
        <DeckCryptHeader
          inMissing={inMissing}
          isEditable={isEditable}
          sortMethods={sortMethods}
          sortMethod={cryptDeckSort}
          setSortMethod={changeCryptDeckSort}
          showInfo={showInfo}
          setShowInfo={setShowInfo}
          deckid={deckid}
          cards={crypt}
        />
        <DeckCryptTable
          deck={deck}
          handleClick={handleClick}
          cards={inMissing ? useDeckCrypt(deck.crypt, 'Name')['sortedCards'] : sortedCards}
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
            keyDisciplines={keyDisciplines}
            noDisciplines={noDisciplines}
            inSearch={inSearch}
            inMissing={inMissing}
            shouldShowModal={shouldShowModal}
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
