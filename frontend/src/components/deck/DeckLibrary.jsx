import React, { useState } from 'react';
import {
  DeckLibraryTable,
  ResultLibraryType,
  ResultModal,
  DeckDrawProbability,
  DeckLibraryHeader,
  FlexGapped,
} from '@/components';
import { useApp } from '@/context';
import { MASTER } from '@/utils/constants';
import { useModalCardController, useDeckLibrary } from '@/hooks';

const DeckLibrary = ({ inSearch, inPreview, inMissing, deck }) => {
  const { setShowFloatingButtons, isMobile, isNarrow } = useApp();
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;
  const [showInfo, setShowInfo] = useState(false);

  const {
    library,
    librarySide,
    libraryByType,
    librarySideByType,
    hasBanned,
    hasLimited,
    hasPlaytest,
    hasIllegalDate,
    trifleTotal,
    libraryTotal,
    poolTotal,
    bloodTotal,
    libraryByTypeTotal,
    libraryByClansTotal,
    libraryByDisciplinesTotal,
  } = useDeckLibrary(deck.library);

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
          className={
            !inPreview && !inMissing && !inSearch && !isMobile
              ? 'sticky z-10 bg-bgPrimary dark:bg-bgPrimaryDark sm:top-10'
              : ''
          }
        >
          <DeckLibraryHeader
            libraryTotal={libraryTotal}
            inMissing={inMissing}
            bloodTotal={bloodTotal}
            poolTotal={poolTotal}
            hasBanned={hasBanned}
            hasLimited={hasLimited}
            hasPlaytest={hasPlaytest}
            hasIllegalDate={hasIllegalDate}
            isEditable={isEditable}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            cards={library}
            deckid={deckid}
            byTypes={libraryByTypeTotal}
            byClans={libraryByClansTotal}
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
                    <DeckDrawProbability
                      cardName={cardtype}
                      N={libraryTotal}
                      n={7}
                      k={libraryByTypeTotal[cardtype]}
                    />
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
                    trifleTotal={cardtype === MASTER && trifleTotal}
                  />
                  <DeckLibraryTable
                    deck={deck}
                    handleClick={handleClickSide}
                    cards={librarySideByType[cardtype]}
                    inMissing={inMissing}
                    inSearch={inSearch}
                    placement={isNarrow ? 'bottom' : 'right'}
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
