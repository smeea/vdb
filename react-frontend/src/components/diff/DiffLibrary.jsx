import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import {
  DiffLibraryTable,
  ResultLibraryType,
  ResultLibraryModal,
  DeckLibraryTotalInfo,
  DeckNewLibraryCard,
  DeckDrawProbabilityModal,
  DeckLibraryHeader,
  DeckLibraryTypeDrawInfo,
} from 'components';
import {
  countCards,
  countTotalCost,
  isTriffle,
  resultLibrarySort,
  getTotalCardsGroupedBy,
  getCardsGroupedBy,
  containCard,
} from 'utils';
import {
  GROUPED_TYPE,
  POOL_COST,
  BLOOD_COST,
  BANNED,
  TYPE,
  DISCIPLINE,
  ANY,
  MASTER,
  CLAN,
} from 'utils/constants';
import { useApp } from 'context';
import { useModalCardController } from 'hooks';

const DiffLibrary = (props) => {
  const { handleClose, setShowFloatingButtons, showFloatingButtons } = props;
  const { cardsFrom, cardsTo, deckid, isAuthor, inMissing, inAdvSelect } =
    props;

  const { nativeLibrary, isMobile } = useApp();

  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const toogleShowInfo = () => setShowInfo(!showInfo);
  const toogleShowAdd = () => setShowAdd(!showAdd);
  const [modalDraw, setModalDraw] = useState(undefined);

  const libraryFrom = Object.values(cardsFrom).filter((card) => card.q > 0);
  const libraryTo = Object.values(cardsTo).filter(
    (card) => card.q > 0 && !containCard(libraryFrom, card)
  );
  const libraryFromSide = Object.values(cardsFrom).filter(
    (card) => card.q <= 0 && !containCard(libraryTo, card)
  );
  const libraryToSide = Object.values(cardsTo).filter(
    (card) =>
      card.q <= 0 &&
      !containCard(libraryFrom, card) &&
      !containCard(libraryFromSide, card)
  );

  const library = resultLibrarySort(
    [...libraryFrom, ...libraryTo.map((card) => ({ q: 0, c: card.c }))],
    GROUPED_TYPE
  );

  const librarySide = resultLibrarySort(
    [...libraryFromSide, ...libraryToSide.map((card) => ({ q: 0, c: card.c }))],
    GROUPED_TYPE
  );

  const libraryByType = getCardsGroupedBy(library, TYPE);
  const librarySideByType = getCardsGroupedBy(librarySide, TYPE);

  const hasBanned = libraryFrom.filter((card) => card.c[BANNED]).length > 0;
  const trifleTotal = countCards(
    libraryFrom.filter((card) => isTriffle(card.c, nativeLibrary))
  );
  const libraryTotal = countCards(libraryFrom);
  const poolTotal = countTotalCost(libraryFrom, POOL_COST);
  const bloodTotal = countTotalCost(libraryFrom, BLOOD_COST);
  const libraryByTypeTotal = getTotalCardsGroupedBy(libraryFrom, TYPE);
  const libraryByDisciplinesTotal = getTotalCardsGroupedBy(
    libraryFrom.filter((card) => card.c[DISCIPLINE]),
    DISCIPLINE
  );
  const libraryByClansTotal = getTotalCardsGroupedBy(
    libraryFrom.filter((card) => card.c[CLAN] && card.c[TYPE] !== MASTER),
    CLAN
  );
  libraryByDisciplinesTotal[ANY] = countCards(
    libraryFrom.filter(
      (card) => !card.c[CLAN] && !card.c[DISCIPLINE] && card.c[TYPE] !== MASTER
    )
  );

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(library, librarySide);

  const handleCloseModal = () => {
    handleModalCardClose();
    isMobile && setShowFloatingButtons(true);
  };

  const LibraryDeck = Object.keys(libraryByType).map((cardtype) => (
    <div key={cardtype} className="pt-2">
      <div className="d-flex justify-content-between pe-2">
        <ResultLibraryType
          cardtype={cardtype}
          total={libraryByTypeTotal[cardtype]}
          trifleTotal={cardtype === MASTER && trifleTotal}
        />
        {showInfo && (
          <DeckLibraryTypeDrawInfo
            cardtype={cardtype}
            isMobile={isMobile}
            libraryTotal={libraryTotal}
            libraryByTypeTotal={libraryByTypeTotal}
            setModalDraw={setModalDraw}
          />
        )}
      </div>
      <DiffLibraryTable
        handleModalCardOpen={handleModalCardOpen}
        libraryTotal={libraryTotal}
        showInfo={showInfo}
        deckid={deckid}
        cards={libraryByType[cardtype]}
        cardsFrom={cardsFrom}
        cardsTo={cardsTo}
        isAuthor={isAuthor}
        setShowFloatingButtons={setShowFloatingButtons}
      />
    </div>
  ));

  const LibrarySideDeck = Object.keys(librarySideByType).map((cardtype) => (
    <div key={cardtype}>
      <ResultLibraryType
        cardtype={cardtype}
        total={0}
        trifleTotal={cardtype === MASTER && trifleTotal}
      />
      <DiffLibraryTable
        handleModalCardOpen={handleModalSideCardOpen}
        deckid={deckid}
        cards={librarySideByType[cardtype]}
        cardsFrom={cardsFrom}
        cardsTo={cardsTo}
        isAuthor={isAuthor}
        setShowFloatingButtons={setShowFloatingButtons}
      />
    </div>
  ));

  return (
    <>
      <div className={isMobile ? null : 'sticky-lib-indeck pt-4 pt-md-0'}>
        <DeckLibraryHeader
          isMobile={isMobile}
          libraryTotal={libraryTotal}
          inMissing={inMissing}
          bloodTotal={bloodTotal}
          poolTotal={poolTotal}
          toogleShowInfo={toogleShowInfo}
          toogleShowAdd={toogleShowAdd}
          hasBanned={hasBanned}
          inAdvSelect={inAdvSelect}
          isAuthor={isAuthor}
        />
        {showInfo && (
          <div className="info-message ps-2">
            <DeckLibraryTotalInfo
              byDisciplines={libraryByDisciplinesTotal}
              byTypes={libraryByTypeTotal}
              byClans={libraryByClansTotal}
            />
          </div>
        )}
        {showAdd &&
          (!isMobile ? (
            <DeckNewLibraryCard
              setShowAdd={setShowAdd}
              cards={cardsFrom}
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
                <h5>Add Library Card</h5>
                <Button variant="outline-secondary" onClick={handleClose}>
                  <X width="32" height="32" viewBox="0 0 16 16" />
                </Button>
              </Modal.Header>
              <Modal.Body className="p-0">
                <DeckNewLibraryCard
                  setShowAdd={setShowAdd}
                  cards={cardsFrom}
                  deckid={deckid}
                />
              </Modal.Body>
            </Modal>
          ))}
      </div>
      {LibraryDeck}
      {Object.keys(librarySide).length > 0 && (
        <div className="deck-sidelibrary pt-2">
          <b>Side Library</b>
          {LibrarySideDeck}
        </div>
      )}
      {isMobile && isAuthor && showFloatingButtons && (
        <div
          onClick={() => setShowAdd(true)}
          className="d-flex float-right-middle float-add-on align-items-center justify-content-center"
        >
          <div className="d-inline" style={{ fontSize: '1.4em' }}>
            +
          </div>
          <div className="d-inline" style={{ fontSize: '1.6em' }}>
            L
          </div>
        </div>
      )}
      {shouldShowModal && (
        <ResultLibraryModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
      {modalDraw && (
        <DeckDrawProbabilityModal
          modalDraw={modalDraw}
          setModalDraw={setModalDraw}
        />
      )}
    </>
  );
};

export default DiffLibrary;
