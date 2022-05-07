import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TrashFill from 'assets/images/icons/trash-fill.svg';
import { ModalConfirmation } from 'components';

const InventoryDeckDeleteButton = ({
  deck,
  inventoryDeckDelete,
  inInventory,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    inventoryDeckDelete(deck);
    setShowConfirmation(false);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShowConfirmation(true)}
        title="Remove Deck from Inventory"
        disabled={!inInventory}
      >
        <TrashFill />
      </Button>
      <ModalConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        buttonText="Remove"
        headerText={'Remove deck ' + deck.name + ' from Inventory?'}
      />
    </>
  );
};

export default InventoryDeckDeleteButton;
