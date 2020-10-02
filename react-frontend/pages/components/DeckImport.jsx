import React, { useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';

function DeckImport(props) {
  const [deckText, setDeckText] = useState('');
  const [emptyDeckText, setEmptyDeckText] = useState(false);
  const [importError, setImportError] = useState(false);

  const [spinnerState, setSpinnerState] = useState(false);

  const handleChange = (event) => {
    setDeckText(event.target.value);
  };

  const createImportDeck = () => {
    setImportError(false);

    if (deckText) {
      setEmptyDeckText(false);
      setSpinnerState(true);

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

      const fetchPromise = fetch(url, options);

      fetchPromise
        .then((response) => response.json())
        .then((data) => {
          newDeckId = data.deckid;
          console.log('new deck id:', newDeckId);
        })
        .then(() => props.getDecks())
        .then(() => {
          props.setActiveDeck(newDeckId);
        })
        .catch((error) => {
          setImportError(true);
          setSpinnerState(false);
          console.log(error);
        });
    }

    !deckText ? setEmptyDeckText(true) : setEmptyDeckText(false);
  };

  return (
    <div className="mb-3">
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
        {spinnerState ? (
          <Button variant="outline-secondary" onClick={createImportDeck}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
            <Spinner />
            Import
          </Button>
        ) : (
          <Button variant="outline-secondary" onClick={createImportDeck}>
            Import
          </Button>
        )}
      </div>
      {emptyDeckText && (
        <div className="d-flex justify-content-end">
          <br />
          <span className="login-error">Paste deck to import</span>
        </div>
      )}
      {importError && (
        <div className="d-flex justify-content-end">
          <br />
          <span className="login-error">Cannot import this deck</span>
        </div>
      )}
    </div>
  );
}

export default DeckImport;
