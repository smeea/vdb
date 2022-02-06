import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PdaResult, PdaSearchForm } from 'components';
import { useApp, useSearchResults } from 'context';

function Pda(props) {
  const { showPdaSearch, isMobile } = useApp();
  const { pdaResults } = useSearchResults();

  const [showFloatingButtons, setShowFloatingButtons] = useState(true);

  return (
    <Container
      className={isMobile ? 'main-container' : 'main-container py-3 px-4'}
    >
      <Row className="justify-content-center">
        <Col
          xs={12}
          md={8}
          xl={9}
          className={
            !(isMobile && showPdaSearch)
              ? 'px-0 pe-lg-4'
              : 'col-hide px-0 px-md-2 px-lg-4'
          }
        >
          {pdaResults && (
            <PdaResult
              showFloatingButtons={showFloatingButtons}
              setShowFloatingButtons={setShowFloatingButtons}
            />
          )}
        </Col>
        <Col
          xs={12}
          md={4}
          xl={3}
          className={
            !isMobile || (isMobile && showPdaSearch)
              ? isMobile
                ? 'p-1'
                : 'px-md-2 px-xl-0'
              : 'col-hide'
          }
        >
          <PdaSearchForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Pda;
