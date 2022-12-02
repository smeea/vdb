import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import Plus from 'assets/images/icons/plus.svg';
import { ModalConfirmation } from 'components';
import { useApp, inventoryCardsAdd } from 'context';

const InventoryDeckAddButton = ({ deck, inInventory }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const inventoryDeckAdd = (deck) => {
    inventoryCardsAdd({ ...deck.crypt, ...deck.library });
  };

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    inventoryDeckAdd(deck);
    setShowConfirmation(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <>
      <Button
        className={inInventory ? 'in' : ''}
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
        nested={true}
      />
    </>
  );
};

export default InventoryDeckAddButton;
