import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col, Stack } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import PencilSquare from 'assets/images/icons/pencil-square.svg';
import Recycle from 'assets/images/icons/recycle.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';
import {
  ButtonIconed,
  SeatingPlayerSelector,
  SeatingRandomDeck,
  SeatingCustomDeckAdd,
  SeatingTableLayout,
} from 'components';
import { useApp } from 'context';

const SeatingModal = ({
  addCustomDeck,
  customDecks,
  handleClose,
  removeCustomDeck,
  players,
  reshuffle,
  seating,
  setPlayer,
  setWithCustom,
  setWithStandard,
  show,
  standardDecks,
  toggleCustom,
  toggleStandard,
  withCustom,
  withStandard,
}) => {
  const { isNarrow, isMobile } = useApp();
  const [editRandom, setEditRandom] = useState();

  const withRandom = Object.values(players).some((d) => {
    return d.random;
  });

  const haveRandomSelected =
    (withStandard &&
      Object.values(standardDecks).some((d) => {
        return d.state;
      })) ||
    (withCustom &&
      Object.values(customDecks).some((d) => {
        return d.state;
      }));

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
          <Container className="mb-0 mb-md-3 px-0 px-md-0" fluid>
            <Row className="align-items-center">
              <Col className="py-2" md={5} xl={4}>
                <Stack gap={1}>
                  {players.map((p, idx) => {
                    return (
                      <SeatingPlayerSelector
                        key={idx}
                        i={idx}
                        player={p}
                        setPlayer={setPlayer}
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
                    text="Select Random"
                  />
                  {withRandom && !haveRandomSelected && (
                    <div className="pt-2 red">
                      No random players source selected
                    </div>
                  )}
                </Stack>
              </Col>
              <Col md={7} xl={8} className="px-0">
                {seating && (
                  <Row className="py-2 py-md-0">
                    <SeatingTableLayout players={seating} />
                  </Row>
                )}
              </Col>
            </Row>
            {editRandom && (
              <Row className="pt-0 pt-md-3">
                <hr className="mx-0" />
                <Row className="pb-3">
                  <Row>
                    <div
                      className="d-flex align-items-center"
                      onClick={() => setWithCustom(!withCustom)}
                    >
                      <div className="d-flex align-items-center pe-2">
                        <>
                          {withCustom ? (
                            <ToggleOn
                              width="30"
                              height="30"
                              viewBox="0 0 16 16"
                            />
                          ) : (
                            <ToggleOff
                              width="30"
                              height="30"
                              viewBox="0 0 16 16"
                            />
                          )}
                        </>
                      </div>
                      <div className="d-flex bold blue py-2">Custom Decks</div>
                    </div>
                    <Col sm={12} md={7} lg={6} xl={5} className="py-2">
                      <SeatingCustomDeckAdd addDeck={addCustomDeck} />
                    </Col>
                  </Row>
                  <Col sm={12} md={6} lg={4}>
                    {customDecks
                      .slice(0, Math.ceil(customDecks.length / 3))
                      .map((d, idx) => {
                        return (
                          <SeatingRandomDeck
                            key={idx}
                            i={idx}
                            deck={d}
                            toggle={toggleCustom}
                            disabled={!withCustom}
                            remove={removeCustomDeck}
                          />
                        );
                      })}
                  </Col>
                  <Col sm={12} md={6} lg={4}>
                    {customDecks
                      .slice(
                        Math.ceil(customDecks.length / 3),
                        Math.ceil((customDecks.length * 2) / 3)
                      )
                      .map((d, idx) => {
                        return (
                          <SeatingRandomDeck
                            key={idx}
                            i={Math.ceil(customDecks.length / 3) + idx}
                            deck={d}
                            toggle={toggleCustom}
                            disabled={!withCustom}
                            remove={removeCustomDeck}
                          />
                        );
                      })}
                  </Col>
                  <Col sm={12} md={6} lg={4}>
                    {customDecks
                      .slice(Math.ceil((customDecks.length * 2) / 3))
                      .map((d, idx) => {
                        return (
                          <SeatingRandomDeck
                            key={idx}
                            i={Math.ceil((customDecks.length * 2) / 3) + idx}
                            deck={d}
                            toggle={toggleCustom}
                            disabled={!withCustom}
                            remove={removeCustomDeck}
                          />
                        );
                      })}
                  </Col>
                </Row>
                <hr className="mx-0" />
                <Row>
                  <div
                    className="d-flex align-items-center"
                    onClick={() => setWithStandard(!withStandard)}
                  >
                    <div className="d-flex align-items-center pe-2">
                      <>
                        {withStandard ? (
                          <ToggleOn
                            width="30"
                            height="30"
                            viewBox="0 0 16 16"
                          />
                        ) : (
                          <ToggleOff
                            width="30"
                            height="30"
                            viewBox="0 0 16 16"
                          />
                        )}
                      </>
                    </div>
                    <div className="bold blue py-2">
                      Standard Decks (from{' '}
                      <a
                        className="name"
                        target="_blank"
                        rel="noreferrer"
                        href="https://codex-of-the-damned.org/en/archetypes/index.html"
                      >
                        Codex
                      </a>
                      )
                    </div>
                  </div>
                </Row>
                <Col sm={12} md={6} lg={4}>
                  {standardDecks
                    .slice(0, Math.ceil(standardDecks.length / 3))
                    .map((d, idx) => {
                      return (
                        <SeatingRandomDeck
                          key={idx}
                          i={idx}
                          deck={d}
                          toggle={toggleStandard}
                          disabled={!withStandard}
                        />
                      );
                    })}
                </Col>
                <Col sm={12} md={6} lg={4}>
                  {standardDecks
                    .slice(
                      Math.ceil(standardDecks.length / 3),
                      Math.ceil((standardDecks.length * 2) / 3)
                    )
                    .map((d, idx) => {
                      return (
                        <SeatingRandomDeck
                          key={idx}
                          i={Math.ceil(standardDecks.length / 3) + idx}
                          deck={d}
                          toggle={toggleStandard}
                          disabled={!withStandard}
                        />
                      );
                    })}
                </Col>
                <Col sm={12} md={6} lg={4}>
                  {standardDecks
                    .slice(Math.ceil((standardDecks.length * 2) / 3))
                    .map((d, idx) => {
                      return (
                        <SeatingRandomDeck
                          key={idx}
                          i={Math.ceil((standardDecks.length * 2) / 3) + idx}
                          deck={d}
                          toggle={toggleStandard}
                          disabled={!withStandard}
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
