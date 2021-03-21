import React from 'react';
import Shuffle from '../../assets/images/icons/shuffle.svg';

const UsedDescription = (props) => {
  return (
    <div className="d-flex align-items-center" key={index}>
      <div className="opacity-035">
        <Shuffle />
      </div>
      <div className="px-1">
        <b>{props.usedCards[card['Id']][id]}</b>
      </div>
      - {props.decks[id]['name']}
    </div>
  );
};

export default UsedDescription;
