import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import InventoryExport from './InventoryExport.jsx';
import InventoryImport from './InventoryImport.jsx';
import InventoryDelete from './InventoryDelete.jsx';
import FolderPlus from '../../assets/images/icons/folder-plus.svg';
import AppContext from '../../context/AppContext';

function InventoryButtons(props) {
  const { decks, preconDecks } = useContext(AppContext);

  return (
    <>
      <div className="button-block">
        <InventoryExport setShowButtons={props.setShowButtons} />
      </div>
      <div className="button-block">
        <InventoryImport
          inventoryAddToState={props.inventoryAddToState}
          setShowButtons={props.setShowButtons}
        />
      </div>
      <div className="button-block">
        <InventoryDelete
          setInventoryCrypt={props.setInventoryCrypt}
          setInventoryLibrary={props.setInventoryLibrary}
          setShowButtons={props.setShowButtons}
        />
      </div>
      {decks && (
        <div className="button-block">
          <Button
            variant="outline-secondary"
            onClick={() => props.setShowAddDeck(true)}
            block
          >
            <div className="d-flex justify-content-center align-items-center">
              <div className="pr-2">
                <FolderPlus />
              </div>
              Add from Deck
            </div>
          </Button>
        </div>
      )}
      {preconDecks && (
        <div className="button-block">
          <Button
            variant="outline-secondary"
            onClick={() => props.setShowAddPrecon(true)}
            block
          >
            <div className="d-flex justify-content-center align-items-center">
              <div className="pr-2">
                <FolderPlus />
              </div>
              Add from Precon
            </div>
          </Button>
        </div>
      )}
    </>
  );
}

export default InventoryButtons;
