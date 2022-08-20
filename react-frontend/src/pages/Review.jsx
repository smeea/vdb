import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import List from 'assets/images/icons/list.svg';
import X from 'assets/images/icons/x.svg';
import {
  DeckTags,
  ReviewButtons,
  ReviewCrypt,
  ReviewLibrary,
  DeckChangeName,
  DeckChangeAuthor,
  DeckChangeDescription,
} from 'components';
import { useApp } from 'context';

const Review = (props) => {
  const {
    cryptCardBase,
    libraryCardBase,
    isMobile,
    showFloatingButtons,
    setShowFloatingButtons,
    showMenuButtons,
    setShowMenuButtons,
    parseDeckCards,
  } = useApp();

  const query = new URLSearchParams(useLocation().search);
  const { hash } = useLocation();
  // const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [foldedDescription, setFoldedDescription] = useState(!isMobile);

  const [deckFrom, setDeckFrom] = useState(undefined);
  const [deckTo, setDeckTo] = useState(undefined);

  const getDeck = (deckid) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then((data) => {
        const cardsData = parseDeckCards(data.cards);
        data.crypt = cardsData.crypt;
        data.library = cardsData.library;

        delete data.cards;
        console.log(data);
        setDeckTo(data);
        setDeckFrom(data);
      })
      .catch((error) => {
        if (error.message == 400) {
          setError('NO DECK WITH THIS ID');
        } else {
          setError('CONNECTION PROBLEM');
        }
      });
  };

  useEffect(() => {
    if (hash && cryptCardBase && libraryCardBase) {
      const crypt = {};
      const library = {};

      hash
        .slice(1)
        .split(';')
        .map((i) => {
          const j = i.split('=');
          if (j[0] > 200000) {
            crypt[j[0]] = {
              q: parseInt(j[1]),
              c: cryptCardBase[j[0]],
            };
          } else {
            library[j[0]] = {
              q: parseInt(j[1]),
              c: libraryCardBase[j[0]],
            };
          }
        });

      const deck = {
        deckid: 'deckInUrl',
        name: query.get('name') ? query.get('name') : '',
        author: query.get('author') ? query.get('author') : '',
        description: query.get('description') ? query.get('description') : '',
        crypt: crypt,
        library: library,
      };

      setDeckTo(deck);
      setDeckFrom(deck);
    }
  }, [hash, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (
      (!deckTo || query.get('id') !== deckTo.deckid) &&
      cryptCardBase &&
      libraryCardBase
    ) {
      if (query.get('id').includes(':')) {
        // TODO PRECON
        // getPreconDeck(query.get('id'));
      } else {
        getDeck(query.get('id'));
      }
    }
  }, [query, cryptCardBase, libraryCardBase]);

  return (
    <Container className="deck-container px-0 px-md-2 px-xl-4 py-md-3">
      <Row className="mx-0">
        <Col xl={1}></Col>
        <Col sm={12} lg={10} xl={9} className="px-md-2 px-xl-3">
          <Row className="px-1 px-md-0 py-1 pb-0 pt-md-0">
            <Col className="px-0 px-md-2">
              {deckTo && (
                <>
                  {isMobile ? (
                    <DeckChangeName deck={deckTo} isAuthor={false} />
                  ) : (
                    <>
                      <Row className="mx-0 pb-sm-2">
                        <Col md={8} className="px-0 ps-md-0 pe-md-1">
                          <DeckChangeName deck={deckTo} isAuthor={false} />
                        </Col>
                        <Col
                          md={4}
                          className="px-0 ps-md-1 pe-md-0 pt-2 pt-md-0"
                        >
                          <DeckChangeAuthor
                            author={deckTo.author}
                            deckid={deckTo.deckid}
                            isAuthor={false}
                          />
                        </Col>
                      </Row>
                      <Row className="mx-0">
                        <Col className="px-0">
                          <DeckChangeDescription
                            description={deckTo.description}
                            deckid={deckTo.deckid}
                            isAuthor={false}
                            folded={foldedDescription}
                            setFolded={setFoldedDescription}
                          />
                        </Col>
                        {foldedDescription && deckTo.tags && (
                          <Col className="ps-2 pe-0">
                            <DeckTags
                              deckid={deckTo.deckid}
                              tags={deckTo.tags}
                              bordered={true}
                              isAuthor={false}
                            />
                          </Col>
                        )}
                      </Row>
                      {!foldedDescription && deckTo.tags && (
                        <div className="d-block pt-2">
                          <DeckTags
                            deckid={deckTo.deckid}
                            tags={deckTo.tags}
                            bordered={true}
                            isAuthor={false}
                          />
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </Col>
          </Row>
          {error && (
            <Row>
              <Col className="px-0 py-4 px-lg-2">
                <div className="d-flex align-items-center justify-content-center error-message p-2">
                  <b>{error}</b>
                </div>
              </Col>
            </Row>
          )}
          {deckTo && (
            <Row className="pt-md-2">
              <Col md={7} className="px-0 px-md-2 ps-xl-2 pe-xl-3 pt-3 pt-md-0">
                <ReviewCrypt
                  deckid={deckTo.deckid}
                  cardsFrom={deckFrom.crypt}
                  cardsTo={deckTo.crypt}
                />
              </Col>
              <Col md={5} className="px-0 px-md-2 ps-xl-3 pe-xl-2 pt-3 pt-md-0">
                <ReviewLibrary
                  deckid={deckTo.deckid}
                  cardsFrom={deckFrom.library}
                  cardsTo={deckTo.library}
                />
              </Col>
            </Row>
          )}
        </Col>
        {!isMobile && (
          <Col lg={2} className="hide-on-lt992px px-lg-3">
            <div className="sticky-buttons">
              <ReviewButtons deck={deckTo} />
            </div>
          </Col>
        )}
      </Row>

      {showFloatingButtons && (
        <div
          onClick={() => {
            setShowMenuButtons(true);
            setShowFloatingButtons(false);
          }}
          className="hide-on-gt992px d-flex float-right-bottom float-menu align-items-center justify-content-center"
        >
          <List viewBox="0 0 16 16" />
        </div>
      )}
      {showMenuButtons && (
        <Modal
          show={showMenuButtons}
          onHide={() => {
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
          animation={false}
          centered={true}
          size="sm"
        >
          <Modal.Body className="p-1">
            <Container className="px-0" fluid>
              <div className="d-flex justify-content-end">
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setShowMenuButtons(false);
                    setShowFloatingButtons(true);
                  }}
                >
                  <X width="32" height="32" viewBox="0 0 16 16" />
                </Button>
              </div>
              <ReviewButtons deck={deckTo} />
            </Container>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default Review;
