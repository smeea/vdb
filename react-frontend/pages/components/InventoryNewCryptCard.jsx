import React, { useEffect, useState, useContext } from 'react';
import NewCryptCard from './NewCryptCard.jsx';
import AppContext from '../../context/AppContext.js';

function InventoryNewCryptCard(props) {
  const { inventoryCardChange } = useContext(AppContext);
  const [selectedValue, setSelectedValue] = useState(null);

  const addNewCard = () => {
    if (!props.cards[selectedValue]) {
      if (props.inInventory) {
        inventoryCardChange(selectedValue, 1);
      } else {
        inventoryCardChange(props.deckid, selectedValue, 1);
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

export default InventoryNewCryptCard;
