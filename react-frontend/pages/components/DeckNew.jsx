import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function DeckNew(props) {
  const [deckName, setDeckName] = useState('');
  const [emptyDeckName, setEmptyDeckName] = useState(false);
  const [createError, setCreateError] = useState('');

  const handleChange = (event) => {
    setDeckName(event.target.value);
  };

  const createNewDeck = () => {
    setCreateError(false);

    if (deckName) {
      setEmptyDeckName(false);

      let newdeckid;
      const url = `${process.env.API_URL}decks/create`;
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deckname: deckName }),
      };

      const fetchPromise = fetch(url, options);

      fetchPromise
        .then((response) => response.json())
        .then((data) => {
          newdeckid = data.deckid;
          console.log('new deck id:', newdeckid);
        })
        .then(() => props.getDecks())
        .then(() => props.setActiveDeck(newdeckid))
        .catch((error) => {
          setCreateError(true);
          console.log(error);
        });
    }

    !deckName ? setEmptyDeckName(true) : setEmptyDeckName(false);
  };

  return (
    <div className="mb-3">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">New Deck Name</span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Deck Name"
          id="deckName"
          value={deckName}
          onChange={handleChange}
        />
        <Button variant="outline-secondary" onClick={createNewDeck}>
          Create
        </Button>
      </div>
      {emptyDeckName && (
        <div className="d-flex justify-content-end">
          <span className="login-error">Enter deck name</span>
        </div>
      )}
      {createError && (
        <div className="d-flex justify-content-end">
          <span className="login-error">Unknown error</span>
        </div>
      )}
    </div>
  );
}

export default DeckNew;
