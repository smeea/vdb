import React from 'react';
import { Button } from 'react-bootstrap';

function DeckCloneDeck(props) {
  const cloneDeck = () => {
    let newdeckid;
    const url = process.env.API_URL + 'decks/clone';
    const date = new Date().toISOString().slice(0, 10)
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deckname: props.name + ' by ' + props.author + ' [' + date + ']',
        target: props.deckid,
      }),
    };

    console.log(options.body)

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        if (data.error === undefined) {
          newdeckid = data.deckid;
          console.log('new deck id:', newdeckid);
        } else {
          console.log('error: ', data.error);
        };
      })
      .then(() => props.getDecks())
      .then(() => props.setActiveDeck(newdeckid));
  };

  return (
    <>
      <Button variant='outline-secondary' onClick={cloneDeck}>
        Clone Deck
      </Button>
    </>
  );
}

export default DeckCloneDeck;
