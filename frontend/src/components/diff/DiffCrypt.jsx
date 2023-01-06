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
  const { disciplinesDetailed } = useKeyDisciplines(crypt);

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
        showInfo={showInfo}
        isEditable={isEditable}
      />
      {Object.keys(cryptSide).length > 0 && (
        <div className=" opacity-60">
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
    </>
  );
};

export default DiffCrypt;
