import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import ChevronExpand from '../assets/images/icons/chevron-expand.svg';
import List from '../assets/images/icons/list.svg';
import AlertMessage from './components/AlertMessage.jsx';
import DeckSelect from './components/DeckSelect.jsx';
import DeckInfo from './components/DeckInfo.jsx';
import DeckButtons from './components/DeckButtons.jsx';
import DeckCrypt from './components/DeckCrypt.jsx';
import DeckLibrary from './components/DeckLibrary.jsx';
import DeckImport from './components/DeckImport.jsx';

function Deck(props) {
  const query = new URLSearchParams(useLocation().search);
  const [sharedDeck, setSharedDeck] = useState(undefined);
  const sharedDeckId = query.get('id');
  const [showInfo, setShowInfo] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const getDeck = (deckid) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          setSharedDeck(data);
        } else {
          console.log('error: ', data.error);
        }
      });
  };

  const deckUpdate = (deckid, field, value) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [field]: value }),
    };

    fetch(url, options).then(() => props.getDecks());
  };

  useEffect(() => {
    sharedDeckId && getDeck(sharedDeckId);
  }, [sharedDeckId]);

  if (!props.username && !sharedDeckId) {
    return <Redirect to="/account" />;
  }

  let isAuthor;
  if (props.decks[props.activeDeck]) {
    isAuthor = props.username == props.decks[props.activeDeck].owner;
  }

  return (
    <Container className="deck-container">
      <Row>
        <Col lg={3} className="px-0">
          <Row className="justify-content-end mx-0">
            {Object.keys(props.decks).length > 0 && (
              <Col className="px-0 px-lg-3">
                <DeckSelect
                  decks={props.decks}
                  activeDeck={props.activeDeck}
                  setActiveDeck={props.setActiveDeck}
                />
              </Col>
            )}
            {props.isMobile &&
              (props.activeDeck || sharedDeck ? (
                <Col
                  xs="auto"
                  className="d-flex justify-content-between align-items-center px-0 px-lg-3"
                >
                  <Button
                    className="full-height"
                    variant="outline-secondary"
                    onClick={() => setShowInfo(!showInfo)}
                  >
                    <ChevronExpand />
                  </Button>
                  <Button
                    className="full-height"
                    variant="outline-secondary"
                    onClick={() => setShowButtons(!showButtons)}
                  >
                    <List />
                  </Button>
                </Col>
              ) : (
                <Col className="px-0 px-lg-3">
                  <DeckImport
                    setActiveDeck={props.setActiveDeck}
                    getDecks={props.getDecks}
                    setShowInfo={setShowInfo}
                    setShowButtons={props.setShowButtons}
                  />
                </Col>
              ))}
          </Row>
        </Col>
        <Col lg={7} className="px-0 px-lg-3">
          {(showInfo || !props.isMobile) && (
            <>
              {(props.decks[props.activeDeck] || sharedDeck) && (
                <DeckInfo
                  deck={
                    props.activeDeck
                      ? props.decks[props.activeDeck]
                      : sharedDeck
                      ? sharedDeck[sharedDeckId]
                      : null
                  }
                  deckUpdate={deckUpdate}
                  username={props.username}
                  isAuthor={isAuthor}
                />
              )}
            </>
          )}
        </Col>
        <Col lg={2} className="px-0 px-lg-3">
          {!props.isMobile && (
            <DeckButtons
              isActive={props.decks[props.activeDeck] || sharedDeck}
              isMobile={props.isMobile}
              isAuthor={isAuthor}
              username={props.username}
              deck={
                props.activeDeck
                  ? props.decks[props.activeDeck]
                  : sharedDeck
                  ? sharedDeck[sharedDeckId]
                  : null
              }
              getDecks={props.getDecks}
              activeDeck={props.activeDeck ? props.activeDeck : sharedDeckId}
              setActiveDeck={props.setActiveDeck}
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              setShowInfo={setShowInfo}
              setShowButtons={setShowButtons}
            />
          )}
          {showButtons && (
            <Modal
              show={showButtons}
              onHide={() => setShowButtons(false)}
              animation={false}
            >
              <Modal.Body>
                <Container className="px-0" fluid>
                  <Row className="px-0 pb-2">
                    <Col>
                      <button
                        type="button"
                        className="close"
                        onClick={() => setShowButtons(false)}
                      >
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close</span>
                      </button>
                    </Col>
                  </Row>
                  <DeckButtons
                    isActive={props.decks[props.activeDeck] || sharedDeck}
                    isMobile={props.isMobile}
                    isAuthor={isAuthor}
                    username={props.username}
                    deck={
                      props.activeDeck
                        ? props.decks[props.activeDeck]
                        : sharedDeck
                        ? sharedDeck[sharedDeckId]
                        : null
                    }
                    getDecks={props.getDecks}
                    activeDeck={
                      props.activeDeck ? props.activeDeck : sharedDeckId
                    }
                    setActiveDeck={props.setActiveDeck}
                    showImage={props.showImage}
                    setShowImage={props.setShowImage}
                    setShowInfo={setShowInfo}
                    setShowButtons={setShowButtons}
                  />
                </Container>
              </Modal.Body>
            </Modal>
          )}
        </Col>
      </Row>
      {(props.decks[props.activeDeck] || sharedDeck) && (
        <Row>
          <Col lg={7} className="px-0 px-lg-3">
            <DeckCrypt
              deckCardAdd={props.deckCardAdd}
              deckCardChange={props.deckCardChange}
              deckid={props.activeDeck ? props.activeDeck : sharedDeckId}
              cards={
                props.activeDeck
                  ? props.decks[props.activeDeck].crypt
                  : sharedDeck
                  ? sharedDeck[sharedDeckId].crypt
                  : null
              }
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              isAuthor={isAuthor}
              isMobile={props.isMobile}
              isWide={props.isWide}
            />
          </Col>
          <Col lg={5} className="px-0 px-lg-3">
            <DeckLibrary
              deckCardAdd={props.deckCardAdd}
              deckCardChange={props.deckCardChange}
              deckid={props.activeDeck ? props.activeDeck : sharedDeckId}
              cards={
                props.activeDeck
                  ? props.decks[props.activeDeck].library
                  : sharedDeck
                  ? sharedDeck[sharedDeckId].library
                  : null
              }
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              isAuthor={isAuthor}
              isMobile={props.isMobile}
              isWide={props.isWide}
            />
          </Col>
        </Row>
      )}
      {sharedDeck ? (
        <AlertMessage
          className="error-message"
          value={<b>NO DECK WITH THIS ID, MAYBE IT WAS REMOVED BY AUTHOR</b>}
        />
      ) : null}
    </Container>
  );
}

export default Deck;
