import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { TwdResult, TwdSearchForm, ErrorMessage } from '@/components';
import { useApp, searchResults, setTwdResults } from '@/context';

const Twd = () => {
  const { isMobile } = useApp();
  const twdResults = useSnapshot(searchResults).twd;
  const [error, setError] = useState();

  return (
    <div className="twd-container mx-auto">
      <div className="flex gap-8">
        <div
          className={`md:basis-8/12 xl:basis-9/12 ${
            isMobile && (error || !twdResults) ? 'hidden' : ''
          }`}
        >
          {twdResults && (
            <TwdResult results={twdResults} setResults={setTwdResults} />
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
        <div
          className={`md:basis-1/3 xl:basis-1/4 ${isMobile && twdResults ? 'hidden' : ''}`}
        >
          <TwdSearchForm error={error} setError={setError} />
        </div>
      </div>
    </div>
  );
};

export default Twd;
