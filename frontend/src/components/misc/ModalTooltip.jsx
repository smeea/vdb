import React from 'react';
import { Modal } from 'react-bootstrap';

function ModalTooltip(props) {
  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      animation={false}
      centered={true}
    >
      <Modal.Body>{props.text}</Modal.Body>
    </Modal>
  );
}

export default ModalTooltip;
