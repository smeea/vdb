import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import TrashFill from '../../assets/images/icons/trash-fill.svg';
import ModalConfirmation from './ModalConfirmation.jsx';
import AppContext from '../../context/AppContext.js';

function InventoryDeckDeleteButton(props) {
  const { isMobile } = useContext(AppContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    props.inventoryDeckDelete(props.deck);
    setShowConfirmation(false);
    isMobile && props.setShowButtons(false);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShowConfirmation(true)}
        title="Remove Deck from Inventory"
        disabled={!props.inInventory}
      >
        <TrashFill />
      </Button>
      <ModalConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        buttonText="Remove"
        headerText={'Remove deck ' + props.deck.name + ' from Inventory?'}
      />
    </>
  );
}

export default InventoryDeckDeleteButton;
