import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';
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
        className={props.inInventory ? 'inventory-in' : ''}
        variant="primary"
        onClick={() => setShowConfirmation(true)}
        title={
          props.inInventory ? 'Already in Inventory' : 'Add Deck to Inventory'
        }
      >
        {props.inInventory ? <Check2 /> : <Plus />}
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
