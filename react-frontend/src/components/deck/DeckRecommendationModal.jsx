import React from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { ResultCryptTable, DeckRecommendationLibrary } from 'components';

import { useApp } from 'context';

function DeckRecommendationModal(props) {
  const { isMobile } = useApp();

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      animation={false}
      dialogClassName={isMobile ? 'm-0' : 'modal-wide'}
    >
      <Modal.Header
        className={
          isMobile
            ? 'no-border pt-2 pb-0 ps-2 pe-3'
            : 'no-border pt-3 pb-1 px-4'
        }
      >
        <h5>Cards Ideas</h5>
        <Button variant="outline-secondary" onClick={props.handleClose}>
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Container fluid>
          <Row className={isMobile ? 'px-0' : 'px-0 pb-4'}>
            <Col xs={12} md={7} className="px-0 ps-lg-4 pe-lg-3">
              <div className="d-flex justify-content-between align-items-center title-line px-2">
                <b>CRYPT</b>
              </div>
              {props.crypt && (
                <ResultCryptTable
                  isAuthor={props.isAuthor}
                  inRecommendation={true}
                  activeDeck={props.activeDeck}
                  resultCards={props.crypt}
                  className="search-crypt-table"
                  crypt={props.activeDeck.crypt}
                  setShowFloatingButtons={() => {}}
                />
              )}
            </Col>
            <Col xs={12} md={5} className="px-0 ps-lg-3 pe-lg-4 pt-4 pt-md-0">
              <div className="d-flex justify-content-between align-items-center title-line px-2">
                <b>LIBRARY</b>
              </div>
              {props.library && (
                <DeckRecommendationLibrary
                  isAuthor={props.isAuthor}
                  activeDeck={props.activeDeck}
                  cards={props.library}
                />
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default DeckRecommendationModal;
