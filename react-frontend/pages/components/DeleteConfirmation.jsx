import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';

function DeleteConfirmation(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleCancel}
        animation={false}
        centered={props.isMobile}
      >
        <Modal.Body>
          <button
            type="button"
            className="close m-1"
            onClick={props.handleClose}
          >
            <X width="32" height="32" viewBox="0 0 16 16" />
          </button>
          <h5>{`Delete ${props.target}?`}</h5>
          <div className="pt-2">
            {props.text && <h6>{props.text}</h6>}
            <h6>THIS CANNOT BE UNDONE!</h6>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handleConfirm}>
            Delete
          </Button>
          <Button variant="outline-secondary" onClick={props.handleCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteConfirmation;
