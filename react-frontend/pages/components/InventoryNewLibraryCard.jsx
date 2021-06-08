import React, { useEffect, useState, useContext } from 'react';
import NewLibraryCard from './NewLibraryCard.jsx';
import AppContext from '../../context/AppContext.js';

function InventoryNewLibraryCard(props) {
  const { inventoryCardChange } = useContext(AppContext);
  const [selectedValue, setSelectedValue] = useState(null);

  const addNewCard = () => {
    if (!(props.cards[selectedValue] && props.cards[selectedValue].q > 0)) {
      inventoryCardChange(selectedValue, 1);
    }
    props.setNewId(selectedValue);
    setSelectedValue('');
    props.setShowAdd && props.setShowAdd(false);
  };

  useEffect(() => {
    if (selectedValue) addNewCard();
  }, [selectedValue]);

  return (
    <NewLibraryCard
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
    />
  );
}

export default InventoryNewLibraryCard;
