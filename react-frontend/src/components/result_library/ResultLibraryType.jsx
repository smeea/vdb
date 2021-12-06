import React from 'react';
import { ResultLibraryTypeImage } from 'components';

function ResultLibraryType(props) {
  if (props.total > 0) {
    return (
      <div
        className={
          props.inAdvSelect
            ? 'd-inline align-items-center adv-deck-table'
            : 'd-inline align-items-center'
        }
      >
        <ResultLibraryTypeImage value={props.cardtype} />
        <div className="d-inline px-1">
          {props.cardtype} [{props.total}]
          {props.trifleTotal ? <> - {props.trifleTotal} trifle</> : null}
        </div>
      </div>
    );
  } else if (props.total == 0) {
    return (
      <div className="d-inline align-items-center">
        <ResultLibraryTypeImage value={props.cardtype} />
        <div className="d-inline px-1">{props.cardtype}</div>
      </div>
    );
  }
  return <ResultLibraryTypeImage value={props.cardtype} />;
}

export default ResultLibraryType;
