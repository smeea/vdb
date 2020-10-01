import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';

import DeckNew from './components/DeckNew.jsx';
import DeckImport from './components/DeckImport.jsx';
import DeckSelect from './components/DeckSelect.jsx';
import DeckShow from './components/DeckShow.jsx';

function Deck(props) {
  const query = new URLSearchParams(useLocation().search);
  const [sharedDeck, setSharedDeck] = useState(undefined);
  const sharedDeckId = query.get('id');

  const getDeck = (deckid) => {
    const url = process.env.API_URL + 'deck/' + deckid;
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
    const url = process.env.API_URL + 'deck/' + deckid;
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
    <div className="container px-0 py-xl-3 px-xl-2">
      <div className="row mx-0">
        <div className="col-md-12 col-lg-1 col-xl-2 px-0 px-xl-2"></div>
        <div className="col-md-12 col-lg-10 col-xl-8 px-0 px-xl-2">
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
          {sharedDeck && sharedDeckId && (
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
          )}
        </div>

        <div className="col-md-12 col-lg-1 col-xl-2 px-0 px-xl-2"></div>
      </div>
    </div>
  );
}

export default Deck;
