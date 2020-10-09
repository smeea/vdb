import React, { useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';

function DeckImport(props) {
  const [deckText, setDeckText] = useState('');
  const [emptyDeckText, setEmptyDeckText] = useState(false);
  const [importError, setImportError] = useState(false);

  const [spinnerState, setSpinnerState] = useState(false);

  const fileInput = React.createRef();

  const handleChange = (event) => {
    setDeckText(event.target.value);
  };

  const importDeck = () => {
    setImportError(false);
    setEmptyDeckText(false);

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
    } else if (fileInput.current.files.length) {
      let newDeckId;
      const reader = new FileReader();
      reader.readAsText(fileInput.current.files[0]);
      reader.onload = () => {
        console.log(reader.result);

        const url = process.env.API_URL + 'decks/import';
        const options = {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            deckText: reader.result,
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
      };
      setEmptyDeckText(false);
      setSpinnerState(true);
    } else {
      setEmptyDeckText(true);
    }
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
          className="form-control deck-import"
          rows={
            deckText.split(/\r\n|\r|\n/).length < 30
              ? deckText.split(/\r\n|\r|\n/).length
              : 30
          }
          value={deckText}
          placeholder="Paste deck here"
          onChange={handleChange}
        />
        {!spinnerState ? (
          <Button variant="outline-secondary" onClick={importDeck}>
            Import
          </Button>
        ) : (
          <Button variant="outline-secondary" onClick={importDeck}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <Spinner />
            Import
          </Button>
        )}
      </div>
      {emptyDeckText && (
        <div className="d-flex justify-content-end">
          <br />
          <span className="login-error">Paste deck</span>
        </div>
      )}
      {importError && (
        <div className="d-flex justify-content-end">
          <br />
          <span className="login-error">Cannot import this deck</span>
        </div>
      )}
      <div>
        <input ref={fileInput} accept="text/*" type="file" />
      </div>
    </div>
  );
}

export default DeckImport;
