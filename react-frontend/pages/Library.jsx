import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import X from '../assets/images/icons/x.svg';
import AlertMessage from './components/AlertMessage.jsx';
import ResultLibrary from './components/ResultLibrary.jsx';
import SearchLibraryForm from './components/SearchLibraryForm.jsx';
import DeckPreview from './components/DeckPreview.jsx';
import DeckSelect from './components/DeckSelect.jsx';
import DeckShowCrypt from './components/DeckShowCrypt.jsx';
import DeckShowLibrary from './components/DeckShowLibrary.jsx';

function Library(props) {
  const [sortMethod, setSortMethod] = useState('Default');

  // useEffect(() => {
  //   if (props.isMobile && props.results && props.results.length > 0) {
  //     props.setShowSearch(false);
  //   }
  // }, [props.results]);

  return (
    <Container className="main-container">
      <Row>
        {!props.isMobile && (
          <Col md={12} xl={4} className="px-0">
            {Object.keys(props.decks).length > 0 && (
              <Row>
                <Col className="pr-0">
                  <DeckSelect
                    decks={props.decks}
                    activeDeck={props.activeDeck}
                    setActiveDeck={props.setActiveDeck}
                  />
                </Col>
                <Col xs="auto" className="d-flex pl-0">
                  <Button
                    className="full-height"
                    variant="outline-secondary"
                    onClick={() => props.setActiveDeck('')}
                  >
                    <X />
                  </Button>
                </Col>
              </Row>
            )}
            {props.activeDeck &&
              (props.isWide ? (
                <>
                  <DeckShowCrypt
                    deckCardAdd={props.deckCardAdd}
                    deckCardChange={props.deckCardChange}
                    deckid={props.activeDeck}
                    cards={props.decks[props.activeDeck].crypt}
                    showImage={props.showImage}
                    setShowImage={props.setShowImage}
                    isAuthor={true}
                    isMobile={props.isMobile}
                  />
                  <DeckShowLibrary
                    deckCardAdd={props.deckCardAdd}
                    deckCardChange={props.deckCardChange}
                    deckid={props.activeDeck}
                    cards={props.decks[props.activeDeck].library}
                    showImage={props.showImage}
                    setShowImage={props.setShowImage}
                    isAuthor={true}
                    isMobile={props.isMobile}
                  />
                </>
              ) : (
                <DeckPreview
                  showImage={props.showImage}
                  setShowImage={props.setShowImage}
                  deck={props.decks[props.activeDeck]}
                  getDecks={props.getDecks}
                  deckCardChange={props.deckCardChange}
                  isMobile={props.isMobile}
                />
              ))}
          </Col>
        )}
        {!(props.isMobile && props.showSearch) && (
          <Col md={12} xl={5} className="px-0 px-lg-4">
            {props.results != undefined && props.results != null && (
              <ResultLibrary
                showImage={props.showImage}
                setShowImage={props.setShowImage}
                deckCardAdd={props.deckCardAdd}
                cards={props.results}
                library={
                  props.decks &&
                  props.decks[props.activeDeck] &&
                  props.decks[props.activeDeck].library
                }
                activeDeck={props.activeDeck}
                showSort={true}
                showTotal={true}
                sortMethod={sortMethod}
                setSortMethod={setSortMethod}
                isMobile={props.isMobile}
                addMode={props.addMode}
              />
            )}
            {props.results === null && (
              <AlertMessage className="error-message">
                  <b>NO CARDS FOUND</b>
              </AlertMessage>
            )}
          </Col>
        )}
        {(!props.isMobile || (props.isMobile && props.showSearch)) &&
         <Col md={12} xl={3} className="px-0">
           {props.isMobile && props.results === null && (
             <AlertMessage className="error-message">
               <b>NO CARDS FOUND</b>
             </AlertMessage>
           )}
           <SearchLibraryForm
             setResults={props.setResults}
             setShowSearch={props.setShowSearch}
           />
         </Col>
        }
      </Row>
    </Container>
  );
}

export default Library;
