import React from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import ArrowRepeat from 'assets/images/icons/arrow-repeat.svg';
import {
  ResultModal,
  DeckDrawCryptTable,
  DeckDrawLibraryTable,
} from 'components';

import { useApp } from 'context';
import { useModalCardController } from 'hooks';

const DeckDrawModal = ({
  burnedCrypt,
  burnedLibrary,
  restCrypt,
  restLibrary,
  drawedCrypt,
  libraryTotal,
  burnLibrary,
  burnCrypt,
  show,
  keyDisciplines,
  disciplinesSet,
  nonKeyDisciplines,
  burnedCapacityTotal,
  burnedBloodTotal,
  burnedPoolTotal,
  handleClose,
  handleCryptHandSize,
  handleReDrawCrypt,
  drawedLibrary,
  handleLibraryHandSize,
  handleReDrawLibrary,
  initialTransfers,
  cryptTotal,
}) => {
  const { isMobile } = useApp();

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(burnedCrypt, burnedLibrary);

  return (
    <Modal
      show={show}
      onHide={handleClose}
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
        <Button variant="outline-secondary" onClick={handleClose}>
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
                      {drawedCrypt.length} + {restCrypt.length}
                    </b>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex align-items-center pe-2">
                      <b>{initialTransfers}t</b>
                    </div>
                    <div className="pe-1">
                      <Button
                        title="Hand Size -1"
                        variant="primary"
                        onClick={() => handleCryptHandSize(-1)}
                        disabled={drawedCrypt.length < 1}
                      >
                        -1
                      </Button>
                    </div>
                    <Button
                      title="Re-Draw"
                      variant="primary"
                      onClick={handleReDrawCrypt}
                      disabled={cryptTotal < 4}
                    >
                      <span className="align-items-center">
                        <ArrowRepeat />
                      </span>
                    </Button>
                    <div className="ps-1">
                      <Button
                        title="Hand Size +1"
                        variant="primary"
                        onClick={() => handleCryptHandSize(1)}
                        disabled={restCrypt.length < 1}
                      >
                        +1
                      </Button>
                    </div>
                  </div>
                </div>
                {cryptTotal < 4 && (
                  <div className="d-flex align-items-center justify-content-center error-message p-2 my-2">
                    <b>NOT ENOUGH CARDS FOR INITIAL DRAW</b>
                  </div>
                )}
                <DeckDrawCryptTable
                  handleClick={burnCrypt}
                  restCards={restCrypt}
                  resultCards={drawedCrypt}
                  className="deck-crypt-table"
                  disciplinesSet={disciplinesSet}
                  keyDisciplines={keyDisciplines}
                  nonKeyDisciplines={nonKeyDisciplines}
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
                    {drawedLibrary.length} + {restLibrary.length}
                  </b>
                </div>
                <div className="d-flex">
                  <div className="pe-1">
                    <Button
                      title="Hand Size -1"
                      variant="primary"
                      onClick={() => handleLibraryHandSize(-1)}
                      disabled={drawedLibrary.length < 1}
                    >
                      -1
                    </Button>
                  </div>
                  <Button
                    title="Re-Draw"
                    variant="primary"
                    onClick={handleReDrawLibrary}
                    disabled={libraryTotal < 7}
                  >
                    <ArrowRepeat />
                  </Button>
                  <div className="ps-1">
                    <Button
                      title="Hand Size +1"
                      variant="primary"
                      onClick={() => handleLibraryHandSize(1)}
                      disabled={restLibrary.length < 1}
                    >
                      +1
                    </Button>
                  </div>
                </div>
              </div>
              {libraryTotal < 7 && (
                <div className="d-flex align-items-center justify-content-center error-message p-2 my-2">
                  <b>NOT ENOUGH CARDS FOR INITIAL DRAW</b>
                </div>
              )}
              <DeckDrawLibraryTable
                handleClick={burnLibrary}
                restCards={restLibrary}
                resultCards={drawedLibrary}
                className="search-library-table"
              />
            </Col>
          </Row>
          {(burnedCrypt.length > 0 || burnedLibrary.length > 0) && (
            <Row className={isMobile ? 'px-0' : 'px-0 pb-4'}>
              <Col xs={12} md={7} className="px-0 ps-lg-4 pe-lg-3">
                {burnedCrypt.length > 0 && (
                  <div className="pt-4 pt-md-0">
                    <div className="d-flex justify-content-between title-line">
                      <div className="d-flex align-items-center px-2">
                        <b>Controlled</b>
                      </div>
                      <div className="d-flex align-items-center">
                        <b>{burnedCrypt.length}</b>
                      </div>
                      <div
                        className="d-flex align-items-center pe-3"
                        title="Total Capacity"
                      >
                        <img
                          className="capacity-image-results pe-1"
                          src={process.env.ROOT_URL + 'images/misc/capX.png'}
                        />
                        <b>{burnedCapacityTotal}</b>
                      </div>
                    </div>
                    <DeckDrawCryptTable
                      handleClick={handleModalCardOpen}
                      resultCards={burnedCrypt}
                      className="search-crypt-table"
                      ashHeap={true}
                      disciplinesSet={disciplinesSet}
                      keyDisciplines={keyDisciplines}
                      nonKeyDisciplines={nonKeyDisciplines}
                    />
                  </div>
                )}
              </Col>
              <Col xs={12} md={5} className="px-0 ps-lg-3 pe-lg-4">
                {burnedLibrary.length > 0 && (
                  <div className="pt-4 pt-md-0">
                    <div className="d-flex justify-content-between title-line">
                      <div className="d-flex align-items-center px-2">
                        <b>Ash Heap</b>
                      </div>
                      <div className="d-flex align-items-center">
                        <b>{burnedLibrary.length}</b>
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
                          <b>{burnedBloodTotal}</b>
                        </div>
                        <div
                          className="d-flex align-items-center pe-3"
                          title="Total Pool Cost"
                        >
                          <img
                            className="cost-pool-image-results py-1 pe-1"
                            src={process.env.ROOT_URL + 'images/misc/poolX.png'}
                          />
                          <b>{burnedPoolTotal}</b>
                        </div>
                      </div>
                    </div>
                    <DeckDrawLibraryTable
                      handleClick={handleModalSideCardOpen}
                      resultCards={burnedLibrary}
                      className="search-library-table"
                      ashHeap={true}
                    />
                  </div>
                )}
              </Col>
            </Row>
          )}
          {shouldShowModal && (
            <ResultModal
              card={currentModalCard}
              handleModalCardChange={handleModalCardChange}
              handleClose={handleModalCardClose}
              nested={true}
            />
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default DeckDrawModal;
