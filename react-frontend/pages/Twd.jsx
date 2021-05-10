import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ArchiveFill from '../assets/images/icons/archive-fill.svg';
import TwdResult from './components/TwdResult.jsx';
import TwdSearchForm from './components/TwdSearchForm.jsx';
import AppContext from '../context/AppContext.js';

function Twd(props) {
  const { inventoryMode, setInventoryMode, isMobile } = useContext(AppContext);

  const [showFloatingButtons, setShowFloatingButtons] = useState(true);

  return (
    <Container className={isMobile ? 'main-container' : 'main-container py-3'}>
      <Row className="justify-content-center">
        <Col
          md={12}
          xl={9}
          className={
            !(isMobile && props.showSearch)
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
              showSearch={props.showSearch}
              setShowSearch={props.setShowSearch}
              setActiveDeck={props.setActiveDeck}
              showFloatingButtons={showFloatingButtons}
              setShowFloatingButtons={setShowFloatingButtons}
              inventoryCrypt={props.inventoryCrypt}
              inventoryLibrary={props.inventoryLibrary}
              usedCryptCards={props.usedLibraryCards}
              usedLibraryCards={props.usedCryptCards}
              decks={props.decks}
            />
          )}
        </Col>
        <Col
          md={12}
          xl={3}
          className={
            !isMobile || (isMobile && props.showSearch)
              ? isMobile
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
          />
        </Col>
      </Row>
      {isMobile && showFloatingButtons && (
        <>
          {inventoryMode ? (
            <div
              onClick={() => setInventoryMode(!inventoryMode)}
              className="float-right-top inventory-on"
            >
              <div className="pt-2 float-inventory">
                <ArchiveFill viewBox="0 0 16 16" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => setInventoryMode(!inventoryMode)}
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
