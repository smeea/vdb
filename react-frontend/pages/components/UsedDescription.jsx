import React from 'react';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';

const UsedDescription = (props) => {
  return (
    <div className="d-flex align-items-center">
      <div className="opacity-035">
        {props.t == 's' ? (
          <Shuffle width="14" height="14" viewBox="0 0 16 16" />
        ) : (
          <PinAngleFill width="14" height="14" viewBox="0 0 16 16" />
        )}
      </div>
      <div className="px-1">
        <b>{props.q}</b>
      </div>
      - {props.deckName}
    </div>
  );
};

export default UsedDescription;
