import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function AccountRestorePassword(props) {
  const handleClose = () => props.setShow(false);

  return (
    <>
      <Modal show={props.show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <div>
            We do not have automatic password restoration yet, please
            {' '}<a href='mailto:smeea@riseup.net'>send me an email</a>{' '}
            with your account username I will generate new password for you.
          </div>
        </Modal.Header>
        <Modal.Body>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AccountRestorePassword;
