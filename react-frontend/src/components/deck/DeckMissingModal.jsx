import React from 'react';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { DeckCrypt, DeckLibrary, DeckExportButton } from 'components';
import { useApp } from 'context';

function DeckMissingModal(props) {
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
        <h5>{props.deck.name}</h5>
        <Button
          variant="outline-secondary"
          onClick={() => props.setShow(false)}
        >
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Container fluid>
          <Row className={isMobile ? 'px-0' : 'px-0 pb-4'}>
            <Col xs={12} md={7} className="px-0 ps-lg-4 pe-lg-3">
              <div
                className={
                  isMobile || props.inInventory ? null : 'sticky-modal'
                }
              >
                <DeckCrypt
                  cards={props.deck.crypt}
                  isAuthor={false}
                  inMissing={true}
                />
              </div>
            </Col>
            <Col xs={12} md={5} className="px-0 ps-lg-3 pe-lg-4">
              <DeckLibrary
                cards={props.deck.library}
                isAuthor={false}
                inMissing={true}
              />
            </Col>
          </Row>
          <div
            className={
              isMobile
                ? 'd-flex justify-content-end pt-2 py-2'
                : 'd-flex justify-content-end px-2 pb-4'
            }
          >
            <div className="ps-2">
              <DeckExportButton
                inMissing={true}
                deck={props.deck}
                activeDeck={{ src: 'shared', deckid: 'deckInUrl' }}
              />
            </div>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default DeckMissingModal;
