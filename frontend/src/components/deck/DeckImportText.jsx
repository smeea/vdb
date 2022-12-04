import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { Modal, Button, ErrorOverlay } from 'components';
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
      handleClose={handleClose}
      /* TODO add onShow */
      onShow={() => refText.current.focus()}
      size="lg"
      dialogClassName={isMobile ? 'm-0' : null}
      title="Import from Text"
    >
      <div>
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
            isMobile ? 'flex justify-end py-0 px-3' : 'flex justify-end py-1'
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
      </div>
    </Modal>
  );
};

export default DeckImportText;
