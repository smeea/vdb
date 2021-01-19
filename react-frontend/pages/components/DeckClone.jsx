import React from 'react';
import { Button } from 'react-bootstrap';
import Files from '../../assets/images/icons/files.svg';

function DeckClone(props) {
  const cloneDeck = () => {
    let newdeckid;
    const url = `${process.env.API_URL}decks/clone`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deckname: props.name + ' [by ' + props.author + ']',
        author: props.author,
        target: props.deckid,
        deck: props.deck,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          newdeckid = data.deckid;
        }
      })
      .then(() => props.getDecks())
      .then(() => props.setActiveDeck(newdeckid))
      .then(() => props.setShowButtons(false));
  };

  return (
    <>
      <Button variant="outline-secondary" onClick={cloneDeck} block>
        <Files /> Clone Deck
      </Button>
    </>
  );
}

export default DeckClone;
