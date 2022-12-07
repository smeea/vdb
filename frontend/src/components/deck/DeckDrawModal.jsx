import React from 'react';
import X from 'assets/images/icons/x.svg';
import ArrowRepeat from 'assets/images/icons/arrow-repeat.svg';
import StackIcon from 'assets/images/icons/stack.svg';
import {
  Button,
  Modal,
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
        handleClose={handleClose}
        dialogClassName={isMobile ? 'm-0' : 'modal-wide'}
        title="Deck Draw"
      >
        <div>
          <div className="pb-md-4 flex flex-row px-0">
            <div className="ps-lg-4 pe-lg-3 basis-full px-0 md:basis-7/12">
              <div>
                <div className="info-message flex h-10 justify-between">
                  <div className="flex items-center px-2">
                    <b>Uncontrolled</b>
                  </div>
                  <div className="flex items-center">
                    <b>
                      {drawedCrypt.length} + {restCrypt.length}
                    </b>
                  </div>
                  <div className="flex">
                    <div className="pe-2 flex items-center">
                      <b>{initialTransfers}t</b>
                    </div>
                    <div className="flex flex-row space-x-1">
                      <Button
                        variant="primary"
                        title="Draw All"
                        onClick={() => handleCryptHandSize(restCrypt.length)}
                        disabled={restCrypt.length < 1}
                      >
                        <StackIcon />
                      </Button>
                      <Button
                        variant="primary"
                        title="Hand Size -1"
                        onClick={() => handleCryptHandSize(-1)}
                        disabled={drawedCrypt.length < 1}
                      >
                        -1
                      </Button>
                      <Button
                        variant="primary"
                        title="Re-Draw"
                        onClick={handleReDrawCrypt}
                        disabled={cryptTotal < 4}
                      >
                        <ArrowRepeat />
                      </Button>
                      <Button
                        variant="primary"
                        title="Hand Size +1"
                        onClick={() => handleCryptHandSize(1)}
                        disabled={restCrypt.length < 1}
                      >
                        +1
                      </Button>
                    </div>
                  </div>
                </div>
                {cryptTotal < 4 && (
                  <div className="error-message my-2 flex items-center justify-center p-2">
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
            <div className="ps-lg-3 pe-lg-4 pt-md-0 basis-full px-0 pt-4 md:basis-5/12">
              <div className="info-message flex h-10 justify-between">
                <div className="flex items-center px-2">
                  <b>Hand</b>
                </div>
                <div className="flex items-center">
                  <b>
                    {drawedLibrary.length} + {restLibrary.length}
                  </b>
                </div>
                <div className="flex flex-row space-x-1">
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
                </div>
              </div>
              {libraryTotal < 7 && (
                <div className="error-message my-2 flex items-center justify-center p-2">
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
            <div className="pb-md-4 flex flex-row px-0">
              <div className="ps-lg-4 pe-lg-3 basis-full px-0 md:basis-7/12">
                {burnedCrypt.length > 0 && (
                  <div className="pt-md-0 pt-4">
                    <div className="info-message flex h-10 justify-between">
                      <div className="flex items-center px-2">
                        <b>Controlled</b>
                      </div>
                      <div className="flex items-center">
                        <b>{burnedCrypt.length}</b>
                      </div>
                      <div
                        className="pe-3 flex items-center"
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
              <div className="ps-lg-3 pe-lg-4 basis-full px-0 md:basis-5/12">
                {burnedLibrary.length > 0 && (
                  <div className="pt-md-0 pt-4">
                    <div className="info-message flex h-10 justify-between">
                      <div className="flex items-center px-2">
                        <b>Ash Heap</b>
                      </div>
                      <div className="flex items-center">
                        <b>{burnedLibrary.length}</b>
                      </div>
                      <div className="flex">
                        <div
                          className="pe-3 flex items-center"
                          title="Total Blood Cost"
                        >
                          <img
                            className="cost-blood-image-results pe-1 pb-1"
                            src={
                              process.env.ROOT_URL + 'images/misc/bloodX.png'
                            }
                          />
                          <b>{burnedBloodTotal}</b>
                        </div>
                        <div
                          className="pe-3 flex items-center"
                          title="Total Pool Cost"
                        >
                          <img
                            className="cost-pool-image-results pe-1 py-1"
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
                      placement={isNarrow ? 'bottom' : 'right'}
                      ashHeap
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
              nested
            />
          )}
        </div>
      </Modal>
      {isNarrow && (
        <div
          onClick={handleClose}
          className="float-right-bottom float-clear flex items-center justify-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default DeckDrawModal;
