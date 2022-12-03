import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, Modal, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { ErrorOverlay } from 'components';
import { useApp, deckAdd } from 'context';
import { useDeckImport } from 'hooks';
import { deckServices } from 'services';

const DeckImportText = ({
  isAnonymous,
  setBadCards,
  handleCloseModal,
  show,
}) => {
  const {
    isMobile,
    setShowFloatingButtons,
    setShowMenuButtons,
    cryptCardBase,
    libraryCardBase,
  } = useApp();
  const navigate = useNavigate();

  const [deckText, setDeckText] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [importError, setImportError] = useState(false);
  const refText = useRef(null);

  const handleChange = (event) => {
    setDeckText(event.target.value);
  };

  const handleClose = () => {
    handleCloseModal();
    setDeckText('');
  };

  const importDeckFromText = async () => {
    setImportError(false);

    if (deckText) {
      setEmptyError(false);

      const d = await useDeckImport(deckText, cryptCardBase, libraryCardBase);

      deckServices
        .deckImport({ ...d, anonymous: isAnonymous })
        .then((response) => response.json())
        .then((data) => {
          deckAdd({
            ...d,
            deckid: data.deckid,
          });
          navigate(`/decks/${data.deckid}`);
          setBadCards(d.badCards);
          setShowMenuButtons(false);
          setShowFloatingButtons(true);
          setDeckText('');
          handleClose();
        })
        .catch(() => {
          setImportError(true);
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
        <div className="text-lg text-blue font-bold">Import from Text</div>
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
              ? 'flex justify-end py-0 px-3'
              : 'flex justify-end py-1'
          }
        >
          <Button variant="primary" onClick={importDeckFromText}>
            Import
          </Button>
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
