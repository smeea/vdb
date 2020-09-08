import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ArrowClockwise, Plus } from 'react-bootstrap-icons';

import ResultCrypt from './ResultCrypt.jsx';

function DeckDrawCryptModal(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            Crypt Draw
            <Button variant="outline-secondary" onClick={props.handleReDraw}>
              <ArrowClockwise size={20} />
            </Button>
            <Button variant="outline-secondary" onClick={props.handleDrawOne}>
              <Plus size={20} />
            </Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResultCrypt cards={props.drawedCards} sortMode={false} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeckDrawCryptModal;
