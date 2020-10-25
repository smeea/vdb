import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeckDeleteDeckConfirmation(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleCancel} animation={false}>
        <Modal.Header closeButton>
          <h5>
            DELETE DECK
            <span className="px-1 pl-2">`{props.deckname}`?</span>
          </h5>
        </Modal.Header>
        <Modal.Body>
          <h6>THIS CANNOT BE UNDONE!</h6>
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
