import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ResultLibrary from './ResultLibrary.jsx';

function DeckDrawLibraryModal(props) {
  return (
    <React.Fragment>
      <Modal show={props.show} onHide={props.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            Library Draw
            <Button variant="secondary" onClick={props.handleDraw}>
              REDRAW
            </Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResultLibrary cards={props.cards} deck={true} />
          <br />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default DeckDrawLibraryModal;
