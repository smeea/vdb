import React, { useContext } from 'react';
import { Stack, Button } from 'react-bootstrap';
import InventoryExport from './InventoryExport.jsx';
import DeckImport from './DeckImport.jsx';
import InventoryDelete from './InventoryDelete.jsx';
import InventoryMissing from './InventoryMissing.jsx';
import FolderPlus from '../../assets/images/icons/folder-plus.svg';
import AppContext from '../../context/AppContext';

function InventoryButtons(props) {
  const { decks, preconDecks } = useContext(AppContext);

  return (
    <Stack gap={1}>
      <InventoryExport setShowButtons={props.setShowButtons} />
      <DeckImport
        inventoryAddToState={props.inventoryAddToState}
        setShowButtons={props.setShowButtons}
        inInventory={true}
      />
      <InventoryDelete
        setInventoryCrypt={props.setInventoryCrypt}
        setInventoryLibrary={props.setInventoryLibrary}
        setShowButtons={props.setShowButtons}
      />
      {decks && (
        <Button variant="secondary" onClick={() => props.setShowAddDeck(true)}>
          <div className="d-flex justify-content-center align-items-center">
            <div className="pe-2">
              <FolderPlus />
            </div>
            Add from Deck
          </div>
        </Button>
      )}
      {preconDecks && (
        <Button
          variant="secondary"
          onClick={() => props.setShowAddPrecon(true)}
        >
          <div className="d-flex justify-content-center align-items-center">
            <div className="pe-2">
              <FolderPlus />
            </div>
            Add from Precon
          </div>
        </Button>
      )}
      <InventoryMissing
        missingCrypt={props.missingCrypt}
        missingLibrary={props.missingLibrary}
        setShowButtons={props.setShowButtons}
      />
    </Stack>
  );
}

export default InventoryButtons;
