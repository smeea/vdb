import React, { useEffect, useState } from 'react';
import { NewCryptCard, NewLibraryCard } from '@/components';
import { useApp, deckCardChange } from '@/context';

const DeckNewCard = ({ target, cards, deckid, handleClose, cardChange }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const [selectedValue, setSelectedValue] = useState(null);
  const changeAction = cardChange ? cardChange : deckCardChange;

  const addNewCard = () => {
    if (!(cards[selectedValue] && cards[selectedValue].q > 0)) {
      const card =
        target === 'crypt'
          ? cryptCardBase[selectedValue]
          : libraryCardBase[selectedValue];

      changeAction(deckid, card, 1);
    }
    setSelectedValue('');
    handleClose();
  };

  useEffect(() => {
    if (selectedValue) addNewCard();
  }, [selectedValue]);

  return (
    <>
      {target === 'crypt' ? (
        <NewCryptCard
          selectedValue={selectedValue}
          onChange={(value) => setSelectedValue(value.value)}
          autoFocus
        />
      ) : (
        <NewLibraryCard
          selectedValue={selectedValue}
          onChange={(value) => setSelectedValue(value.value)}
          autoFocus
        />
      )}
    </>
  );
};

export default DeckNewCard;
