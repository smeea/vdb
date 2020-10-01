import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function DeckImportDeck(props) {
  // const [deckName, setDeckName] = useState('');
  const [deckText, setDeckText] = useState('');

  const handleChange = (event) => {
    setDeckText(event.target.value);
  };

  const createImportDeck = () => {
    if (deckText) {
      let newDeckId;
      const url = process.env.API_URL + 'decks/import';
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deckText: deckText,
        }),
      };

      fetch(url, options)
        .then(response => response.json())
        .then(data => {
          if (data.error === undefined) {
            newDeckId = data.deckid;
            console.log('new deck id:', newDeckId);
          } else {
            console.log('error: ', data.error);
          };
        })
        .then(() => props.getDecks())
        .then(() => props.setActiveDeck(newDeckId));
    } else {
      console.log('Error: submit with empty forms');
    }
  };

  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">
          Import Deck
          <br />
          TWD / LackeyCCG
        </span>
      </div>
      <textarea
        className="form-control"
        value={deckText}
        onChange={handleChange}
      />
      <Button variant="outline-secondary" onClick={createImportDeck}>
        Import
      </Button>
    </div>
  );
}

export default DeckImportDeck;
