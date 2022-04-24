import React, { useState, useRef } from 'react';
import {
  ErrorOverlay,
  DeckImportButton,
  DeckImportText,
  DeckImportAmaranth,
  DeckImportBadCardsModal,
} from 'components';
import { useApp } from 'context';

const DeckImport = (props) => {
  const { getDecks, activeDeck, setActiveDeck, isMobile } = useApp();
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

  const handleFileChange = (format) => importDeckFromFile(format);
  const handleFileInputClick = (format, isAnonymous) => {
    switch (format) {
      case 'txt':
        isAnonymous
          ? fileAnonymousInputTxt.current.click()
          : fileInputTxt.current.click();
        break;
      case 'dek':
        isAnonymous
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
    isMobile && props.setShowButtons(false);
  };
  const handleOpenTextModal = () => setShowTextModal(true);
  const handleOpenAnonymousTextModal = () => setShowAnonymousTextModal(true);
  const handleOpenAmaranthModal = () => setShowAmaranthModal(true);

  const createNewDeck = () => {
    setCreateError(false);

    let newdeckid;
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
      .then((data) => (newdeckid = data.deckid))
      .then(() => getDecks())
      .then(() => setActiveDeck({ src: 'my', deckid: newdeckid }))
      .catch((error) => setCreateError(true));
  };

  const importDeckFromFile = (format, isAnonymous) => {
    setImportError(false);

    let fileInput;
    switch (format) {
      case 'txt':
        fileInput = fileInputTxt;
        break;
      case 'dek':
        fileInput = fileInputDek;
        break;
      case 'eld':
        fileInput = fileInputEld;
        break;
    }

    let newDeckId;
    const reader = new FileReader();
    reader.readAsText(fileInput.current.files[0]);
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
      if (isAnonymous) {
        url = `${process.env.API_URL}decks/anonymous_import`;
      } else if (props.inInventory) {
        url = `${process.env.API_URL}inventory/import`;
      } else {
        url = `${process.env.API_URL}decks/import`;
      }

      const body = props.inInventory
        ? JSON.stringify(result)
        : JSON.stringify({
            deckText: result,
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

      if (props.inInventory) {
        fetchPromise
          .then((response) => response.json())
          .then((cards) => {
            props.inventoryAddToState(cards);
          })
          .catch((error) => setImportError(true));
      } else {
        fetchPromise
          .then((response) => response.json())
          .then((data) => {
            newDeckId = data.deckid;
            setBadCards(data.bad_cards);
          })
          .then(() => !isAnonymous && getDecks())
          .then(() => {
            setActiveDeck({
              src: isAnonymous ? 'shared' : 'my',
              deckid: newDeckId,
            });
            isMobile && props.setShowButtons(false);
            setDeckText('');
            props.handleClose();
          })
          .catch((error) => {
            setImportError(true);
          });
      }
    };
  };

  const handleCreateButton = () => {
    createNewDeck();
    isMobile && props.setShowButtons(false);
  };

  return (
    <>
      <DeckImportButton
        inInventory={props.inInventory}
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
        handleClose={handleCloseImportModal}
        show={showTextModal}
        setBadCards={setBadCards}
        setShowButtons={props.setShowButtons}
      />
      <DeckImportText
        anonymous={true}
        handleClose={handleCloseImportModal}
        show={showAnonymousTextModal}
        setBadCards={setBadCards}
        setShowButtons={props.setShowButtons}
      />
      <DeckImportAmaranth
        handleClose={handleCloseImportModal}
        show={showAmaranthModal}
      />
      <input
        ref={fileInputTxt}
        accept="text/*"
        type="file"
        onChange={() => handleFileChange('txt')}
        style={{ display: 'none' }}
      />
      <input
        ref={fileInputDek}
        accept="text/*"
        type="file"
        onChange={() => handleFileChange('dek')}
        style={{ display: 'none' }}
      />
      <input
        ref={fileAnonymousInputTxt}
        accept="text/*"
        type="file"
        onChange={() => handleFileChange('txt', true)}
        style={{ display: 'none' }}
      />
      <input
        ref={fileAnonymousInputDek}
        accept="text/*"
        type="file"
        onChange={() => handleFileChange('dek', true)}
        style={{ display: 'none' }}
      />
      <input
        ref={fileInputEld}
        accept="text/*"
        type="file"
        onChange={() => handleFileChange('eld')}
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
