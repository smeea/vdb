import React from 'react';
import { Dropdown } from 'react-bootstrap';
import FolderPlus from '../../assets/images/icons/folder-plus.svg';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import At from '../../assets/images/icons/at.svg';

function InventoryAddDeck(props) {
  const AddDeckOptions = Object.keys(props.decks).map((deck, index) => {
    return (
      <Dropdown.Item
        href=""
        key={index}
        onClick={() => {
          props.inventoryDeckAdd(props.decks[deck]);
          props.isMobile && props.setShowButtons(false);
        }}
      >
        <div className="d-flex align-items-center">
          <div className="pr-3">
            {props.decks[deck].inventory_type == 's' && <Shuffle />}
            {props.decks[deck].inventory_type == 'h' && <PinAngleFill />}
            {!props.decks[deck].inventory_type && <At />}
          </div>
          {props.decks[deck].name}
        </div>
      </Dropdown.Item>
    );
  });

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
