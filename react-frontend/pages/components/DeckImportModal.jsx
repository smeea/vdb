import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

function DeckImportModal(props) {
  const [deckText, setDeckText] = useState('');
  const [emptyDeckText, setEmptyDeckText] = useState(false);
  const [importError, setImportError] = useState(false);

  const [spinnerState, setSpinnerState] = useState(false);

  const handleChange = (event) => {
    setDeckText(event.target.value);
  };

  const importDeck = () => {
    setImportError(false);
    setEmptyDeckText(false);
    setSpinnerState(true);

    let newDeckId;
    const url = `${process.env.API_URL}decks/import`;
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
        setDeckText('');
        props.handleClose();
      })
      .catch((error) => {
        setImportError(true);
        console.log(error);
      });
    setSpinnerState(false);
  };

  return (
    <Modal show={props.show} onHide={props.handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Import deck</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          className="form-control deck-import"
          rows={
            deckText.split(/\r\n|\r|\n/).length < 30
              ? deckText.split(/\r\n|\r|\n/).length > 5
                ? deckText.split(/\r\n|\r|\n/).length
                : 5
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
        {emptyDeckText && (
          <div className="d-flex justify-content-end">
            <span className="login-error">Paste deck</span>
          </div>
        )}
        {importError && (
          <div className="d-flex justify-content-end">
            <span className="login-error">Cannot import this deck</span>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default DeckImportModal;
