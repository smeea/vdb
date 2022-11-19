import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col, Stack } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import PencilSquare from 'assets/images/icons/pencil-square.svg';
import Recycle from 'assets/images/icons/recycle.svg';
import {
  ButtonIconed,
  SeatingPlayerSelector,
  SeatingRandomDeck,
  SeatingRandomDeckAddForm,
  SeatingTableLayout,
} from 'components';
import { useApp } from 'context';

const SeatingModal = ({
  randomDecks,
  toggleRandom,
  addRandomDeck,
  show,
  handleClose,
  decks,
  setDeck,
  reshuffle,
  seating,
}) => {
  const { isNarrow, isMobile } = useApp();
  const [editRandom, setEditRandom] = useState();

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        dialogClassName={isMobile ? 'm-0' : 'modal-wide'}
      >
        <Modal.Header className="no-border p-2 pb-0 pb-md-1 p-md-4">
          <h5>Table Seating</h5>
          {!isNarrow && (
            <Button variant="outline-secondary" onClick={handleClose}>
              <X width="32" height="32" viewBox="0 0 16 16" />
            </Button>
          )}
        </Modal.Header>
        <Modal.Body className="py-0 px-2 px-md-4">
          <Container className="mb-3 px-0 px-md-0" fluid>
            <Row className="align-items-center">
              <Col className="py-2" md={5} xl={4}>
                <Stack gap={1}>
                  {decks.map((d, idx) => {
                    return (
                      <SeatingPlayerSelector
                        key={idx}
                        i={idx}
                        deck={d}
                        setDeck={setDeck}
                      />
                    );
                  })}
                </Stack>
                <Stack className="pt-4" gap={2}>
                  <ButtonIconed
                    variant="primary"
                    onClick={reshuffle}
                    title="Reshuffle"
                    icon={
                      <Recycle width="18" height="18" viewBox="0 0 16 16" />
                    }
                    text="Reshuffle"
                  />
                  <ButtonIconed
                    variant="primary"
                    onClick={() => setEditRandom(!editRandom)}
                    title="Reshuffle"
                    icon={
                      <PencilSquare
                        width="18"
                        height="18"
                        viewBox="0 0 16 16"
                      />
                    }
                    text="Edit Random"
                  />
                </Stack>
              </Col>
              <Col md={7} xl={8} className="px-0">
                <Row className="pt-2 pt-md-0">
                  {seating && <SeatingTableLayout decks={seating} />}
                </Row>
              </Col>
            </Row>
            {editRandom && (
              <Row className="pt-3">
                <hr />
                <Row>
                  <Col sm={12} md={7} lg={6} xl={5}>
                    <div className="py-3">
                      <SeatingRandomDeckAddForm addDeck={addRandomDeck} />
                    </div>
                  </Col>
                  <Col>{/* TODO TOGGLE ALL BUTTONS */}</Col>
                </Row>
                <Col sm={12} md={6} lg={4}>
                  {randomDecks
                    .slice(0, Math.floor(randomDecks.length / 3))
                    .map((d, idx) => {
                      return (
                        <SeatingRandomDeck
                          key={idx}
                          i={idx}
                          deck={d}
                          toggle={toggleRandom}
                        />
                      );
                    })}
                </Col>
                <Col sm={12} md={6} lg={4}>
                  {randomDecks
                    .slice(
                      Math.floor(randomDecks.length / 3),
                      Math.floor((randomDecks.length * 2) / 3)
                    )
                    .map((d, idx) => {
                      return (
                        <SeatingRandomDeck
                          key={idx}
                          i={Math.floor(randomDecks.length / 3) + idx}
                          deck={d}
                          toggle={toggleRandom}
                        />
                      );
                    })}
                </Col>
                <Col sm={12} md={6} lg={4}>
                  {randomDecks
                    .slice(Math.floor((randomDecks.length * 2) / 3))
                    .map((d, idx) => {
                      return (
                        <SeatingRandomDeck
                          key={idx}
                          i={Math.floor((randomDecks.length * 2) / 3) + idx}
                          deck={d}
                          toggle={toggleRandom}
                        />
                      );
                    })}
                </Col>
              </Row>
            )}
          </Container>
        </Modal.Body>
      </Modal>
      {isNarrow && (
        <div
          onClick={handleClose}
          className="d-flex float-right-bottom float-clear align-items-center justify-content-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default SeatingModal;
