import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import Plus from 'assets/images/icons/plus.svg';
import BinocularsFill from 'assets/images/icons/binoculars-fill.svg';
import {
  ResultCrypt,
  SearchCryptForm,
  DeckSelectMy,
  DeckBranchSelect,
  DeckCrypt,
  DeckLibrary,
} from 'components';
import { useApp } from 'context';

function Crypt(props) {
  const {
    deckRouter,
    decks,
    showCryptSearch,
    cryptResults,
    addMode,
    toggleAddMode,
    isMobile,
  } = useApp();

  let isBranches;
  if (deckRouter(props.activeDeck)) {
    isBranches =
      deckRouter(props.activeDeck).master ||
      (deckRouter(props.activeDeck).branches &&
        deckRouter(props.activeDeck).branches.length > 0);
  }

  return (
    <Container className="main-container px-md-2 px-xl-4">
      <Row>
        {!isMobile && (
          <>
            <Col
              md={addMode ? 5 : 1}
              lg={addMode ? 6 : 2}
              xl={props.activeDeck.deckid && addMode ? 4 : 3}
              className="px-md-2 ps-xl-0 py-md-3"
            >
              {decks && Object.keys(decks).length > 0 && (
                <div className="d-flex justify-content-end sticky-insearch pb-2">
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
                  <div className="hide-on-lt1200px d-flex ps-1">
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
          </>
        )}
        <Col
          md={7}
          lg={6}
          xl={5}
          className={
            isMobile && showCryptSearch
              ? 'col-hide'
              : 'px-0 px-md-2 px-xl-3 py-md-3'
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
          md={4}
          lg={4}
          xl={3}
          className={
            !isMobile || (isMobile && showCryptSearch)
              ? `${
                  addMode ? 'hide-on-lt1200px' : ''
                } p-1 px-md-2 pe-xl-0 py-md-3`
              : 'col-hide'
          }
        >
          <SearchCryptForm />
        </Col>
      </Row>
      {!isMobile && props.activeDeck.deckid && (cryptResults || addMode) && (
        <div
          onClick={() => toggleAddMode()}
          className={`hide-on-gt1200px d-flex float-right-bottom float-add-${
            addMode ? 'on' : 'off'
          } align-items-center justify-content-center`}
        >
          {addMode ? (
            <BinocularsFill viewBox="0 -2 16 22" />
          ) : (
            <Plus viewBox="0 0 16 16" />
          )}
        </div>
      )}
    </Container>
  );
}

export default Crypt;
