import React, { useState, useContext } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import EyeFill from '../assets/images/icons/eye-fill.svg';
import EyeSlashFill from '../assets/images/icons/eye-slash-fill.svg';
import ResultLibrary from './components/ResultLibrary.jsx';
import SearchLibraryForm from './components/SearchLibraryForm.jsx';
import DeckSelectMy from './components/DeckSelectMy.jsx';
import DeckBranchSelect from './components/DeckBranchSelect.jsx';
import DeckCrypt from './components/DeckCrypt.jsx';
import DeckLibrary from './components/DeckLibrary.jsx';
import AppContext from '../context/AppContext.js';

function Library(props) {
  const {
    deckRouter,
    decks,
    showLibrarySearch,
    libraryResults,
    addMode,
    setAddMode,
    username,
    isMobile,
  } = useContext(AppContext);
  const [sortMethod, setSortMethod] = useState('Type');

  let isBranches;
  if (deckRouter(props.activeDeck)) {
    isBranches =
      deckRouter(props.activeDeck).master ||
      (deckRouter(props.activeDeck).branches &&
        deckRouter(props.activeDeck).branches.length > 0);
  }

  return (
    <Container
      className={isMobile ? 'main-container' : 'main-container pt-0 pb-3'}
    >
      <Row>
        {!isMobile && (
          <Col xl={username && addMode ? 4 : 3} className="px-0">
            {decks && Object.keys(decks).length > 0 && (
              <div className="d-flex justify-content-end sticky-insearch pt-3 pb-2">
                {addMode && (
                  <>
                    <div className={isBranches ? 'w-75' : 'w-100'}>
                      <DeckSelectMy activeDeck={props.activeDeck} />
                    </div>
                    {isBranches && (
                      <div className="pl-1 w-25">
                        <DeckBranchSelect activeDeck={props.activeDeck} />
                      </div>
                    )}
                  </>
                )}
                <div className="d-flex pl-1">
                  <Button
                    variant="outline-secondary"
                    onClick={() => setAddMode(!addMode)}
                  >
                    {addMode ? <EyeSlashFill /> : <EyeFill />}
                  </Button>
                </div>
              </div>
            )}
            {deckRouter(props.activeDeck) && addMode && (
              <>
                <div className="pt-2">
                  <DeckCrypt
                    deckid={props.activeDeck.deckid}
                    cards={deckRouter(props.activeDeck).crypt}
                    isAuthor={true}
                    inSearch={true}
                  />
                </div>
                <div className="pt-4">
                  <DeckLibrary
                    deckid={props.activeDeck.deckid}
                    cards={deckRouter(props.activeDeck).library}
                    isAuthor={true}
                    inSearch={true}
                  />
                </div>
              </>
            )}
          </Col>
        )}
        <Col
          xs={12}
          md={8}
          xl={5}
          className={
            isMobile && showLibrarySearch
              ? 'col-hide px-0'
              : 'px-0 px-md-2 px-xl-4 pt-xl-3'
          }
        >
          {libraryResults && (
            <ResultLibrary
              library={
                deckRouter(props.activeDeck) &&
                deckRouter(props.activeDeck).library
              }
              activeDeck={props.activeDeck}
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
            />
          )}
        </Col>
        <Col
          xs={12}
          md={4}
          xl={3}
          className={
            !isMobile || (isMobile && showLibrarySearch)
              ? isMobile
                ? 'p-1'
                : 'px-md-2 px-xl-0 pt-xl-3'
              : 'col-hide'
          }
        >
          <SearchLibraryForm />
        </Col>
        {(!username || !addMode) && !isMobile && <Col xl={1} />}
      </Row>
    </Container>
  );
}

export default Library;
