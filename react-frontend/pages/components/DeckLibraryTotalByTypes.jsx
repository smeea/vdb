import React from 'react';
import ResultLibraryType from './ResultLibraryType.jsx';

function DeckLibraryTotalByTypes(props) {
  const totalOutput = Object.keys(props.byTypes).map((key, index) => {
    return (
      <span key={index} className="d-inline-block px-0 nobr pr-3">
        <ResultLibraryType cardtype={key} />
        {props.byTypes[key]}
      </span>
    );
  });

  return <>{totalOutput}</>;
}

export default DeckLibraryTotalByTypes;
