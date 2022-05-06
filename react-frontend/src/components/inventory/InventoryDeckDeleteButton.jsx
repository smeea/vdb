import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TrashFill from 'assets/images/icons/trash-fill.svg';
import { ModalConfirmation } from 'components';
import { useApp } from 'context';

const InventoryDeckDeleteButton = ({
  deck,
  inventoryDeckDelete,
  inInventory,
}) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    inventoryDeckDelete(deck);
    setShowConfirmation(false);
    setShowMenuButtons(true);
    setShowFloatingButtons(false);
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
