import React, { useState, useEffect } from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import { BrowserRouter as Router, useLocation, useParams, Redirect } from "react-router-dom";


import DeckNewDeck from './components/DeckNewDeck.jsx';
import DeckImportDeck from './components/DeckImportDeck.jsx';
import DeckSelectDeck from './components/DeckSelectDeck.jsx';
import DeckRemoveDeck from './components/DeckRemoveDeck.jsx';
import DeckShowDeck from './components/DeckShowDeck.jsx';


function Deck(props) {
  const query = new URLSearchParams(useLocation().search);
  const [sharedDeck, setSharedDeck] = useState(undefined);
  const [sharedDeckId, setSharedDeckId] = useState(query.get("id"));

  const getDeck = (deckid) => {
    const url = process.env.API_URL + 'deck/' + deckid;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
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
      body: JSON.stringify({[field]: value})
    };

    fetch(url, options)
      .then(() => props.getDecks());
  };

  useEffect(() => {
    props.getDecks();
  }, [props.activeDeck]);

  useEffect(() => {
    if (sharedDeckId) {
      getDeck(sharedDeckId)
    }
  }, [sharedDeckId]);

  if (!props.username && !sharedDeckId) {
    return <Redirect to='/account' />
  }

  return (
    <div className='container px-0 py-xl-3 px-xl-2'>
      <div className='row mx-0'>
        <div className='col-md-12 col-lg-1 col-xl-2 px-0 px-xl-2'>
        </div>
        <div className='col-md-12 col-lg-10 col-xl-8 px-0 px-xl-2'>
          { props.username &&
            <>
              <DeckNewDeck
                setActiveDeck={props.setActiveDeck}
                getDecks={props.getDecks}
              />
              <DeckImportDeck
                setActiveDeck={props.setActiveDeck}
                getDecks={props.getDecks}
              />
              <DeckSelectDeck
                decks={props.decks}
                activeDeck={props.activeDeck}
                setActiveDeck={props.setActiveDeck}
              />
              { props.decks[props.activeDeck] &&
                <DeckRemoveDeck
                  deck={props.decks[props.activeDeck]}
                  setActiveDeck={props.setActiveDeck}
                />
              }
            </>
          }
          { props.decks[props.activeDeck] &&
            <DeckShowDeck
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              deckUpdate={deckUpdate}
              deck={props.decks[props.activeDeck]}
              activeDeck={props.activeDeck}
              deckCardAdd={props.deckCardAdd}
              deckCardChange={props.deckCardChange}
              getDecks={props.getDecks}
              setActiveDeck={props.setActiveDeck}
              username={props.username}
            />
          }
          { sharedDeck && sharedDeckId &&
            <DeckShowDeck
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              deckUpdate={deckUpdate}
              deck={sharedDeck[sharedDeckId]}
              activeDeck={props.activeDeck}
              deckCardAdd={props.deckCardAdd}
              deckCardChange={props.deckCardChange}
              getDecks={props.getDecks}
              setActiveDeck={props.setActiveDeck}
              username={props.username}
            />
          }
        </div>

        <div className='col-md-12 col-lg-1 col-xl-2 px-0 px-xl-2'>
        </div>
      </div>
    </div>
  );
}

export default Deck;
