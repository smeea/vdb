import React, { useState } from 'react';
import {
  DiffLibraryTable,
  ResultLibraryType,
  ResultModal,
  DeckDrawProbability,
  DeckLibraryHeader,
  FlexGapped,
} from '@/components';
import { TYPE_MASTER } from '@/constants';
import { useModalCardController, useDeckLibrary } from '@/hooks';

const ReviewLibrary = ({ cardChange, cardsFrom, cardsTo }) => {
  const [showInfo, setShowInfo] = useState(false);

  const {
    library,
    librarySide,
    libraryByType,
    librarySideByType,
    trifleTotal,
    libraryTotal,
    libraryByTypeTotal,
  } = useDeckLibrary(cardsFrom, cardsTo);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(library, librarySide);

  return (
    <FlexGapped className="flex-col">
      <div className="flex flex-col gap-2">
        <div className="sm:sticky sm:top-10 sm:z-10 sm:bg-bgPrimary sm:dark:bg-bgPrimaryDark">
          <DeckLibraryHeader
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            cardChange={cardChange}
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
                  handleModalCardOpen={handleModalCardOpen}
                  libraryTotal={libraryTotal}
                  showInfo={showInfo}
                  cards={libraryByType[cardtype]}
                  cardsFrom={cardsFrom}
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
                    handleModalCardOpen={handleModalSideCardOpen}
                    cards={librarySideByType[cardtype]}
                    cardsFrom={cardsFrom}
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
          handleClose={handleModalCardClose}
        />
      )}
    </FlexGapped>
  );
};

export default ReviewLibrary;
