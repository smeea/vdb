import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSnapshot } from 'valtio';
import { PdaResult, PdaSearchForm } from 'components';
import { useApp, searchResults, setPdaResults } from 'context';

const Pda = () => {
  const { isMobile } = useApp();
  const pdaResults = useSnapshot(searchResults).pda;

  return (
    <Container className="main-container p-md-3">
      <Row className="justify-content-center">
        <Col
          xs={12}
          md={8}
          xl={9}
          className={
            !isMobile || (isMobile && pdaResults?.length > 0)
              ? 'px-0 pe-lg-4'
              : 'col-hide px-0 px-md-2 px-lg-4'
          }
        >
          {pdaResults?.length > 0 && (
            <PdaResult results={pdaResults} setResults={setPdaResults} />
          )}
        </Col>
        <Col
          xs={12}
          md={4}
          xl={3}
          className={
            !isMobile || (isMobile && !pdaResults?.length > 0)
              ? 'p-1 py-md-0 px-md-2 px-xl-0'
              : 'col-hide'
          }
        >
          <PdaSearchForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Pda;
