import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import InfoCircle from '../../assets/images/icons/info-circle.svg';
import X from '../../assets/images/icons/x.svg';
import DeckCryptTotalByCapacity from './DeckCryptTotalByCapacity.jsx';
import DeckCryptTable from './DeckCryptTable.jsx';
import DeckNewCryptCard from './DeckNewCryptCard.jsx';
import DeckCryptSortButton from './DeckCryptSortButton.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';
import AppContext from '../../context/AppContext';

function DeckCrypt(props) {
  const { cryptSortByCap, changeTimer, isMobile } = useContext(AppContext);

  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [modalCardIdx, setModalCardIdx] = useState(undefined);
  const [modalSideCardIdx, setModalSideCardIdx] = useState(undefined);
  const [modalInventory, setModalInventory] = useState(undefined);

  const handleModalCardOpen = (i) => {
    setModalCardIdx(cryptCards.indexOf(i));
  };

  const handleModalSideCardOpen = (i) => {
    setModalSideCardIdx(cryptSideCards.indexOf(i));
  };

  const handleModalCardChange = (d) => {
    if (modalCardIdx !== undefined) {
      const maxIdx = cryptCards.length - 1;
      if (modalCardIdx + d < 0) {
        setModalCardIdx(maxIdx);
      } else if (modalCardIdx + d > maxIdx) {
        setModalCardIdx(0);
      } else {
        setModalCardIdx(modalCardIdx + d);
      }
    } else {
      const maxIdx = cryptSideCards.length - 1;

      if (modalSideCardIdx + d < 0) {
        setModalSideCardIdx(maxIdx);
      } else if (modalSideCardIdx + d > maxIdx) {
        setModalSideCardIdx(0);
      } else {
        setModalSideCardIdx(modalSideCardIdx + d);
      }
    }
  };

  const disciplinesDict = {};
  for (const card of Object.keys(props.cards)) {
    for (const d of Object.keys(props.cards[card].c['Disciplines'])) {
      if (disciplinesDict[d] === undefined) {
        disciplinesDict[d] = 0;
        disciplinesDict[d] += props.cards[card].q;
      } else {
        disciplinesDict[d] += props.cards[card].q;
      }
    }
  }

  const disciplinesForSort = [];
  Object.keys(disciplinesDict).map((key) => {
    disciplinesForSort.push([key, disciplinesDict[key]]);
  });

  const disciplinesSet = disciplinesForSort
    .sort((a, b) => b[1] - a[1])
    .map((i) => {
      return i[0];
    });

  let keyDisciplines = 0;
  disciplinesForSort
    .sort((a, b) => b[1] - a[1])
    .map((i) => {
      if (i[1] >= 5) {
        keyDisciplines += 1;
      }
    });

  const nonKeyDisciplinesList = [];
  for (let i = keyDisciplines; i < disciplinesSet.length; i++) {
    nonKeyDisciplinesList.push(disciplinesSet[i]);
  }

  let nonKeyDisciplines = 0;
  Object.keys(props.cards).map((card) => {
    let counter = 0;
    Object.keys(props.cards[card].c['Disciplines']).map((d) => {
      if (nonKeyDisciplinesList.includes(d)) {
        counter += 1;
      }
    });
    if (nonKeyDisciplines < counter) nonKeyDisciplines = counter;
  });

  const crypt = {};
  const cryptSide = {};
  const cryptCards = [];
  const cryptSideCards = [];
  let cryptGroupMin;
  let cryptGroupMax;

  Object.keys(props.cards).map((card) => {
    if (props.cards[card].q > 0) {
      crypt[card] = props.cards[card];
      if (props.cards[card].c['Group'] == 'ANY') {
        return;
      }
      if (
        props.cards[card].c['Group'] < cryptGroupMin ||
        cryptGroupMin == undefined
      ) {
        cryptGroupMin = props.cards[card].c['Group'];
      }
      if (
        props.cards[card].c['Group'] > cryptGroupMax ||
        cryptGroupMax == undefined
      ) {
        cryptGroupMax = props.cards[card].c['Group'];
      }
    } else {
      cryptSide[card] = props.cards[card];
    }
  });

  let cryptTotal = 0;
  for (const card in crypt) {
    if (card) {
      cryptTotal += crypt[card].q;
    }
  }

  let cryptGroups;
  if (cryptGroupMax - cryptGroupMin == 1) {
    cryptGroups = 'G' + cryptGroupMin + '-' + cryptGroupMax;
  } else if (cryptGroupMax - cryptGroupMin == 0) {
    cryptGroups = 'G' + cryptGroupMax;
  } else {
    cryptGroups = 'ERROR IN GROUPS';
  }

  const SortByQuantity = (a, b) => {
    return b.q - a.q;
  };

  const SortByCapacity = (a, b) => {
    return b.c['Capacity'] - a.c['Capacity'];
  };

  const [sortedState, setSortedState] = useState([]);

  const sortedCards = sortedState
    .filter((card) => crypt[card])
    .map((card) => {
      cryptCards.push(crypt[card].c);
      return crypt[card];
    });

  const sortedCardsSide = Object.values(cryptSide)
    .sort(SortByCapacity)
    .map((card) => {
      cryptSideCards.push(card.c);
      return card;
    });

  useEffect(() => {
    if (cryptSortByCap) {
      setSortedState(
        Object.values(crypt)
          .sort(SortByQuantity)
          .sort(SortByCapacity)
          .map((i) => {
            return i['c']['Id'];
          })
      );
    } else {
      setSortedState(
        Object.values(crypt)
          .sort(SortByCapacity)
          .sort(SortByQuantity)
          .map((i) => {
            return i['c']['Id'];
          })
      );
    }
  }, [changeTimer, props.deckid, cryptSortByCap]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between pl-2 info-message">
        <b>
          Crypt [{cryptTotal}
          {cryptTotal < 12 && ' of 12+'}] - {cryptGroups}
        </b>
        {!props.inAdvSelect && (
          <div className="d-flex">
            <div className="pr-1">
              <DeckCryptSortButton />
            </div>
            <Button
              variant="outline-secondary"
              onClick={() => setShowInfo(!showInfo)}
            >
              <InfoCircle />
            </Button>
            {props.isAuthor && !isMobile && (
              <div className="pl-1">
                <Button
                  variant="outline-secondary"
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
        <div className="info-message pl-2">
          <DeckCryptTotalByCapacity cards={props.cards} />
        </div>
      )}
      {showAdd &&
        (!isMobile ? (
          <DeckNewCryptCard
            setShowAdd={setShowAdd}
            cards={props.cards}
            deckid={props.deckid}
          />
        ) : (
          <Modal
            show={showAdd}
            onHide={() => setShowAdd(false)}
            animation={false}
          >
            <Modal.Body className="p-0">
              <Container className="p-0" fluid>
                <Row className="p-0 m-0">
                  <Col className="p-0">
                    <div className="m-2">
                      <button
                        type="button"
                        className="close m-1"
                        onClick={() => setShowAdd(false)}
                      >
                        <X width="32" height="32" viewBox="0 0 16 16" />
                      </button>
                    </div>
                    <div className="d-flex justify-content-center">
                      <h5>Add Crypt Card</h5>
                    </div>
                  </Col>
                </Row>
                <DeckNewCryptCard
                  setShowAdd={setShowAdd}
                  cards={props.cards}
                  deckid={props.deckid}
                />
              </Container>
            </Modal.Body>
          </Modal>
        ))}
      <DeckCryptTable
        handleModalCardOpen={handleModalCardOpen}
        setModalInventory={setModalInventory}
        deckid={props.deckid}
        cards={sortedCards}
        cryptTotal={cryptTotal}
        disciplinesSet={disciplinesSet}
        showInfo={showInfo}
        isAuthor={props.isAuthor}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        proxySelector={props.proxySelector}
        proxyCounter={props.proxyCounter}
        proxySelected={props.proxySelected}
        inSearch={props.inSearch}
        inAdvSelect={props.inAdvSelect}
        setShowFloatingButtons={props.setShowFloatingButtons}
      />
      {Object.keys(cryptSide).length > 0 && !props.inAdvSelect && (
        <div className="deck-sidecrypt pt-2">
          <div className="d-flex align-items-center justify-content-between pl-2">
            <b>Side Crypt</b>
          </div>
          <DeckCryptTable
            handleModalCardOpen={handleModalSideCardOpen}
            setModalInventory={setModalInventory}
            deckid={props.deckid}
            cards={sortedCardsSide}
            disciplinesSet={disciplinesSet}
            isAuthor={props.isAuthor}
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
            proxySelector={props.proxySelector}
            proxyCounter={props.proxyCounter}
            proxySelected={props.proxySelected}
            inSearch={props.inSearch}
            inAdvSelect={props.inAdvSelect}
            setShowFloatingButtons={props.setShowFloatingButtons}
          />
        </div>
      )}
      {isMobile && props.showFloatingButtons && (
        <div onClick={() => setShowAdd(true)} className="float-right-top add">
          <div className="d-flex py-0 px-1 align-items-top">
            <div className="d-inline" style={{ fontSize: '1.75em' }}>
              +
            </div>
            <div className="d-inline" style={{ fontSize: '1.85em' }}>
              C
            </div>
          </div>
        </div>
      )}
      {(modalCardIdx !== undefined || modalSideCardIdx !== undefined) && (
        <ResultCryptModal
          card={
            modalCardIdx !== undefined
              ? cryptCards[modalCardIdx]
              : cryptSideCards[modalSideCardIdx]
          }
          handleModalCardChange={handleModalCardChange}
          handleClose={() => {
            setModalCardIdx(undefined);
            setModalSideCardIdx(undefined);
            isMobile && props.setShowFloatingButtons(true);
          }}
          inventoryState={modalInventory}
        />
      )}
    </>
  );
}

export default DeckCrypt;
