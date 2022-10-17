import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import List from 'assets/images/icons/list.svg';
import X from 'assets/images/icons/x.svg';
import {
  DeckTags,
  ButtonIconed,
  ReviewButtons,
  ReviewCrypt,
  ReviewLibrary,
  DeckChangeName,
  DeckChangeAuthor,
  DeckChangeDescription,
} from 'components';
import { useApp } from 'context';

const Review = () => {
  const {
    cryptCardBase,
    libraryCardBase,
    isMobile,
    showFloatingButtons,
    setShowFloatingButtons,
    showMenuButtons,
    setShowMenuButtons,
    parseDeckCards,
    preconDecks,
    timers,
    setTimers,
    changeTimer,
    setChangeTimer,
  } = useApp();

  const query = new URLSearchParams(useLocation().search);
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [foldedDescription, setFoldedDescription] = useState(!isMobile);

  const [deckFrom, setDeckFrom] = useState();
  const [deckTo, setDeckTo] = useState();
  const [urlDiff, setUrlDiff] = useState();

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

        if (deckid.length !== 32 || data.public_parent) {
          data.tags = [];
          Object.values(
            useTags(
              data.crypt,
              data.library
            )
          ).map((v) => {
            data.tags = data.tags.concat(v);
          });
        }

        delete data.cards;
        setDeckFrom(data);
        setDeckTo(JSON.parse(JSON.stringify(data)));
      })
      .catch((error) => {
        if (error.message == 400) {
          setError('NO DECK WITH THIS ID');
        } else {
          setError('CONNECTION PROBLEM');
        }
      });
  };

  const getPreconDeck = (deckid) => {
    setDeckFrom(preconDecks[deckid]);
    setDeckTo(JSON.parse(JSON.stringify(preconDecks[deckid])));
  };

  const getDiff = (cardsFrom, cardsTo) => {
    const diff = {};

    [...Object.keys(cardsFrom), ...Object.keys(cardsTo)].map((cardid) => {
      const fromQty = cardsFrom[cardid] ? cardsFrom[cardid].q : 0;
      const toQty = cardsTo[cardid] ? cardsTo[cardid].q : 0;
      if (fromQty !== toQty) {
        diff[cardid] = fromQty - toQty;
      }
    });

    return diff;
  };

  useEffect(() => {
    const diff = getDiff(
      { ...deckFrom?.crypt, ...deckFrom?.library },
      { ...deckTo?.crypt, ...deckTo?.library }
    );

    if (Object.keys(diff).length) {
      const cards = [];
      Object.keys(diff).map((card) => {
        cards.push(`${card}=${diff[card]};`);
      });

      const u = cards.toString().replace(/,/g, '').replace(/;$/, '');
      setUrlDiff(u);
      navigate(`/review?id=${query.get('id')}#${u}`);
    }
  }, [deckFrom]);

  const cardChange = (undefined, cardid, count) => {
    if (count >= 0) {
      const cardSrc = cardid > 200000 ? 'crypt' : 'library';
      const cardBase = cardid > 200000 ? cryptCardBase : libraryCardBase;

      setDeckFrom((prevState) => ({
        ...prevState,
        [cardSrc]: {
          ...prevState[cardSrc],
          [cardid]: {
            c: cardBase[cardid],
            q: count,
          },
        },
      }));

      const startTimer = () => {
        let counter = 1;
        timers.map((timerId) => {
          clearInterval(timerId);
        });
        setTimers([]);

        const timerId = setInterval(() => {
          if (counter > 0) {
            counter = counter - 1;
          } else {
            clearInterval(timerId);
            setChangeTimer(!changeTimer);
          }
        }, 500);

        setTimers([...timers, timerId]);
      };

      startTimer();
    }
  };

  useEffect(() => {
    if (hash && deckTo) {
      const deckWithHash = JSON.parse(
        JSON.stringify({ crypt: deckTo.crypt, library: deckTo.library })
      );

      hash
        .slice(1)
        .split(';')
        .map((i) => {
          const j = i.split('=');
          if (j[0] > 200000) {
            deckWithHash.crypt[j[0]] = {
              q: (deckWithHash.crypt[j[0]]?.q || 0) + parseInt(j[1]),
              c: cryptCardBase[j[0]],
            };
          } else {
            deckWithHash.library[j[0]] = {
              q: (deckWithHash.library[j[0]]?.q || 0) + parseInt(j[1]),
              c: libraryCardBase[j[0]],
            };
          }
        });

      if (
        JSON.stringify({ crypt: deckFrom.crypt, library: deckFrom.library }) !=
        JSON.stringify(deckWithHash)
      ) {
        setDeckFrom((prevState) => {
          return {
            ...prevState,
            crypt: deckWithHash.crypt,
            library: deckWithHash.library,
          };
        });
      }
    }
  }, [deckTo]);

  useEffect(() => {
    if (
      (!deckFrom || query.get('id') !== deckFrom.deckid) &&
      cryptCardBase &&
      libraryCardBase &&
      Object.keys(preconDecks).length
    ) {
      if (query.get('id').includes(':')) {
        getPreconDeck(query.get('id'));
      } else {
        getDeck(query.get('id'));
      }
    }
  }, [query, preconDecks, cryptCardBase, libraryCardBase]);

  return (
    <Container className="deck-container px-0 px-md-2 px-xl-4 py-md-3">
      <Row className="mx-0">
        <Col xl={1}></Col>
        <Col sm={12} lg={10} xl={9} className="px-md-2 px-xl-3">
          <Row className="px-1 px-md-0 py-1 pb-0 pt-md-0">
            <Col className="px-0 px-md-2">
              {deckFrom && (
                <>
                  {isMobile ? (
                    <DeckChangeName deck={deckFrom} isAuthor={false} />
                  ) : (
                    <>
                      <Row className="mx-0 pb-sm-2">
                        <Col md={8} className="px-0 ps-md-0 pe-md-1">
                          <DeckChangeName deck={deckFrom} isAuthor={false} />
                        </Col>
                        <Col
                          md={4}
                          className="px-0 ps-md-1 pe-md-0 pt-2 pt-md-0"
                        >
                          <DeckChangeAuthor
                            author={deckFrom.author}
                            deckid={deckFrom.deckid}
                            isAuthor={false}
                          />
                        </Col>
                      </Row>
                      <Row className="mx-0">
                        <Col className="px-0">
                          <DeckChangeDescription
                            description={deckFrom.description}
                            deckid={deckFrom.deckid}
                            isAuthor={false}
                            folded={foldedDescription}
                            setFolded={setFoldedDescription}
                          />
                        </Col>
                        {foldedDescription &&
                          deckFrom.tags &&
                          deckFrom.tags.length > 0 && (
                            <Col className="ps-2 pe-0">
                              <DeckTags
                                deckid={deckFrom.deckid}
                                tags={deckFrom.tags}
                                bordered={true}
                                isAuthor={false}
                              />
                            </Col>
                          )}
                      </Row>
                      {!foldedDescription &&
                        deckFrom.tags &&
                        deckFrom.tags.length > 0 && (
                          <div className="d-block pt-2">
                            <DeckTags
                              deckid={deckFrom.deckid}
                              tags={deckFrom.tags}
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
          {deckFrom && (
            <Row className="pt-md-2">
              <Col md={7} className="px-0 px-md-2 ps-xl-2 pe-xl-3 pt-3 pt-md-0">
                <ReviewCrypt
                  cardsFrom={deckFrom.crypt}
                  cardsTo={deckTo.crypt}
                  cardChange={cardChange}
                />
              </Col>
              <Col md={5} className="px-0 px-md-2 ps-xl-3 pe-xl-2 pt-3 pt-md-0">
                <ReviewLibrary
                  cardsFrom={deckFrom.library}
                  cardsTo={deckTo.library}
                  cardChange={cardChange}
                />
              </Col>
            </Row>
          )}
        </Col>
        {!isMobile && (
          <Col lg={2} className="hide-on-lt992px px-lg-3">
            <div className="sticky-buttons">
              <ReviewButtons deck={deckFrom} urlDiff={urlDiff} />
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
              <ReviewButtons deck={deckFrom} urlDiff={urlDiff} />
              <div className="d-flex justify-content-end pt-1">
                <ButtonIconed
                  variant="secondary"
                  onClick={() => {
                    setShowMenuButtons(false);
                    setShowFloatingButtons(true);
                  }}
                  title="Close"
                  icon={<X width="24" height="24" viewBox="0 0 16 16" />}
                />
              </div>
            </Container>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default Review;
