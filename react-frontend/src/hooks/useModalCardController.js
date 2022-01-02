import { useState, useMemo } from 'react';

const SIDE_CARD_MODE = 'SIDE_CARD_MODE';
const MAIN_CARD_MODE = 'MAIN_CARD_MODE';

const useModalCardController = (mainCards = [], sideCards = []) => {
  const [cardId, setCardId] = useState(null);
  const [mode, setMode] = useState();

  const mainList = mainCards.map((c) => (c.c ? c.c : c));
  const sideList = sideCards.map((c) => (c.c ? c.c : c));

  const handleModalCardOpen = (i) => {
    setMode(MAIN_CARD_MODE);
    setCardId(isNaN(i) ? mainList.indexOf(i) : i);
  };

  const handleModalSideCardOpen = (i) => {
    setMode(SIDE_CARD_MODE);
    setCardId(isNaN(i) ? sideList.indexOf(i) : i);
  };

  const handleModalCardChange = (d) => {
    const maxIdx = (mode === MAIN_CARD_MODE ? mainList : sideList).length - 1;
    if (cardId + d < 0) {
      setCardId(maxIdx);
    } else if (cardId + d > maxIdx) {
      setCardId(0);
    } else {
      setCardId(cardId + d);
    }
  };

  const handleModalCardClose = () => {
    setCardId(null);
  };

  const shouldShowModal = useMemo(() => cardId !== null, [cardId]);

  const isSideMode = useMemo(() => mode === SIDE_CARD_MODE, [mode]);

  const currentModalCard = useMemo(() => {
    if (cardId === null) return null;

    return (isSideMode ? sideList : mainList)[cardId];
  }, [mainList, sideList, mode, cardId]);

  return {
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
    shouldShowModal,
    currentModalCard,
    isSideMode,
  };
};

export default useModalCardController;
