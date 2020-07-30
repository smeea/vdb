import React, { useState } from 'react';

function DecksNewDeck(props) {
  const [deckname, setDeckName] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setDeckName(value);
  };

  const clearFormButton = event => {
    setDeckName('');
  };

  const createNewDeck = event => {
    if (deckname) {
      const url = 'http://127.0.0.1:5001/api/decks/create';
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({deckname: deckname}),
      };

      fetch(url, options);

    } else {
      console.log('Error: submit with empty forms');
    };
  };

  return (
    <div>
      <input
        placeholder="New Deck Name"
        type="text"
        id="deckname"
        value={deckname}
        onChange={handleChange}/>
      <button className="btn btn-outline-secondary" type="button" onClick={createNewDeck}>
        CREATE
      </button>
      <button className="btn btn-outline-secondary" type="button" onClick={clearFormButton}>
        CLEAR
      </button>
    </div>
  );
}

export default DecksNewDeck;
