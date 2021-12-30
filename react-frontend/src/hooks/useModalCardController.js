import { useState, useMemo } from 'react';

const SIDE_CARD_MODE = 'SIDE_CARD_MODE';
const MAIN_CARD_MODE = 'MAIN_CARD_MODE';

const useModalCardController = (mainCards = [], sideCards = []) => {
  const [cardId, setCardId] = useState(null);
  const [mode, setMode] = useState();

  const handleModalCardOpen = (i) => {
    setMode(MAIN_CARD_MODE);
    setCardId(mainCards.indexOf(i));
  };

  const handleModalSideCardOpen = (i) => {
    setMode(SIDE_CARD_MODE);
    setCardId(sideCards.indexOf(i));
  };

  const handleModalCardChange = (d) => {
    const maxIdx = (mode === MAIN_CARD_MODE ? mainCards : sideCards).length - 1;
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

  const currentModalCard = useMemo(() => {
    if (cardId !== null)
      return (mode === MAIN_CARD_MODE ? mainCards : sideCards)[cardId];
  }, [mainCards, sideCards, mode, cardId]);

  return {
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
    shouldShowModal,
    currentModalCard,
  };
};

export default useModalCardController;
