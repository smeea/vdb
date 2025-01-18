import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ErrorOverlay, DeckImportButton } from '@/components';
import { useApp, deckAdd } from '@/context';
import { importDeck } from '@/utils';
import { formatServices, deckServices } from '@/services';
import { SHOW, IS_ANONYMOUS, NAME, AUTHOR, CRYPT, LIBRARY, DECKID, BAD_CARDS } from '@/constants';

const DeckImport = ({
  isOnlyNew,
  setBadImportCards,
  setShowImportAmaranth,
  setShowImportText,
  setShowInfo,
}) => {
  const {
    isPlaytester,
    setShowMenuButtons,
    setShowFloatingButtons,
    cryptCardBase,
    libraryCardBase,
    publicName,
  } = useApp();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const fileInput = useRef();
  const fileInputAnonymous = useRef();

  const handleFileInputClick = (isAnonymous) => {
    isAnonymous ? fileInputAnonymous.current.click() : fileInput.current.click();
  };

  const handleOpenTextModal = (isAnonymous) => {
    setShowImportText({ [IS_ANONYMOUS]: isAnonymous, [SHOW]: true });
    setShowMenuButtons(false);
    setShowFloatingButtons(false);
  };

  const handleOpenAmaranthModal = () => {
    setShowImportAmaranth(true);
    setShowMenuButtons(false);
    setShowFloatingButtons(false);
  };

  const handleCloseImportModal = () => {
    setShowImportText(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const createNewDeck = () => {
    setError(false);
    const d = {
      [NAME]: 'New deck',
      [AUTHOR]: publicName,
    };

    deckServices
      .deckImport(d)
      .then((data) => {
        setShowInfo && setShowInfo(true);
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
        deckAdd({
          ...d,
          [DECKID]: data[DECKID],
          [CRYPT]: {},
          [LIBRARY]: {},
        });
        navigate(`/decks/${data[DECKID]}`);
      })
      .catch(() => setError(true));
  };

  const importDeckFromFile = (fileInput, isAnonymous) => {
    setError(false);

    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsText(file);
    reader.onload = async () => {
      const deckText =
        file.type === 'text/plain' ? reader.result : formatServices.convertDekToText(reader.result);

      const d = await importDeck(deckText, cryptCardBase, libraryCardBase, isPlaytester);

      deckServices
        .deckImport({ ...d, [IS_ANONYMOUS]: isAnonymous })
        .then((data) => {
          deckAdd({
            ...d,
            [DECKID]: data[DECKID],
          });
          navigate(`/decks/${data[DECKID]}`);
          setBadImportCards(d[BAD_CARDS]);
          setShowMenuButtons(false);
          setShowFloatingButtons(true);
          handleCloseImportModal();
        })
        .catch(() => setError(true));
    };
  };

  return (
    <>
      <DeckImportButton
        handleCreate={createNewDeck}
        handleFileInputClick={handleFileInputClick}
        handleOpenTextModal={handleOpenTextModal}
        handleOpenAmaranthModal={handleOpenAmaranthModal}
        variant={isOnlyNew ? 'primary' : null}
      />
      {!isOnlyNew && (
        <>
          <input
            ref={fileInput}
            accept=".txt, .dek"
            type="file"
            onChange={() => importDeckFromFile(fileInput, false)}
            style={{ display: 'none' }}
          />
          <input
            ref={fileInputAnonymous}
            accept=".txt, .dek"
            type="file"
            onChange={() => importDeckFromFile(fileInputAnonymous, true)}
            style={{ display: 'none' }}
          />
        </>
      )}
      {error && <ErrorOverlay placement="left">ERROR</ErrorOverlay>}
    </>
  );
};

export default DeckImport;
