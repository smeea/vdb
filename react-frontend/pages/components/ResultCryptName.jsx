import React from 'react';
import Hammer from '../../assets/images/icons/hammer.svg';

function ResultCryptName(props) {
  return (
    <>
      <div className="d-inline name">
        {props.card['Banned'] ? (
          <strike>{props.card['Name']}</strike>
        ) : (
          <>{props.card['Name']}</>
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
            <Hammer />
          </span>
        )}
      </div>
    </>
  );
}

export default ResultCryptName;
