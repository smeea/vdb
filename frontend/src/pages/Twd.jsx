import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  TwdResult,
  TwdSearchForm,
  ErrorMessage,
  FlexGapped,
} from '@/components';
import { useApp, searchResults, setTwdResults } from '@/context';

const Twd = () => {
  const { isMobile } = useApp();
  const twdResults = useSnapshot(searchResults).twd;
  const [error, setError] = useState();

  return (
    <div className="twd-container mx-auto">
      <FlexGapped>
        {!(isMobile && (error || !twdResults)) && (
          <div className="basis-full sm:basis-7/12 lg:basis-8/12 xl:basis-9/12">
            {twdResults && (
              <TwdResult results={twdResults} setResults={setTwdResults} />
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        )}
        {!(isMobile && twdResults) && (
          <div className="basis-full p-2 sm:basis-5/12 sm:p-0 lg:basis-4/12 xl:basis-3/12">
            <TwdSearchForm error={error} setError={setError} />
          </div>
        )}
      </FlexGapped>
    </div>
  );
};

export default Twd;
