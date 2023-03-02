import React from 'react';
import { NewCryptCard, NewLibraryCard } from '@/components';
import { useApp, deckCardChange } from '@/context';

const DeckNewCard = ({ target, cards, deckid, handleClose, cardChange }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const changeAction = cardChange ?? deckCardChange;

  const handleChange = (event) => {
    const cardid = event.value;
    if (!(cards[cardid] && cards[cardid].q > 0)) {
      const card =
        target === 'crypt' ? cryptCardBase[cardid] : libraryCardBase[cardid];

      changeAction(deckid, card, 1);
    }
    handleClose();
  };

  return (
    <>
      {target === 'crypt' ? (
        <NewCryptCard onChange={handleChange} autoFocus />
      ) : (
        <NewLibraryCard onChange={handleChange} autoFocus />
      )}
    </>
  );
};

export default DeckNewCard;
