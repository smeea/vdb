import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { PdaResult, PdaSearchForm, ErrorMessage } from '@/components';
import { useApp, searchResults, setPdaResults } from '@/context';

const Pda = () => {
  const { isMobile } = useApp();
  const pdaResults = useSnapshot(searchResults).pda;
  const [error, setError] = useState();

  const X_SPACING = 'space-x-8';

  return (
    <div className="twd-container mx-auto">
      <div className="flex gap-8">
        <div
          className={`md:basis-8/12 xl:basis-9/12 ${
            isMobile && (error || !pdaResults) ? 'hidden' : ''
          }`}
        >
          {pdaResults && (
            <PdaResult results={pdaResults} setResults={setPdaResults} />
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
        <div
          className={`w-full md:basis-1/3 xl:basis-1/4 ${isMobile && pdaResults ? 'hidden' : ''}`}
        >
          <PdaSearchForm error={error} setError={setError} />
        </div>
      </div>
    </div>
  );
};

export default Pda;
