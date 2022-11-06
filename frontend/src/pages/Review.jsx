import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { useImmer } from 'use-immer';
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
import { useApp, deckStore } from 'context';
import { useDeck, useTags } from 'hooks';

const Review = () => {
  const {
    isMobile,
    cryptCardBase,
    libraryCardBase,
    preconDecks,
    setShowFloatingButtons,
    setShowMenuButtons,
    showFloatingButtons,
    showMenuButtons,
  } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const decks = useSnapshot(deckStore).decks;
  const navigate = useNavigate();
  const { deckid } = useParams();
  const { hash } = useLocation();
  const query = new URLSearchParams(useLocation().search);

  // Redirect from old links
  if (query.get('id') && hash) {
    const url = `/review/${deckid}${hash}`;
    navigate(url);
  }

  const [deckFrom, setDeckFrom] = useImmer();
  const [deckTo, setDeckTo] = useImmer();
  const [error, setError] = useState(false);
  const [foldedDescription, setFoldedDescription] = useState(!isMobile);
  const [urlDiff, setUrlDiff] = useState();

  const getDeck = (deckid) => {
    setError(false);
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
      .then((deckData) => {
        const cardsData = useDeck(
          deckData.cards,
          cryptCardBase,
          libraryCardBase
        );

        if (deckid.length !== 32 || deckData.publicParent) {
          deckData.tags = [];
          Object.values(useTags(deckData.crypt, deckData.library)).map((v) => {
            deckData.tags = deckData.tags.concat(v);
          });
        }

        const d = {
          author: deckData.author,
          crypt: cardsData.crypt,
          deckid: deckData.deckid,
          description: deckData.description,
          isAuthor: deckData.isAuthor,
          isBranches: Boolean(deckData.master || deckData.branches?.length > 0),
          isNonEditable: deckData.isNonEditable,
          isPublic: Boolean(deckData.publicParent),
          library: cardsData.library,
          name: deckData.name,
          publicChild: deckData.publicChild,
          publicParent: deckData.publicParent,
          tags: deckData.tags,
          timestamp: deckData.timestamp,
        };

        setDeckTo(d);
        setDeckFrom(d);
      })
      .catch((error) => {
        if (error.message == 400) {
          setError('NO DECK WITH THIS ID');
        } else {
          setError('CONNECTION PROBLEM');
        }
        setDeckTo(undefined);
        setDeckFrom(undefined);
      });
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
      navigate(`/review/${deckid}#${u}`);
    }
  }, [deckFrom]);

  const cardChange = (_, card, count) => {
    if (count >= 0) {
      const cardSrc = card.Id > 200000 ? 'crypt' : 'library';

      setDeckFrom((draft) => {
        draft[cardSrc][card.Id] = {
          c: card,
          q: count,
        };
      });
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
        setDeckFrom((draft) => {
          draft.crypt = deckWithHash.crypt;
          draft.library = deckWithHash.library;
        });
      }
    }
  }, [deckTo]);

  useEffect(() => {
    if (
      cryptCardBase &&
      libraryCardBase &&
      decks !== undefined &&
      deckid &&
      (deckFrom?.deckid !== deckid || !deckFrom)
    ) {
      if (decks[deckid]) {
        setDeckFrom(decks[deckid]);
      } else if (deckid.includes(':')) {
        if (preconDecks && preconDecks[deckid]) {
          setDeckFrom(preconDecks[deckid]);
        } else {
          setError('NO DECK WITH THIS ID');
        }
      } else {
        getDeck(deckid);
      }
    }
  }, [deckid, decks, preconDecks, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (deckFrom) setError(false);
  }, [deckFrom]);

  const parentId = deckFrom?.description.replace(
    `Review of ${process.env.ROOT_URL}decks/`,
    ''
  );
  const inDecks = decks ? Object.keys(decks).includes(parentId) : null;

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
                          <DeckChangeName deck={deckFrom} />
                        </Col>
                        <Col
                          md={4}
                          className="px-0 ps-md-1 pe-md-0 pt-2 pt-md-0"
                        >
                          <DeckChangeAuthor deck={deckFrom} />
                        </Col>
                      </Row>
                      <Row className="mx-0">
                        <Col className="px-0">
                          <DeckChangeDescription
                            deck={deckFrom}
                            folded={foldedDescription}
                            setFolded={setFoldedDescription}
                          />
                        </Col>
                        {foldedDescription && deckFrom?.tags.length > 0 && (
                          <Col className="ps-2 pe-0">
                            <DeckTags deck={deckFrom} bordered />
                          </Col>
                        )}
                      </Row>
                      {!foldedDescription && deckFrom?.tags.length > 0 && (
                        <div className="d-block pt-2">
                          <DeckTags deck={deckFrom} bordered />
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
              <ReviewButtons
                deck={deckFrom}
                urlDiff={urlDiff}
                parentId={inDecks ? parentId : null}
              />
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
              <ReviewButtons
                backDeckid={deck?.deckid}
                deckid={deckFrom?.deckid}
                urlDiff={urlDiff}
              />
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
