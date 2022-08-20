import React, { useEffect, useState } from 'react';
import { NewCryptCard, NewLibraryCard } from 'components';
import { useApp } from 'context';

const DeckNewCard = ({ cards, deckid, setShowAdd }) => {
  const { deckCardChange } = useApp();
  const [selectedValue, setSelectedValue] = useState(null);

  const addNewCard = () => {
    if (!(cards[selectedValue] && cards[selectedValue].q > 0)) {
      deckCardChange(deckid, selectedValue, 1);
    }
    setSelectedValue('');
    setShowAdd && setShowAdd(false);
  };

  useEffect(() => {
    if (selectedValue) addNewCard();
  }, [selectedValue]);

  return (
    <>
      {target === 'crypt' && (
        <NewCryptCard
          selectedValue={selectedValue}
          onChange={(value) => setSelectedValue(value.value)}
          autoFocus={true}
        />
      )}
      {target === 'library' && (
        <NewLibraryCard
          selectedValue={selectedValue}
          onChange={(value) => setSelectedValue(value.value)}
          autoFocus={true}
        />
      )}
    </>
  );
};

export default DeckNewCard;
