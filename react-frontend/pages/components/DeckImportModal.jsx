import React, { useState } from 'react';
import { FormControl, Modal, Button, Spinner } from 'react-bootstrap';

function DeckImportModal(props) {
  const [deckText, setDeckText] = useState('');
  const [emptyDeckText, setEmptyDeckText] = useState(false);
  const [importError, setImportError] = useState(false);

  const [spinnerState, setSpinnerState] = useState(false);

  const handleChange = (event) => {
    setDeckText(event.target.value);
  };

  const importDeckFromText = () => {
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
        props.setShowInfo(true);
        setDeckText('');
        props.handleClose();
      })
      .catch((error) => {
        setImportError(true);
        console.log(error);
      });
    setSpinnerState(false);
  };
  const placeholder = `\
Paste deck here (text from TWD, Amaranth, Lackey).

It accepts (but work without also) headers like:
Deck Name: xxxx
Author: xxxx
Description: xxxx

It accept crypt like (even lowercase):
5x Cybele	   10  ANI DAI OBF PRE SER THA	Baali:4
5x Cybele
5 Cybele

It accept library like (even lowercase):
12x Ashur Tablets
12 Ashur Tablets

It will skip other (useless) lines, you don't have to remove it yourself.
`;

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      animation={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Import deck</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          as="textarea"
          className="form-control deck-import"
          rows="25"
          value={deckText}
          placeholder={placeholder}
          onChange={handleChange}
        />
        {!spinnerState ? (
          <Button variant="outline-secondary" onClick={importDeckFromText}>
            Import
          </Button>
        ) : (
          <Button variant="outline-secondary" onClick={importDeckFromText}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
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
