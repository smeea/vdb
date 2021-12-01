import React, { useEffect, useState } from 'react';
import { NewLibraryCard } from 'components';
import { useApp } from 'context';

function InventoryNewLibraryCard(props) {
  const { inventoryCardChange } = useApp();
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
      onChange={(value) => setSelectedValue(value.value)}
      inInventory={true}
    />
  );
}

export default InventoryNewLibraryCard;
