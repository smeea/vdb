import React from 'react';
import { NewLibraryCard } from '@/components';

const InventoryNewLibraryCard = ({ setNewId, setShowAdd, newRef }) => {
  const addCard = (value) => {
    setNewId(value);
    setShowAdd && setShowAdd(false);
  };

  return (
    <NewLibraryCard
      selectedValue={null}
      onChange={(value) => addCard(value.value)}
      inInventory={true}
      newRef={newRef}
    />
  );
};

export default InventoryNewLibraryCard;
