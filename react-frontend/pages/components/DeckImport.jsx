import React, { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import FileEarmarkPlus from '../../assets/images/icons/file-earmark-plus.svg';

import DeckImportModal from './DeckImportModal.jsx';

function DeckImport(props) {
  const [importError, setImportError] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const fileInput = React.createRef();

  const handleFileChange = () => importDeck();
  const handleFileInputClick = () => fileInput.current.click();

  const handleCloseImportModal = () => setShowImportModal(false);
  const handleOpenImportModal = () => setShowImportModal(true);

  const ImportButtonOptions = (
    <>
      <Dropdown.Item href="" onClick={handleFileInputClick}>
        Import from File
      </Dropdown.Item>
      <Dropdown.Item href="" onClick={handleOpenImportModal}>
        Paste text
      </Dropdown.Item>
    </>
  );

  const importDeck = () => {
    setImportError(false);

    let newDeckId;
    const reader = new FileReader();
    reader.readAsText(fileInput.current.files[0]);
    reader.onload = () => {
      console.log(reader.result);

      const url = process.env.API_URL + 'decks/import';
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

  return (
    <>
      <input
        ref={fileInput}
        accept="text/*"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <DropdownButton
        variant="outline-secondary"
        id="import-button"
        title={
          <>
            <FileEarmarkPlus size={20} />
            Import
          </>
        }
      >
        {ImportButtonOptions}
      </DropdownButton>
      {importError && (
        <div className="d-flex justify-content-end">
          <br />
          <span className="login-error">Cannot import this deck</span>
        </div>
      )}
      <DeckImportModal
        handleClose={handleCloseImportModal}
        getDecks={props.getDecks}
        setActiveDeck={props.setActiveDeck}
        show={showImportModal}
      />
    </>
  );
}

export default DeckImport;
