import React, { useState, useRef, useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import ClipboardPlus from '../../assets/images/icons/clipboard-plus.svg';
import BlockButton from './BlockButton.jsx';
import ErrorOverlay from './ErrorOverlay.jsx';
import DeckImportText from './DeckImportText.jsx';
import DeckImportAmaranth from './DeckImportAmaranth.jsx';
import AppContext from '../../context/AppContext.js';

function DeckImport(props) {
  const { getDecks, setActiveDeck, isMobile } = useContext(AppContext);
  const [importError, setImportError] = useState(false);
  const [createError, setCreateError] = useState('');
  const [showTextModal, setShowTextModal] = useState(false);
  const [showAmaranthModal, setShowAmaranthModal] = useState(false);
  const ref = useRef(null);

  const fileInputTxt = React.createRef();
  const fileInputDek = React.createRef();

  const handleFileChange = (format) => importDeckFromFile(format);
  const handleFileInputClick = (format) => {
    switch (format) {
      case 'txt':
        fileInputTxt.current.click();
        break;
      case 'dek':
        fileInputDek.current.click();
        break;
    }
  };

  const handleCloseImportModal = () => {
    setShowTextModal(false);
    setShowAmaranthModal(false);
    isMobile && props.setShowButtons(false);
  };
  const handleOpenTextModal = () => setShowTextModal(true);
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

  const importDeckFromFile = (format) => {
    setImportError(false);

    let fileInput;
    switch (format) {
      case 'txt':
        fileInput = fileInputTxt;
        break;
      case 'dek':
        fileInput = fileInputDek;
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
      }

      const url = `${process.env.API_URL}decks/import`;
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deckText: result,
        }),
      };

      const fetchPromise = fetch(url, options);

      fetchPromise
        .then((response) => response.json())
        .then((data) => (newDeckId = data.deckid))
        .then(() => getDecks())
        .then(() => {
          setActiveDeck({ src: 'my', deckid: newDeckId });
          isMobile && props.setShowButtons(false);
        })
        .catch((error) => setImportError(true));
    };
  };

  const handleCreateButton = () => {
    createNewDeck();
    isMobile && props.setShowButtons(false);
  };

  const ImportButtonOptions = (
    <>
      <Dropdown.Item onClick={handleCreateButton}>
        Create New Deck
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={() => handleFileInputClick('txt')}>
        Import from File - Amaranth, Lackey .TXT, TWD
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleFileInputClick('dek')}>
        Import from File - Lackey .DEK
      </Dropdown.Item>
      <Dropdown.Item onClick={handleOpenTextModal}>
        Import from Text - Amaranth, Lackey .TXT, TWD
      </Dropdown.Item>
      <Dropdown.Item onClick={handleOpenAmaranthModal}>
        Import from Amaranth Deck URL
      </Dropdown.Item>
    </>
  );

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle as={BlockButton} variant="secondary">
          <ClipboardPlus size={24} />
          <span className="ps-1">New / Import</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>{ImportButtonOptions}</Dropdown.Menu>
      </Dropdown>
      <DeckImportText
        handleClose={handleCloseImportModal}
        getDecks={getDecks}
        show={showTextModal}
      />
      <DeckImportAmaranth
        handleClose={handleCloseImportModal}
        getDecks={getDecks}
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
}

export default DeckImport;
