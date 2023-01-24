import React from 'react';
import { NewCryptCard } from '@/components';

const InventoryNewCryptCard = ({ setNewId, setShowAdd, newRef }) => {
  const addCard = (value) => {
    setNewId(value);
    setShowAdd && setShowAdd(false);
  };

  return (
    <NewCryptCard
      selectedValue={null}
      onChange={(value) => addCard(value.value)}
      inInventory={true}
      newRef={newRef}
    />
  );
};

export default InventoryNewCryptCard;
