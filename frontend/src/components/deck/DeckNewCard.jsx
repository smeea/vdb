import React from 'react';
import { NewCardSelect } from '@/components';
import { useApp, deckCardChange } from '@/context';

const DeckNewCard = ({ target, cards, deckid, handleClose, cardChange, menuPlacement }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const changeAction = cardChange ?? deckCardChange;

  const handleChange = (event) => {
    const cardid = event.value;
    if (!(cards[cardid] && cards[cardid].q > 0)) {
      const card = target === 'crypt' ? cryptCardBase[cardid] : libraryCardBase[cardid];

      changeAction(deckid, card, 1);
    }
    handleClose();
  };

  return (
    <NewCardSelect
      onChange={handleChange}
      autoFocus
      target={target}
      menuPlacement={menuPlacement}
    />
  );
};

export default DeckNewCard;
