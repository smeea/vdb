import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import Shuffle from '../assets/images/icons/shuffle.svg';
import At from '../assets/images/icons/at.svg';
import PinAngleFill from '../assets/images/icons/pin-angle-fill.svg';
import ChatLeftQuoteFill from '../assets/images/icons/chat-left-quote-fill.svg';
import List from '../assets/images/icons/list.svg';
import X from '../assets/images/icons/x.svg';
import BinocularsFill from '../assets/images/icons/binoculars-fill.svg';
import AccountLogin from './components/AccountLogin.jsx';
import AccountRegister from './components/AccountRegister.jsx';
import DeckSelectMy from './components/DeckSelectMy.jsx';
import DeckSelectRecent from './components/DeckSelectRecent.jsx';
import DeckSelectPrecon from './components/DeckSelectPrecon.jsx';
import DeckSelectAdvModal from './components/DeckSelectAdvModal.jsx';
import DeckTags from './components/DeckTags.jsx';
import DeckDraw from './components/DeckDraw.jsx';
import DeckButtons from './components/DeckButtons.jsx';
import DeckBranchSelect from './components/DeckBranchSelect.jsx';
import DeckCrypt from './components/DeckCrypt.jsx';
import DeckLibrary from './components/DeckLibrary.jsx';
import DeckChangeName from './components/DeckChangeName.jsx';
import DeckChangeBranchName from './components/DeckChangeBranchName.jsx';
import DeckChangeAuthor from './components/DeckChangeAuthor.jsx';
import DeckChangeDescription from './components/DeckChangeDescription.jsx';
import AppContext from '../context/AppContext';

function Decks(props) {
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
  } = useContext(AppContext);

  const query = new URLSearchParams(useLocation().search);
  const [showDraw, setShowDraw] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showDeckSelectAdv, setShowDeckSelectAdv] = useState(false);
  const [showMenuButtons, setShowMenuButtons] = useState(false);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [selectFrom, setSelectFrom] = useState('precons');
  const [deckError, setDeckError] = useState(false);
  const [foldedDescription, setFoldedDescription] = useState(
    isMobile ? false : true
  );
  const [allTagsOptions, setAllTagsOptions] = useState(undefined);

  const handleShowButtons = (state) => {
    setShowMenuButtons(state);
    setShowFloatingButtons(!state);
  };

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

  let missingCrypt;
  let missingLibrary;
  if (deckRouter(activeDeck)) {
    missingCrypt = getMissingCrypt(deckRouter(activeDeck));
    missingLibrary = getMissingLibrary(deckRouter(activeDeck));
  }

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
          Object.keys(data.crypt).map((i) => {
            data.crypt[i].c = cryptCardBase[i];
          });
          Object.keys(data.library).map((i) => {
            data.library[i].c = libraryCardBase[i];
          });
          addRecentDeck(data);
          setSharedDeck({ [data.deckid]: data });
        }
      })
      .catch((error) => setDeckError(true));
  };

  const toggleInventoryState = () => {
    const inventoryType = decks[activeDeck.deckid].inventory_type;
    if (!inventoryType) {
      deckUpdate(activeDeck.deckid, 'makeFlexible', 'all');
    } else if (inventoryType == 's') {
      deckUpdate(activeDeck.deckid, 'makeFixed', 'all');
    } else if (inventoryType == 'h') {
      deckUpdate(activeDeck.deckid, 'makeClear', 'all');
    }
  };

  let isAuthor;
  let isBranches;
  if (deckRouter(activeDeck)) {
    isAuthor = username == deckRouter(activeDeck).owner && username;
    isBranches =
      deckRouter(activeDeck).master ||
      (deckRouter(activeDeck).branches &&
        deckRouter(activeDeck).branches.length > 0);
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
    } else {
      setSelectFrom('recent');
    }

    if (decks && decks[activeDeck.deckid] && activeDeck.src != 'my') {
      setActiveDeck({ src: 'my', deckid: activeDeck.deckid });
    }

    if (deckRouter(activeDeck)) setDeckError(false);
  }, [activeDeck, decks]);

  return (
    <Container className={isMobile ? 'deck-container' : 'deck-container py-3'}>
      <Row className="mx-0">
        <Col xl={1} className="hide-narrow"></Col>
        <Col md={10} xl={9} className="px-0 px-lg-1 px-xl-3">
          <Row className="px-1 pt-1 pb-0 pb-lg-2 px-lg-0 pt-lg-0">
            <Col md={5} className="px-0 px-lg-3">
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
                        <DeckSelectMy activeDeck={activeDeck} />
                      ) : selectFrom == 'recent' ? (
                        <DeckSelectRecent activeDeck={activeDeck} />
                      ) : (
                        selectFrom == 'precons' && (
                          <DeckSelectPrecon activeDeck={activeDeck} />
                        )
                      )}
                    </div>
                    {selectFrom == 'my' && decks && isBranches && (
                      <div className="ps-1 w-25">
                        <DeckBranchSelect activeDeck={activeDeck} />
                      </div>
                    )}
                    <div className="d-flex">
                      {inventoryMode && isAuthor && deckRouter(activeDeck) && (
                        <div className="d-flex ps-1">
                          <Button
                            title={`Inventory Type: ${
                              !deckRouter(activeDeck).inventory_type
                                ? 'VIRTUAL\nDo not use Inventory'
                                : deckRouter(activeDeck).inventory_type == 's'
                                ? 'FLEXIBLE\nLet cards to be reused with other Flexible Decks'
                                : 'FIXED\nUse unique copies of cards from Inventory'
                            }`}
                            variant="primary"
                            onClick={() => toggleInventoryState()}
                          >
                            <div className="d-flex align-items-center">
                              {!deckRouter(activeDeck).inventory_type && <At />}
                              {deckRouter(activeDeck).inventory_type == 's' && (
                                <Shuffle />
                              )}
                              {deckRouter(activeDeck).inventory_type == 'h' && (
                                <PinAngleFill />
                              )}
                            </div>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center pt-1">
                    <Form className="py-1 my-0 px-1">
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
                            <BinocularsFill />
                          </Button>
                        </div>
                      )}
                      {isMobile && deckRouter(activeDeck) && (
                        <div className="d-flex ps-1 py-1">
                          <Button
                            variant="primary"
                            onClick={() => setShowInfo(!showInfo)}
                          >
                            <ChatLeftQuoteFill />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={7} className="px-0 px-lg-3">
              {((showInfo && deckRouter(activeDeck)) ||
                (!isMobile && deckRouter(activeDeck))) && (
                <>
                  <Row className={isMobile ? 'mx-0' : 'mx-0 pb-2'}>
                    <Col
                      md={isBranches ? 6 : 8}
                      className={isMobile ? 'px-0' : 'ps-0 pe-1'}
                    >
                      <DeckChangeName
                        name={deckRouter(activeDeck).name}
                        deckid={activeDeck.deckid}
                        isAuthor={isAuthor}
                      />
                    </Col>
                    {isBranches && (
                      <Col md={2} className={isMobile ? 'px-0 pt-05' : 'px-1'}>
                        <DeckChangeBranchName
                          branchName={deckRouter(activeDeck).branchName}
                          deckid={activeDeck.deckid}
                          isAuthor={isAuthor}
                        />
                      </Col>
                    )}
                    <Col
                      md={4}
                      className={isMobile ? 'px-0 pt-05' : 'ps-1 pe-0'}
                    >
                      <DeckChangeAuthor
                        author={deckRouter(activeDeck).author}
                        deckid={activeDeck.deckid}
                        isAuthor={isAuthor}
                      />
                    </Col>
                  </Row>
                  <Row className="mx-0">
                    <Col className={isMobile ? 'px-0 pt-05' : 'px-0'}>
                      <DeckChangeDescription
                        description={deckRouter(activeDeck).description}
                        deckid={activeDeck.deckid}
                        isAuthor={isAuthor}
                        folded={foldedDescription}
                        setFolded={setFoldedDescription}
                      />
                    </Col>
                    {foldedDescription &&
                      (deckRouter(activeDeck).tags || isAuthor) && (
                        <Col className="ps-2 pe-0">
                          <DeckTags
                            allTagsOptions={allTagsOptions}
                            deck={deckRouter(activeDeck)}
                            bordered={true}
                            isAuthor={isAuthor}
                          />
                        </Col>
                      )}
                  </Row>
                  {!foldedDescription &&
                    (deckRouter(activeDeck).tags || isAuthor) && (
                      <div className={isMobile ? 'px-0 py-1' : 'd-block pt-2'}>
                        <DeckTags
                          allTagsOptions={allTagsOptions}
                          deck={deckRouter(activeDeck)}
                          bordered={true}
                        />
                      </div>
                    )}
                </>
              )}
            </Col>
          </Row>
          {deckError && (
            <Row>
              <Col className="px-0 px-lg-3">
                <div className="d-flex align-items-center justify-content-center error-message p-2">
                  <b>NO DECK WITH THIS ID, MAYBE IT WAS REMOVED BY AUTHOR</b>
                </div>
              </Col>
            </Row>
          )}
          {deckRouter(activeDeck) && (
            <Row>
              <Col md={7} className="px-0 ps-md-3 pe-md-2 px-lg-3 pt-lg-4">
                <div className={isMobile ? null : 'sticky'}>
                  <DeckCrypt
                    deckid={activeDeck.deckid}
                    cards={deckRouter(activeDeck).crypt}
                    isAuthor={isAuthor}
                    showFloatingButtons={showFloatingButtons}
                    setShowFloatingButtons={setShowFloatingButtons}
                  />
                </div>
              </Col>
              <Col md={5} className="pt-4 pt-lg-0 px-0 ps-md-2 pe-md-3 px-lg-3">
                <DeckLibrary
                  inDeckTab={true}
                  deckid={activeDeck.deckid}
                  cards={deckRouter(activeDeck).library}
                  isAuthor={isAuthor}
                  showFloatingButtons={showFloatingButtons}
                  setShowFloatingButtons={setShowFloatingButtons}
                />
              </Col>
            </Row>
          )}
        </Col>
        {!isMobile && (
          <Col md={2} className="px-0 px-lg-2 px-xl-3">
            <div className="sticky">
              <DeckButtons
                isAuthor={isAuthor}
                deck={deckRouter(activeDeck)}
                activeDeck={activeDeck}
                setShowInfo={setShowInfo}
                setShowDraw={setShowDraw}
                setShowButtons={handleShowButtons}
                missingCrypt={missingCrypt}
                missingLibrary={missingLibrary}
              />
            </div>
          </Col>
        )}
      </Row>
      {username === '' && !activeDeck.deckid && (
        <Row className="h-50 align-items-center justify-content-center px-2">
          <Col xs={12} md={5} className="px-0">
            <div className="d-flex justify-content-center pt-4 pb-2">
              <h6>Login required to create your decks.</h6>
            </div>
            <div className="d-flex justify-content-center pb-3">
              <h6>
                (you can browse official preconstructed decks without login)
              </h6>
            </div>
            <div className="py-2">
              <AccountLogin />
            </div>
            <div className="py-2">
              <AccountRegister />
            </div>
          </Col>
        </Row>
      )}

      {username &&
        decks &&
        Object.keys(decks).length == 0 &&
        !activeDeck.deckid && (
          <Row className="h-50 align-items-center justify-content-center px-2">
            <Col xs={12} md={5}>
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

      {isMobile && showFloatingButtons && (
        <>
          <div
            onClick={() => {
              setShowMenuButtons(true);
              setShowFloatingButtons(false);
            }}
            className="d-flex float-right-bottom float-menu align-items-center justify-content-center"
          >
            <List viewBox="0 0 16 16" />
          </div>
        </>
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
        >
          <Modal.Header
            className={isMobile ? 'py-0 ps-2 pe-3' : 'pt-3 pb-1 px-4'}
          ></Modal.Header>
          <Modal.Body className="p-1">
            <Container className="px-0" fluid>
              <div className="d-flex justify-content-end">
                <Button
                  variant="outline-secondary"
                  onClick={props.handleCancel}
                >
                  <X width="32" height="32" viewBox="0 0 16 16" />
                </Button>
              </div>
              <DeckButtons
                isAuthor={isAuthor}
                deck={deckRouter(activeDeck)}
                activeDeck={activeDeck}
                setShowInfo={setShowInfo}
                setShowDraw={setShowDraw}
                setShowButtons={handleShowButtons}
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
        <DeckDraw
          setShow={setShowDraw}
          deck={deckRouter(activeDeck)}
          setShowFloatingButtons={setShowFloatingButtons}
        />
      )}
    </Container>
  );
}

export default Decks;
