import React, { useState } from 'react';
import {
  DiffLibraryTable,
  ResultLibraryType,
  ResultModal,
  DeckDrawProbability,
  DeckLibraryHeader,
} from '@/components';
import { MASTER } from '@/utils/constants';
import { useApp } from '@/context';
import { useModalCardController, useDeckLibrary } from '@/hooks';
import { FlexGapped, DiffQuantityDiff } from '@/components';

const BloodPoolDifference = ({ qTo, qFrom }) => {
  return (
    <>
      {qTo === qFrom ? (
        <>{qTo}</>
      ) : (
        <div className="flex">
          {qFrom}
          <DiffQuantityDiff qFrom={qFrom} qTo={qTo} />
        </div>
      )}
    </>
  );
};

const LibraryTotalDifference = ({ qTo, qFrom }) => {
  return (
    <>
      {qTo === qFrom ? (
        <>{qTo}</>
      ) : (
        <div className="flex">
          {qFrom}
          <DiffQuantityDiff qFrom={qFrom} qTo={qTo} />
        </div>
      )}
    </>
  );
};

const DiffLibrary = ({ cardsTo, deck }) => {
  const { isMobile, setShowFloatingButtons } = useApp();
  const [showInfo, setShowInfo] = useState(false);

  const cardsFrom = deck.library;
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;

  const {
    library,
    librarySide,
    libraryByType,
    librarySideByType,
    hasBanned,
    trifleTotal,
    libraryTotal,
    libraryToTotal,
    poolTotal,
    poolToTotal,
    bloodTotal,
    bloodToTotal,
    libraryByTypeTotal,
    libraryByClansTotal,
    libraryByDisciplinesTotal,
  } = useDeckLibrary(cardsFrom, cardsTo);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(library, librarySide);

  const handleClick = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  const handleClickSide = (card) => {
    handleModalSideCardOpen(card);
    setShowFloatingButtons(false);
  };

  const handleClose = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  return (
    <FlexGapped className="flex-col">
      <div className="flex flex-col gap-2">
        <div
          className={!isMobile ? 'sticky z-10 bg-bgPrimary dark:bg-bgPrimaryDark sm:top-10' : ''}
        >
          <DeckLibraryHeader
            libraryTotal={<LibraryTotalDifference qTo={libraryToTotal} qFrom={libraryTotal} />}
            bloodTotal={<BloodPoolDifference qTo={bloodToTotal} qFrom={bloodTotal} />}
            poolTotal={<BloodPoolDifference qTo={poolToTotal} qFrom={poolTotal} />}
            hasBanned={hasBanned}
            isEditable={isEditable}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            cards={library}
            deckid={deckid}
            byTypes={libraryByTypeTotal}
            byClan={libraryByClansTotal}
            byDisciplines={libraryByDisciplinesTotal}
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
                    trifleTotal={cardtype === MASTER && trifleTotal}
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
                  handleClick={handleClick}
                  libraryTotal={libraryTotal}
                  showInfo={showInfo}
                  deckid={deckid}
                  cards={libraryByType[cardtype]}
                  cardsFrom={cardsFrom}
                  cardsTo={cardsTo}
                  isEditable={isEditable}
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
                    trifleTotal={cardtype === MASTER && trifleTotal}
                  />
                  <DiffLibraryTable
                    handleClick={handleClickSide}
                    deckid={deckid}
                    cards={librarySideByType[cardtype]}
                    cardsFrom={cardsFrom}
                    cardsTo={cardsTo}
                    isEditable={isEditable}
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

export default DiffLibrary;
