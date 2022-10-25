import React, { useState, useEffect, useMemo } from 'react';
import {
  useNavigate,
  useLocation,
  useParams,
  useLoaderData,
} from 'react-router-dom';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import Shuffle from 'assets/images/icons/shuffle.svg';
import At from 'assets/images/icons/at.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import ChatLeftQuoteFill from 'assets/images/icons/chat-left-quote-fill.svg';
import List from 'assets/images/icons/list.svg';
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
  DeckImport,
} from 'components';
import { useApp } from 'context';
import { useDeckMissing, useTags } from 'hooks';

const Decks = () => {
  const {
    addRecentDeck,
    cryptCardBase,
    deck,
    deckUpdate,
    decks,
    inventoryCrypt,
    inventoryLibrary,
    inventoryMode,
    isMobile,
    libraryCardBase,
    parseDeckCards,
    playtest,
    preconDecks,
    recentDecks,
    setDeck,
    setShowFloatingButtons,
    setShowMenuButtons,
    showFloatingButtons,
    showMenuButtons,
    usedCryptCards,
    usedLibraryCards,
    username,
  } = useApp();

  const navigate = useNavigate();
  const { deckid } = useParams();
  const { hash } = useLocation();
  const query = new URLSearchParams(useLocation().search);

  // Redirect from old links
  if (query.get('id')) navigate(`/decks/${query.get('id')}`);
  if (hash && deckid !== 'deck') {
    const name = query.get('name') ?? '';
    const author = query.get('author') ?? '';
    const description = query.get('description') ?? '';
    const url = `/decks/deck?name=${name}&author=${author}&description=${description}${hash}`;
    navigate(url);
  }

  const [error, setError] = useState(false);
  const [foldedDescription, setFoldedDescription] = useState(!isMobile);
  const [qrUrl, setQrUrl] = useState(false);
  const [selectFrom, setSelectFrom] = useState('precons');
  const [showDeckSelectAdv, setShowDeckSelectAdv] = useState(false);
  const [showDraw, setShowDraw] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const deckData = useLoaderData();

  const getDeck = () => {
    setError(false);
    const cardsData = parseDeckCards(deckData.cards);

    if (deckid.length !== 32 || deckData.publicParent) {
      deckData.tags = [];
      Object.values(useTags(cardsData.crypt, cardsData.library)).map((v) => {
        deckData.tags = deckData.tags.concat(v);
      });
    }

    // TODO Change to avoid deleting deckData.cards
    // delete deckData.cards;
    addRecentDeck(deckData);
    setDeck({
      ...deckData,
      isPublic: Boolean(deckData.publicParent),
      isBranches: Boolean(deckData.master || deckData.branches?.length > 0),
      crypt: cardsData.crypt,
      library: cardsData.library,
      tags: deckData.tags,
    });

    if (error.message == 400) {
      setError('NO DECK WITH THIS ID');
    } else {
      setError('CONNECTION PROBLEM');
    }
  };

  const toggleInventoryState = (id) => {
    if (!deck.inventoryType) {
      deckUpdate(id, 'inventoryType', 's');
    } else if (deck.inventoryType === 's') {
      deckUpdate(id, 'inventoryType', 'h');
    } else if (deck.inventoryType === 'h') {
      deckUpdate(id, 'inventoryType', '');
    }
  };

  const handleSelect = (e) => {
    navigate(`/decks/${e.value.replace(' ', '_')}`);
  };

  const { missingCrypt, missingLibrary } = useDeckMissing(
    deck,
    usedCryptCards,
    usedLibraryCards,
    inventoryCrypt,
    inventoryLibrary
  );

  const allTagsOptions = useMemo(() => {
    const allTags = new Set();

    if (decks) {
      Object.keys(decks).map((id) => {
        if (decks[id].tags) {
          decks[id].tags.map((tag) => {
            allTags.add(tag);
          });
        }
      });
    }

    const options = [...allTags].map((tag) => ({
      label: tag,
      value: tag,
    }));

    return options;
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

      setDeck({
        deckid: 'deck',
        name: query.get('name') ?? '',
        author: query.get('author') ?? '',
        description: query.get('description') ?? '',
        crypt: crypt,
        library: library,
      });
    }
  }, [hash, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (
      cryptCardBase &&
      libraryCardBase &&
      decks !== undefined &&
      deckid &&
      (deck?.deckid !== deckid || !deck)
    ) {
      if (decks[deckid]) {
        setDeck(decks[deckid]);
      } else if (deckid.includes(':')) {
        const deckidFixed = deckid.replace('_', ' ');
        if (preconDecks && preconDecks[deckidFixed]) {
          setDeck(preconDecks[deckidFixed]);
        } else {
          setError('NO DECK WITH THIS ID');
        }
      } else {
        getDeck();
      }
    }
  }, [deckid, decks, preconDecks, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (deckid?.includes(':')) {
      setSelectFrom('precons');
    } else if (decks && decks[deckid]) {
      setSelectFrom('my');
    } else {
      setSelectFrom('recent');
    }
  }, [deckid, decks]);

  useEffect(() => {
    if (deck) {
      setError(false);
      if (!deckid) navigate(`/decks/${deck.deckid}`);
    }
  }, [deck]);

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
                      inventoryMode || !isMobile
                        ? 'd-flex'
                        : 'd-flex justify-content-between'
                    }
                  >
                    <div
                      className={
                        deck?.isBranches && selectFrom == 'my'
                          ? 'w-75'
                          : 'w-100'
                      }
                    >
                      {selectFrom == 'my' && decks ? (
                        <DeckSelectMy
                          handleSelect={handleSelect}
                          deckid={deck?.deckid}
                        />
                      ) : selectFrom == 'recent' ? (
                        <DeckSelectRecent
                          handleSelect={handleSelect}
                          deckid={deck?.deckid}
                        />
                      ) : (
                        <DeckSelectPrecon
                          handleSelect={handleSelect}
                          deckid={deck?.deckid}
                        />
                      )}
                    </div>
                    {selectFrom == 'my' && decks && deck?.isBranches && (
                      <div className="ps-1 w-25">
                        <DeckBranchSelect
                          handleSelect={handleSelect}
                          deck={deck}
                        />
                      </div>
                    )}
                    <div className="d-flex">
                      {inventoryMode && deck?.isAuthor && (
                        <div className="d-flex ps-1">
                          <Button
                            title={`Inventory Type: ${
                              !deck?.inventoryType
                                ? 'VIRTUAL\nDo not use Inventory'
                                : deck?.inventoryType === 's'
                                ? 'FLEXIBLE\nLet cards to be reused with other Flexible Decks'
                                : 'FIXED\nUse unique copies of cards from Inventory'
                            }`}
                            variant="primary"
                            onClick={() => toggleInventoryState(deck?.deckid)}
                          >
                            <div className="d-flex align-items-center">
                              {!deck?.inventoryType && <At />}
                              {deck?.inventoryType === 's' && <Shuffle />}
                              {deck?.inventoryType === 'h' && <PinAngleFill />}
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
                            onClick={() => {
                              setShowFloatingButtons(false);
                              setShowDeckSelectAdv(true);
                            }}
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
                      {isMobile && deck && (
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
              {deck && (showInfo || !isMobile) && (
                <>
                  <Row className="mx-0 pb-sm-2">
                    <Col
                      md={deck.isBranches ? 6 : 8}
                      className="px-0 ps-md-0 pe-md-1"
                    >
                      <DeckChangeName deck={deck} />
                    </Col>
                    {deck.isBranches && (
                      <Col md={2} className={isMobile ? 'px-0 pt-05' : 'px-1'}>
                        <DeckChangeBranchName deck={deck} />
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
                      <DeckChangeAuthor deck={deck} />
                    </Col>
                  </Row>
                  <Row className="mx-0">
                    <Col className={isMobile ? 'px-0 pt-05' : 'px-0'}>
                      <DeckChangeDescription
                        deck={deck}
                        folded={isMobile ? false : foldedDescription}
                        setFolded={setFoldedDescription}
                      />
                    </Col>
                    {foldedDescription &&
                      !isMobile &&
                      (deck.tags?.length > 0 ||
                        deck.isAuthor ||
                        !deck.isPublic) && (
                        <Col className={`ps-2 pe-0 ${isMobile ? 'pt-05' : ''}`}>
                          <DeckTags
                            deck={deck}
                            allTagsOptions={allTagsOptions}
                            bordered
                          />
                        </Col>
                      )}
                  </Row>
                  {(!foldedDescription || isMobile) &&
                    (deck.tags?.length > 0 ||
                      deck.isAuthor ||
                      !deck.isPublic) && (
                      <div className={isMobile ? 'px-0 py-1' : 'd-block pt-2'}>
                        <DeckTags
                          deck={deck}
                          allTagsOptions={allTagsOptions}
                          bordered
                        />
                      </div>
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
          {deck && (
            <Row className="pt-md-2">
              {playtest ||
              !(
                Object.keys(deck.crypt).some((cardid) => cardid > 210000) ||
                Object.keys(deck.library).some((cardid) => cardid > 110000)
              ) ? (
                <>
                  <Col
                    md={7}
                    className="px-0 px-md-2 ps-xl-2 pe-xl-3 pt-3 pt-md-0"
                  >
                    <DeckCrypt deck={deck} />
                  </Col>
                  <Col
                    md={5}
                    className="px-0 px-md-2 ps-xl-3 pe-xl-2 pt-3 pt-md-0"
                  >
                    <DeckLibrary deck={deck} />
                  </Col>
                </>
              ) : (
                <Col className="px-0 py-4 px-lg-2">
                  <div className="d-flex align-items-center justify-content-center error-message p-2">
                    <b>CONTAIN PLAYTEST CARDS</b>
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Col>
        {!isMobile && (
          <Col lg={2} className="hide-on-lt992px px-lg-3">
            <div className="sticky-buttons">
              <DeckButtons
                deck={deck}
                setShowInfo={setShowInfo}
                setShowDraw={setShowDraw}
                setShowRecommendation={setShowRecommendation}
                setQrUrl={setQrUrl}
                missingCrypt={missingCrypt}
                missingLibrary={missingLibrary}
              />
            </div>
          </Col>
        )}
      </Row>
      {!username && !deckid && !hash && (
        <Row className="align-items-center justify-content-center mx-0 vh-70">
          <Col xs={12} md={9} lg={6} xl={5}>
            <div className="d-flex justify-content-center pt-4">
              <h6>Login required to create decks</h6>
            </div>
            <div className="d-flex justify-content-center">
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

      {username && decks && Object.keys(decks).length === 0 && !deck && (
        <Row className="align-items-center justify-content-center p-3 vh-70">
          <Col xs={12} md={8} lg={7} xl={6}>
            <div className="text-align-center blue bold py-2">
              You do not have any decks in your collection yet
            </div>
            <div className="text-align-center blue bold py-2">
              Start by creating new one, import from Lackey / Amaranth / Text or
              browse official preconstructed decks
            </div>
            <div className="d-flex justify-content-center pt-3">
              <DeckImport isOnlyNew={true} />
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
              <DeckButtons
                deck={deck}
                setShowInfo={setShowInfo}
                setShowDraw={setShowDraw}
                setShowRecommendation={setShowRecommendation}
                setQrUrl={setQrUrl}
                missingCrypt={missingCrypt}
                missingLibrary={missingLibrary}
                handleClose={() => {
                  setShowMenuButtons(false);
                  setShowFloatingButtons(true);
                }}
              />
            </Container>
          </Modal.Body>
        </Modal>
      )}
      {showDeckSelectAdv && (
        <DeckSelectAdvModal
          handleClose={() => {
            setShowDeckSelectAdv(false);
            setShowFloatingButtons(true);
          }}
          show={showDeckSelectAdv}
          allTagsOptions={allTagsOptions}
        />
      )}
      {showDraw && <DeckDraw setShow={setShowDraw} deck={deck} />}
      {showRecommendation && (
        <DeckRecommendation deck={deck} setShow={setShowRecommendation} />
      )}
      {qrUrl && <DeckQrModal qrUrl={qrUrl} setQrUrl={setQrUrl} deck={deck} />}
    </Container>
  );
};

export default Decks;

export async function fetchDeck({ params }) {
  if (!params.deckid.includes(':')) {
    const url = `${process.env.API_URL}deck/${params.deckid}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    const response = await fetch(url, options);
    return response.json();
  } else {
    return null;
  }
}
