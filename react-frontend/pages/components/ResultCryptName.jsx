import React from 'react';
import Hammer from '../../assets/images/icons/hammer.svg';

function ResultCryptName(props) {
  return (
    <div className="d-inline nowrap">
      {props.card['Banned'] ? (
        <div className="d-inline white-space-normal">
          <strike>{props.card['Name']}</strike>
        </div>
      ) : (
        <div className="d-inline white-space-normal">{props.card['Name']}</div>
      )}
      {props.card['Adv'][0] && (
        <span className="ps-1">
          <img
            className="advanced-image-results"
            src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
            title="Advanced"
          />
        </span>
      )}
      {props.card['Banned'] && (
        <span className="ps-1">
          [{props.card['Banned']} <Hammer />]
        </span>
      )}
    </div>
  );
}

export default ResultCryptName;
