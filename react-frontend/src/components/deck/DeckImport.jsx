import React, { useState, useRef } from 'react';
import {
  ErrorOverlay,
  DeckImportButton,
  DeckImportText,
  DeckImportAmaranth,
  DeckImportBadCardsModal,
} from 'components';
import { useApp } from 'context';

const DeckImport = ({ inInventory, handleClose, setShowInfo }) => {
  const {
    cryptCardBase,
    libraryCardBase,
    setDecks,
    activeDeck,
    setActiveDeck,
    setSharedDeck,
    inventoryAddToState,
    setShowMenuButtons,
    setShowFloatingButtons,
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

  const parseCards = (cards) => {
    const crypt = {};
    const library = {};

    Object.keys(cards).map((cardid) => {
      if (cardid > 200000) {
        crypt[cardid] = {
          q: cards[cardid],
          c: cryptCardBase[cardid],
        };
      } else {
        library[cardid] = {
          q: cards[cardid],
          c: libraryCardBase[cardid],
        };
      }
    });

    return { crypt: crypt, library: library };
  };

  const addImportedDeckToState = ({ data, anonymous }) => {
    const now = new Date();
    const { crypt, library } = parseCards(data.cards);
    const deck = {
      deckid: data.deckid,
      name: data.name,
      author: data.author,
      description: data.description,
      crypt: crypt,
      library: library,
      timestamp: now.toUTCString(),
    };

    if (anonymous) {
      setSharedDeck({ [data.deckid]: deck });
    } else {
      setDecks((prevState) => ({
        ...prevState,
        [data.deckid]: {
          ...deck,
          is_yours: true,
        },
      }));
    }
  };

  const createNewDeck = () => {
    setCreateError(false);

    const url = `${process.env.API_URL}decks/create`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deckname: 'New deck' }),
    };

    const fetchPromise = fetch(url, options);

    fetchPromise
      .then((response) => response.json())
      .then((data) => {
        const { crypt, library } = parseCards(data.cards);

        setDecks((prevState) => ({
          ...prevState,
          [data.deckid]: {
            ...data,
            crypt: crypt,
            library: library,
            branchName: '#0',
            is_yours: true,
          },
        }));
        setShowInfo(true);
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
        setActiveDeck({ src: 'my', deckid: data.deckid });
      })
      .catch((error) => setCreateError(true));
  };

  const importDeckFromFile = ({ format, file, anonymous }) => {
    setImportError(false);

    const reader = new FileReader();
    reader.readAsText(file.current.files[0]);
    reader.onload = () => {
      let result;
      switch (format) {
        case 'txt':
          result = reader.result;
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

          result = '';

          Object.keys(crypt).map((card) => {
            result += `${crypt[card]} ${card}\n`;
          });

          Object.keys(library).map((card) => {
            result += `${library[card]} ${card}\n`;
          });
          break;
        case 'eld':
          result = '';
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

              if (q && name) result += `${q} ${name}\n`;
            }
          });
          break;
      }

      let url = null;
      if (inInventory) {
        url = `${process.env.API_URL}inventory/import`;
      } else {
        url = `${process.env.API_URL}decks/import`;
      }

      const body = inInventory
        ? JSON.stringify(result)
        : JSON.stringify({
            deckText: result,
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
          .then((cards) => {
            inventoryAddToState(cards);
          })
          .catch((error) => setImportError(true));
      } else {
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
            handleClose();
          })
          .catch((error) => {
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
        parseCards={parseCards}
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
