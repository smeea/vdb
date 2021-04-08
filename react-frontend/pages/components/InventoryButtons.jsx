import React from 'react';
import InventoryExport from './InventoryExport.jsx';
import InventoryImport from './InventoryImport.jsx';
import InventoryDelete from './InventoryDelete.jsx';
import InventoryAddDeck from './InventoryAddDeck.jsx';

function InventoryButtons(props) {

  return (
    <>
      <div className="bp-125">
        <InventoryExport setShowButtons={props.setShowButtons} />
      </div>
      <div className="bp-125">
        <InventoryImport
          inventoryAddToState={props.inventoryAddToState}
          setShowButtons={props.setShowButtons}
        />
      </div>
      <div className="bp-125">
        <InventoryDelete
          setInventory={props.setInventory}
          isMobile={props.isMobile}
          setShowButtons={props.setShowButtons}
        />
      </div>
      <div className="bp-125">
        <InventoryAddDeck
          inventoryDeckAdd={props.inventoryDeckAdd}
          decks={props.decks}
          setShowButtons={props.setShowButtons}
        />
      </div>
    </>
  );
}

export default InventoryButtons;
