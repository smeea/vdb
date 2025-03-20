import { useCallback } from 'react';
import {
  DeckProxyLibraryTable,
  FlexGapped,
  Header,
  ResultLibraryType,
  ResultModal,
} from '@/components';
import { INVENTORY_TYPE, LIBRARY, PRINT, TYPE_MASTER } from '@/constants';
import { useApp } from '@/context';
import { useDeckLibrary, useModalCardController } from '@/hooks';
import { countCards } from '@/utils';

const DeckProxyLibrary = ({
  deck,
  proxySelected,
  handleSetSelector,
  handleProxyCounter,
  handleProxySelector,
}) => {
  const { setShowFloatingButtons, isDesktop } = useApp();

  const {
    library,
    librarySide,
    libraryByType,
    librarySideByType,
    trifleTotal,
    libraryByTypeTotal,
  } = useDeckLibrary(deck[LIBRARY]);

  const proxiesToPrint = Object.keys(proxySelected)
    .filter(
      (cardid) => cardid < 200000 && proxySelected[cardid][PRINT] && proxySelected[cardid].q > 0,
    )
    .map((cardid) => proxySelected[cardid]);

  const libraryTotalSelected = countCards(proxiesToPrint);

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
        <Header>
          <div className="px-2 font-bold">Library [{libraryTotalSelected}]</div>
        </Header>
        {Object.keys(libraryByType).map((cardtype) => {
          return (
            <div key={cardtype}>
              <div className="flex justify-between">
                <ResultLibraryType
                  cardtype={cardtype}
                  total={libraryByTypeTotal[cardtype]}
                  trifleTotal={cardtype === TYPE_MASTER && trifleTotal}
                />
              </div>
              <DeckProxyLibraryTable
                inventoryType={deck[INVENTORY_TYPE]}
                handleClick={handleClick}
                cards={libraryByType[cardtype]}
                handleProxySelector={handleProxySelector}
                handleSetSelector={handleSetSelector}
                handleProxyCounter={handleProxyCounter}
                proxySelected={proxySelected}
              />
            </div>
          );
        })}
      </div>
      {librarySide.length > 0 && (
        <div className="flex flex-col gap-2 opacity-60 dark:opacity-50">
          <Header>
            <div className="px-2 font-bold">Side Library</div>
          </Header>
          {Object.keys(librarySideByType).map((cardtype) => {
            return (
              <div key={cardtype}>
                <ResultLibraryType
                  cardtype={cardtype}
                  total={0}
                  trifleTotal={cardtype === TYPE_MASTER && trifleTotal}
                />
                <DeckProxyLibraryTable
                  inventoryType={deck[INVENTORY_TYPE]}
                  handleClick={handleClickSide}
                  cards={librarySideByType[cardtype]}
                  handleProxySelector={handleProxySelector}
                  handleSetSelector={handleSetSelector}
                  handleProxyCounter={handleProxyCounter}
                  proxySelected={proxySelected}
                />
              </div>
            );
          })}
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

export default DeckProxyLibrary;
