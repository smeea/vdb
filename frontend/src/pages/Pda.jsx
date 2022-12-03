import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { PdaResult, PdaSearchForm } from 'components';
import { useApp, searchResults, setPdaResults } from 'context';

const Pda = () => {
  const { isMobile } = useApp();
  const pdaResults = useSnapshot(searchResults).pda;
  const [error, setError] = useState();

  return (
    <div className="twd-container mx-auto px-md-1 pt-md-3">
      <div className="flex flex-row justify-center">
        <div
          className={`basis-full md:basis-8/12 xl:basis-9/12
            ${
              !isMobile || (isMobile && !error)
                ? 'px-0 pe-lg-4'
                : 'hidden px-0 px-md-2 px-lg-4'
            }
          `}
        >
          {pdaResults && (
            <PdaResult results={pdaResults} setResults={setPdaResults} />
          )}
          {error && (
            <div className="flex items-center justify-center font-bold error-message">
              {error}
            </div>
          )}
        </div>
        <div
          className={`
            basis-full
            md:basis-1/3
            xl:basis-1/4
            ${
              !isMobile || (isMobile && !pdaResults)
                ? 'p-1 py-md-0 px-md-2 px-xl-0'
                : 'hidden'
            }
          `}
        >
          <PdaSearchForm error={error} setError={setError} />
        </div>
      </div>
    </div>
  );
};

export default Pda;
