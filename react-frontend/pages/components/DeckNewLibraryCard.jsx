import React, { useEffect, useState, useContext } from 'react';
import NewLibraryCard from './NewLibraryCard.jsx';
import AppContext from '../../context/AppContext.js';

function DeckNewLibraryCard(props) {
  const { deckCardChange } = useContext(AppContext);
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
    />
  );
}

export default DeckNewLibraryCard;
