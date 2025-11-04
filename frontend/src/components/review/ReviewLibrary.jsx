import {  useState } from "react";
import {
  DeckDrawProbability,
  DeckLibraryHeader,
  DiffLibraryTable,
  FlexGapped,
  ResultLibraryType,
  ResultModal,
} from "@/components";
import { LIBRARY, TYPE_MASTER } from "@/constants";
import { useApp } from "@/context";
import { useDeckLibrary, useModalCardController } from "@/hooks";

const ReviewLibrary = ({ cardChange, deckFrom, cardsTo }) => {
  const { setShowFloatingButtons, isDesktop } = useApp();
  const [showInfo, setShowInfo] = useState(false);

  const {
    library,
    librarySide,
    libraryByType,
    librarySideByType,
    trifleTotal,
    libraryTotal,
    libraryByTypeTotal,
  } = useDeckLibrary(deckFrom[LIBRARY], cardsTo);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(library, librarySide);

  const handleClick =     (card) => {
      handleModalCardOpen(card);
      !isDesktop && setShowFloatingButtons(false);
    }

  const handleClickSide =     (card) => {
      handleModalSideCardOpen(card);
      !isDesktop && setShowFloatingButtons(false);
    }

  const handleClose = () => {
    handleModalCardClose();
    !isDesktop && setShowFloatingButtons(true);
  }

  return (
    <FlexGapped className="flex-col">
      <div className="flex flex-col gap-2">
        <div className="max-md:top-0 sm:sticky md:top-10 md:z-10 md:bg-bgPrimary md:dark:bg-bgPrimaryDark">
          <DeckLibraryHeader
            deck={deckFrom}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            cardChange={cardChange}
            forceIsEditable
          />
        </div>
        <div className="flex flex-col gap-2">
          {Object.keys(libraryByType).map((cardtype) => {
            return (
              <div key={cardtype}>
                <div className="flex justify-between">
                  <ResultLibraryType
                    cardtype={cardtype}
                    total={libraryByTypeTotal[cardtype]}
                    trifleTotal={cardtype === TYPE_MASTER && trifleTotal}
                  />
                  {showInfo && (
                    <div className="sm:p-1">
                      <DeckDrawProbability
                        cardName={cardtype}
                        N={libraryTotal}
                        n={7}
                        k={libraryByTypeTotal[cardtype]}
                      />
                    </div>
                  )}
                </div>
                <DiffLibraryTable
                  isEditable
                  cardChange={cardChange}
                  handleClick={handleClick}
                  libraryTotal={libraryTotal}
                  showInfo={showInfo}
                  cards={libraryByType[cardtype]}
                  cardsFrom={deckFrom[LIBRARY]}
                  cardsTo={cardsTo}
                />
              </div>
            );
          })}
        </div>
      </div>
      {Object.keys(librarySide).length > 0 && (
        <div className="flex flex-col gap-2 opacity-60 dark:opacity-50">
          <div className="flex h-[42px] items-center bg-bgSecondary p-2 font-bold dark:bg-bgSecondaryDark">
            Side Library
          </div>
          <div className="flex flex-col gap-2">
            {Object.keys(librarySideByType).map((cardtype) => {
              return (
                <div key={cardtype}>
                  <ResultLibraryType
                    cardtype={cardtype}
                    total={0}
                    trifleTotal={cardtype === TYPE_MASTER && trifleTotal}
                  />
                  <DiffLibraryTable
                    isEditable
                    cardChange={cardChange}
                    handleClick={handleClickSide}
                    cards={librarySideByType[cardtype]}
                    cardsFrom={deckFrom[LIBRARY]}
                    cardsTo={cardsTo}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleClose}
        />
      )}
    </FlexGapped>
  );
};

export default ReviewLibrary;
