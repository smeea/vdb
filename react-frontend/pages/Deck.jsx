import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import AlertMessage from './components/AlertMessage.jsx';
import DeckNew from './components/DeckNew.jsx';
import DeckImport from './components/DeckImport.jsx';
import DeckExport from './components/DeckExport.jsx';
import DeckSelect from './components/DeckSelect.jsx';
import DeckShow from './components/DeckShow.jsx';

function Deck(props) {
  const query = new URLSearchParams(useLocation().search);
  const [sharedDeck, setSharedDeck] = useState(undefined);
  const sharedDeckId = query.get('id');

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
    props.getDecks();
  }, [props.activeDeck]);

  useEffect(() => {
    if (sharedDeckId) {
      getDeck(sharedDeckId);
    }
  }, [sharedDeckId]);

  if (!props.username && !sharedDeckId) {
    return <Redirect to="/account" />;
  }

  return (
    <Container className="main-container">
      <Row>
        <Col md={12} lg={1}></Col>
        <Col md={12} lg={10}>
          {props.username && (
            <>
              <DeckNew
                setActiveDeck={props.setActiveDeck}
                getDecks={props.getDecks}
              />
              <DeckImport
                setActiveDeck={props.setActiveDeck}
                getDecks={props.getDecks}
              />
              <DeckExport activeDeck={props.activeDeck} />
              <DeckSelect
                decks={props.decks}
                activeDeck={props.activeDeck}
                setActiveDeck={props.setActiveDeck}
              />
            </>
          )}
          {props.decks[props.activeDeck] && (
            <DeckShow
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              deck={props.decks[props.activeDeck]}
              deckUpdate={deckUpdate}
              setActiveDeck={props.setActiveDeck}
              decks={props.decks}
              getDecks={props.getDecks}
              deckCardAdd={props.deckCardAdd}
              deckCardChange={props.deckCardChange}
              username={props.username}
            />
          )}
          {sharedDeckId ? (
            sharedDeck && sharedDeck[sharedDeckId] ? (
              <DeckShow
                showImage={props.showImage}
                toggleImage={props.toggleImage}
                deck={sharedDeck[sharedDeckId]}
                deckUpdate={deckUpdate}
                setActiveDeck={props.setActiveDeck}
                decks={props.decks}
                getDecks={props.getDecks}
                deckCardAdd={props.deckCardAdd}
                deckCardChange={props.deckCardChange}
                username={props.username}
              />
            ) : (
              <AlertMessage
                className="error-message"
                value={
                  <b>NO DECK WITH THIS ID, MAYBE IT WAS REMOVED BY AUTHOR</b>
                }
              />
            )
          ) : null}
        </Col>
        <Col md={12} lg={1}></Col>
      </Row>
    </Container>
  );
}

export default Deck;
