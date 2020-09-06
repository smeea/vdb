import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import ResultLibrary from './ResultLibrary.jsx';

function DeckDrawLibraryModal(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            Library Draw
            <Button variant='outline-primary' onClick={props.handleReDraw}>
              Draw
            </Button>
            <Button variant="outline-primary" onClick={props.handleDrawOne}>
              +1
            </Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResultLibrary cards={props.drawedCards} sortMode={false} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeckDrawLibraryModal;
