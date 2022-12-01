import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSnapshot } from 'valtio';
import { PdaResult, PdaSearchForm } from 'components';
import { useApp, searchResults, setPdaResults } from 'context';

const Pda = () => {
  const { isMobile } = useApp();
  const pdaResults = useSnapshot(searchResults).pda;
  const [error, setError] = useState();

  return (
    <Container className="twd-container p-md-3">
      <Row className="justify-content-center">
        <Col
          xs={12}
          md={8}
          xl={9}
          className={
            !isMobile || (isMobile && !error)
              ? 'px-0 pe-lg-4'
              : 'col-hide px-0 px-md-2 px-lg-4'
          }
        >
          {pdaResults && (
            <PdaResult results={pdaResults} setResults={setPdaResults} />
          )}
          {error && (
            <div className="d-flex align-items-center justify-content-center bold error-message">
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
              : 'col-hide'
          }
        >
          <PdaSearchForm error={error} setError={setError} />
        </Col>
      </Row>
    </Container>
  );
};

export default Pda;
