import React, { useState, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import ClipboardPlus from '@/assets/images/icons/clipboard-plus.svg?react';
import {
  ButtonIconed,
  ErrorOverlay,
  DeckImportButton,
  DeckImportText,
  DeckImportAmaranth,
  DeckImportBadCardsModal,
} from '@/components';
import { useApp, deckStore, deckAdd } from '@/context';
import { useDeckImport } from '@/hooks';
import { deckServices } from '@/services';
import { DECK } from '@/constants';

const DeckImport = ({ setShowInfo, isOnlyNew }) => {
  const {
    isPlaytester,
    setShowMenuButtons,
    setShowFloatingButtons,
    cryptCardBase,
    libraryCardBase,
    publicName,
  } = useApp();
  const deck = useSnapshot(deckStore)[DECK];
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [showAmaranthModal, setShowAmaranthModal] = useState(false);
  const [badCards, setBadCards] = useState([]);

  const fileInput = useRef();
  const fileInputAnonymous = useRef();

  const handleFileInputClick = (isAnonymous) => {
    isAnonymous ? fileInputAnonymous.current.click() : fileInput.current.click();
  };

  const handleCloseImportModal = () => {
    setShowTextModal(false);
    setShowAmaranthModal(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const handleOpenTextModal = (isAnonymous) => {
    setShowTextModal({ isAnonymous: isAnonymous, show: true });
  };

  const handleOpenAmaranthModal = () => setShowAmaranthModal(true);

  const createNewDeck = () => {
    setError(false);
    const d = {
      name: 'New deck',
      author: publicName,
    };

    deckServices
      .deckImport({ ...d })
      .then((data) => {
        setShowInfo && setShowInfo(true);
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
        deckAdd({
          ...d,
          deckid: data[DECKID],
          crypt: {},
          library: {},
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
      let deckText;

      if (file.type === 'text/plain') {
        deckText = reader.result;
      } else {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(reader.result, 'text/xml');
        const xmlCrypt = xmlDoc.getElementsByTagName('deck')[0].childNodes[5].children;
        const xmlLibrary = xmlDoc.getElementsByTagName('deck')[0].childNodes[3].children;

        const crypt = {};
        Object.values(xmlCrypt).forEach((i) => {
          const cardName = i.childNodes[0].childNodes[0].data;
          if (!crypt[cardName]) {
            crypt[cardName] = 0;
          }
          crypt[cardName] += 1;
        });

        const library = {};
        Object.values(xmlLibrary).forEach((i) => {
          const cardName = i.childNodes[0].childNodes[0].data;
          if (!library[cardName]) {
            library[cardName] = 0;
          }
          library[cardName] += 1;
        });

        deckText = '';

        Object.keys(crypt).forEach((card) => {
          deckText += `${crypt[card]} ${card}\n`;
        });

        Object.keys(library).forEach((card) => {
          deckText += `${library[card]} ${card}\n`;
        });
      }

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
          handleCloseImportModal();
        })
        .catch(() => setError(true));
    };
  };

  return (
    <>
      {isOnlyNew ? (
        <ButtonIconed onClick={createNewDeck} icon={<ClipboardPlus />} text="Create New Deck" />
      ) : (
        <>
          <DeckImportButton
            handleCreate={createNewDeck}
            handleFileInputClick={handleFileInputClick}
            handleOpenTextModal={handleOpenTextModal}
            handleOpenAmaranthModal={handleOpenAmaranthModal}
          />
          {badCards.length > 0 && (
            <DeckImportBadCardsModal
              deckid={deck?.[DECKID]}
              badCards={badCards}
              setBadCards={setBadCards}
            />
          )}
          {showTextModal.show && (
            <DeckImportText
              handleCloseModal={handleCloseImportModal}
              isAnonymous={showTextModal.isAnonymous}
              setBadCards={setBadCards}
            />
          )}
          {showAmaranthModal && <DeckImportAmaranth handleClose={handleCloseImportModal} />}
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
          {error && <ErrorOverlay placement="left">ERROR</ErrorOverlay>}
        </>
      )}
    </>
  );
};

export default DeckImport;
