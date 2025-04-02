import { useCallback } from "react";
import { DeckProxyCryptTable, FlexGapped, Header, ResultModal } from "@/components";
import { CRYPT, INVENTORY_TYPE, PRINT } from "@/constants";
import { useApp } from "@/context";
import { useDeckCrypt, useModalCardController } from "@/hooks";
import { countCards } from "@/utils";

const DeckProxyCrypt = ({
  deck,
  proxySelected,
  handleProxySelector,
  handleSetSelector,
  handleProxyCounter,
}) => {
  const { cryptDeckSort, setShowFloatingButtons, isDesktop } = useApp();
  const { cryptSide, sortedCards, sortedCardsSide } = useDeckCrypt(deck[CRYPT], cryptDeckSort);

  const proxiesToPrint = Object.keys(proxySelected)
    .filter(
      (cardid) => cardid > 200000 && proxySelected[cardid][PRINT] && proxySelected[cardid].q > 0,
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

  const handleClick = useCallback(
    (card) => {
      handleModalCardOpen(card);
      !isDesktop && setShowFloatingButtons(false);
    },
    [sortedCards, sortedCardsSide],
  );

  const handleClickSide = useCallback(
    (card) => {
      handleModalSideCardOpen(card);
      !isDesktop && setShowFloatingButtons(false);
    },
    [sortedCards, sortedCardsSide],
  );

  const handleClose = useCallback(() => {
    handleModalCardClose();
    !isDesktop && setShowFloatingButtons(true);
  }, [sortedCards, sortedCardsSide]);

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
