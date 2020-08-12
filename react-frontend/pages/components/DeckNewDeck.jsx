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
      let newdeckid;
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
    <React.Fragment>
      <input
        placeholder='New Deck Name'
        type='text'
        id='deckname'
        value={deckname}
        onChange={handleChange}/>
      <button className='btn btn-outline-secondary' type='button' onClick={createNewDeck}>
        CREATE
      </button>
      <button className='btn btn-outline-secondary' type='button' onClick={clearFormButton}>
        CLEAR
      </button>
    </React.Fragment>
  );
}

export default DecksNewDeck;
