import ArrowRepeat from "@icons/arrow-repeat.svg?react";
import StackIcon from "@icons/stack.svg?react";
import {
  Button,
  DeckDrawCryptTable,
  DeckDrawLibraryTable,
  ErrorMessage,
  FlexGapped,
  Header,
  Modal,
  ResultCryptCapacity,
  ResultLibraryCost,
  ResultModal,
} from "@/components";
import { BLOOD, CAPACITY, POOL, X } from "@/constants";
import { useApp } from "@/context";
import { useModalCardController } from "@/hooks";
import { countCards } from "@/utils";

const DeckDrawModal = ({
  burnedCrypt,
  burnedLibrary,
  drawedCrypt,
  drawedLibrary,
  restCrypt,
  restLibrary,
  handleBurnCrypt,
  handleBurnLibrary,
  handleCryptHandSize,
  handleLibraryHandSize,
  handleReDrawCrypt,
  handleReDrawLibrary,
  initialTransfers,
  handleClose,
}) => {
  const { isMobile, isNarrow } = useApp();

  const cryptTotal = countCards([...drawedCrypt, ...restCrypt, ...burnedCrypt]);
  const libraryTotal = countCards([...drawedLibrary, ...restLibrary, ...burnedLibrary]);

  let burnedCapacityTotal = 0;
  burnedCrypt.forEach((card) => {
    burnedCapacityTotal += Number.parseInt(card[CAPACITY]);
  });

  let burnedPoolTotal = 0;
  let burnedBloodTotal = 0;
  burnedLibrary.forEach((card) => {
    if (card[BLOOD] && Number.isInteger(card[BLOOD])) {
      burnedBloodTotal += Number.parseInt(card[BLOOD]);
    }
    if (card[POOL] && Number.isInteger(card[POOL])) {
      burnedPoolTotal += Number.parseInt(card[POOL]);
    }
  });

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(burnedCrypt, burnedLibrary);

  return (
    <Modal size="lg" handleClose={handleClose} title="Deck Draw" noPadding={isMobile}>
      <FlexGapped className="flex-col">
        <FlexGapped className="max-md:flex-col">
          <div className="basis-full sm:basis-5/9">
            <div>
              <Header>
                <div className="flex w-full justify-between px-2">
                  <div className="flex items-center font-bold">Uncontrolled</div>
                  <div
                    className="flex items-center font-bold"
                    title="In Uncontrolled + Remaining in Crypt"
                  >
                    {drawedCrypt.length} + {restCrypt.length}
                  </div>
                  <div className="flex items-center font-bold" title="Initial Transfers">
                    {initialTransfers}t
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    title="Draw All"
                    onClick={() => handleCryptHandSize(restCrypt.length)}
                    disabled={restCrypt.length < 1}
                  >
                    <StackIcon />
                  </Button>
                  <Button
                    title="Hand Size -1"
                    onClick={() => handleCryptHandSize(-1)}
                    disabled={drawedCrypt.length < 1}
                  >
                    -1
                  </Button>
                  <Button title="Re-Draw" onClick={handleReDrawCrypt} disabled={cryptTotal < 4}>
                    <ArrowRepeat />
                  </Button>
                  <Button
                    title="Hand Size +1"
                    onClick={() => handleCryptHandSize(1)}
                    disabled={restCrypt.length < 1}
                  >
                    +1
                  </Button>
                </div>
              </Header>
              {cryptTotal < 4 && <ErrorMessage>NOT ENOUGH CARDS FOR INITIAL DRAW</ErrorMessage>}
              <DeckDrawCryptTable
                handleClick={handleBurnCrypt}
                restCards={restCrypt}
                resultCards={drawedCrypt}
              />
            </div>
          </div>
          <div className="basis-full sm:basis-4/9">
            <Header>
              <div className="flex w-full justify-between px-2">
                <div className="flex items-center font-bold">Hand</div>
                <div className="flex items-center font-bold" title="In Hand + Remaining in Library">
                  {drawedLibrary.length} + {restLibrary.length}
                </div>
                <div />
              </div>
              <div className="flex gap-1">
                <Button
                  title="Draw All"
                  onClick={() => handleLibraryHandSize(restLibrary.length)}
                  disabled={restLibrary.length < 1}
                >
                  <StackIcon />
                </Button>
                <Button
                  title="Hand Size -1"
                  onClick={() => handleLibraryHandSize(-1)}
                  disabled={drawedLibrary.length < 1}
                >
                  -1
                </Button>
                <Button title="Re-Draw" onClick={handleReDrawLibrary} disabled={libraryTotal < 7}>
                  <ArrowRepeat />
                </Button>
                <Button
                  title="Hand Size +1"
                  onClick={() => handleLibraryHandSize(1)}
                  disabled={restLibrary.length < 1}
                >
                  +1
                </Button>
              </div>
            </Header>
            {libraryTotal < 7 && <ErrorMessage>NOT ENOUGH CARDS FOR INITIAL DRAW</ErrorMessage>}
            <DeckDrawLibraryTable
              handleClick={handleBurnLibrary}
              restCards={restLibrary}
              resultCards={drawedLibrary}
              placement={isNarrow ? "bottom" : "right"}
            />
          </div>
        </FlexGapped>
        {(burnedCrypt.length > 0 || burnedLibrary.length > 0) && (
          <FlexGapped className="max-md:flex-col">
            <div className="md:basis-5/9">
              {burnedCrypt.length > 0 && (
                <div>
                  <div className="flex h-10 justify-between bg-bgSecondary px-2 text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgPrimaryDark">
                    <div className="flex items-center font-bold">Controlled</div>
                    <div className="flex items-center font-bold">{burnedCrypt.length}</div>
                    <div className="flex items-center gap-1" title="Total Capacity">
                      <ResultCryptCapacity card={{ [CAPACITY]: X }} />
                      <b>{burnedCapacityTotal}</b>
                    </div>
                  </div>
                  <DeckDrawCryptTable
                    handleClick={handleModalCardOpen}
                    shouldShowModal={shouldShowModal}
                    resultCards={burnedCrypt}
                    ashHeap
                  />
                </div>
              )}
            </div>
            <div className="md:basis-4/9">
              {burnedLibrary.length > 0 && (
                <div>
                  <div className="flex h-10 justify-between bg-bgSecondary px-2 text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgPrimaryDark">
                    <div className="flex items-center font-bold">Ash Heap</div>
                    <div className="flex items-center font-bold">{burnedLibrary.length}</div>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-1" title="Total Blood Cost">
                        <ResultLibraryCost card={{ [BLOOD]: X }} className="h-[30px] pb-1" />
                        <b>{burnedBloodTotal}</b>
                      </div>
                      <div className="flex items-center gap-1" title="Total Pool Cost">
                        <ResultLibraryCost card={{ [POOL]: X }} className="h-[30px]" />
                        <b>{burnedPoolTotal}</b>
                      </div>
                    </div>
                  </div>
                  <DeckDrawLibraryTable
                    handleClick={handleModalSideCardOpen}
                    shouldShowModal={shouldShowModal}
                    resultCards={burnedLibrary}
                    placement={isNarrow ? "bottom" : "right"}
                    ashHeap
                  />
                </div>
              )}
            </div>
          </FlexGapped>
        )}
      </FlexGapped>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
        />
      )}
    </Modal>
  );
};

export default DeckDrawModal;
