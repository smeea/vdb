import React, { useEffect, useState } from 'react';
import { NewCryptCard } from 'components';

const InventoryNewCryptCard = ({ setNewId, setShowAdd, newRef }) => {
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
    <NewCryptCard
      selectedValue={selectedValue}
      onChange={(value) => setSelectedValue(value.value)}
      inInventory={true}
      newRef={newRef}
    />
  );
};

export default InventoryNewCryptCard;
