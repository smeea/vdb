import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlexGapped, Textarea, Modal, Button, ErrorOverlay } from '@/components';
import { useApp, deckAdd } from '@/context';
import { useDeckImport } from '@/hooks';
import { deckServices } from '@/services';
import { DECKID } from '@/constants';

const DeckImportText = ({ isAnonymous, setBadCards, handleCloseModal }) => {
  const {
    isPlaytester,
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
  const ref = useRef();

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
      const d = await useDeckImport(deckText, cryptCardBase, libraryCardBase, isPlaytester);

      deckServices
        .deckImport({ ...d, anonymous: isAnonymous })
        .then((data) => {
          deckAdd({
            ...d,
            deckid: data[DECKID],
          });
          navigate(`/decks/${data[DECKID]}`);
          setBadCards(d.badCards);
          setShowMenuButtons(false);
          setShowFloatingButtons(true);
          setDeckText('');
          handleClose();
        })
        .catch(() => setImportError(true));
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
    <Modal initialFocus={ref} handleClose={handleClose} size="lg" title="Import from Text">
      <FlexGapped className="flex-col">
        <div className="relative">
          <Textarea
            className="w-full font-mono"
            rows={isMobile ? '20' : '25'}
            value={deckText}
            placeholder={placeholder}
            onChange={handleChange}
            ref={ref}
          />
          {emptyError && <ErrorOverlay placement="bottom">ENTER DECK LIST</ErrorOverlay>}
          {importError && <ErrorOverlay placement="bottom">ERROR DURING IMPORT</ErrorOverlay>}
        </div>
        <div className="flex justify-end">
          <Button onClick={importDeckFromText}>Import</Button>
        </div>
      </FlexGapped>
    </Modal>
  );
};

export default DeckImportText;
