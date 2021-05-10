import React, { useState, useRef, useContext } from 'react';
import { FormControl, Modal, Button, Spinner, Overlay } from 'react-bootstrap';
import AppContext from '../../context/AppContext';

function DeckImportText(props) {
  const { isMobile } = useContext(AppContext);

  const [deckText, setDeckText] = useState('');
  const [emptyDeckText, setEmptyDeckText] = useState(false);
  const [importError, setImportError] = useState(false);
  const refText = useRef(null);

  const [spinnerState, setSpinnerState] = useState(false);

  const handleChange = (event) => {
    setDeckText(event.target.value);
  };

  const importDeckFromText = () => {
    setImportError(false);

    if (deckText) {
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
        })
        .then(() => props.getDecks())
        .then(() => {
          props.setActiveDeck(newDeckId);
          isMobile && props.setShowInfo(true);
          setDeckText('');
          setSpinnerState(false);
          props.handleClose();
        })
        .catch((error) => {
          setImportError(true);
          setSpinnerState(false);
        });
    } else {
      setEmptyDeckText(true);
    }
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
      onShow={() => refText.current.focus()}
      animation={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Import deck from text</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          as="textarea"
          className="mb-3"
          rows="25"
          value={deckText}
          placeholder={placeholder}
          onChange={handleChange}
          ref={refText}
          autoFocus
        />
        <div className="d-flex justify-content-end">
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
        </div>
        <Overlay
          show={emptyDeckText}
          target={refText.current}
          placement="bottom"
          transition={false}
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div className="modal-tooltip error-tooltip small" {...props}>
              <b>ENTER DECK LIST</b>
            </div>
          )}
        </Overlay>
        <Overlay
          show={importError}
          target={refText.current}
          placement="bottom"
          transition={false}
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div className="modal-tooltip error-tooltip small" {...props}>
              <b>ERROR DURING IMPORT</b>
            </div>
          )}
        </Overlay>
      </Modal.Body>
    </Modal>
  );
}

export default DeckImportText;
