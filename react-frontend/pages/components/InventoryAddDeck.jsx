import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import FolderPlus from '../../assets/images/icons/folder-plus.svg';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import At from '../../assets/images/icons/at.svg';
import AppContext from '../../context/AppContext.js';

function InventoryAddDeck(props) {
  const { decks, isMobile } = useContext(AppContext);

  let AddDeckOptions;
  if (decks) {
    AddDeckOptions = Object.keys(decks).map((deck, index) => {
      return (
        <Dropdown.Item
          href=""
          key={index}
          onClick={() => {
            props.inventoryDeckAdd(decks[deck]);
            isMobile && props.setShowButtons(false);
          }}
        >
          <div className="d-flex align-items-center">
            <div className="pr-3">
              {decks[deck].inventory_type == 's' && <Shuffle />}
              {decks[deck].inventory_type == 'h' && <PinAngleFill />}
              {!decks[deck].inventory_type && <At />}
            </div>
            {decks[deck].name}
          </div>
        </Dropdown.Item>
      );
    });
  }

  return (
    <Dropdown>
      <Dropdown.Toggle className="btn-block" variant="outline-secondary">
        <div className="d-flex justify-content-center align-items-center">
          <div className="pr-2">
            <FolderPlus />
          </div>
          Add from Deck
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>{AddDeckOptions}</Dropdown.Menu>
    </Dropdown>
  );
}

export default InventoryAddDeck;
