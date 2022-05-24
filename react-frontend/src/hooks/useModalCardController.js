import { useState, useMemo } from 'react';

const SIDE_CARD_MODE = 'SIDE_CARD_MODE';
const MAIN_CARD_MODE = 'MAIN_CARD_MODE';

const useModalCardController = (mainCards = [], sideCards = []) => {
  const [cardid, setCardid] = useState(null);
  const [mode, setMode] = useState();

  const mainList = mainCards.map((c) => (c.c ? c.c : c));
  const sideList = sideCards.map((c) => (c.c ? c.c : c));

  const handleModalCardOpen = (i) => {
    setMode(MAIN_CARD_MODE);
    setCardid(isNaN(i) ? mainList.indexOf(i) : i);
  };

  const handleModalSideCardOpen = (i) => {
    setMode(SIDE_CARD_MODE);
    setCardid(isNaN(i) ? sideList.indexOf(i) : i);
  };

  const handleModalCardChange = (d) => {
    const maxIdx = (mode === MAIN_CARD_MODE ? mainList : sideList).length - 1;
    if (cardid + d < 0) {
      setCardid(maxIdx);
    } else if (cardid + d > maxIdx) {
      setCardid(0);
    } else {
      setCardid(cardid + d);
    }
  };

  const handleModalCardClose = () => {
    setCardid(null);
  };

  const shouldShowModal = useMemo(() => cardid !== null, [cardid]);

  const isSideMode = useMemo(() => mode === SIDE_CARD_MODE, [mode]);

  const currentModalCard = useMemo(() => {
    if (cardid === null) return null;

    return (isSideMode ? sideList : mainList)[cardid];
  }, [mainList, sideList, mode, cardid]);

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
