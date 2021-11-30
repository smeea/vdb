import React from 'react';
import X from 'assets/images/icons/x.svg';
import { Modal, Button } from 'react-bootstrap';

const DeckDrawProbabilityModal = (props) => {
  return (
    <Modal
      size="xs"
      show={props.modalDraw}
      className="d-flex justify-content-center"
      dialogClassName="w-50"
      onHide={() => props.setModalDraw(null)}
      animation={false}
      centered={true}
    >
      <Modal.Header className="px-3 pt-2 pb-1">
        <div className="prob">
          <b>{props.modalDraw.name}</b>
        </div>
        <Button
          variant="outline-secondary"
          onClick={() => props.setModalDraw(null)}
        >
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className="px-3 py-2">{props.modalDraw.prob}</Modal.Body>
    </Modal>
  );
};

export default DeckDrawProbabilityModal;
