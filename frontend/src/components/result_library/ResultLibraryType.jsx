import React from 'react';
import { ResultLibraryTypeImage } from 'components';

const ResultLibraryType = ({ cardtype, total, trifleTotal }) => {
  if (total > 0) {
    return (
      <div className="flex">
        <ResultLibraryTypeImage value={cardtype} />
        <div className="d-inline px-1">
          {cardtype} [{total}]
          {trifleTotal ? <> - {trifleTotal} trifle</> : null}
        </div>
      </div>
    );
  } else if (total == 0) {
    return (
      <div className="d-inline items-center">
        <ResultLibraryTypeImage value={cardtype} />
        <div className="d-inline px-1">{cardtype}</div>
      </div>
    );
  }
  return <ResultLibraryTypeImage value={cardtype} />;
};

export default ResultLibraryType;
