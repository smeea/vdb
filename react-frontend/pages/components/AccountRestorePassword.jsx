import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function AccountRestorePassword(props) {
  const handleClose = () => props.setShow(false);
  const handleConfirm = () => {
    console.log('restore password button');
  }

  return (
    <>
      <Modal show={props.show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          Restore password for <span className='pl-1'><b><i>{props.username}</i></b></span>?
        </Modal.Header>
        <Modal.Body>
          <Button variant="outline-secondary" onClick={handleConfirm}>
            Restore
          </Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AccountRestorePassword;
