import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeckRemoveDeckConfirmation(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleCancel} animation={false}>
        <Modal.Header closeButton>
          Delete deck{' '}
          <span className="pl-1">
            <b>
              <i>{props.deckname}</i>
            </b>
          </span>
          ?
        </Modal.Header>
        <Modal.Body>
          <Button variant="outline-secondary" onClick={props.handleConfirm}>
            Delete
          </Button>
          <Button variant="outline-secondary" onClick={props.handleCancel}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeckRemoveDeckConfirmation;
