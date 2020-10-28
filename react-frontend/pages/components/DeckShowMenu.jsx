import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import List from '../../assets/images/icons/list.svg';

function DeckShowMenu(props) {
  return (
    <>
      <DropdownButton
        className='action-menu'
        variant="outline-secondary"
        title={<List size={24} />}
      >
        <Dropdown.Item href="" onClick={() => console.log('action')}>
          Create / Import Deck
        </Dropdown.Item>
        <Dropdown.Item href="" onClick={() => console.log('action')}>
          Save Deck
        </Dropdown.Item>
        <Dropdown.Item href="" onClick={() => console.log('action')}>
          Delete Deck
        </Dropdown.Item>
        <Dropdown.Item href="" onClick={() => console.log('action')}>
          Clone Deck
        </Dropdown.Item>
        <Dropdown.Item href="" onClick={() => console.log('action')}>
          Copy URL
        </Dropdown.Item>
        <Dropdown.Item href="" onClick={() => console.log('action')}>
          Draw Cards
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
}

export default DeckShowMenu;
