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
    showLibrarySearch,
    libraryResults,
    addMode,
    setAddMode,
    username,
    isMobile,
  } = useContext(AppContext);
  const [sortMethod, setSortMethod] = useState('Type');

  let isBranches;
  if (props.deckRouter(props.activeDeck)) {
    isBranches =
      props.deckRouter(props.activeDeck).master ||
      (props.deckRouter(props.activeDeck).branches &&
        props.deckRouter(props.activeDeck).branches.length > 0);
  }

  return (
    <Container className={isMobile ? 'main-container' : 'main-container py-3'}>
      <Row>
        {!isMobile && (
          <Col md={12} xl={username && addMode ? 4 : 3} className="px-0">
            {props.decks && Object.keys(props.decks).length > 0 && (
              <Row>
                <Col>
                  <div
                    className={
                      isMobile
                        ? 'd-flex justify-content-between'
                        : 'd-flex justify-content-end'
                    }
                  >
                    {addMode && (
                      <>
                        <div className={isBranches ? 'w-75' : 'w-100'}>
                          <DeckSelectMy
                            decks={props.decks}
                            activeDeck={props.activeDeck}
                            setActiveDeck={props.setActiveDeck}
                          />
                        </div>
                        {isBranches && (
                          <div className="pl-1 w-25">
                            <DeckBranchSelect
                              decks={props.decks}
                              activeDeck={props.activeDeck}
                              setActiveDeck={props.setActiveDeck}
                            />
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
                </Col>
              </Row>
            )}
            {props.deckRouter(props.activeDeck) && addMode && (
              <>
                <div className="pt-4">
                  <DeckCrypt
                    changeTimer={props.changeTimer}
                    cardAdd={props.cardAdd}
                    cardChange={props.cardChange}
                    deckid={props.activeDeck.deckid}
                    cards={props.deckRouter(props.activeDeck).crypt}
                    isAuthor={true}
                    decks={props.decks}
                    inSearch={true}
                  />
                </div>
                <div className="pt-4">
                  <DeckLibrary
                    cardAdd={props.cardAdd}
                    cardChange={props.cardChange}
                    deckid={props.activeDeck.deckid}
                    cards={props.deckRouter(props.activeDeck).library}
                    isAuthor={true}
                    decks={props.decks}
                    inSearch={true}
                  />
                </div>
              </>
            )}
          </Col>
        )}
        <Col
          md={12}
          xl={5}
          className={
            !(isMobile && showLibrarySearch)
              ? 'px-0 px-lg-4'
              : 'col-hide px-0 lx-lg-4'
          }
        >
          {libraryResults && (
            <ResultLibrary
              cardAdd={props.cardAdd}
              cardChange={props.cardChange}
              library={
                props.deckRouter(props.activeDeck) &&
                props.deckRouter(props.activeDeck).library
              }
              activeDeck={props.activeDeck}
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
              isInventory={props.isInventory}
              decks={props.decks}
            />
          )}
        </Col>
        <Col
          md={12}
          xl={3}
          className={
            !isMobile || (isMobile && showLibrarySearch)
              ? isMobile
                ? 'px-1 py-1'
                : 'px-0'
              : 'col-hide'
          }
        >
          <SearchLibraryForm isInventory={props.isInventory} />
        </Col>
        {(!username || !addMode) && !isMobile && <Col xl={1} />}
      </Row>
    </Container>
  );
}

export default Library;
