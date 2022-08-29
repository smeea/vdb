import React from 'react';
import X from 'assets/images/icons/x.svg';
import { Modal, Button } from 'react-bootstrap';

const ResultLayoutTextSetsModal = ({ modal, setModal }) => {
  return (
    <Modal
      size="xs"
      show={modal}
      className="d-flex justify-content-center nested-modal"
      dialogClassName="w-75"
      onHide={() => setModal(null)}
      animation={false}
      centered={true}
    >
      <Modal.Header className="px-3 pt-2 pb-1">
        <div className="prob">
          <b>Sets</b>
        </div>
        <Button variant="outline-secondary" onClick={() => setModal(null)}>
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className="px-3 py-2">{modal}</Modal.Body>
    </Modal>
  );
};

export default ResultLayoutTextSetsModal;
