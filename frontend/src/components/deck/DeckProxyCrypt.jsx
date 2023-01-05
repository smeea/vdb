import React from 'react';
import { useSnapshot } from 'valtio';
import { DeckProxyCryptTable, ResultModal } from 'components';
import { useApp } from 'context';
import { countCards } from 'utils';
import { deckStore } from 'context';
import { useModalCardController, useDeckCrypt } from 'hooks';

const DeckProxyCrypt = ({
  deck,
  proxySelected,
  handleProxySelector,
  handleSetSelector,
  handleProxyCounter,
}) => {
  const { cryptDeckSort, setShowFloatingButtons } = useApp();
  const changeTimer = useSnapshot(deckStore).cryptTimer;

  const { cryptSide, sortedCards, sortedCardsSide } = useDeckCrypt(
    deck.crypt,
    cryptDeckSort,
    changeTimer
  );

  const proxiesToPrint = Object.keys(proxySelected)
    .filter(
      (cardid) =>
        cardid > 200000 &&
        proxySelected[cardid].print &&
        proxySelected[cardid].q > 0
    )
    .map((cardid) => proxySelected[cardid]);

  const cryptTotalSelected = countCards(proxiesToPrint);

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards, sortedCardsSide);

  return (
    <>
      <div className="flex items-center justify-between bg-bgSecondary font-bold dark:bg-bgSecondaryDark">
        Crypt [{cryptTotalSelected}]
      </div>
      <DeckProxyCryptTable
        inventoryType={deck.inventoryType}
        handleModalCardOpen={handleModalCardOpen}
        cards={sortedCards}
        handleProxySelector={handleProxySelector}
        handleSetSelector={handleSetSelector}
        handleProxyCounter={handleProxyCounter}
        proxySelected={proxySelected}
      />
      {Object.keys(cryptSide).length > 0 && (
        <div className=" opacity-60">
          <div className="flex items-center justify-between ">
            <b>Side Crypt</b>
          </div>
          <DeckProxyCryptTable
            inventoryType={deck.inventoryType}
            handleModalCardOpen={handleModalSideCardOpen}
            cards={sortedCardsSide}
            handleProxySelector={handleProxySelector}
            handleSetSelector={handleSetSelector}
            handleProxyCounter={handleProxyCounter}
            proxySelected={proxySelected}
          />
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
    </>
  );
};

export default DeckProxyCrypt;
