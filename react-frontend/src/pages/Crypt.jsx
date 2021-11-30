import React, { useContext } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import {
  ResultCrypt,
  SearchCryptForm,
  DeckSelectMy,
  DeckBranchSelect,
  DeckCrypt,
  DeckLibrary,
} from 'components';
import AppContext from 'context/AppContext';

function Crypt(props) {
  const {
    deckRouter,
    decks,
    showCryptSearch,
    cryptResults,
    addMode,
    toggleAddMode,
    isMobile,
  } = useContext(AppContext);

  let isBranches;
  if (deckRouter(props.activeDeck)) {
    isBranches =
      deckRouter(props.activeDeck).master ||
      (deckRouter(props.activeDeck).branches &&
        deckRouter(props.activeDeck).branches.length > 0);
  }

  return (
    <Container
      className={isMobile ? 'main-container' : 'main-container pt-0 pb-3 px-4'}
    >
      <Row>
        {!isMobile && (
          <Col xl={props.activeDeck.deckid && addMode ? 4 : 3} className="px-0">
            {decks && Object.keys(decks).length > 0 && (
              <div className="d-flex justify-content-end sticky-insearch pt-3 pb-2">
                {props.activeDeck.deckid && addMode && (
                  <>
                    <div className={isBranches ? 'w-75' : 'w-100'}>
                      <DeckSelectMy activeDeck={props.activeDeck} />
                    </div>
                    {isBranches && (
                      <div className="ps-1 w-25">
                        <DeckBranchSelect activeDeck={props.activeDeck} />
                      </div>
                    )}
                  </>
                )}
                <div className="d-flex ps-1">
                  <Button
                    title="Hide Deck Panel"
                    variant="primary"
                    onClick={() => toggleAddMode()}
                  >
                    {addMode ? <EyeSlashFill /> : <EyeFill />}
                  </Button>
                </div>
              </div>
            )}
            {props.activeDeck.deckid && addMode && (
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
            isMobile && showCryptSearch
              ? 'col-hide px-0'
              : 'px-0 px-md-2 px-xl-4 pt-xl-3'
          }
        >
          {cryptResults && (
            <ResultCrypt
              crypt={
                deckRouter(props.activeDeck) &&
                deckRouter(props.activeDeck).crypt
              }
              activeDeck={props.activeDeck}
            />
          )}
        </Col>
        <Col
          xs={12}
          md={4}
          xl={3}
          className={
            !isMobile || (isMobile && showCryptSearch)
              ? isMobile
                ? 'p-1'
                : 'px-md-2 px-xl-0 pt-xl-3'
              : 'col-hide'
          }
        >
          <SearchCryptForm />
        </Col>
        {(!props.activeDeck.deckid || !addMode) && !isMobile && <Col xl={1} />}
      </Row>
    </Container>
  );
}

export default Crypt;
