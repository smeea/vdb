import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  DiffCryptTable,
  DeckCryptTotalInfo,
  DeckNewCard,
  ResultModal,
  DeckCryptHeader,
  Modal,
  ButtonFloat,
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
  } = useKeyDisciplines(crypt);

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
    <div
      className={
        isMobile ? null : 'top-[32px] z-10 bg-bgPrimary dark:bg-bgPrimaryDark'
      }
    >
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
        <div className="bg-bgSecondary dark:bg-bgSecondaryDark ">
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
        <div className=" opacity-60">
          <div className="flex items-center justify-between font-bold">
            Side Crypt
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
        <ButtonFloat
          onClick={() => setShowAdd(true)}
          position="top"
          variant="bg-[#707070] opacity-80"
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
          handleClose={handleModalCardClose}
        />
      )}
    </div>
  );
};

export default ReviewCrypt;
