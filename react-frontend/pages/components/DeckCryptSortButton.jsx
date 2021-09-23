import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import SortDown from '../../assets/images/icons/sort-down.svg';
import AppContext from '../../context/AppContext';

function DeckCryptSortButton(props) {
  const { cryptSortByCap, toggleCryptSort } = useContext(AppContext);

  return (
    <Button variant="primary" title="Sort" onClick={toggleCryptSort}>
      <SortDown />
      {cryptSortByCap ? ' C' : ' Q'}
    </Button>
  );
}

export default DeckCryptSortButton;
