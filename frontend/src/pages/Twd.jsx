import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { TwdResult, TwdSearchForm } from 'components';
import { useApp, searchResults, setTwdResults } from 'context';

const Twd = () => {
  const { isMobile } = useApp();
  const twdResults = useSnapshot(searchResults).twd;
  const [error, setError] = useState();

  const X_SPACING = 'space-x-8';
  const TOP_SPACING = 'pt-8';

  return (
    <div className="twd-container mx-auto">
      <div className={`flex flex-row ${X_SPACING} ${TOP_SPACING}`}>
        <div
          className={`basis-full md:basis-8/12 xl:basis-9/12 ${
            !isMobile || (isMobile && !error) ? '' : 'hidden'
          }`}
        >
          {twdResults && (
            <TwdResult results={twdResults} setResults={setTwdResults} />
          )}
          {error && (
            <div className="error-message flex items-center justify-center font-bold">
              {error}
            </div>
          )}
        </div>
        <div
          className={`basis-full md:basis-1/3 xl:basis-1/4
            ${!isMobile || (isMobile && !twdResults) ? '' : 'hidden'}`}
        >
          <TwdSearchForm error={error} setError={setError} />
        </div>
      </div>
    </div>
  );
};

export default Twd;
