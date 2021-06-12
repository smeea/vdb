import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import Plus from '../../assets/images/icons/plus.svg';
import ModalConfirmation from './ModalConfirmation.jsx';
import AppContext from '../../context/AppContext.js';

function InventoryDeckAddButton(props) {
  const { isMobile } = useContext(AppContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    props.inventoryDeckAdd(props.deck);
    setShowConfirmation(false);
    isMobile && props.setShowButtons(false);
  };

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={() => setShowConfirmation(true)}
        title="Add Deck to Inventory"
      >
        <Plus />
      </Button>
      <ModalConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        buttonText="Add"
        headerText={'Add deck ' + props.deck.name + ' to Inventory?'}
      />
    </>
  );
}

export default InventoryDeckAddButton;
