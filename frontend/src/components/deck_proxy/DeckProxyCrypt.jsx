import React from 'react';
import { DeckProxyCryptTable, ResultModal, Header, FlexGapped } from '@/components';
import { countCards } from '@/utils';
import { useApp } from '@/context';
import { useModalCardController, useDeckCrypt } from '@/hooks';
import { INVENTORY_TYPE } from '@/constants';

const DeckProxyCrypt = ({
  deck,
  proxySelected,
  handleProxySelector,
  handleSetSelector,
  handleProxyCounter,
}) => {
  const { cryptDeckSort, setShowFloatingButtons } = useApp();
  const { cryptSide, sortedCards, sortedCardsSide } = useDeckCrypt(deck.crypt, cryptDeckSort);

  const proxiesToPrint = Object.keys(proxySelected)
    .filter(
      (cardid) => cardid > 200000 && proxySelected[cardid].print && proxySelected[cardid].q > 0,
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
    <FlexGapped className="flex-col">
      <div>
        <Header>
          <div className="px-2 font-bold">Crypt [{cryptTotalSelected}]</div>
        </Header>
        <DeckProxyCryptTable
          inventoryType={deck[INVENTORY_TYPE]}
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
            inventoryType={deck[INVENTORY_TYPE]}
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
    </FlexGapped>
  );
};

export default DeckProxyCrypt;
