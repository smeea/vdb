import React, { useState, useEffect } from 'react';
import DeckNewDeck from './components/DeckNewDeck.jsx';
import DeckSelectDeck from './components/DeckSelectDeck.jsx';
import DeckShowDeck from './components/DeckShowDeck.jsx';
import DeckRemoveDeck from './components/DeckRemoveDeck.jsx';

function Deck(props) {
  const [decks, setDecks] = useState({});
  const [activeDeck, setActiveDeck] = useState(undefined);
  const [sharedDecks, setSharedDecks] = useState(undefined);

  const handleActiveDeckSelect = event => {
    const { value } = event.target;
    setActiveDeck(value);
  };

  const getDeck = () => {
    const url = 'http://127.0.0.1:5001/api/deck/' + props.id;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        if (data.error === undefined) {
          setSharedDecks(data);
        } else {
          console.log('error: ', data.error);
        }
      })
      .then(() => setActiveDeck(props.id));
  };

  const getDecks = () => {
    const url = 'http://127.0.0.1:5001/api/decks';
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        if (data.error === undefined) {
          setDecks(data);
        } else {
          console.log('error: ', data.error);
        }
      });
  };

  const deckCardChange = (deckid, cardid, count) => {
    const url = 'http://127.0.0.1:5001/api/deck/' + deckid;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({update: {[cardid]: count}})
    };

    fetch(url, options)
      .then(() => getDecks());
  };

  const deckCardAdd = (deckid, cardid) => {
    const url = 'http://127.0.0.1:5001/api/deck/' + deckid;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({update: {[cardid]: 1}})
    };

    fetch(url, options)
      .then(() => getDecks());
  };

  const deckUpdate = (deckid, field, value) => {
    const url = 'http://127.0.0.1:5001/api/deck/' + deckid;
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
      .then(() => getDecks());
  };

  useEffect(() => {
    getDecks();
  }, []);

  useEffect(() => {
    if (props.id) {
      getDeck();
    }
  }, [props.id]);

  return (
    <div className='container main-container py-xl-3 px-0 px-xl-2'>
      <div className='row mx-0'>
        <div className='col-md-12 col-lg-1 col-xl-2 px-0 px-xl-2'>
        </div>

        <div className='col-md-12 col-lg-10 col-xl-8 px-0 px-xl-2'>
          <DeckNewDeck setActiveDeck={setActiveDeck} getDecks={getDecks} />
          <DeckSelectDeck handleActiveDeckSelect={handleActiveDeckSelect} decks={decks} activeDeck={activeDeck} />
          <DeckRemoveDeck activeDeck={activeDeck} />
          <br />
          { sharedDecks ?
            <DeckShowDeck deckUpdate={deckUpdate} deckCardAdd={deckCardAdd} deckCardChange={deckCardChange} deck={sharedDecks[activeDeck]} />
            :
            <DeckShowDeck deckUpdate={deckUpdate} deckCardAdd={deckCardAdd} deckCardChange={deckCardChange} deck={decks[activeDeck]} />
          }
        </div>

        <div className='col-md-12 col-lg-1 col-xl-2 px-0 px-xl-2'>
        </div>
      </div>
    </div>
  );
}

export default Deck;
