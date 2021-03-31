import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TrashFill from '../../assets/images/icons/trash-fill.svg';
import DeleteConfirmation from './DeleteConfirmation.jsx';

function InventoryDelete(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteInventory();
    setShowConfirmation(false);
    props.isMobile && props.setShowButtons(false);
  };

  const deleteInventory = () => {
    const url = `${process.env.API_URL}inventory/delete`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options).then(props.setInventory({ crypt: {}, library: {} }));
  };

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={() => setShowConfirmation(true)}
        block
      >
        <div className="d-flex justify-content-center align-items-center">
          <div className="pr-2">
            <TrashFill />
          </div>
          Delete Inventory
        </div>
      </Button>
      <DeleteConfirmation
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        target="Inventory"
        isMobile={props.isMobile}
      />
    </>
  );
}

export default InventoryDelete;
