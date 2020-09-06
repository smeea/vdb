import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function DeckNewDeck(props) {
  const [deckName, setDeckName] = useState('');

  const handleChange = event => {
    setDeckName(event.target.value);
  };

  const clearFormButton = () => {
    setDeckName('');
  };

  const createNewDeck = () => {
    if (deckName) {
      let newdeckid;
      const url = process.env.API_URL + 'decks/create';
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({deckname: deckName}),
      };

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

    } else {
      console.log('Error: submit with empty forms');
    };
  };

  return (
    <>
      <input
        placeholder='New Deck Name'
        type='text'
        id='deckName'
        value={deckName}
        onChange={handleChange}/>

      <Button variant='outline-primary' onClick={createNewDeck}>
        Create
      </Button>
      <Button variant='outline-primary' onClick={clearFormButton}>
        Clear
      </Button>
    </>
  );
}

export default DeckNewDeck;
