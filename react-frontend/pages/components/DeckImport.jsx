import React, { useState, useRef, useContext } from 'react';
import { Dropdown, Overlay } from 'react-bootstrap';
import ClipboardPlus from '../../assets/images/icons/clipboard-plus.svg';
import DeckImportText from './DeckImportText.jsx';
import DeckImportAmaranth from './DeckImportAmaranth.jsx';
import AppContext from '../../context/AppContext.js';

function DeckImport(props) {
  const { setActiveDeck, isMobile } = useContext(AppContext);
  const [importError, setImportError] = useState(false);
  const [createError, setCreateError] = useState('');
  const [showTextModal, setShowTextModal] = useState(false);
  const [showAmaranthModal, setShowAmaranthModal] = useState(false);
  const ref = useRef(null);

  const fileInput = React.createRef();

  const handleFileChange = () => importDeckFromFile();
  const handleFileInputClick = () => fileInput.current.click();

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
      .then(() => props.getDecks())
      .then(() => setActiveDeck({ src: 'my', deckid: newdeckid }))
      .catch((error) => setCreateError(true));
  };

  const importDeckFromFile = () => {
    setImportError(false);

    let newDeckId;
    const reader = new FileReader();
    reader.readAsText(fileInput.current.files[0]);
    reader.onload = () => {
      const url = `${process.env.API_URL}decks/import`;
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deckText: reader.result,
        }),
      };

      const fetchPromise = fetch(url, options);

      fetchPromise
        .then((response) => response.json())
        .then((data) => (newDeckId = data.deckid))
        .then(() => props.getDecks())
        .then(() => setActiveDeck({ src: 'my', deckid: newDeckId }))
        .catch((error) => setImportError(true));
    };
  };

  const handleCreateButton = () => {
    createNewDeck();
    isMobile && props.setShowInfo(true);
    isMobile && props.setShowButtons(false);
  };

  const ImportButtonOptions = (
    <>
      <Dropdown.Item href="" onClick={handleCreateButton}>
        Create New Deck
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="" onClick={handleFileInputClick}>
        Import from File (Amaranth, Lackey, TWD)
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={handleOpenTextModal}>
        Import from Text (Amaranth, Lackey, TWD)
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={handleOpenAmaranthModal}>
        Import from Amaranth Deck URL
      </Dropdown.Item>
    </>
  );

  return (
    <>
      <input
        ref={fileInput}
        accept="text/*"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Dropdown ref={ref}>
        <Dropdown.Toggle className="btn-block" variant="outline-secondary">
          <ClipboardPlus size={24} />
          <span className="pl-1">New / Import</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>{ImportButtonOptions}</Dropdown.Menu>
      </Dropdown>
      <DeckImportText
        handleClose={handleCloseImportModal}
        getDecks={props.getDecks}
        show={showTextModal}
        setShowInfo={props.setShowInfo}
      />
      <DeckImportAmaranth
        handleClose={handleCloseImportModal}
        getDecks={props.getDecks}
        show={showAmaranthModal}
        setShowInfo={props.setShowInfo}
      />
      <Overlay
        show={createError || importError}
        target={ref.current}
        placement="left"
        transition={false}
      >
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div className="modal-tooltip error-tooltip small" {...props}>
            {createError && <b>ERROR</b>}
            {importError && <b>CANNOT IMPORT THIS DECK</b>}
          </div>
        )}
      </Overlay>
    </>
  );
}

export default DeckImport;
