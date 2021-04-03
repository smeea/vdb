import React from 'react';
import { Modal } from 'react-bootstrap';

const DeckDrawProbabilityModal = ({modalDraw, setModalDraw}) => {
  return(
    <Modal
      size="xs"
      show={modalDraw ? true : false}
      className="d-flex justify-content-center"
      dialogClassName="w-50"
      onHide={() => setModalDraw(null)}
      animation={false}
      centered={true}
    >
      <Modal.Header className="px-3 py-2" closeButton>
        <div className="prob">
          <b>{modalDraw.name}</b>:
        </div>
      </Modal.Header>
      <Modal.Body className="px-4 py-3" closeButton>
        {modalDraw.prob}
      </Modal.Body>
    </Modal>
  )
};

export default DeckDrawProbabilityModal;
