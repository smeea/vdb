import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import ArrowRepeat from '../../assets/images/icons/arrow-repeat.svg';
import X from '../../assets/images/icons/x.svg';
import ResultCryptModal from './ResultCryptModal.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';
import DeckDrawCryptTable from './DeckDrawCryptTable.jsx';
import DeckDrawLibraryTable from './DeckDrawLibraryTable.jsx';
import UsedDescription from './UsedDescription.jsx';
import AppContext from '../../context/AppContext';

function DeckDrawModal(props) {
  const {
    decks,
    isMobile,
    inventoryMode,
    inventoryCrypt,
    inventoryLibrary,
    usedCryptCards,
    usedLibraryCards,
  } = useContext(AppContext);

  const [modalCryptCardIdx, setModalCryptCardIdx] = useState(undefined);
  const [modalLibraryCardIdx, setModalLibraryCardIdx] = useState(undefined);
  const [modalInventory, setModalInventory] = useState(undefined);

  const handleModalCryptCardOpen = (i) => {
    setModalCryptCardIdx(i);

    const card = props.burnedCrypt[i];
    let inInventory = null;
    let softUsedMax = 0;
    let hardUsedTotal = 0;
    let SoftUsedDescription;
    let HardUsedDescription;

    if (inventoryMode) {
      if (Object.keys(inventoryCrypt).includes(card['Id'].toString())) {
        inInventory = inventoryCrypt[card['Id']].q;
      } else {
        inInventory = 0;
      }

      if (usedCryptCards && usedCryptCards.soft[card['Id']]) {
        SoftUsedDescription = Object.keys(usedCryptCards.soft[card['Id']]).map(
          (id) => {
            if (softUsedMax < usedCryptCards.soft[card['Id']][id]) {
              softUsedMax = usedCryptCards.soft[card['Id']][id];
            }
            return (
              <UsedDescription
                key={id}
                q={usedCryptCards.soft[card['Id']][id]}
                deckName={decks[id]['name']}
                t="s"
              />
            );
          }
        );
      }

      if (usedCryptCards && usedCryptCards.hard[card['Id']]) {
        HardUsedDescription = Object.keys(usedCryptCards.hard[card['Id']]).map(
          (id) => {
            hardUsedTotal += usedCryptCards.hard[card['Id']][id];
            return (
              <UsedDescription
                key={id}
                q={usedCryptCards.hard[card['Id']][id]}
                deckName={decks[id]['name']}
                t="h"
              />
            );
          }
        );
      }
    }

    setModalInventory({
      inInventory: inInventory,
      softUsedMax: softUsedMax,
      hardUsedTotal: hardUsedTotal,
      usedDescription: {
        soft: SoftUsedDescription,
        hard: HardUsedDescription,
      },
    });
  };

  const handleModalLibraryCardOpen = (i) => {
    setModalLibraryCardIdx(i);

    const card = props.burnedLibrary[i];
    let inInventory = null;
    let softUsedMax = 0;
    let hardUsedTotal = 0;
    let SoftUsedDescription;
    let HardUsedDescription;

    if (inventoryMode) {
      if (Object.keys(inventoryLibrary).includes(card['Id'].toString())) {
        inInventory = inventoryLibrary[card['Id']].q;
      } else {
        inInventory = 0;
      }

      if (usedLibraryCards && usedLibraryCards.soft[card['Id']]) {
        SoftUsedDescription = Object.keys(
          usedLibraryCards.soft[card['Id']]
        ).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card['Id']][id]) {
            softUsedMax = usedLibraryCards.soft[card['Id']][id];
          }
          return (
            <UsedDescription
              key={id}
              q={usedLibraryCards.soft[card['Id']][id]}
              deckName={decks[id]['name']}
              t="s"
            />
          );
        });
      }

      if (usedLibraryCards && usedLibraryCards.hard[card['Id']]) {
        HardUsedDescription = Object.keys(
          usedLibraryCards.hard[card['Id']]
        ).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card['Id']][id];
          return (
            <UsedDescription
              key={id}
              q={usedLibraryCards.hard[card['Id']][id]}
              deckName={decks[id]['name']}
              t="h"
            />
          );
        });
      }
    }

    setModalInventory({
      inInventory: inInventory,
      softUsedMax: softUsedMax,
      hardUsedTotal: hardUsedTotal,
      usedDescription: {
        soft: SoftUsedDescription,
        hard: HardUsedDescription,
      },
    });
  };

  const handleModalCryptCardChange = (d) => {
    if (modalCryptCardIdx !== undefined) {
      const maxIdx = props.burnedCrypt.length - 1;
      if (modalCryptCardIdx + d < 0) {
        setModalCryptCardIdx(maxIdx);
      } else if (modalCryptCardIdx + d > maxIdx) {
        setModalCryptCardIdx(0);
      } else {
        setModalCryptCardIdx(modalCryptCardIdx + d);
      }
    }
  };
  const handleModalLibraryCardChange = (d) => {
    if (modalLibraryCardIdx !== undefined) {
      const maxIdx = props.burnedLibrary.length - 1;
      if (modalLibraryCardIdx + d < 0) {
        setModalLibraryCardIdx(maxIdx);
      } else if (modalLibraryCardIdx + d > maxIdx) {
        setModalLibraryCardIdx(0);
      } else {
        setModalLibraryCardIdx(modalLibraryCardIdx + d);
      }
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      animation={false}
      dialogClassName={!isMobile ? 'modal-deck-draw' : null}
    >
      <Modal.Body className="p-0">
        <Container fluid>
          <Row className="px-0 pt-2">
            <Col className="px-0">
              <button
                type="button"
                className="close m-1"
                onClick={props.handleClose}
              >
                <X width="32" height="32" viewBox="0 0 16 16" />
              </button>
              <div className="d-flex justify-content-center">
                <h5>Deck Draw</h5>
              </div>
            </Col>
          </Row>
          <Row className="px-0 pb-4">
            <Col xs={12} md={7} className="px-0 pl-lg-4 pr-lg-3">
              <div className={isMobile ? 'pb-4' : null}>
                <div className="d-flex justify-content-between info-message">
                  <div className="d-flex align-items-center px-2">
                    <b>Uncontrolled</b>
                  </div>
                  <div className="d-flex align-items-center">
                    <b>
                      {props.drawedCrypt.length} + {props.restCrypt.length}
                    </b>
                  </div>
                  <div className="d-flex">
                    <div className="pr-1">
                      <Button
                        variant="outline-secondary"
                        onClick={() => props.handleCryptHandSize(-1)}
                        disabled={props.drawedCrypt.length < 1}
                      >
                        -1
                      </Button>
                    </div>
                    <Button
                      variant="outline-secondary"
                      onClick={props.handleReDrawCrypt}
                      disabled={props.cryptTotal < 4}
                    >
                      <span className="align-items-center">
                        <ArrowRepeat />
                      </span>
                    </Button>
                    <div className="pl-1">
                      <Button
                        variant="outline-secondary"
                        onClick={() => props.handleCryptHandSize(1)}
                        disabled={props.restCrypt.length < 1}
                      >
                        +1
                      </Button>
                    </div>
                  </div>
                </div>
                {props.cryptTotal < 4 && (
                  <div className="d-flex align-items-center justify-content-center error-message p-2 my-2">
                    <b>NOT ENOUGH CARDS FOR INITIAL DRAW</b>
                  </div>
                )}
                <DeckDrawCryptTable
                  handleClick={props.burnCrypt}
                  crypt={props.crypt}
                  total={props.drawedCrypt.length + props.restCrypt.length}
                  resultCards={props.drawedCrypt}
                  className="search-crypt-table"
                />
              </div>
            </Col>
            <Col xs={12} md={5} className="px-0 pl-lg-3 pr-lg-4">
              <div className="d-flex justify-content-between info-message">
                <div className="d-flex align-items-center px-2">
                  <b>Hand</b>
                </div>
                <div className="d-flex align-items-center">
                  <b>
                    {props.drawedLibrary.length} + {props.restLibrary.length}
                  </b>
                </div>
                <div className="d-flex">
                  <div className="pr-1">
                    <Button
                      variant="outline-secondary"
                      onClick={() => props.handleLibraryHandSize(-1)}
                      disabled={props.drawedLibrary.length < 1}
                    >
                      -1
                    </Button>
                  </div>
                  <Button
                    variant="outline-secondary"
                    onClick={props.handleReDrawLibrary}
                    disabled={props.libraryTotal < 7}
                  >
                    <ArrowRepeat />
                  </Button>
                  <div className="pl-1">
                    <Button
                      variant="outline-secondary"
                      onClick={() => props.handleLibraryHandSize(1)}
                      disabled={props.restLibrary.length < 1}
                    >
                      +1
                    </Button>
                  </div>
                </div>
              </div>
              {props.libraryTotal < 7 && (
                <div className="d-flex align-items-center justify-content-center error-message p-2 my-2">
                  <b>NOT ENOUGH CARDS FOR INITIAL DRAW</b>
                </div>
              )}
              <DeckDrawLibraryTable
                handleClick={props.burnLibrary}
                library={props.library}
                total={props.drawedLibrary.length + props.restLibrary.length}
                resultCards={props.drawedLibrary}
                className="search-library-table"
              />
            </Col>
          </Row>
          {(props.burnedCrypt.length > 0 || props.burnedLibrary.length > 0) && (
            <Row className="px-0 pb-4">
              <Col xs={12} md={7} className="px-0 pl-lg-4 pr-lg-3">
                {props.burnedCrypt.length > 0 && (
                  <div className={isMobile ? 'pb-4' : null}>
                    <div className="d-flex justify-content-between info-message">
                      <div className="d-flex align-items-center px-2">
                        <b>Controlled</b>
                      </div>
                      <div className="d-flex align-items-center">
                        <b>{props.burnedCrypt.length}</b>
                      </div>
                      <div />
                    </div>
                    <DeckDrawCryptTable
                      handleClick={handleModalCryptCardOpen}
                      crypt={props.crypt}
                      total={props.drawedCrypt.length + props.restCrypt.length}
                      resultCards={props.burnedCrypt}
                      className="search-crypt-table"
                      ashHeap={true}
                      setModalInventory={setModalInventory}
                    />
                  </div>
                )}
              </Col>
              <Col xs={12} md={5} className="px-0 pl-lg-3 pr-lg-4">
                {props.burnedLibrary.length > 0 && (
                  <>
                    <div className="d-flex justify-content-between info-message">
                      <div className="d-flex align-items-center px-2">
                        <b>Ash Heap</b>
                      </div>
                      <div className="d-flex align-items-center">
                        <b>{props.burnedLibrary.length}</b>
                      </div>
                      <div className="d-flex">
                        <div
                          className="d-flex align-items-center pr-3"
                          title="Total Blood Cost"
                        >
                          <img
                            className="cost-blood-image-results pb-1 pr-1"
                            src={
                              process.env.ROOT_URL + 'images/misc/bloodX.png'
                            }
                          />
                          <b>{props.burnedBloodTotal}</b>
                        </div>
                        <div
                          className="d-flex align-items-center pr-3"
                          title="Total Pool Cost"
                        >
                          <img
                            className="cost-pool-image-results py-1 pr-1"
                            src={process.env.ROOT_URL + 'images/misc/poolX.png'}
                          />
                          <b>{props.burnedPoolTotal}</b>
                        </div>
                      </div>
                    </div>
                    <DeckDrawLibraryTable
                      handleClick={handleModalLibraryCardOpen}
                      library={props.library}
                      total={
                        props.drawedLibrary.length + props.restLibrary.length
                      }
                      resultCards={props.burnedLibrary}
                      className="search-library-table"
                      ashHeap={true}
                    />
                  </>
                )}
              </Col>
            </Row>
          )}
          {modalCryptCardIdx !== undefined && (
            <ResultCryptModal
              card={props.burnedCrypt[modalCryptCardIdx]}
              handleModalCardChange={handleModalCryptCardChange}
              handleClose={() => {
                setModalCryptCardIdx(undefined);
              }}
              inventoryState={modalInventory}
            />
          )}
          {modalLibraryCardIdx !== undefined && (
            <ResultLibraryModal
              card={props.burnedLibrary[modalLibraryCardIdx]}
              handleModalCardChange={handleModalLibraryCardChange}
              handleClose={() => {
                setModalLibraryCardIdx(undefined);
              }}
              inventoryState={modalInventory}
            />
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default DeckDrawModal;
