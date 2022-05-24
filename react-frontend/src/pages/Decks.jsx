import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import Shuffle from 'assets/images/icons/shuffle.svg';
import At from 'assets/images/icons/at.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import ChatLeftQuoteFill from 'assets/images/icons/chat-left-quote-fill.svg';
import List from 'assets/images/icons/list.svg';
import X from 'assets/images/icons/x.svg';
import BinocularsFill from 'assets/images/icons/binoculars-fill.svg';
import {
  AccountLogin,
  AccountRegister,
  DeckSelectMy,
  DeckSelectRecent,
  DeckSelectPrecon,
  DeckSelectAdvModal,
  DeckQrModal,
  DeckTags,
  DeckDraw,
  DeckButtons,
  DeckBranchSelect,
  DeckCrypt,
  DeckLibrary,
  DeckRecommendation,
  DeckChangeName,
  DeckChangeBranchName,
  DeckChangeAuthor,
  DeckChangeDescription,
} from 'components';
import { useApp } from 'context';

const Decks = (props) => {
  const {
    deckUpdate,
    deckRouter,
    activeDeck,
    setActiveDeck,
    decks,
    sharedDeck,
    setSharedDeck,
    recentDecks,
    addRecentDeck,
    inventoryCrypt,
    inventoryLibrary,
    usedCryptCards,
    usedLibraryCards,
    cryptCardBase,
    libraryCardBase,
    inventoryMode,
    username,
    isMobile,
    showFloatingButtons,
    setShowFloatingButtons,
    showMenuButtons,
    setShowMenuButtons,
  } = useApp();

  const query = new URLSearchParams(useLocation().search);
  const [showDraw, setShowDraw] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showDeckSelectAdv, setShowDeckSelectAdv] = useState(false);
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [selectFrom, setSelectFrom] = useState('precons');
  const [deckError, setDeckError] = useState(false);
  const [foldedDescription, setFoldedDescription] = useState(!isMobile);
  const [allTagsOptions, setAllTagsOptions] = useState(undefined);

  const getMissingCrypt = (deck) => {
    const crypt = {};

    Object.keys(deck.crypt).map((card) => {
      let softUsedMax = 0;
      if (usedCryptCards.soft[card]) {
        Object.keys(usedCryptCards.soft[card]).map((id) => {
          if (softUsedMax < usedCryptCards.soft[card][id]) {
            softUsedMax = usedCryptCards.soft[card][id];
          }
        });
      }
      let hardUsedTotal = 0;
      if (usedCryptCards.hard[card]) {
        Object.keys(usedCryptCards.hard[card]).map((id) => {
          hardUsedTotal += usedCryptCards.hard[card][id];
        });
      }

      let miss = softUsedMax + hardUsedTotal;
      if (!deck.inventory_type && deck.crypt[card].q > softUsedMax)
        miss += deck.crypt[card].q - softUsedMax;
      if (inventoryCrypt[card]) miss -= inventoryCrypt[card].q;

      if (miss > 0) {
        crypt[card] = { ...deck.crypt[card] };
        crypt[card].q = miss > deck.crypt[card].q ? deck.crypt[card].q : miss;
      }
    });

    return crypt;
  };

  const getMissingLibrary = (deck) => {
    const library = {};

    Object.keys(deck.library).map((card) => {
      let softUsedMax = 0;
      if (usedLibraryCards.soft[card]) {
        Object.keys(usedLibraryCards.soft[card]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card][id]) {
            softUsedMax = usedLibraryCards.soft[card][id];
          }
        });
      }
      let hardUsedTotal = 0;
      if (usedLibraryCards.hard[card]) {
        Object.keys(usedLibraryCards.hard[card]).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card][id];
        });
      }

      let miss = softUsedMax + hardUsedTotal;
      if (!deck.inventory_type && deck.library[card].q > softUsedMax)
        miss += deck.library[card].q - softUsedMax;
      if (inventoryLibrary[card]) miss -= inventoryLibrary[card].q;

      if (miss > 0) {
        library[card] = { ...deck.library[card] };
        library[card].q =
          miss > deck.library[card].q ? deck.library[card].q : miss;
      }
    });

    return library;
  };

  const getDeck = (deckid) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          data.crypt = {};
          data.library = {};

          Object.keys(data.cards).map((i) => {
            if (i > 200000) {
              data.crypt[i] = {
                q: data.cards[i],
                c: cryptCardBase[i],
              };
            } else {
              data.library[i] = {
                q: data.cards[i],
                c: libraryCardBase[i],
              };
            }
          });

          delete data.cards;
          addRecentDeck(data);
          setSharedDeck({ [data.deckid]: data });
        }
      })
      .catch((error) => setDeckError(true));
  };

  const toggleInventoryState = (deckid) => {
    if (!inventoryType) {
      deckUpdate(deckid, 'inventory_type', 's');
    } else if (inventoryType === 's') {
      deckUpdate(deckid, 'inventory_type', 'h');
    } else if (inventoryType === 'h') {
      deckUpdate(deckid, 'inventory_type', '');
    }
  };

  let isPublic;
  let isAuthor;
  let isBranches;
  let isFrozen;
  let inventoryType;
  let missingCrypt;
  let missingLibrary;

  if (deckRouter(activeDeck)) {
    missingCrypt = getMissingCrypt(deckRouter(activeDeck));
    missingLibrary = getMissingLibrary(deckRouter(activeDeck));
    isPublic = Boolean(deckRouter(activeDeck).public_parent);
    isAuthor = deckRouter(activeDeck).is_yours;
    isFrozen = deckRouter(activeDeck).frozen;
    isBranches =
      deckRouter(activeDeck).master ||
      (deckRouter(activeDeck).branches &&
        deckRouter(activeDeck).branches.length > 0);
    inventoryType = deckRouter(activeDeck).inventory_type;
  }

  useEffect(() => {
    const allTags = new Set();

    if (decks) {
      Object.keys(decks).map((deckid) => {
        if (decks[deckid].tags) {
          decks[deckid].tags.map((tag) => {
            allTags.add(tag);
          });
        }
      });
    }

    const options = [...allTags].map((tag) => ({
      label: tag,
      value: tag,
    }));

    setAllTagsOptions(options);
  }, [decks]);

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

      setSharedDeck({ deckInUrl: deck });
      setActiveDeck({ src: 'shared', deckid: 'deckInUrl' });
    }
  }, [hash, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (
      !activeDeck.deckid &&
      query.get('id') &&
      cryptCardBase &&
      libraryCardBase
    ) {
      if (query.get('id').length === 32) {
        setActiveDeck({ src: 'shared', deckid: query.get('id') });
        getDeck(query.get('id'));
      } else if (query.get('id').includes(':')) {
        setActiveDeck({ src: 'precons', deckid: query.get('id') });
      } else {
        setActiveDeck({ src: 'twd', deckid: query.get('id') });
        getDeck(query.get('id'));
      }
    }

    if (
      activeDeck.deckid &&
      activeDeck.deckid != query.get('id') &&
      activeDeck.deckid != 'deckInUrl'
    )
      navigate(`/decks?id=${activeDeck.deckid}`);

    if (
      cryptCardBase &&
      libraryCardBase &&
      (activeDeck.src === 'twd' || activeDeck.src === 'shared') &&
      !(sharedDeck && sharedDeck[activeDeck.deckid])
    ) {
      getDeck(activeDeck.deckid);
    }
  }, [query, activeDeck, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (activeDeck.src == 'my' || activeDeck.src == 'precons') {
      setSelectFrom(activeDeck.src);
    } else if (recentDecks.length) {
      setSelectFrom('recent');
    } else {
      setSelectFrom('precons');
    }

    if (decks && decks[activeDeck.deckid] && activeDeck.src != 'my') {
      setActiveDeck({ src: 'my', deckid: activeDeck.deckid });
    }

    if (deckRouter(activeDeck)) {
      setDeckError(false);
    }
  }, [activeDeck, decks]);

  return (
    <Container className="deck-container px-0 px-md-2 px-xl-4 py-md-3">
      <Row className="mx-0">
        <Col xl={1}></Col>
        <Col sm={12} lg={10} xl={9} className="px-md-2 px-xl-3">
          <Row className="px-1 px-md-0 py-1 pb-0 pt-md-0">
            <Col md={5} className="px-0 px-md-2">
              <Row className="align-items-center justify-content-end mx-0">
                <Col className="px-0">
                  <div
                    className={
                      inventoryMode
                        ? 'd-flex'
                        : isMobile
                        ? 'd-flex justify-content-between'
                        : 'd-flex'
                    }
                  >
                    <div
                      className={
                        isBranches && selectFrom == 'my' ? 'w-75' : 'w-100'
                      }
                    >
                      {selectFrom == 'my' && decks ? (
                        <DeckSelectMy deckid={activeDeck.deckid} />
                      ) : selectFrom == 'recent' ? (
                        <DeckSelectRecent deckid={activeDeck.deckid} />
                      ) : (
                        <DeckSelectPrecon deckid={activeDeck.deckid} />
                      )}
                    </div>
                    {selectFrom == 'my' && decks && isBranches && (
                      <div className="ps-1 w-25">
                        <DeckBranchSelect deckid={activeDeck.deckid} />
                      </div>
                    )}
                    <div className="d-flex">
                      {inventoryMode && isAuthor && deckRouter(activeDeck) && (
                        <div className="d-flex ps-1">
                          <Button
                            title={`Inventory Type: ${
                              !inventoryType
                                ? 'VIRTUAL\nDo not use Inventory'
                                : inventoryType === 's'
                                ? 'FLEXIBLE\nLet cards to be reused with other Flexible Decks'
                                : 'FIXED\nUse unique copies of cards from Inventory'
                            }`}
                            variant="primary"
                            onClick={() =>
                              toggleInventoryState(activeDeck.deckid)
                            }
                          >
                            <div className="d-flex align-items-center">
                              {!inventoryType && <At />}
                              {inventoryType === 's' && <Shuffle />}
                              {inventoryType === 'h' && <PinAngleFill />}
                            </div>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-top pt-1">
                    <Form className="pt-1 my-0 ps-1">
                      {username && decks && Object.keys(decks).length > 0 && (
                        <Form.Check
                          checked={selectFrom == 'my'}
                          onChange={(e) => setSelectFrom(e.target.id)}
                          type="radio"
                          id="my"
                          label={
                            <div className="blue">
                              <b>{isMobile ? 'My' : 'My Decks'}</b>
                            </div>
                          }
                          inline
                        />
                      )}
                      <Form.Check
                        checked={selectFrom == 'precons'}
                        onChange={(e) => setSelectFrom(e.target.id)}
                        type="radio"
                        id="precons"
                        label={
                          <div className="blue">
                            <b>Precons</b>
                          </div>
                        }
                        inline
                      />
                      {recentDecks.length > 0 && (
                        <Form.Check
                          checked={selectFrom == 'recent'}
                          onChange={(e) => setSelectFrom(e.target.id)}
                          type="radio"
                          id="recent"
                          label={
                            <div className="blue">
                              <b>Recent</b>
                            </div>
                          }
                          inline
                        />
                      )}
                    </Form>
                    <div className="d-flex">
                      {decks && (
                        <div className="py-1">
                          <Button
                            title="Advanced Deck Select"
                            variant="primary"
                            onClick={() =>
                              setShowDeckSelectAdv(!showDeckSelectAdv)
                            }
                          >
                            <div className="d-flex">
                              <BinocularsFill
                                width="16"
                                height="22"
                                viewBox="0 0 16 18"
                              />
                            </div>
                          </Button>
                        </div>
                      )}
                      {isMobile && deckRouter(activeDeck) && (
                        <div className="ps-1 py-1">
                          <Button
                            variant="primary"
                            onClick={() => setShowInfo(!showInfo)}
                          >
                            <div className="d-flex pt-1">
                              <ChatLeftQuoteFill
                                width="16"
                                height="18"
                                viewBox="0 0 16 18"
                              />
                            </div>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={7} className="px-0 px-md-2">
              {((showInfo && deckRouter(activeDeck)) ||
                (!isMobile && deckRouter(activeDeck))) && (
                <>
                  <Row className="mx-0 pb-sm-2">
                    <Col
                      md={isBranches ? 6 : 8}
                      className="px-0 ps-md-0 pe-md-1"
                    >
                      <DeckChangeName
                        deck={deckRouter(activeDeck)}
                        isAuthor={isAuthor}
                        isPublic={isPublic}
                        isFrozen={isFrozen}
                      />
                    </Col>
                    {isBranches && (
                      <Col md={2} className={isMobile ? 'px-0 pt-05' : 'px-1'}>
                        <DeckChangeBranchName
                          branchName={deckRouter(activeDeck).branchName}
                          deckid={activeDeck.deckid}
                          isAuthor={isAuthor}
                          isPublic={isPublic}
                        />
                      </Col>
                    )}
                    <Col
                      md={4}
                      className={
                        isMobile
                          ? 'px-0 pt-05'
                          : 'px-0 ps-md-1 pe-md-0 pt-2 pt-md-0'
                      }
                    >
                      <DeckChangeAuthor
                        author={deckRouter(activeDeck).author}
                        deckid={activeDeck.deckid}
                        isAuthor={isAuthor}
                        isPublic={isPublic}
                      />
                    </Col>
                  </Row>
                  <Row className="mx-0">
                    <Col className={isMobile ? 'px-0 pt-05' : 'px-0'}>
                      <DeckChangeDescription
                        description={deckRouter(activeDeck).description}
                        deckid={activeDeck.deckid}
                        isAuthor={isAuthor}
                        isPublic={isPublic}
                        folded={foldedDescription}
                        setFolded={setFoldedDescription}
                      />
                    </Col>
                    {foldedDescription &&
                      !isMobile &&
                      (deckRouter(activeDeck).tags || isAuthor) && (
                        <Col className={`ps-2 pe-0 ${isMobile ? 'pt-05' : ''}`}>
                          <DeckTags
                            allTagsOptions={allTagsOptions}
                            deck={deckRouter(activeDeck)}
                            bordered={true}
                            isAuthor={isAuthor}
                            isPublic={isPublic}
                          />
                        </Col>
                      )}
                  </Row>
                  {(!foldedDescription || isMobile) &&
                    (deckRouter(activeDeck).tags || isAuthor) && (
                      <div className={isMobile ? 'px-0 py-1' : 'd-block pt-2'}>
                        <DeckTags
                          allTagsOptions={allTagsOptions}
                          deck={deckRouter(activeDeck)}
                          bordered={true}
                          isAuthor={isAuthor}
                          isPublic={isPublic}
                        />
                      </div>
                    )}
                </>
              )}
            </Col>
          </Row>
          {deckError && (
            <Row>
              <Col className="px-0 py-4 px-lg-2">
                <div className="d-flex align-items-center justify-content-center error-message p-2">
                  <b>NO DECK WITH THIS ID, MAYBE IT WAS REMOVED BY AUTHOR</b>
                </div>
              </Col>
            </Row>
          )}
          {deckRouter(activeDeck) && (
            <Row className="pt-md-2">
              <Col md={7} className="px-0 px-md-2 ps-xl-2 pe-xl-3 pt-3 pt-md-0">
                <DeckCrypt
                  deckid={activeDeck.deckid}
                  cards={deckRouter(activeDeck).crypt}
                  isAuthor={isAuthor && !isFrozen}
                  isPublic={isPublic}
                />
              </Col>
              <Col md={5} className="px-0 px-md-2 ps-xl-3 pe-xl-2 pt-3 pt-md-0">
                <DeckLibrary
                  inDeckTab={true}
                  deckid={activeDeck.deckid}
                  cards={deckRouter(activeDeck).library}
                  isAuthor={isAuthor && !isFrozen}
                  isPublic={isPublic}
                />
              </Col>
            </Row>
          )}
        </Col>
        {!isMobile && (
          <Col lg={2} className="hide-on-lt992px px-lg-3">
            <div className="sticky-buttons">
              <DeckButtons
                isAuthor={isAuthor}
                isPublic={isPublic}
                isBranches={isBranches}
                deck={deckRouter(activeDeck)}
                src={activeDeck.src}
                setShowInfo={setShowInfo}
                setShowDraw={setShowDraw}
                setShowRecommendation={setShowRecommendation}
                setShowQr={setShowQr}
                missingCrypt={missingCrypt}
                missingLibrary={missingLibrary}
              />
            </div>
          </Col>
        )}
      </Row>

      {!username && !query.get('id') && !hash && (
        <Row className="align-items-center justify-content-center p-3 vh-60">
          <Col xs={12} md={9} lg={6} xl={5}>
            <div className="d-flex justify-content-center pb-0">
              <h6>Login required to create decks</h6>
            </div>
            <div className="d-flex justify-content-center pb-3">
              <h6 className="small">
                (You can browse preconstructed decks without login)
              </h6>
            </div>
            <div className="py-4">
              <AccountLogin />
            </div>
            <div className="py-4">
              <AccountRegister />
            </div>
          </Col>
        </Row>
      )}

      {username &&
        decks &&
        Object.keys(decks).length == 0 &&
        !activeDeck.deckid && (
          <Row className="align-items-center justify-content-center p-3 vh-60">
            <Col xs={12} md={9} lg={8} xl={7}>
              <div className="text-align-center blue bold py-2">
                You do not have any decks in your collection yet
              </div>
              <div className="text-align-center blue bold py-2">
                Start by creating new one or import from Lackey/Amaranth
              </div>
              <div className="text-align-center blue bold py-2">
                Or browse official preconstructed decks or Tournament Winning
                Decks (TWD)
              </div>
            </Col>
          </Row>
        )}

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
              <DeckButtons
                isAuthor={isAuthor}
                isPublic={isPublic}
                isBranches={isBranches}
                deck={deckRouter(activeDeck)}
                src={activeDeck.src}
                setShowInfo={setShowInfo}
                setShowDraw={setShowDraw}
                setShowRecommendation={setShowRecommendation}
                setShowQr={setShowQr}
                missingCrypt={missingCrypt}
                missingLibrary={missingLibrary}
              />
            </Container>
          </Modal.Body>
        </Modal>
      )}
      {showDeckSelectAdv && (
        <DeckSelectAdvModal
          handleClose={() => setShowDeckSelectAdv(false)}
          show={showDeckSelectAdv}
          allTagsOptions={allTagsOptions}
        />
      )}
      {showDraw && (
        <DeckDraw setShow={setShowDraw} deck={deckRouter(activeDeck)} />
      )}
      {showRecommendation && (
        <DeckRecommendation
          isAuthor={isAuthor}
          deck={deckRouter(activeDeck)}
          setShow={setShowRecommendation}
        />
      )}
      {showQr && (
        <DeckQrModal
          show={showQr}
          setShow={setShowQr}
          deck={deckRouter(activeDeck)}
        />
      )}
    </Container>
  );
};

export default Decks;
