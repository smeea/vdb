import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { PdaResult, PdaSearchForm, ErrorMessage } from '@/components';
import { useApp, searchResults, setPdaResults } from '@/context';

const Pda = () => {
  const { isMobile } = useApp();
  const pdaResults = useSnapshot(searchResults).pda;
  const [error, setError] = useState();

  return (
    <div className="twd-container mx-auto">
      <div className="flex gap-8">
        <div
          className={`sm:basis-8/12 xl:basis-9/12 ${
            isMobile && (error || !pdaResults) ? 'hidden' : ''
          }`}
        >
          {pdaResults && (
            <PdaResult results={pdaResults} setResults={setPdaResults} />
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
        <div
          className={`sm:basis-4/12 xl:basis-3/12 ${isMobile && pdaResults ? 'hidden' : ''}`}
        >
          <PdaSearchForm error={error} setError={setError} />
        </div>
      </div>
    </div>
  );
};

export default Pda;
