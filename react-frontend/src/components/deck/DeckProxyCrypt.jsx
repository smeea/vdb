import React, { useState, useEffect, useMemo } from 'react';
import { DeckProxyCryptTable, ResultCryptModal } from 'components';
import { useApp } from 'context';
import { countCards } from 'utils';
import { useModalCardController, useKeyDisciplines } from 'hooks';

function DeckProxyCrypt(props) {
  const { cards, proxySelected, inAdvSelect, setShowFloatingButtons } = props;
  const { handleProxySelector, handleSetSelector, handleProxyCounter } = props;
  const { cryptDeckSort, changeTimer, isMobile } = useApp();

  const crypt = Object.values(cards).filter((card) => card.q > 0);
  const cryptSide = Object.values(cards).filter((card) => card.q <= 0);
  const cryptTotal = countCards(crypt);

  const proxiesToPrint = Object.values(proxySelected).filter(
    (card) => card.print && card.q > 0
  );
  const cryptTotalSelected = countCards(proxiesToPrint);

  const { disciplinesSet, keyDisciplines, nonKeyDisciplines } =
    useKeyDisciplines(cards, cryptTotal);

  const SortByQuantity = (a, b) => {
    return b.q - a.q;
  };

  const SortByCapacity = (a, b) => {
    return b.c.Capacity - a.c.Capacity;
  };

  // Sort cards
  const [sortedCards, setSortedCards] = useState([]);
  const sortedCardsSide = cryptSide.sort(SortByCapacity);

  useEffect(() => {
    if (cryptDeckSort) {
      setSortedCards(crypt.sort(SortByQuantity).sort(SortByCapacity));
    } else {
      setSortedCards(crypt.sort(SortByCapacity).sort(SortByQuantity));
    }
  }, [changeTimer, cryptDeckSort]);

  // Modal Card Controller
  const cryptCards = useMemo(
    () => sortedCards.map((card) => card.c),
    [sortedCards]
  );
  const cryptSideCards = sortedCardsSide.map((card) => card.c);
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(cryptCards, cryptSideCards);

  const handleCloseModal = () => {
    handleModalCardClose();
    isMobile && setShowFloatingButtons(true);
  };

  return (
    <>
      <div
        className={
          isMobile
            ? 'd-flex align-items-center justify-content-between ps-2 pe-1 info-message'
            : 'd-flex align-items-center justify-content-between ps-2 info-message'
        }
      >
        <b>Crypt [{cryptTotalSelected}]</b>
      </div>
      <DeckProxyCryptTable
        handleModalCardOpen={handleModalCardOpen}
        cards={sortedCards}
        disciplinesSet={disciplinesSet}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        handleProxySelector={handleProxySelector}
        handleSetSelector={handleSetSelector}
        handleProxyCounter={handleProxyCounter}
        proxySelected={proxySelected}
        setShowFloatingButtons={setShowFloatingButtons}
      />
      {Object.keys(cryptSide).length > 0 && !inAdvSelect && (
        <div className="deck-sidecrypt pt-2">
          <div className="d-flex align-items-center justify-content-between ps-2">
            <b>Side Crypt</b>
          </div>
          <DeckProxyCryptTable
            handleModalCardOpen={handleModalSideCardOpen}
            cards={sortedCardsSide}
            disciplinesSet={disciplinesSet}
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
            handleProxySelector={handleProxySelector}
            handleSetSelector={handleSetSelector}
            handleProxyCounter={handleProxyCounter}
            proxySelected={proxySelected}
            setShowFloatingButtons={setShowFloatingButtons}
          />
        </div>
      )}
      {shouldShowModal && (
        <ResultCryptModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default DeckProxyCrypt;
