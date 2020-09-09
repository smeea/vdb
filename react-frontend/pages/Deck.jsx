import React, { useState, useEffect } from 'react';
import { Button, Accordion, Card } from 'react-bootstrap';
import { useParams } from 'react-router';

import DeckNewDeck from './components/DeckNewDeck.jsx';
import DeckImportDeck from './components/DeckImportDeck.jsx';
import DeckSelectDeck from './components/DeckSelectDeck.jsx';
import DeckShowDeck from './components/DeckShowDeck.jsx';
import AddModeSwitch from './components/AddModeSwitch.jsx';

function Deck(props) {
  // FIX SHARED LINK
  const { id } = useParams();

  const [sharedDecks, setSharedDecks] = useState(undefined);

  const getDeck = () => {
    const url = process.env.API_URL + 'deck/' + props.id;
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
      .then(() => props.setActiveDeck(props.id));
  };

  const deckCardChange = (deckid, cardid, count) => {
    const url = process.env.API_URL + 'deck/' + deckid;
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
      .then(() => props.getDecks());
  };

  const deckCardAdd = (deckid, cardid) => {
    const url = process.env.API_URL + 'deck/' + deckid;
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
      .then(() => props.getDecks());
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
    if (props.id) {
      getDeck();
    }
  }, [props.id]);

  return (
    <div className='container px-0 py-xl-3 px-xl-2'>
      <div className='row mx-0'>
        <div className='col-md-12 col-lg-1 col-xl-2 px-0 px-xl-2'>
        </div>
        <div className='col-md-12 col-lg-10 col-xl-8 px-0 px-xl-2'>
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                New Deck
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <DeckNewDeck setActiveDeck={props.setActiveDeck} getDecks={props.getDecks} />
                  <DeckImportDeck setActiveDeck={props.setActiveDeck} getDecks={props.getDecks} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          {/* { sharedDecks ? */}
            {/* <DeckShowDeck deckUpdate={deckUpdate} deckCardAdd={deckCardAdd} deckCardChange={deckCardChange} deck={sharedDecks[props.activeDeck]} /> */}
          {/*   : */}
          {/*   <DeckShowDeck deckUpdate={deckUpdate} deckCardAdd={deckCardAdd} deckCardChange={deckCardChange} deck={props.decks[props.activeDeck]} /> */}
          {/* } */}

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                Select Deck
              </span>
            </div>
            <DeckSelectDeck
              handleActiveDeckSelect={props.handleActiveDeckSelect}
              decks={props.decks}
              activeDeck={props.activeDeck}
            />
          </div>
          <DeckShowDeck
            showImage={props.showImage}
            toggleImage={props.toggleImage}
            deckUpdate={deckUpdate}
            deckCardAdd={deckCardAdd}
            deckCardChange={deckCardChange}
            deck={props.decks[props.activeDeck]}
            activeDeck={props.activeDeck}
          />
        </div>

        <div className='col-md-12 col-lg-1 col-xl-2 px-0 px-xl-2'>
        </div>
      </div>
    </div>
  );
}

export default Deck;
