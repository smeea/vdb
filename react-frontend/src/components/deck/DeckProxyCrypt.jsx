import React, { useState, useEffect } from 'react';
import { DeckProxyCryptTable, ResultCryptModal } from 'components';
import { useApp } from 'context';
import { countCards } from 'utils';
import { useModalCardController, useKeyDisciplines } from 'hooks';

const DeckProxyCrypt = (props) => {
  const { cards, proxySelected, inAdvSelect, setShowFloatingButtons } = props;
  const { handleProxySelector, handleSetSelector, handleProxyCounter } = props;
  const { cryptDeckSort, forcedUpdate, isMobile } = useApp();

  const crypt = Object.values(cards).filter((card) => card.q > 0);
  const cryptSide = Object.values(cards).filter((card) => card.q <= 0);
  const cryptTotal = countCards(crypt);

  const proxiesToPrint = Object.values(proxySelected).filter(
    (card) => card.print && card.q > 0
  );
  const cryptTotalSelected = countCards(proxiesToPrint);

  const { disciplinesSet, keyDisciplines, nonKeyDisciplines } =
    useKeyDisciplines(cards, cryptTotal);

  // Sort cards
  const [sortedCards, setSortedCards] = useState([]);
  const SortByQuantity = (a, b) => b.q - a.q;
  const SortByCapacity = (a, b) => b.c.Capacity - a.c.Capacity;
  const sortedCardsSide = cryptSide.sort(SortByCapacity);

  useEffect(() => {
    if (cryptDeckSort) {
      setSortedCards(crypt.sort(SortByQuantity).sort(SortByCapacity));
    } else {
      setSortedCards(crypt.sort(SortByCapacity).sort(SortByQuantity));
    }
  }, [forcedUpdate, cryptDeckSort]);

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards, sortedCardsSide);

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
};

export default DeckProxyCrypt;
