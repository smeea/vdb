import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
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
      dialogClassName={isMobile ? 'm-0' : 'modal-wide'}
    >
      <Modal.Header
        className={isMobile ? 'pt-2 pb-0 pl-2 pr-3' : 'pt-3 pb-1 px-4'}
        closeButton
      >
        <h5>Missing Cards for {props.name}</h5>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Container fluid>
          <Row className={isMobile ? 'px-0' : 'px-0 pb-4'}>
            <Col xs={12} md={7} className="px-0 pl-lg-4 pr-lg-3">
              <div className={isMobile ? null : 'sticky-modal'}>
                <DeckCrypt
                  cards={props.crypt}
                  isAuthor={false}
                  inMissing={true}
                />
              </div>
            </Col>
            <Col xs={12} md={5} className="px-0 pl-lg-3 pr-lg-4">
              <DeckLibrary
                cards={props.library}
                isAuthor={false}
                inMissing={true}
              />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default DeckMissingModal;
