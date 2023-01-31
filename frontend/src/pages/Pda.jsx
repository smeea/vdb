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
        {!(isMobile && (error || !pdaResults)) && (
          <div className="sm:basis-7/12 lg:basis-8/12 xl:basis-9/12">
            {pdaResults && (
              <PdaResult results={pdaResults} setResults={setPdaResults} />
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        )}
        {!(isMobile && pdaResults) && (
          <div className="basis-full p-2 sm:basis-5/12 sm:p-0 lg:basis-4/12 xl:basis-3/12">
            <PdaSearchForm error={error} setError={setError} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pda;
