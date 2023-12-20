import React from 'react';
import { useSnapshot } from 'valtio';
import { DeckProxyCryptTable, ResultModal, Header } from '@/components';
import { useApp } from '@/context';
import { countCards } from '@/utils';
import { deckStore } from '@/context';
import { useModalCardController, useDeckCrypt } from '@/hooks';

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
    changeTimer,
  );

  const proxiesToPrint = Object.keys(proxySelected)
    .filter(
      (cardid) =>
        cardid > 200000 &&
        proxySelected[cardid].print &&
        proxySelected[cardid].q > 0,
    )
    .map((cardid) => proxySelected[cardid]);

  const cryptTotalSelected = countCards(proxiesToPrint);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards, sortedCardsSide);

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
    <div className="flex flex-col sm:gap-4 lg:gap-6 xl:gap-8">
      <div>
        <Header>
          <div className="px-2 font-bold">Crypt [{cryptTotalSelected}]</div>
        </Header>
        <DeckProxyCryptTable
          inventoryType={deck.inventoryType}
          handleClick={handleClick}
          cards={sortedCards}
          handleProxySelector={handleProxySelector}
          handleSetSelector={handleSetSelector}
          handleProxyCounter={handleProxyCounter}
          proxySelected={proxySelected}
        />
      </div>
      {Object.keys(cryptSide).length > 0 && (
        <div className="opacity-60 dark:opacity-50">
          <Header>
            <div className="px-2 font-bold">Side Crypt</div>
          </Header>
          <DeckProxyCryptTable
            inventoryType={deck.inventoryType}
            handleClick={handleClickSide}
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
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default DeckProxyCrypt;
