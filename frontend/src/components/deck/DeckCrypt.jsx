import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  DeckCryptTotalInfo,
  DeckCryptTable,
  DeckNewCard,
  DeckCryptHeader,
  ResultModal,
  Modal,
} from 'components';
import { useApp, deckStore } from 'context';
import { useModalCardController, useKeyDisciplines, useDeckCrypt } from 'hooks';

const DeckCrypt = ({ inSearch, inAdvSelect, inMissing, deck }) => {
  const {
    cryptDeckSort,
    changeCryptDeckSort,
    isMobile,
    showFloatingButtons,
    setShowFloatingButtons,
  } = useApp();
  const changeTimer = useSnapshot(deckStore).cryptTimer;
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;

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
  } = useDeckCrypt(deck.crypt, cryptDeckSort, changeTimer);

  // Disciplines Sort and Key non-Key selection
  const {
    disciplinesSet,
    keyDisciplines,
    nonKeyDisciplines,
    disciplinesDetailed,
  } = useKeyDisciplines(deck.crypt, cryptTotal);

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
    <div
      className={`${!inSearch && !inMissing && !inAdvSelect ? 'pt-md-4' : ''} ${
        !isMobile && !inAdvSelect ? 'sticky-deck-crypt' : ''
      }`}
    >
      <DeckCryptHeader
        cryptTotal={cryptTotal}
        inMissing={inMissing}
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
            cards={deck.crypt}
            deckid={deckid}
            target="crypt"
          />
        ) : (
          <Modal handleClose={() => setShowAdd(false)} title="Add Crypt Card">
            <div>
              <DeckNewCard
                setShowAdd={setShowAdd}
                cards={deck.crypt}
                deckid={deckid}
                target="crypt"
              />
            </div>
          </Modal>
        ))}
      <DeckCryptTable
        deck={deck}
        handleModalCardOpen={handleModalCardOpen}
        cards={
          inMissing
            ? useDeckCrypt(deck.crypt, 'Name')['sortedCards']
            : sortedCards
        }
        cryptTotal={cryptTotal}
        disciplinesSet={disciplinesSet}
        showInfo={showInfo}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        inSearch={inSearch}
        inMissing={inMissing}
        isModalOpen={shouldShowModal}
      />
      {Object.keys(cryptSide).length > 0 && (
        <div className="pt-2 opacity-60">
          <div className="pl-2 flex items-center justify-between">
            <b>Side Crypt</b>
          </div>
          <DeckCryptTable
            deck={deck}
            handleModalCardOpen={handleModalSideCardOpen}
            cards={sortedCardsSide}
            disciplinesSet={disciplinesSet}
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
            inSearch={inSearch}
            inMissing={inMissing}
            isModalOpen={shouldShowModal}
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
    </div>
  );
};

export default DeckCrypt;
