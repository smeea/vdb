import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { PdaResult, PdaSearchForm } from 'components';
import { useApp, searchResults, setPdaResults } from 'context';

const Pda = () => {
  const { isMobile } = useApp();
  const pdaResults = useSnapshot(searchResults).pda;
  const [error, setError] = useState();

  return (
    <div className="twd-container px-md-1 pt-md-3 mx-auto">
      <div className="flex flex-row justify-center">
        <div
          className={`basis-full md:basis-8/12 xl:basis-9/12
            ${
              !isMobile || (isMobile && !error)
                ? 'pr-lg-4 px-0'
                : 'px-md-2 px-lg-4 hidden px-0'
            }
          `}
        >
          {pdaResults && (
            <PdaResult results={pdaResults} setResults={setPdaResults} />
          )}
          {error && (
            <div className="error-message flex items-center justify-center font-bold">
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
                ? 'py-md-0 px-md-2 px-xl-0 p-1'
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
