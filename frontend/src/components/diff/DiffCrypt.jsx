import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  DiffCryptTable,
  DeckCryptTotalInfo,
  DeckNewCard,
  ResultModal,
  DeckCryptHeader,
  Modal,
} from 'components';
import { useApp, deckStore } from 'context';
import { useModalCardController, useKeyDisciplines, useDeckCrypt } from 'hooks';

const DiffCrypt = ({ cardsFrom, cardsTo, deckid, isEditable }) => {
  const {
    cryptDeckSort,
    changeCryptDeckSort,
    isMobile,
    showFloatingButtons,
    setShowFloatingButtons,
  } = useApp();
  const changeTimer = useSnapshot(deckStore).cryptTimer;

  const sortMethods = {
    Capacity: 'C',
    'Clan ': 'CL', // SPACE SUFFIX IS INTENTIONAL
    'Group ': 'G', // SPACE SUFFIX IS INTENTIONAL
    Name: 'N',
    'Quantity ': 'Q', // SPACE SUFFIX IS INTENTIONAL
    Sect: 'S',
  };

  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const toggleShowInfo = () => setShowInfo(!showInfo);
  const toggleShowAdd = () => setShowAdd(!showAdd);

  const {
    crypt,
    cryptSide,
    hasBanned,
    cryptTotal,
    cryptGroups,
    sortedCards,
    sortedCardsSide,
  } = useDeckCrypt(cardsFrom, cryptDeckSort, changeTimer, cardsTo);

  // Disciplines Sort and Key non-Key selection
  const {
    disciplinesSet,
    keyDisciplines,
    nonKeyDisciplines,
    disciplinesDetailed,
  } = useKeyDisciplines(crypt, cryptTotal);

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards, sortedCardsSide);

  const handleCloseModal = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  return (
    <>
      <DeckCryptHeader
        cryptTotal={cryptTotal}
        cryptGroups={cryptGroups}
        toggleShowInfo={toggleShowInfo}
        toggleShowAdd={toggleShowAdd}
        hasBanned={hasBanned}
        isEditable={isEditable}
        sortMethods={sortMethods}
        sortMethod={cryptDeckSort}
        setSortMethod={changeCryptDeckSort}
      />
      {showInfo && (
        <div className="info-message px-2">
          <DeckCryptTotalInfo
            disciplinesDetailed={disciplinesDetailed}
            cards={crypt}
          />
        </div>
      )}
      {showAdd &&
        (!isMobile ? (
          <DeckNewCard
            setShowAdd={setShowAdd}
            cards={cardsFrom}
            deckid={deckid}
            target="crypt"
          />
        ) : (
          <Modal handleClose={() => setShowAdd(false)} title="Add Crypt Card">
            <DeckNewCard
              setShowAdd={setShowAdd}
              cards={cardsFrom}
              deckid={deckid}
              target="crypt"
            />
          </Modal>
        ))}
      <DiffCryptTable
        handleModalCardOpen={handleModalCardOpen}
        deckid={deckid}
        cards={sortedCards}
        cardsFrom={cardsFrom}
        cardsTo={cardsTo}
        cryptTotal={cryptTotal}
        disciplinesSet={disciplinesSet}
        showInfo={showInfo}
        isEditable={isEditable}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
      />
      {Object.keys(cryptSide).length > 0 && (
        <div className="pt-2 opacity-60">
          <div className="pl-2 flex items-center justify-between">
            <b>Side Crypt</b>
          </div>
          <DiffCryptTable
            handleModalCardOpen={handleModalSideCardOpen}
            deckid={deckid}
            cards={sortedCardsSide}
            cardsFrom={cardsFrom}
            cardsTo={cardsTo}
            disciplinesSet={disciplinesSet}
            isEditable={isEditable}
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
          />
        </div>
      )}
      {isMobile && isEditable && showFloatingButtons && (
        <div
          onClick={() => setShowAdd(true)}
          className="float-right-top float-add-on flex items-center justify-center"
        >
          <div className="inline" style={{ fontSize: '1.4em' }}>
            +
          </div>
          <div className="inline" style={{ fontSize: '1.6em' }}>
            C
          </div>
        </div>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default DiffCrypt;
