import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
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
        <Col
          xs={12}
          md={8}
          xl={9}
          className={
            !isMobile || (isMobile && !error)
              ? 'px-0 pe-lg-4'
              : 'hidden px-0 px-md-2 px-lg-4'
          }
        >
          {pdaResults && (
            <PdaResult results={pdaResults} setResults={setPdaResults} />
          )}
          {error && (
            <div className="flex items-center justify-center font-bold error-message">
              {error}
            </div>
          )}
        </Col>
        <Col
          xs={12}
          md={4}
          xl={3}
          className={
            !isMobile || (isMobile && !pdaResults)
              ? 'p-1 py-md-0 px-md-2 px-xl-0'
              : 'hidden'
          }
        >
          <PdaSearchForm error={error} setError={setError} />
        </Col>
      </div>
    </div>
  );
};

export default Pda;
