import React, { useState } from 'react';
import {
  Form,
  InputGroup,
  FormControl,
  Modal,
  Button,
  Container,
  Row,
  Col,
  Stack,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import X from 'assets/images/icons/x.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';
import PencilSquare from 'assets/images/icons/pencil-square.svg';
import Dice3 from 'assets/images/icons/dice-3-fill.svg';
import Check2 from 'assets/images/icons/check2.svg';
import Recycle from 'assets/images/icons/recycle.svg';
import PlayFill from 'assets/images/icons/play-fill.svg';
import { ButtonIconed } from 'components';
import { useApp } from 'context';

const SeatingRandomDeckAdd = ({ addDeck }) => {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name) {
      addDeck(name);
      setName('');
    }
  };

  return (
    <Form className="mb-0" onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          placeholder="Add Random Deck"
          type="text"
          value={name}
          onChange={handleChange}
        />
        <Button variant="primary" type="submit">
          <Check2 />
        </Button>
      </InputGroup>
    </Form>
  );
};

const SeatingRandomDeck = ({ toggle, i, deck }) => {
  return (
    <>
      <div
        className={`d-flex align-items-center py-1 ${
          deck.state ? '' : 'gray-font'
        }`}
      >
        <div className="d-flex align-items-center" onClick={() => toggle(i)}>
          <div className="d-flex align-items-center pe-2">
            <>
              {deck.state ? (
                <ToggleOn width="30" height="30" viewBox="0 0 16 16" />
              ) : (
                <ToggleOff width="30" height="30" viewBox="0 0 16 16" />
              )}
            </>
          </div>
          {deck.name}
        </div>
        {deck.deckid && (
          <Link className="px-1" target="_blank" to={`/decks/${deck.deckid}`}>
            <PlayFill height="18" viewBox="0 2 12 14" />
          </Link>
        )}
      </div>
    </>
  );
};

const SeatingDeckOption = ({ setDeck, i, deck }) => {
  const handleChange = (event) => {
    if (event.target.value) {
      setDeck(i, {
        name: event.target.value,
        state: true,
      });
    } else {
      setDeck(i, {
        name: '',
        state: false,
      });
    }
  };

  const toggle = () => {
    if (deck.name) {
      setDeck(i, {
        name: deck.name,
        random: deck.random,
        state: !deck.state,
      });
    } else {
      setDeck(i, {
        name: `Player ${i + 1}`,
        random: deck.random,
        state: true,
      });
    }
  };

  const handleClick = () => {
    setDeck(i, {
      name: deck.name,
      random: !deck.random,
      state: !deck.state && !deck.random ? true : deck.state,
    });
  };

  return (
    <InputGroup>
      <FormControl
        placeholder="Disabled"
        type="text"
        value={deck.state ? (deck.random ? 'RANDOM' : deck.name) : ''}
        onChange={handleChange}
      />
      <Button
        variant={deck.random && deck.state ? 'primary' : 'secondary'}
        onClick={handleClick}
      >
        <Dice3 />
      </Button>
      <div className="d-flex align-items-center ps-3" onClick={toggle}>
        {deck.state ? (
          <ToggleOn width="30" height="30" viewBox="0 0 16 16" />
        ) : (
          <ToggleOff width="30" height="30" viewBox="0 0 16 16" />
        )}
      </div>
    </InputGroup>
  );
};

const SeatingDeck = ({ deck }) => {
  const { isMobile } = useApp();

  return (
    <div
      className={`d-flex justify-content-center ${
        isMobile ? '' : 'nowrap'
      } p-2 p-md-3 ${deck.first ? 'border-dashed bold' : ''}`}
    >
      {deck.deckid ? (
        <Link target="_blank" rel="noreferrer" to={`/decks/${deck.deckid}`}>
          {deck.name}
        </Link>
      ) : (
        <>{deck.name}</>
      )}
    </div>
  );
};

const SeatingTable = ({ decks }) => {
  if (decks.length === 5) {
    return (
      <>
        <Row className="pb-2 pb-md-4 m-0">
          <Col className="d-flex justify-content-center" />
          <Col className="d-flex justify-content-center">
            <SeatingDeck deck={decks[2]} />
          </Col>
          <Col className="d-flex justify-content-center">
            <SeatingDeck deck={decks[3]} />
          </Col>
          <Col className="d-flex justify-content-center" />
        </Row>
        <Row className="py-2 pt-md-4 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingDeck deck={decks[1]} />
          </Col>
          <Col className="d-flex justify-content-center">
            <SeatingDeck deck={decks[4]} />
          </Col>
        </Row>
        <Row className="pt-2 pt-md-4 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingDeck deck={decks[0]} />
          </Col>
        </Row>
      </>
    );
  } else if (decks.length === 4) {
    return (
      <>
        <Row className="pb-1 pb-md-3 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingDeck deck={decks[2]} />
          </Col>
        </Row>
        <Row className="py-1 py-md-3 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingDeck deck={decks[1]} />
          </Col>
          <Col className="d-flex justify-content-center">
            <SeatingDeck deck={decks[3]} />
          </Col>
        </Row>
        <Row className="pt-1 pt-md-3 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingDeck deck={decks[0]} />
          </Col>
        </Row>
      </>
    );
  } else if (decks.length === 3) {
    return (
      <>
        <Row className="pb-2 pb-md-4 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingDeck deck={decks[1]} />
          </Col>
          <Col className="d-flex justify-content-center">
            <SeatingDeck deck={decks[2]} />
          </Col>
        </Row>
        <Row className="pt-2 pt-md-4 m-0">
          <Col className="d-flex justify-content-center">
            <SeatingDeck deck={decks[0]} />
          </Col>
        </Row>
      </>
    );
  }
};

const DeckSeatingModal = ({
  randomDecks,
  setRandomDecks,
  show,
  handleClose,
  decks,
  setDeck,
  reshuffle,
  seating,
}) => {
  const { isNarrow, isMobile } = useApp();
  const [editRandom, setEditRandom] = useState();

  const toggleRandom = (i) => {
    setRandomDecks((draft) => {
      draft[i].state = !draft[i].state;
      return draft;
    });
  };

  const addRandomDeck = (name) => {
    setRandomDecks((draft) => {
      draft.unshift({ deckid: null, name: name, state: true });
      return draft;
    });
  };

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
                      <SeatingDeckOption
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
                  {seating && <SeatingTable decks={seating} />}
                </Row>
              </Col>
            </Row>
            {editRandom && (
              <Row className="pt-3">
                <hr />
                <Row>
                  <Col sm={12} md={7} lg={6} xl={5}>
                    <div className="py-3">
                      <SeatingRandomDeckAdd addDeck={addRandomDeck} />
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

export default DeckSeatingModal;
