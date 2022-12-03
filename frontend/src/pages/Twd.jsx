import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { TwdResult, TwdSearchForm } from 'components';
import { useApp, searchResults, setTwdResults } from 'context';

const Twd = () => {
  const { isMobile } = useApp();
  const twdResults = useSnapshot(searchResults).twd;
  const [error, setError] = useState();

  return (
    <div className="twd-container mx-auto px-md-1 pt-md-3">
      <div className="flex flex-row justify-center">
        <div
          basis-full
          className={`md:basis-8/12 xl:basis-9/12 ${
            !isMobile || (isMobile && !error)
              ? 'px-0 pe-lg-4'
              : 'hidden px-0 px-md-2 px-lg-4'
          }`}
        >
          {twdResults && (
            <TwdResult results={twdResults} setResults={setTwdResults} />
          )}
          {error && (
            <div className="flex items-center justify-center font-bold error-message">
              {error}
            </div>
          )}
        </div>
        <div
          className={`basis-full md:basis-1/3 xl:basis-1/4
            ${
              !isMobile || (isMobile && !twdResults)
                ? 'p-1 py-md-0 px-md-2 px-xl-0'
                : 'hidden'
            }`}
        >
          <TwdSearchForm error={error} setError={setError} />
        </div>
      </div>
    </div>
  );
};

export default Twd;
