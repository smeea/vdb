import React from 'react';
import ArrowRepeat from '@/assets/images/icons/arrow-repeat.svg';
import StackIcon from '@/assets/images/icons/stack.svg';
import {
  Button,
  Modal,
  ResultModal,
  DeckDrawCryptTable,
  DeckDrawLibraryTable,
  ResultLibraryCost,
  ResultCryptCapacity,
  ErrorMessage,
} from '@/components';

import { useApp } from '@/context';
import { useModalCardController } from '@/hooks';

const DeckDrawModal = ({
  burnCrypt,
  burnLibrary,
  burnedBloodTotal,
  burnedCapacityTotal,
  burnedCrypt,
  burnedLibrary,
  burnedPoolTotal,
  crypt,
  cryptTotal,
  drawedCrypt,
  drawedLibrary,
  handleClose,
  handleCryptHandSize,
  handleLibraryHandSize,
  handleReDrawCrypt,
  handleReDrawLibrary,
  initialTransfers,
  libraryTotal,
  restCrypt,
  restLibrary,
}) => {
  const { isMobile, isNarrow } = useApp();

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
      handleClose={handleClose}
      title="Deck Draw"
      size="lg"
      noPadding={isMobile}
    >
      <div className="flex flex-col gap-5">
        <div className="flex max-sm:flex-col gap-5">
          <div className="sm:basis-5/9">
            <div>
              <div className="flex h-10 justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
                <div className="flex w-full justify-between px-2">
                  <div className="flex items-center font-bold">
                    Uncontrolled
                  </div>
                  <div
                    className="flex items-center font-bold"
                    title="In Uncontrolled + Remaining in Crypt"
                  >
                    {drawedCrypt.length} + {restCrypt.length}
                  </div>
                  <div
                    className="flex items-center font-bold"
                    title="Initial Transfers"
                  >
                    {initialTransfers}t
                  </div>
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
              {cryptTotal < 4 && (
                <ErrorMessage>NOT ENOUGH CARDS FOR INITIAL DRAW</ErrorMessage>
              )}
              <DeckDrawCryptTable
                crypt={crypt}
                handleClick={burnCrypt}
                restCards={restCrypt}
                resultCards={drawedCrypt}
              />
            </div>
          </div>
          <div className="sm:basis-4/9">
            <div className="flex h-10 justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
              <div className="flex w-full justify-between px-2">
                <div className="flex items-center font-bold">Hand</div>
                <div
                  className="flex items-center font-bold"
                  title="In Hand + Remaining in Library"
                >
                  {drawedLibrary.length} + {restLibrary.length}
                </div>
                <div />
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
              <ErrorMessage>NOT ENOUGH CARDS FOR INITIAL DRAW</ErrorMessage>
            )}
            <DeckDrawLibraryTable
              handleClick={burnLibrary}
              restCards={restLibrary}
              resultCards={drawedLibrary}
              placement={isNarrow ? 'bottom' : 'right'}
            />
          </div>
        </div>
        {(burnedCrypt.length > 0 || burnedLibrary.length > 0) && (
          <div className="flex max-md:flex-col gap-5">
            <div className="md:basis-7/12">
              {burnedCrypt.length > 0 && (
                <div>
                  <div className="flex h-10 justify-between bg-bgSecondary px-2 dark:bg-bgSecondaryDark">
                    <div className="flex items-center font-bold">
                      Controlled
                    </div>
                    <div className="flex items-center font-bold">
                      {burnedCrypt.length}
                    </div>
                    <div className="flex items-center" title="Total Capacity">
                      <ResultCryptCapacity card={{ Capacity: 'X' }} />
                      <b>{burnedCapacityTotal}</b>
                    </div>
                  </div>
                  <DeckDrawCryptTable
                    handleClick={handleModalCardOpen}
                    resultCards={burnedCrypt}
                    ashHeap
                  />
                </div>
              )}
            </div>
            <div className="md:basis-5/12">
              {burnedLibrary.length > 0 && (
                <div>
                  <div className="flex h-10 justify-between bg-bgSecondary px-2 dark:bg-bgSecondaryDark">
                    <div className="flex items-center font-bold">Ash Heap</div>
                    <div className="flex items-center font-bold">
                      {burnedLibrary.length}
                    </div>
                    <div className="flex space-x-3">
                      <div
                        className="flex items-center space-x-1"
                        title="Total Blood Cost"
                      >
                        <ResultLibraryCost
                          valueBlood="X"
                          className="h-[30px] pb-1"
                        />
                        <b>{burnedBloodTotal}</b>
                      </div>
                      <div
                        className="flex items-center space-x-1"
                        title="Total Pool Cost"
                      >
                        <ResultLibraryCost valuePool="X" className="h-[30px]" />
                        <b>{burnedPoolTotal}</b>
                      </div>
                    </div>
                  </div>
                  <DeckDrawLibraryTable
                    handleClick={handleModalSideCardOpen}
                    resultCards={burnedLibrary}
                    placement={isNarrow ? 'bottom' : 'right'}
                    ashHeap
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
          bordered
        />
      )}
    </Modal>
  );
};

export default DeckDrawModal;
