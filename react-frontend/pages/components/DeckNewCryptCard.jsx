import React, { useEffect, useState, useContext } from 'react';
import NewCryptCard from './NewCryptCard.jsx';
import AppContext from '../../context/AppContext.js';

function DeckNewCryptCard(props) {
  const { deckCardChange } = useContext(AppContext);
  const [selectedValue, setSelectedValue] = useState(null);

  const addNewCard = () => {
    if (!props.cards[selectedValue]) {
      if (props.inInventory) {
        deckCardChange(selectedValue, 1);
      } else {
        deckCardChange(props.deckid, selectedValue, 1);
      }
    }
    if (props.inInventory) props.setNewId(selectedValue);
    setSelectedValue('');
    props.setShowAdd && props.setShowAdd(false);
  };

  useEffect(() => {
    if (selectedValue) addNewCard();
  }, [selectedValue]);

  return (
    <NewCryptCard
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
    />
  );
}

export default DeckNewCryptCard;
