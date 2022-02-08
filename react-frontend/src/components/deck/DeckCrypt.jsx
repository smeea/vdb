import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InfoCircle from 'assets/images/icons/info-circle.svg';
import X from 'assets/images/icons/x.svg';
import {
  DeckCryptTotalInfo,
  DeckCryptTable,
  DeckNewCryptCard,
  DeckCryptSortButton,
  ResultCryptModal,
} from 'components';
import { useApp } from 'context';
import { useModalCardController, useKeyDisciplines, useDeckCrypt } from 'hooks';

const DeckCrypt = (props) => {
  const { cards, inAdvSelect, setShowFloatingButtons } = props;
  const {
    showFloatingButtons,
    inMissing,
    deckid,
    isPublic,
    isAuthor,
    inSearch,
  } = props;
  const { cryptDeckSort, changeTimer, isMobile } = useApp();

  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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
    isMobile && setShowFloatingButtons(true);
  };

  return (
    <div
      className={`${!inSearch && !inMissing ? 'pt-md-4' : ''} ${
        !isMobile ? 'sticky-deck-crypt' : ''
      }`}
    >
      <div className="d-flex align-items-center justify-content-between ps-2 pe-1 pe-md-0 info-message">
        <b>
          Crypt [{cryptTotal}
          {!inMissing && cryptTotal < 12 && ' of 12+'}]
          {!inMissing && ` - ${cryptGroups}`}
          {!inMissing && hasBanned && ' - WITH BANNED'}
        </b>
        {!inAdvSelect && (
          <div className="d-flex">
            <div className="pe-1">
              <DeckCryptSortButton />
            </div>
            <Button
              title="Additional Info"
              variant="primary"
              onClick={() => setShowInfo(!showInfo)}
            >
              <InfoCircle />
            </Button>
            {isAuthor && !isMobile && (
              <div className="ps-1">
                <Button
                  title="Add Card"
                  variant="primary"
                  onClick={() => setShowAdd(!showAdd)}
                >
                  +
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
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
          <DeckNewCryptCard
            setShowAdd={setShowAdd}
            cards={cards}
            deckid={deckid}
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
              <DeckNewCryptCard
                setShowAdd={setShowAdd}
                cards={cards}
                deckid={deckid}
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
        inAdvSelect={inAdvSelect}
        setShowFloatingButtons={setShowFloatingButtons}
        isModalOpen={shouldShowModal}
      />
      {Object.keys(cryptSide).length > 0 && !inAdvSelect && (
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
            inAdvSelect={inAdvSelect}
            setShowFloatingButtons={setShowFloatingButtons}
            isModalOpen={shouldShowModal}
          />
        </div>
      )}
      {isMobile && isAuthor && showFloatingButtons && (
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
        <ResultCryptModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DeckCrypt;
