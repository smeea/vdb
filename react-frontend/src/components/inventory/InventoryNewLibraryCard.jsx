import React, { useEffect, useState } from 'react';
import { NewLibraryCard } from 'components';

const InventoryNewLibraryCard = ({ setNewId, setShowAdd, newRef }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const addNewCard = () => {
    setNewId(selectedValue);
    setSelectedValue('');
    setShowAdd && setShowAdd(false);
  };

  useEffect(() => {
    if (selectedValue) addNewCard();
  }, [selectedValue]);

  return (
    <NewLibraryCard
      selectedValue={selectedValue}
      onChange={(value) => setSelectedValue(value.value)}
      inInventory={true}
      newRef={newRef}
    />
  );
};

export default InventoryNewLibraryCard;
