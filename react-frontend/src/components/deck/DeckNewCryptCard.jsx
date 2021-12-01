import React, { useEffect, useState } from 'react';
import { NewCryptCard } from 'components';
import { useApp } from 'context';

function DeckNewCryptCard(props) {
  const { deckCardChange } = useApp();
  const [selectedValue, setSelectedValue] = useState(null);

  const addNewCard = () => {
    if (!(props.cards[selectedValue] && props.cards[selectedValue].q > 0)) {
      deckCardChange(props.deckid, selectedValue, 1);
    }
    setSelectedValue('');
    props.setShowAdd && props.setShowAdd(false);
  };

  useEffect(() => {
    if (selectedValue) addNewCard();
  }, [selectedValue]);

  return (
    <NewCryptCard
      selectedValue={selectedValue}
      onChange={(value) => setSelectedValue(value.value)}
      autoFocus={true}
    />
  );
}

export default DeckNewCryptCard;
