import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import X from 'assets/images/icons/x.svg';
import {
  DiffCryptTable,
  DeckCryptTotalInfo,
  DeckNewCard,
  ResultModal,
  DeckCryptHeader,
  Modal,
  Button,
} from 'components';
import { deckStore, useApp } from 'context';
import { useModalCardController, useKeyDisciplines, useDeckCrypt } from 'hooks';

const ReviewCrypt = ({ cardChange, cardsFrom, cardsTo }) => {
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
    <div className={`pt-md-4 ${isMobile ? null : 'sticky-deck-crypt'}`}>
      <DeckCryptHeader
        cryptTotal={cryptTotal}
        cryptGroups={cryptGroups}
        toggleShowInfo={toggleShowInfo}
        toggleShowAdd={toggleShowAdd}
        hasBanned={hasBanned}
        sortMethods={sortMethods}
        sortMethod={cryptDeckSort}
        setSortMethod={changeCryptDeckSort}
        inReview
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
            target="crypt"
            cardChange={cardChange}
          />
        ) : (
          <Modal title="Add Crypt Card" handleClose={() => setShowAdd(false)}>
            <div>
              <DeckNewCard
                setShowAdd={setShowAdd}
                cards={cardsFrom}
                target="crypt"
                cardChange={cardChange}
              />
            </div>
          </Modal>
        ))}
      <DiffCryptTable
        inReview
        isAuthor={true}
        cardChange={cardChange}
        handleModalCardOpen={handleModalCardOpen}
        cards={sortedCards}
        cardsFrom={cardsFrom}
        cardsTo={cardsTo}
        cryptTotal={cryptTotal}
        disciplinesSet={disciplinesSet}
        showInfo={showInfo}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
      />
      {Object.keys(cryptSide).length > 0 && (
        <div className="opacity-60 pt-2">
          <div className="flex items-center justify-between ps-2">
            <b>Side Crypt</b>
          </div>
          <DiffCryptTable
            inReview
            isAuthor={true}
            cardChange={cardChange}
            handleModalCardOpen={handleModalSideCardOpen}
            cards={sortedCardsSide}
            cardsFrom={cardsFrom}
            cardsTo={cardsTo}
            disciplinesSet={disciplinesSet}
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
          />
        </div>
      )}
      {isMobile && showFloatingButtons && (
        <div
          onClick={() => setShowAdd(true)}
          className="flex float-right-top float-add-on items-center justify-center"
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

export default ReviewCrypt;
