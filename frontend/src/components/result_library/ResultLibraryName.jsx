import React from 'react';
import Hammer from 'assets/images/icons/hammer.svg';

function ResultLibraryName(props) {
  return (
    <div className="inline">
      {props.card['Banned'] ? (
        <strike>{props.card['Name']}</strike>
      ) : (
        <>{props.card['Name']}</>
      )}
      {props.card['Banned'] && (
        <span className="ps-1">
          [{props.card['Banned']} <Hammer />]
        </span>
      )}
    </div>
  );
}

export default ResultLibraryName;
