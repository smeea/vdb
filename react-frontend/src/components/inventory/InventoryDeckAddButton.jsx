import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import Plus from 'assets/images/icons/plus.svg';
import { ModalConfirmation } from 'components';
import { useApp } from 'context';

const InventoryDeckAddButton = ({ deck, inInventory, inventoryDeckAdd }) => {
  const { isMobile } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    inventoryDeckAdd(deck);
    setShowConfirmation(false);
    isMobile && setShowButtons(false);
  };

  return (
    <>
      <Button
        className={inInventory ? 'inventory-in' : ''}
        variant="primary"
        onClick={() => setShowConfirmation(true)}
        title={inInventory ? 'Already in Inventory' : 'Add Deck to Inventory'}
      >
        {inInventory ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex pe-1">
              <Check2 />
            </div>
            {inInventory}
          </div>
        ) : (
          <Plus />
        )}
      </Button>
      <ModalConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        buttonText="Add"
        headerText={'Add deck ' + deck.name + ' to Inventory?'}
      />
    </>
  );
};

export default InventoryDeckAddButton;
