import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ArrowClockwise, Plus } from 'react-bootstrap-icons';

import ResultLibrary from './ResultLibrary.jsx';

function DeckDrawLibraryModal(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            Library Draw
            <Button variant='outline-primary' onClick={props.handleReDraw}>
              <ArrowClockwise size={20} />
            </Button>
            <Button variant="outline-primary" onClick={props.handleDrawOne}>
              <Plus size={20} />
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
