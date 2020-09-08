import React from 'react';
import { Button } from 'react-bootstrap';

function DeckRemoveDeck(props) {
  const removeDeck = event => {

    if (props.activeDeck) {
      const url = process.env.API_URL + 'decks/remove';
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({deckid: props.activeDeck}),
      };
      fetch(url, options);
      console.log('Remove deck: ', props.activeDeck);

    } else {
      console.log('Error: no deck selected');
    };
  };

  return (
    <>
      <Button variant='outline-secondary' onClick={removeDeck}>
        Remove
      </Button>
    </>
  );
}

export default DeckRemoveDeck;
