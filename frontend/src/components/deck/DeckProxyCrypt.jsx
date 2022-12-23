import React from 'react';
import { useSnapshot } from 'valtio';
import { DeckProxyCryptTable, ResultModal } from 'components';
import { useApp } from 'context';
import { countCards } from 'utils';
import { deckStore } from 'context';
import { useModalCardController, useDeckCrypt } from 'hooks';

const DeckProxyCrypt = ({
  cards,
  proxySelected,
  handleProxySelector,
  handleSetSelector,
  handleProxyCounter,
}) => {
  const { cryptDeckSort, isMobile, setShowFloatingButtons } = useApp();
  const changeTimer = useSnapshot(deckStore).cryptTimer;

  const { cryptSide, sortedCards, sortedCardsSide } = useDeckCrypt(
    cards,
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
      <div
        className={`ps-2 bg-bgSecondary dark:bg-bgSecondaryDark flex items-center justify-between  ${
          isMobile ? '' : ''
        }`}
      >
        <b>Crypt [{cryptTotalSelected}]</b>
      </div>
      <DeckProxyCryptTable
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
