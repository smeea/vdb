import React, { useState, useContext } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import EyeFill from '../assets/images/icons/eye-fill.svg';
import EyeSlashFill from '../assets/images/icons/eye-slash-fill.svg';
import ResultCrypt from './components/ResultCrypt.jsx';
import SearchCryptForm from './components/SearchCryptForm.jsx';
import DeckSelectMy from './components/DeckSelectMy.jsx';
import DeckBranchSelect from './components/DeckBranchSelect.jsx';
import DeckCrypt from './components/DeckCrypt.jsx';
import DeckLibrary from './components/DeckLibrary.jsx';
import AppContext from '../context/AppContext';

function Crypt(props) {
  const { addMode, setAddMode, username, isMobile } = useContext(AppContext);
  const [sortMethod, setSortMethod] = useState('Capacity - Min to Max');

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
                    cardBase={props.cryptCardBase}
                    inventoryCrypt={props.inventoryCrypt}
                    usedCards={props.usedCryptCards}
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
                    cardBase={props.libraryCardBase}
                    inventoryLibrary={props.inventoryLibrary}
                    usedCards={props.usedLibraryCards}
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
            !(isMobile && props.showSearch)
              ? 'px-0 px-lg-4'
              : 'col-hide px-0 lx-lg-4'
          }
        >
          {props.results && (
            <ResultCrypt
              cardAdd={props.cardAdd}
              cardChange={props.cardChange}
              cards={props.results}
              crypt={
                props.deckRouter(props.activeDeck) &&
                props.deckRouter(props.activeDeck).crypt
              }
              activeDeck={props.activeDeck}
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
              showSearch={props.showSearch}
              setShowSearch={props.setShowSearch}
              setResults={props.setResults}
              isInventory={props.isInventory}
              inventoryCrypt={props.inventoryCrypt}
              usedCards={props.usedCryptCards}
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
          <SearchCryptForm
            results={props.results}
            setResults={props.setResults}
            showSearch={props.showSearch}
            setShowSearch={props.setShowSearch}
            formState={props.formState}
            setFormState={props.setFormState}
            cardBase={props.cryptCardBase}
            isInventory={props.isInventory}
          />
        </Col>
        {(!username || !addMode) && !isMobile && <Col xl={1} />}
      </Row>
    </Container>
  );
}

export default Crypt;
