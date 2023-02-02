import React from 'react';
import { ResultLibraryTypeImage } from '@/components';

const ResultLibraryType = ({ cardtype, total, trifleTotal }) => {
  return (
    <div className="flex items-center space-x-1">
      <ResultLibraryTypeImage value={cardtype} />
      {total > 0 ? (
        <div className="inline">
          {cardtype} [{total}]
          {trifleTotal ? <> - {trifleTotal} trifle</> : null}
        </div>
      ) : (
        <div className="inline">{cardtype}</div>
      )}
    </div>
  );
};

export default ResultLibraryType;
