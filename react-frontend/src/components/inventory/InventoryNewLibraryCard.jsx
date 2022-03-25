import React, { useEffect, useState } from 'react';
import { NewLibraryCard } from 'components';

function InventoryNewLibraryCard(props) {
  const [selectedValue, setSelectedValue] = useState(null);

  const addNewCard = () => {
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
