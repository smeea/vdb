import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  DeckCryptTotalInfo,
  DeckCryptTable,
  DeckNewCard,
  DeckCryptHeader,
  ResultModal,
  Modal,
  ButtonFloat,
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
  } = useKeyDisciplines(deck.crypt);

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
      className={`${!inSearch && !inMissing && !inAdvSelect ? '' : ''} ${
        !isMobile && !inAdvSelect ? null : 'sticky top-[32px] z-10'
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
        <div className="info-message p-2">
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
        <div className=" opacity-60">
          <div className="flex items-center justify-between ">
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
        <ButtonFloat
          onClick={() => setShowAdd(true)}
          position="top"
          variant="float-add-on"
        >
          <div className="flex items-center">
            <div className="pb-0.5 text-xl">+</div>
            <div className="text-2xl">C</div>
          </div>
        </ButtonFloat>
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
