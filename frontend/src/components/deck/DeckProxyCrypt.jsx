import React from 'react';
import { useSnapshot } from 'valtio';
import { DeckProxyCryptTable, ResultModal } from 'components';
import { useApp } from 'context';
import { countCards } from 'utils';
import { deckStore } from 'context';
import { useModalCardController, useKeyDisciplines, useDeckCrypt } from 'hooks';

const DeckProxyCrypt = ({
  cards,
  proxySelected,
  handleProxySelector,
  handleSetSelector,
  handleProxyCounter,
}) => {
  const { cryptDeckSort, isMobile, setShowFloatingButtons } = useApp();
  const changeTimer = useSnapshot(deckStore).cryptTimer;

  const { cryptSide, cryptTotal, sortedCards, sortedCardsSide } = useDeckCrypt(
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

  const { disciplinesSet, keyDisciplines, nonKeyDisciplines } =
    useKeyDisciplines(cards, cryptTotal);

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
    setShowFloatingButtons(true);
  };
  return (
    <>
      <div
        className={`ps-2 info-message flex items-center justify-between pb-2 ${
          isMobile ? 'pr-1' : 'py-2'
        }`}
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
      />
      {Object.keys(cryptSide).length > 0 && (
        <div className="pt-2 opacity-60">
          <div className="pl-2 flex items-center justify-between">
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
          />
        </div>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
          nested={true}
        />
      )}
    </>
  );
};

export default DeckProxyCrypt;
