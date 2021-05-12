import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import DeckCrypt from './DeckCrypt.jsx';
import DeckLibrary from './DeckLibrary.jsx';
import AppContext from '../../context/AppContext';

function DeckMissingModal(props) {
  const { isMobile } = useContext(AppContext);

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      animation={false}
      size="xl"
      dialogClassName={!isMobile ? 'modal-deck-draw' : null}
    >
      <Modal.Body className="p-0">
        <Container fluid>
          <Row className="px-0 pt-2">
            <Col className="px-0">
              <button
                type="button"
                className="close m-1"
                onClick={props.handleClose}
              >
                <X width="32" height="32" viewBox="0 0 16 16" />
              </button>
              <div className="d-flex justify-content-center">
                <h5>Missing Cards for {props.name}</h5>
              </div>
            </Col>
          </Row>
          <Row className="px-0 pb-4">
            <Col xs={12} md={7} className="px-0 pl-lg-4 pr-lg-3">
              <DeckCrypt cards={props.crypt} isAuthor={false} />
            </Col>
            <Col xs={12} md={5} className="px-0 pl-lg-3 pr-lg-4">
              <DeckLibrary cards={props.library} isAuthor={false} />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default DeckMissingModal;
