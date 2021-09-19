import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ArchiveFill from '../assets/images/icons/archive-fill.svg';
import TwdResult from './components/TwdResult.jsx';
import TwdSearchForm from './components/TwdSearchForm.jsx';
import AppContext from '../context/AppContext.js';

function Twd(props) {
  const {
    showTwdSearch,
    twdResults,
    inventoryMode,
    toggleInventoryMode,
    isMobile,
  } = useContext(AppContext);

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
            !(isMobile && showTwdSearch)
              ? 'px-0 pr-lg-4'
              : 'col-hide px-0 px-md-2 px-lg-4'
          }
        >
          {twdResults && (
            <TwdResult
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
            !isMobile || (isMobile && showTwdSearch)
              ? isMobile
                ? 'p-1'
                : 'px-md-2 px-xl-0'
              : 'col-hide'
          }
        >
          <TwdSearchForm />
        </Col>
      </Row>
      {isMobile && showFloatingButtons && (
        <>
          {inventoryMode ? (
            <div
              onClick={() => toggleInventoryMode()}
              className="float-right-top inventory-on"
            >
              <div className="pt-2 float-inventory">
                <ArchiveFill viewBox="0 0 16 16" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => toggleInventoryMode()}
              className="float-right-top inventory-off"
            >
              <div className="pt-2 float-inventory">
                <ArchiveFill viewBox="0 0 16 16" />
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
}

export default Twd;
