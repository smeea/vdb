import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import ClipboardPlus from '../../assets/images/icons/clipboard-plus.svg';
import DeckImportModal from './DeckImportModal.jsx';

function DeckImport(props) {
  const [importError, setImportError] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [createError, setCreateError] = useState('');

  const fileInput = React.createRef();

  const handleFileChange = () => importDeckFromFile();
  const handleFileInputClick = () => fileInput.current.click();

  const handleCloseImportModal = () => {
    setShowImportModal(false);
    props.setShowButtons(false);
  };
  const handleOpenImportModal = () => setShowImportModal(true);

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
      .then((data) => {
        newdeckid = data.deckid;
        console.log('new deck id:', newdeckid);
      })
      .then(() => props.getDecks())
      .then(() => props.setActiveDeck(newdeckid))
      .catch((error) => {
        setCreateError(true);
        console.log(error);
      });
  };

  const importDeckFromFile = () => {
    setImportError(false);

    let newDeckId;
    const reader = new FileReader();
    reader.readAsText(fileInput.current.files[0]);
    reader.onload = () => {
      console.log(reader.result);

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
        .then((data) => {
          newDeckId = data.deckid;
          console.log('new deck id:', newDeckId);
        })
        .then(() => props.getDecks())
        .then(() => {
          props.setActiveDeck(newDeckId);
        })
        .catch((error) => {
          setImportError(true);
          console.log(error);
        });
    };
  };

  const handleCreateButton = () => {
    createNewDeck();
    props.setShowInfo(true);
    props.setShowButtons(false);
  };

  const ImportButtonOptions = (
    <>
      <Dropdown.Item href="" onClick={handleCreateButton}>
        Create New Deck
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="" onClick={handleFileInputClick}>
        Import from File
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={handleOpenImportModal}>
        Import from Text
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
      <Dropdown>
        <Dropdown.Toggle className="btn-block" variant="outline-secondary">
          <ClipboardPlus size={24} />
          <span className="pl-1">Create / Import</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>{ImportButtonOptions}</Dropdown.Menu>
      </Dropdown>
      {importError && (
        <div className="d-flex justify-content-end">
          <span className="login-error">Cannot import this deck</span>
        </div>
      )}
      {createError && (
        <div className="d-flex justify-content-start">
          <span className="login-error">Cannot create deck</span>
        </div>
      )}
      <DeckImportModal
        handleClose={handleCloseImportModal}
        getDecks={props.getDecks}
        setActiveDeck={props.setActiveDeck}
        show={showImportModal}
        setShowInfo={props.setShowInfo}
      />
    </>
  );
}

export default DeckImport;
