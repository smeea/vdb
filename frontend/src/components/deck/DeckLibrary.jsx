import { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  DeckDrawProbability,
  DeckLibraryHeader,
  DeckLibraryTable,
  FlexGapped,
  ResultLibraryType,
  ResultModal,
} from "@/components";
import { LIBRARY, TYPE_MASTER } from "@/constants";
import { useApp } from "@/context";
import { useDeckLibrary, useModalCardController } from "@/hooks";

const DeckLibrary = ({ inTwd, inSearch, inPreview, inMissing, deck }) => {
  const { setShowFloatingButtons, isDesktop, isMobile, isNarrow } = useApp();
  const [showInfo, setShowInfo] = useState(false);

  const {
    library,
    librarySide,
    libraryByType,
    librarySideByType,
    trifleTotal,
    libraryTotal,
    libraryByTypeTotal,
  } = useDeckLibrary(deck[LIBRARY]);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(library, librarySide);

  const handleClick = useCallback(
    (card) => {
      handleModalCardOpen(card);
      !isDesktop && setShowFloatingButtons(false);
    },
    [library, librarySide],
  );

  const handleClickSide = useCallback(
    (card) => {
      handleModalSideCardOpen(card);
      !isDesktop && setShowFloatingButtons(false);
    },
    [library, librarySide],
  );

  const handleClose = useCallback(() => {
    handleModalCardClose();
    !isDesktop && setShowFloatingButtons(true);
  }, [library, librarySide]);

  return (
    <FlexGapped className="flex-col">
      <div className="flex flex-col gap-2">
        <div
          className={twMerge(
            !inPreview &&
              !inMissing &&
              !inSearch &&
              !isMobile &&
              "sticky top-10 z-10 bg-bgPrimary max-md:top-0 dark:bg-bgPrimaryDark",
            inTwd && "hidden"
          )}
        >
          <DeckLibraryHeader
            inMissing={inMissing}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            deck={deck}
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
                <DeckLibraryTable
                  deck={deck}
                  handleClick={handleClick}
                  libraryTotal={libraryTotal}
                  showInfo={showInfo}
                  cards={libraryByType[cardtype]}
                  inMissing={inMissing}
                  inSearch={inSearch}
                  shouldShowModal={shouldShowModal}
                  inTwd={inTwd}
                />
              </div>
            );
          })}
        </div>
      </div>
      {librarySide.length > 0 && (
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
                  <DeckLibraryTable
                    deck={deck}
                    handleClick={handleClickSide}
                    cards={librarySideByType[cardtype]}
                    inMissing={inMissing}
                    inSearch={inSearch}
                    placement={isNarrow ? "bottom" : "right"}
                    shouldShowModal={shouldShowModal}
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

export default DeckLibrary;
