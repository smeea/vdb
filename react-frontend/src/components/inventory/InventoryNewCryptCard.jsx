import React, { useEffect, useState } from 'react';
import { NewCryptCard } from 'components';

function InventoryNewCryptCard(props) {
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
    <NewCryptCard
      selectedValue={selectedValue}
      onChange={(value) => setSelectedValue(value.value)}
      inInventory={true}
    />
  );
}

export default InventoryNewCryptCard;
