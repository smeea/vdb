import React, { useEffect, useState, useContext } from 'react';
import { NewCryptCard } from 'components';
import AppContext from 'context/AppContext.js';

function InventoryNewCryptCard(props) {
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
    <NewCryptCard
      selectedValue={selectedValue}
      onChange={(value) => setSelectedValue(value.value)}
      inInventory={true}
    />
  );
}

export default InventoryNewCryptCard;
