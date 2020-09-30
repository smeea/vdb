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
      const url = '/decks/create';
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
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">New Deck Name</span>
      </div>
      <input type="text"
             className="form-control"
             placeholder='Deck Name'
             type='text'
             id='deckName'
             value={deckName}
             onChange={handleChange}
      />
      <Button variant='outline-secondary' onClick={createNewDeck}>
        Create
      </Button>
    </div>
  );
}

export default DeckNewDeck;
