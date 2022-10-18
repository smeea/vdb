import React, { useState, useRef } from 'react';
import {
  ErrorOverlay,
  DeckImportButton,
  DeckImportText,
  DeckImportAmaranth,
  DeckImportBadCardsModal,
} from 'components';
import { useApp } from 'context';
import { useDeckImport } from 'hooks';

const DeckImport = ({ inInventory, handleClose, setShowInfo }) => {
  const {
    parseDeckCards,
    setDecks,
    activeDeck,
    setActiveDeck,
    setSharedDeck,
    inventoryAddToState,
    setShowMenuButtons,
    setShowFloatingButtons,
    publicName,
    cryptCardBase,
    libraryCardBase,
  } = useApp();

  const [importError, setImportError] = useState(false);
  const [createError, setCreateError] = useState('');
  const [showTextModal, setShowTextModal] = useState(false);
  const [showAnonymousTextModal, setShowAnonymousTextModal] = useState(false);
  const [showAmaranthModal, setShowAmaranthModal] = useState(false);
  const [badCards, setBadCards] = useState([]);
  const ref = useRef(null);

  const fileInputTxt = React.createRef();
  const fileInputDek = React.createRef();
  const fileInputEld = React.createRef();
  const fileAnonymousInputTxt = React.createRef();
  const fileAnonymousInputDek = React.createRef();

  const handleFileInputClick = (format, anonymous) => {
    switch (format) {
      case 'txt':
        anonymous
          ? fileAnonymousInputTxt.current.click()
          : fileInputTxt.current.click();
        break;
      case 'dek':
        anonymous
          ? fileAnonymousInputDek.current.click()
          : fileInputDek.current.click();
        break;
      case 'eld':
        fileInputEld.current.click();
        break;
    }
  };

  const handleCloseImportModal = () => {
    setShowTextModal(false);
    setShowAnonymousTextModal(false);
    setShowAmaranthModal(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };
  const handleOpenTextModal = () => setShowTextModal(true);
  const handleOpenAnonymousTextModal = () => setShowAnonymousTextModal(true);
  const handleOpenAmaranthModal = () => setShowAmaranthModal(true);

  const addImportedDeckToState = ({ deck, anonymous }) => {
    const now = new Date();
    const { crypt, library } = parseDeckCards(deck.cards);
    deck = {
      deckid: deck.deckid,
      name: deck.name,
      description: deck.description,
      author: deck.author,
      crypt: crypt,
      library: library,
      timestamp: now.toUTCString(),
    };

    if (anonymous) {
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
        setDecks((prevState) => ({
          ...prevState,
          [data.deckid]: {
            name: name,
            deckid: data.deckid,
            description: '',
            author: publicName,
            crypt: {},
            library: {},
            branchName: '#0',
            is_yours: true,
          },
        }));
        setShowInfo(true);
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
        setActiveDeck({ src: 'my', deckid: data.deckid });
      })
      .catch(() => setCreateError(true));
  };

  const importDeckFromFile = ({ format, file, anonymous }) => {
    setImportError(false);

    const reader = new FileReader();
    reader.readAsText(file.current.files[0]);
    reader.onload = async () => {
      let deckText;
      switch (format) {
        case 'txt':
          deckText = reader.result;
          break;
        case 'dek':
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
          break;
        case 'eld':
          deckText = '';
          const cards = reader.result.split('\n');
          cards.forEach((res) => {
            const card = res.split(',');
            if (card.length >= 5) {
              let name = card[0].slice(1);
              const n = card.length - 5;
              if (n) {
                for (let i = 1; i <= n; i++) {
                  name += `, ${card[i]}`;
                }
              }
              name = name.slice(0, -1);
              const q = card[n + 1];

              if (q && name) deckText += `${q} ${name}\n`;
            }
          });
          break;
      }

      const deck = await useDeckImport(
        deckText,
        cryptCardBase,
        libraryCardBase
      );

      let url = null;
      if (inInventory) {
        url = `${process.env.API_URL}inventory/import`;
      } else {
        url = `${process.env.API_URL}decks/import`;
      }

      const body = inInventory
        ? JSON.stringify({
            cards: deck.cards,
          })
        : JSON.stringify({
            deck: deck,
            anonymous: anonymous,
          });

      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      };

      const fetchPromise = fetch(url, options);
      if (inInventory) {
        fetchPromise
          .then((response) => response.json())
          .then(() => {
            inventoryAddToState(deck.cards);
          })
          .catch(() => setImportError(true));
      } else {
        fetchPromise
          .then((response) => response.json())
          .then((data) => {
            deck.deckid = data.deckid;
            addImportedDeckToState({ deck, anonymous });
            setBadCards(deck.badCards);
            setActiveDeck({
              src: anonymous ? 'shared' : 'my',
              deckid: deck.deckid,
            });
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
            handleClose();
          })
          .catch(() => {
            setImportError(true);
          });
      }
    };
  };

  const handleCreateButton = () => {
    createNewDeck();
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <>
      <DeckImportButton
        inInventory={inInventory}
        handleCreateButton={handleCreateButton}
        handleFileInputClick={handleFileInputClick}
        handleOpenTextModal={handleOpenTextModal}
        handleOpenAmaranthModal={handleOpenAmaranthModal}
        handleOpenAnonymousTextModal={handleOpenAnonymousTextModal}
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
        show={showTextModal}
        setBadCards={setBadCards}
      />
      <DeckImportText
        anonymous={true}
        addImportedDeckToState={addImportedDeckToState}
        handleCloseModal={handleCloseImportModal}
        show={showAnonymousTextModal}
        setBadCards={setBadCards}
      />
      <DeckImportAmaranth
        parseCards={parseDeckCards}
        addImportedDeckToState={addImportedDeckToState}
        handleCloseModal={handleCloseImportModal}
        show={showAmaranthModal}
      />
      <input
        ref={fileInputTxt}
        accept="text/*"
        type="file"
        onChange={() =>
          importDeckFromFile({
            format: 'txt',
            file: fileInputTxt,
          })
        }
        style={{ display: 'none' }}
      />
      <input
        ref={fileInputDek}
        accept="text/*"
        type="file"
        onChange={() =>
          importDeckFromFile({
            format: 'dek',
            file: fileInputDek,
          })
        }
        style={{ display: 'none' }}
      />
      <input
        ref={fileInputEld}
        accept="text/*"
        type="file"
        onChange={() =>
          importDeckFromFile({
            format: 'eld',
            file: fileInputEld,
          })
        }
        style={{ display: 'none' }}
      />
      <input
        ref={fileAnonymousInputTxt}
        accept="text/*"
        type="file"
        onChange={() =>
          importDeckFromFile({
            format: 'txt',
            file: fileAnonymousInputTxt,
            anonymous: true,
          })
        }
        style={{ display: 'none' }}
      />
      <input
        ref={fileAnonymousInputDek}
        accept="text/*"
        type="file"
        onChange={() =>
          importDeckFromFile({
            format: 'dek',
            file: fileAnonymousInputDek,
            anonymous: true,
          })
        }
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
  );
};

export default DeckImport;
