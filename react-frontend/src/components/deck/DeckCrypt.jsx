import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import {
  DeckCryptTotalInfo,
  DeckCryptTable,
  DeckNewCard,
  DeckCryptHeader,
  ResultModal,
} from 'components';
import { useApp } from 'context';
import { useModalCardController, useKeyDisciplines, useDeckCrypt } from 'hooks';

const DeckCrypt = ({
  cards,
  deckid,
  isPublic,
  isAuthor,
  inSearch,
  inAdvSelect,
  inMissing,
}) => {
  const {
    cryptDeckSort,
    changeCryptDeckSort,
    changeTimer,
    isMobile,
    showFloatingButtons,
    setShowFloatingButtons,
  } = useApp();

  const sortMethods = {
    Capacity: 'C',
    Clan: 'Cl',
    Group: 'G',
    Name: 'N',
    Quantity: 'Q',
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
  } = useDeckCrypt(cards, cryptDeckSort, changeTimer, deckid);

  // Disciplines Sort and Key non-Key selection
  const {
    disciplinesSet,
    keyDisciplines,
    nonKeyDisciplines,
    disciplinesDetailed,
  } = useKeyDisciplines(cards, cryptTotal);

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
        isAuthor={isAuthor}
        isPublic={isPublic}
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
            cards={cards}
            deckid={deckid}
            target="crypt"
          />
        ) : (
          <Modal
            show={showAdd}
            onHide={() => setShowAdd(false)}
            animation={false}
          >
            <Modal.Header
              className={isMobile ? 'pt-3 pb-1 ps-3 pe-2' : 'pt-3 pb-1 px-4'}
            >
              <h5>Add Crypt Card</h5>
              <Button
                variant="outline-secondary"
                onClick={() => setShowAdd(false)}
              >
                <X width="32" height="32" viewBox="0 0 16 16" />
              </Button>
            </Modal.Header>
            <Modal.Body className="p-0">
              <DeckNewCard
                setShowAdd={setShowAdd}
                cards={cards}
                deckid={deckid}
                target="crypt"
              />
            </Modal.Body>
          </Modal>
        ))}
      <DeckCryptTable
        handleModalCardOpen={handleModalCardOpen}
        deckid={deckid}
        cards={
          inMissing ? useDeckCrypt(cards, 'Name')['sortedCards'] : sortedCards
        }
        cryptTotal={cryptTotal}
        disciplinesSet={disciplinesSet}
        showInfo={showInfo}
        isAuthor={isAuthor}
        isPublic={isPublic}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        inSearch={inSearch}
        inMissing={inMissing}
        isModalOpen={shouldShowModal}
      />
      {Object.keys(cryptSide).length > 0 && (
        <div className="deck-sidecrypt pt-2">
          <div className="d-flex align-items-center justify-content-between ps-2">
            <b>Side Crypt</b>
          </div>
          <DeckCryptTable
            handleModalCardOpen={handleModalSideCardOpen}
            deckid={deckid}
            cards={sortedCardsSide}
            disciplinesSet={disciplinesSet}
            isAuthor={isAuthor}
            isPublic={isPublic}
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
            inSearch={inSearch}
            inMissing={inMissing}
            isModalOpen={shouldShowModal}
          />
        </div>
      )}
      {isMobile && isAuthor && !isPublic && showFloatingButtons && (
        <div
          onClick={() => setShowAdd(true)}
          className="d-flex float-right-top float-add-on align-items-center justify-content-center"
        >
          <div className="d-inline" style={{ fontSize: '1.4em' }}>
            +
          </div>
          <div className="d-inline" style={{ fontSize: '1.6em' }}>
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
