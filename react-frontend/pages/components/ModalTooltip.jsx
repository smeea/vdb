import React from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';

function ModalTooltip(props) {
  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      animation={false}
    >
      <Modal.Body>
        <Container className="px-0" fluid>
          <Row className="px-0">
            <Col>
              <button
                type="button"
                className="close"
                onClick={props.handleClose}
              >
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
              </button>
              <h6>{props.title}</h6>
            </Col>
          </Row>
          {props.text}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default ModalTooltip;
