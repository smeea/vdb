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
      <Modal.Body>
        <Container className="px-0" fluid>
          <Row className="px-0">
            <Col>
              <button
                type="button"
                className="close m-1"
                onClick={props.handleClose}
              >
                <X width="32" height="32" viewBox="0 0 16 16"/>
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
