import React, { useState, useContext } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import ArrowRepeat from '../../assets/images/icons/arrow-repeat.svg';
import ResultCryptModal from './ResultCryptModal.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';
import DeckDrawCryptTable from './DeckDrawCryptTable.jsx';
import DeckDrawLibraryTable from './DeckDrawLibraryTable.jsx';
import AppContext from '../../context/AppContext';

function DeckDrawModal(props) {
  const { isMobile } = useContext(AppContext);

  const [modalCryptCardIdx, setModalCryptCardIdx] = useState(undefined);
  const [modalLibraryCardIdx, setModalLibraryCardIdx] = useState(undefined);

  const handleModalCryptCardOpen = (i) => {
    setModalCryptCardIdx(i);
  };

  const handleModalLibraryCardOpen = (i) => {
    setModalLibraryCardIdx(i);
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
      dialogClassName={isMobile ? 'm-0' : 'modal-wide'}
    >
      <Modal.Header
        className={
          isMobile
            ? 'no-border pt-2 pb-0 ps-2 pe-3'
            : 'no-border pt-3 pb-1 px-4'
        }
      >
        <h5>Deck Draw</h5>
        <Button variant="outline-secondary" onClick={props.handleClose}>
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Container fluid>
          <Row className={isMobile ? 'px-0' : 'px-0 pb-4'}>
            <Col xs={12} md={7} className="px-0 ps-lg-4 pe-lg-3">
              <div>
                <div className="d-flex justify-content-between title-line">
                  <div className="d-flex align-items-center px-2">
                    <b>Uncontrolled</b>
                  </div>
                  <div className="d-flex align-items-center">
                    <b>
                      {props.drawedCrypt.length} + {props.restCrypt.length}
                    </b>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex align-items-center pe-2">
                      <b>{props.initialTransfers}t</b>
                    </div>
                    <div className="pe-1">
                      <Button
                        title="Hand Size -1"
                        variant="primary"
                        onClick={() => props.handleCryptHandSize(-1)}
                        disabled={props.drawedCrypt.length < 1}
                      >
                        -1
                      </Button>
                    </div>
                    <Button
                      title="Re-Draw"
                      variant="primary"
                      onClick={props.handleReDrawCrypt}
                      disabled={props.cryptTotal < 4}
                    >
                      <span className="align-items-center">
                        <ArrowRepeat />
                      </span>
                    </Button>
                    <div className="ps-1">
                      <Button
                        title="Hand Size +1"
                        variant="primary"
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
                  restCards={props.restCrypt}
                  resultCards={props.drawedCrypt}
                  className="deck-crypt-table"
                  disciplinesSet={props.disciplinesSet}
                  keyDisciplines={props.keyDisciplines}
                  nonKeyDisciplines={props.nonKeyDisciplines}
                />
              </div>
            </Col>
            <Col xs={12} md={5} className="px-0 ps-lg-3 pe-lg-4 pt-4 pt-md-0">
              <div className="d-flex justify-content-between title-line">
                <div className="d-flex align-items-center px-2">
                  <b>Hand</b>
                </div>
                <div className="d-flex align-items-center">
                  <b>
                    {props.drawedLibrary.length} + {props.restLibrary.length}
                  </b>
                </div>
                <div className="d-flex">
                  <div className="pe-1">
                    <Button
                      title="Hand Size -1"
                      variant="primary"
                      onClick={() => props.handleLibraryHandSize(-1)}
                      disabled={props.drawedLibrary.length < 1}
                    >
                      -1
                    </Button>
                  </div>
                  <Button
                    title="Re-Draw"
                    variant="primary"
                    onClick={props.handleReDrawLibrary}
                    disabled={props.libraryTotal < 7}
                  >
                    <ArrowRepeat />
                  </Button>
                  <div className="ps-1">
                    <Button
                      title="Hand Size +1"
                      variant="primary"
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
                restCards={props.restLibrary}
                resultCards={props.drawedLibrary}
                className="search-library-table"
              />
            </Col>
          </Row>
          {(props.burnedCrypt.length > 0 || props.burnedLibrary.length > 0) && (
            <Row className={isMobile ? 'px-0' : 'px-0 pb-4'}>
              <Col xs={12} md={7} className="px-0 ps-lg-4 pe-lg-3">
                {props.burnedCrypt.length > 0 && (
                  <div className="pt-4 pt-md-0">
                    <div className="d-flex justify-content-between title-line">
                      <div className="d-flex align-items-center px-2">
                        <b>Controlled</b>
                      </div>
                      <div className="d-flex align-items-center">
                        <b>{props.burnedCrypt.length}</b>
                      </div>
                      <div
                        className="d-flex align-items-center pe-3"
                        title="Total Capacity"
                      >
                        <img
                          className="capacity-image-results pe-1"
                          src={process.env.ROOT_URL + 'images/misc/capX.png'}
                        />
                        <b>{props.burnedCapacityTotal}</b>
                      </div>
                    </div>
                    <DeckDrawCryptTable
                      handleClick={handleModalCryptCardOpen}
                      resultCards={props.burnedCrypt}
                      className="search-crypt-table"
                      ashHeap={true}
                      disciplinesSet={props.disciplinesSet}
                      keyDisciplines={props.keyDisciplines}
                      nonKeyDisciplines={props.nonKeyDisciplines}
                    />
                  </div>
                )}
              </Col>
              <Col xs={12} md={5} className="px-0 ps-lg-3 pe-lg-4">
                {props.burnedLibrary.length > 0 && (
                  <div className="pt-4 pt-md-0">
                    <div className="d-flex justify-content-between title-line">
                      <div className="d-flex align-items-center px-2">
                        <b>Ash Heap</b>
                      </div>
                      <div className="d-flex align-items-center">
                        <b>{props.burnedLibrary.length}</b>
                      </div>
                      <div className="d-flex">
                        <div
                          className="d-flex align-items-center pe-3"
                          title="Total Blood Cost"
                        >
                          <img
                            className="cost-blood-image-results pb-1 pe-1"
                            src={
                              process.env.ROOT_URL + 'images/misc/bloodX.png'
                            }
                          />
                          <b>{props.burnedBloodTotal}</b>
                        </div>
                        <div
                          className="d-flex align-items-center pe-3"
                          title="Total Pool Cost"
                        >
                          <img
                            className="cost-pool-image-results py-1 pe-1"
                            src={process.env.ROOT_URL + 'images/misc/poolX.png'}
                          />
                          <b>{props.burnedPoolTotal}</b>
                        </div>
                      </div>
                    </div>
                    <DeckDrawLibraryTable
                      handleClick={handleModalLibraryCardOpen}
                      resultCards={props.burnedLibrary}
                      className="search-library-table"
                      ashHeap={true}
                    />
                  </div>
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
              inDraw={true}
            />
          )}
          {modalLibraryCardIdx !== undefined && (
            <ResultLibraryModal
              card={props.burnedLibrary[modalLibraryCardIdx]}
              handleModalCardChange={handleModalLibraryCardChange}
              handleClose={() => {
                setModalLibraryCardIdx(undefined);
              }}
              inDraw={true}
            />
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default DeckDrawModal;
