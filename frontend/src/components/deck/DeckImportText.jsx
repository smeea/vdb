import React, { useState, useRef } from 'react';
import { FormControl, Modal, Button, Spinner } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { ErrorOverlay } from 'components';
import { useApp } from 'context';

const DeckImportText = ({
  anonymous,
  setBadCards,
  handleCloseModal,
  show,
  addImportedDeckToState,
}) => {
  const {
    setActiveDeck,
    isMobile,
    setShowFloatingButtons,
    setShowMenuButtons,
  } = useApp();

  const [deckText, setDeckText] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [importError, setImportError] = useState(false);
  const refText = useRef(null);

  const [spinnerState, setSpinnerState] = useState(false);

  const handleChange = (event) => {
    setDeckText(event.target.value);
  };

  const handleClose = () => {
    handleCloseModal();
    setDeckText('');
  };

  const importDeckFromText = () => {
    setImportError(false);

    if (deckText) {
      setEmptyError(false);
      setSpinnerState(true);

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
          anonymous: anonymous,
        }),
      };

      const fetchPromise = fetch(url, options);

      fetchPromise
        .then((response) => response.json())
        .then((data) => {
          addImportedDeckToState({ data, anonymous });
          setBadCards(data.bad_cards);
          setActiveDeck({
            src: anonymous ? 'shared' : 'my',
            deckid: data.deckid,
          });
          setShowMenuButtons(false);
          setShowFloatingButtons(true);
          setDeckText('');
          setSpinnerState(false);
          handleClose();
        })
        .catch((error) => {
          setImportError(true);
          setSpinnerState(false);
        });
    } else {
      setEmptyError(true);
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
      show={show}
      onHide={handleClose}
      onShow={() => refText.current.focus()}
      animation={false}
      size="lg"
      dialogClassName={isMobile ? 'm-0' : null}
    >
      <Modal.Header className="no-border pt-2 pt-md-3 pb-0 px-2 px-md-4">
        <h5>Import from Text</h5>
        <Button variant="outline-secondary" onClick={handleClose}>
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className={isMobile ? 'px-0 pt-0' : 'px-4 pt-2'}>
        <FormControl
          as="textarea"
          className="deck-import mb-3"
          rows={isMobile ? '20' : '25'}
          value={deckText}
          placeholder={placeholder}
          onChange={handleChange}
          ref={refText}
          autoFocus
        />
        <div
          className={
            isMobile
              ? 'd-flex justify-content-end py-0 px-3'
              : 'd-flex justify-content-end py-1'
          }
        >
          {!spinnerState ? (
            <Button variant="primary" onClick={importDeckFromText}>
              Import
            </Button>
          ) : (
            <Button variant="primary" onClick={importDeckFromText}>
              <Spinner animation="border" size="sm" />
              <span className="ps-2">Import</span>
            </Button>
          )}
        </div>
        <ErrorOverlay
          show={emptyError}
          target={refText.current}
          placement="bottom"
          modal={true}
        >
          ENTER DECK LIST
        </ErrorOverlay>
        <ErrorOverlay
          show={importError}
          target={refText.current}
          placement="bottom"
          modal={true}
        >
          ERROR DURING IMPORT
        </ErrorOverlay>
      </Modal.Body>
    </Modal>
  );
};

export default DeckImportText;
