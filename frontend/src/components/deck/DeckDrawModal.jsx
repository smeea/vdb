import React from 'react';
import { Modal, Button, Col, Stack } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import ArrowRepeat from 'assets/images/icons/arrow-repeat.svg';
import StackIcon from 'assets/images/icons/stack.svg';
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
  const { isNarrow, isMobile } = useApp();

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
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        dialogClassName={isMobile ? 'm-0' : 'modal-wide'}
      >
        <Modal.Header className="no-border pt-2 pt-md-3 pb-0 pb-md-1 ps-2 pe-3 px-md-4">
          <div className="text-lg text-blue font-bold">Deck Draw</div>
          {!isNarrow && (
            <Button variant="outline-secondary" onClick={handleClose}>
              <X width="32" height="32" viewBox="0 0 16 16" />
            </Button>
          )}
        </Modal.Header>
        <Modal.Body className="p-0">
          <div>
            <div className="flex flex-row px-0 pb-md-4">
              <div className="basis-full md:basis-7/12 px-0 ps-lg-4 pe-lg-3">
                <div>
                  <div className="flex justify-between info-message h-10">
                    <div className="flex items-center px-2">
                      <b>Uncontrolled</b>
                    </div>
                    <div className="flex items-center">
                      <b>
                        {drawedCrypt.length} + {restCrypt.length}
                      </b>
                    </div>
                    <div className="flex">
                      <div className="flex items-center pe-2">
                        <b>{initialTransfers}t</b>
                      </div>
                      <Stack direction="horizontal" gap={1}>
                        <Button
                          title="Draw All"
                          variant="primary"
                          onClick={() => handleCryptHandSize(restCrypt.length)}
                          disabled={restCrypt.length < 1}
                        >
                          <StackIcon />
                        </Button>
                        <Button
                          title="Hand Size -1"
                          variant="primary"
                          onClick={() => handleCryptHandSize(-1)}
                          disabled={drawedCrypt.length < 1}
                        >
                          -1
                        </Button>
                        <Button
                          title="Re-Draw"
                          variant="primary"
                          onClick={handleReDrawCrypt}
                          disabled={cryptTotal < 4}
                        >
                          <ArrowRepeat />
                        </Button>
                        <Button
                          title="Hand Size +1"
                          variant="primary"
                          onClick={() => handleCryptHandSize(1)}
                          disabled={restCrypt.length < 1}
                        >
                          +1
                        </Button>
                      </Stack>
                    </div>
                  </div>
                  {cryptTotal < 4 && (
                    <div className="flex items-center justify-center error-message p-2 my-2">
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
              </div>
              <div className="basis-full md:basis-5/12 px-0 ps-lg-3 pe-lg-4 pt-4 pt-md-0">
                <div className="flex justify-between info-message h-10">
                  <div className="flex items-center px-2">
                    <b>Hand</b>
                  </div>
                  <div className="flex items-center">
                    <b>
                      {drawedLibrary.length} + {restLibrary.length}
                    </b>
                  </div>
                  <Stack direction="horizontal" gap={1}>
                    <Button
                      title="Draw All"
                      variant="primary"
                      onClick={() => handleLibraryHandSize(restLibrary.length)}
                      disabled={restLibrary.length < 1}
                    >
                      <StackIcon />
                    </Button>
                    <Button
                      title="Hand Size -1"
                      variant="primary"
                      onClick={() => handleLibraryHandSize(-1)}
                      disabled={drawedLibrary.length < 1}
                    >
                      -1
                    </Button>
                    <Button
                      title="Re-Draw"
                      variant="primary"
                      onClick={handleReDrawLibrary}
                      disabled={libraryTotal < 7}
                    >
                      <ArrowRepeat />
                    </Button>
                    <Button
                      title="Hand Size +1"
                      variant="primary"
                      onClick={() => handleLibraryHandSize(1)}
                      disabled={restLibrary.length < 1}
                    >
                      +1
                    </Button>
                  </Stack>
                </div>
                {libraryTotal < 7 && (
                  <div className="flex items-center justify-center error-message p-2 my-2">
                    <b>NOT ENOUGH CARDS FOR INITIAL DRAW</b>
                  </div>
                )}
                <DeckDrawLibraryTable
                  handleClick={burnLibrary}
                  restCards={restLibrary}
                  resultCards={drawedLibrary}
                  className="search-library-table"
                  placement={isNarrow ? 'bottom' : 'right'}
                />
              </div>
            </div>
            {(burnedCrypt.length > 0 || burnedLibrary.length > 0) && (
              <div className="flex flex-row px-0 pb-md-4">
                <div className="basis-full md:basis-7/12 px-0 ps-lg-4 pe-lg-3">
                  {burnedCrypt.length > 0 && (
                    <div className="pt-4 pt-md-0">
                      <div className="flex justify-between info-message h-10">
                        <div className="flex items-center px-2">
                          <b>Controlled</b>
                        </div>
                        <div className="flex items-center">
                          <b>{burnedCrypt.length}</b>
                        </div>
                        <div
                          className="flex items-center pe-3"
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
                </div>
                <div className="basis-full md:basis-5/12 px-0 ps-lg-3 pe-lg-4">
                  {burnedLibrary.length > 0 && (
                    <div className="pt-4 pt-md-0">
                      <div className="flex justify-between info-message h-10">
                        <div className="flex items-center px-2">
                          <b>Ash Heap</b>
                        </div>
                        <div className="flex items-center">
                          <b>{burnedLibrary.length}</b>
                        </div>
                        <div className="flex">
                          <div
                            className="flex items-center pe-3"
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
                            className="flex items-center pe-3"
                            title="Total Pool Cost"
                          >
                            <img
                              className="cost-pool-image-results py-1 pe-1"
                              src={
                                process.env.ROOT_URL + 'images/misc/poolX.png'
                              }
                            />
                            <b>{burnedPoolTotal}</b>
                          </div>
                        </div>
                      </div>
                      <DeckDrawLibraryTable
                        handleClick={handleModalSideCardOpen}
                        resultCards={burnedLibrary}
                        className="search-library-table"
                        placement={isNarrow ? 'bottom' : 'right'}
                        ashHeap={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            {shouldShowModal && (
              <ResultModal
                card={currentModalCard}
                handleModalCardChange={handleModalCardChange}
                handleClose={handleModalCardClose}
                nested={true}
              />
            )}
          </div>
        </Modal.Body>
      </Modal>
      {isNarrow && (
        <div
          onClick={handleClose}
          className="flex float-right-bottom float-clear items-center justify-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default DeckDrawModal;
