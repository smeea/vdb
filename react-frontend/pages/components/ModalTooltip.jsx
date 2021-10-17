import React from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';

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
