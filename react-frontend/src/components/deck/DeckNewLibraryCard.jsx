import React, { useEffect, useState } from 'react';
import { NewLibraryCard } from 'components';
import { useApp } from 'context';

function DeckNewLibraryCard(props) {
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
    <NewLibraryCard
      selectedValue={selectedValue}
      onChange={(value) => setSelectedValue(value.value)}
      autoFocus={true}
    />
  );
}

export default DeckNewLibraryCard;
