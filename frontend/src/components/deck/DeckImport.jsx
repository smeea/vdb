import React, { useState, useRef } from 'react';
import ClipboardPlus from 'assets/images/icons/clipboard-plus.svg';
import {
  ButtonIconed,
  ErrorOverlay,
  DeckImportButton,
  DeckImportText,
  DeckImportAmaranth,
  DeckImportBadCardsModal,
} from 'components';
import { useApp } from 'context';
import { useDeckImport } from 'hooks';

const DeckImport = ({ handleClose, setShowInfo, isOnlyNew }) => {
  const {
    parseDeckCards,
    setDecks,
    activeDeck,
    setActiveDeck,
    setSharedDeck,
    setShowMenuButtons,
    setShowFloatingButtons,
    publicName,
    cryptCardBase,
    libraryCardBase,
  } = useApp();

  const [importError, setImportError] = useState(false);
  const [createError, setCreateError] = useState('');
  const [showTextModal, setShowTextModal] = useState(false);
  const [showAmaranthModal, setShowAmaranthModal] = useState(false);
  const [badCards, setBadCards] = useState([]);
  const ref = useRef(null);

  const fileInput = React.createRef();
  const fileInputAnonymous = React.createRef();

  const handleFileInputClick = (isAnonymous) => {
    isAnonymous
      ? fileInputAnonymous.current.click()
      : fileInput.current.click();
  };

  const handleCloseImportModal = () => {
    setShowTextModal(false);
    setShowAmaranthModal(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };
  const handleOpenTextModal = (isAnonymous) =>
    setShowTextModal({ isAnonymous: isAnonymous, show: true });
  const handleOpenAmaranthModal = () => setShowAmaranthModal(true);

  const addImportedDeckToState = ({ deck, isAnonymous }) => {
    const now = new Date();
    const { crypt, library } = parseDeckCards(deck.cards);
    deck = {
      deckid: deck.deckid,
      name: deck.name,
      branchName: deck.branchName,
      description: deck.description,
      author: deck.author,
      crypt: crypt,
      library: library,
      timestamp: now.toUTCString(),
    };

    if (isAnonymous) {
      setSharedDeck({ [deck.deckid]: deck });
    } else {
      setDecks((prevState) => ({
        ...prevState,
        [deck.deckid]: {
          ...deck,
          is_yours: true,
        },
      }));
    }
  };

  const createNewDeck = () => {
    setCreateError(false);

    const name = 'New deck';
    const url = `${process.env.API_URL}deck`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    };

    const fetchPromise = fetch(url, options);

    fetchPromise
      .then((response) => response.json())
      .then((data) => {
        addImportedDeckToState({
          deck: {
            deckid: data.deckid,
            name: name,
            branchName: '#0',
            description: '',
            author: publicName,
            crypt: {},
            library: {},
          },
        });
        setShowInfo(true);
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
        setActiveDeck({ src: 'my', deckid: data.deckid });
      })
      .catch(() => setCreateError(true));
  };

  const importDeckFromFile = (fileInput, isAnonymous) => {
    setImportError(false);

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
        const xmlCrypt =
          xmlDoc.getElementsByTagName('deck')[0].childNodes[5].children;
        const xmlLibrary =
          xmlDoc.getElementsByTagName('deck')[0].childNodes[3].children;

        const crypt = {};
        Object.values(xmlCrypt).map((i) => {
          const cardName = i.childNodes[0].childNodes[0].data;
          if (!crypt[cardName]) {
            crypt[cardName] = 0;
          }
          crypt[cardName] += 1;
        });

        const library = {};
        Object.values(xmlLibrary).map((i) => {
          const cardName = i.childNodes[0].childNodes[0].data;
          if (!library[cardName]) {
            library[cardName] = 0;
          }
          library[cardName] += 1;
        });

        deckText = '';

        Object.keys(crypt).map((card) => {
          deckText += `${crypt[card]} ${card}\n`;
        });

        Object.keys(library).map((card) => {
          deckText += `${library[card]} ${card}\n`;
        });
      }

      const deck = await useDeckImport(
        deckText,
        cryptCardBase,
        libraryCardBase
      );

      const url = `${process.env.API_URL}decks/import`;
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deck: deck,
          anonymous: isAnonymous,
        }),
      };

      const fetchPromise = fetch(url, options);
      fetchPromise
        .then((response) => response.json())
        .then((data) => {
          deck.deckid = data.deckid;
          addImportedDeckToState({ deck, isAnonymous });
          setBadCards(deck.badCards);
          setActiveDeck({
            src: isAnonymous ? 'shared' : 'my',
            deckid: deck.deckid,
          });
          setShowMenuButtons(false);
          setShowFloatingButtons(true);
          handleClose();
        })
        .catch(() => {
          setImportError(true);
        });
    };
  };

  const handleCreateButton = () => {
    createNewDeck();
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <>
      {isOnlyNew ? (
        <ButtonIconed
          variant="primary"
          onClick={() => handleCreateButton()}
          icon={<ClipboardPlus />}
          text="Create New Deck"
        />
      ) : (
        <>
          <DeckImportButton
            handleCreateButton={handleCreateButton}
            handleFileInputClick={handleFileInputClick}
            handleOpenTextModal={handleOpenTextModal}
            handleOpenAmaranthModal={handleOpenAmaranthModal}
          />
          {badCards && (
            <DeckImportBadCardsModal
              deckid={activeDeck.deckid}
              badCards={badCards}
              setBadCards={setBadCards}
            />
          )}
          <DeckImportText
            addImportedDeckToState={addImportedDeckToState}
            handleCloseModal={handleCloseImportModal}
            show={showTextModal.show}
            isAnonymous={showTextModal.isAnonymous}
            setBadCards={setBadCards}
          />
          <DeckImportAmaranth
            parseCards={parseDeckCards}
            addImportedDeckToState={addImportedDeckToState}
            handleCloseModal={handleCloseImportModal}
            show={showAmaranthModal}
          />
          <input
            ref={fileInput}
            accept="text/*"
            type="file"
            onChange={() => importDeckFromFile(fileInput, false)}
            style={{ display: 'none' }}
          />
          <input
            ref={fileInputAnonymous}
            accept="text/*"
            type="file"
            onChange={() => importDeckFromFile(fileInputAnonymous, true)}
            style={{ display: 'none' }}
          />
          <ErrorOverlay
            show={createError || importError}
            target={ref.current}
            placement="left"
            modal={true}
          >
            {createError && <b>ERROR</b>}
            {importError && <b>CANNOT IMPORT THIS DECK</b>}
          </ErrorOverlay>
        </>
      )}
    </>
  );
};

export default DeckImport;
