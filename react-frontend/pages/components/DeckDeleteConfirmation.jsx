import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeckDeleteDeckConfirmation(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleCancel}
        animation={false}
      >
        <Modal.Body>
          <button
            type="button"
            className="close"
            onClick={props.handleClose}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close</span>
          </button>
          <h5>
            DELETE DECK
            <span className="px-1 pl-2">{'"'}{props.deckname}{'"'}?</span>
          </h5>
          <div className="pt-2">
            <h6>THIS CANNOT BE UNDONE!</h6>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={props.handleConfirm}>
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

export default DeckDeleteDeckConfirmation;
