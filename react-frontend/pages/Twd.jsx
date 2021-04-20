import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ArchiveFill from '../assets/images/icons/archive-fill.svg';
import TwdResult from './components/TwdResult.jsx';
import TwdSearchForm from './components/TwdSearchForm.jsx';

function Twd(props) {
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);

  return (
    <Container
      className={props.isMobile ? 'main-container' : 'main-container py-3'}
    >
      <Row className="justify-content-center">
        <Col
          md={12}
          xl={9}
          className={
            !(props.isMobile && props.showSearch)
              ? 'px-0 pr-lg-4'
              : 'col-hide px-0 lx-lg-4'
          }
        >
          {props.results && (
            <TwdResult
              cryptCardBase={props.cryptCardBase}
              libraryCardBase={props.libraryCardBase}
              results={props.results}
              setResults={props.setResults}
              getDecks={props.getDecks}
              isMobile={props.isMobile}
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              showSearch={props.showSearch}
              setShowSearch={props.setShowSearch}
              setActiveDeck={props.setActiveDeck}
              username={props.username}
              showFloatingButtons={showFloatingButtons}
              setShowFloatingButtons={setShowFloatingButtons}
              inventoryCrypt={props.inventoryCrypt}
              inventoryLibrary={props.inventoryLibrary}
              inventoryMode={props.inventoryMode}
              usedCards={props.usedCards}
              decks={props.decks}
            />
          )}
        </Col>
        <Col
          md={12}
          xl={3}
          className={
            !props.isMobile || (props.isMobile && props.showSearch)
              ? props.isMobile
                ? 'px-1 py-1'
                : 'px-0'
              : 'col-hide'
          }
        >
          <TwdSearchForm
            setShowSearch={props.setShowSearch}
            setResults={props.setResults}
            cryptCardBase={props.cryptCardBase}
            libraryCardBase={props.libraryCardBase}
            formState={props.formState}
            setFormState={props.setFormState}
            isMobile={props.isMobile}
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            inventoryMode={props.inventoryMode}
          />
        </Col>
      </Row>
      {props.isMobile && showFloatingButtons && (
        <>
          {props.inventoryMode ? (
            <div
              onClick={() => props.setInventoryMode(!props.inventoryMode)}
              className="float-right-top inventory-on"
            >
              <div className="pt-2 float-inventory">
                <ArchiveFill viewBox="0 0 16 16" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => props.setInventoryMode(!props.inventoryMode)}
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
