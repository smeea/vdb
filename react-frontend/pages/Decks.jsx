import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import Shuffle from '../assets/images/icons/shuffle.svg';
import At from '../assets/images/icons/at.svg';
import PinAngleFill from '../assets/images/icons/pin-angle-fill.svg';
import InfoCircle from '../assets/images/icons/info-circle.svg';
import List from '../assets/images/icons/list.svg';
import X from '../assets/images/icons/x.svg';
import ArchiveFill from '../assets/images/icons/archive-fill.svg';
import AccountLogin from './components/AccountLogin.jsx';
import AccountRegister from './components/AccountRegister.jsx';
import DeckSelectMy from './components/DeckSelectMy.jsx';
import DeckSelectPrecon from './components/DeckSelectPrecon.jsx';
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
    inventoryCrypt,
    inventoryLibrary,
    usedCryptCards,
    usedLibraryCards,
    cryptCardBase,
    libraryCardBase,
    inventoryMode,
    setInventoryMode,
    username,
    isMobile,
  } = useContext(AppContext);

  const query = new URLSearchParams(useLocation().search);
  const [showInfo, setShowInfo] = useState(false);
  const [showMenuButtons, setShowMenuButtons] = useState(false);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const { hash } = useLocation();
  const history = useHistory();
  const [selectFrom, setSelectFrom] = useState('precons');
  const [deckError, setDeckError] = useState(false);

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
  if (props.deckRouter(props.activeDeck)) {
    missingCrypt = getMissingCrypt(props.deckRouter(props.activeDeck));
    missingLibrary = getMissingLibrary(props.deckRouter(props.activeDeck));
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
          Object.keys(data).map((i) => {
            Object.keys(data[i].crypt).map((j) => {
              data[i].crypt[j].c = cryptCardBase[j];
            });
            Object.keys(data[i].library).map((j) => {
              data[i].library[j].c = libraryCardBase[j];
            });
          });
          props.setSharedDeck(data);
        }
      })
      .catch((error) => setDeckError(true));
  };

  const deckUpdate = (deckid, field, value) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [field]: value }),
    };

    fetch(url, options).then(() => props.getDecks());
  };

  const toggleInventoryState = () => {
    const inventoryType = props.decks[props.activeDeck.deckid].inventory_type;
    if (!inventoryType) {
      deckUpdate(props.activeDeck.deckid, 'makeFlexible', 'all');
    } else if (inventoryType == 's') {
      deckUpdate(props.activeDeck.deckid, 'makeFixed', 'all');
    } else if (inventoryType == 'h') {
      deckUpdate(props.activeDeck.deckid, 'makeClear', 'all');
    }
  };

  let isAuthor;
  if (props.deckRouter(props.activeDeck)) {
    isAuthor = username == props.deckRouter(props.activeDeck).owner && username;
  }

  let isBranches;
  if (props.deckRouter(props.activeDeck)) {
    isBranches =
      props.deckRouter(props.activeDeck).master ||
      (props.deckRouter(props.activeDeck).branches &&
        props.deckRouter(props.activeDeck).branches.length > 0);
  }

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

      props.setSharedDeck({ deckInUrl: deck });
      props.setActiveDeck({ src: 'shared', deckid: 'deckInUrl' });
    }
  }, [hash, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (
      !props.activeDeck.deckid &&
      query.get('id') &&
      cryptCardBase &&
      libraryCardBase
    ) {
      if (query.get('id').length == 32) {
        props.setActiveDeck({ src: 'shared', deckid: query.get('id') });
        getDeck(query.get('id'));
      } else if (query.get('id').includes(':')) {
        props.setActiveDeck({ src: 'precons', deckid: query.get('id') });
      } else {
        props.setActiveDeck({ src: 'twd', deckid: query.get('id') });
      }
    }

    if (
      props.activeDeck.deckid &&
      props.activeDeck.deckid != query.get('id') &&
      props.activeDeck.deckid != 'deckInUrl'
    )
      history.push(`/decks?id=${props.activeDeck.deckid}`);

    if (
      props.activeDeck.src == 'twd' &&
      !(props.sharedDeck && props.sharedDeck[props.activeDeck.deckid])
    ) {
      cryptCardBase && libraryCardBase && getDeck(props.activeDeck.deckid);
    }
  }, [query, props.activeDeck, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (props.activeDeck.src == 'my' || props.activeDeck.src == 'precons')
      setSelectFrom(props.activeDeck.src);

    if (
      props.decks &&
      props.decks[props.activeDeck.deckid] &&
      props.activeDeck.src != 'my'
    ) {
      props.setActiveDeck({ src: 'my', deckid: props.activeDeck.deckid });
    }

    if (props.deckRouter(props.activeDeck)) setDeckError(false);
  }, [props.activeDeck, props.decks]);

  return (
    <Container className={isMobile ? 'deck-container' : 'deck-container py-4'}>
      <Row className="mx-0">
        <Col lg={1}></Col>
        <Col lg={9} className="px-0 px-lg-3">
          <Row className="px-1 px-lg-0 pt-1 pt-lg-0 pb-2 pb-lg-4">
            <Col lg={5} className="px-0 px-lg-3">
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
                    <div className={isBranches ? 'w-75' : 'w-100'}>
                      {selectFrom == 'my' ? (
                        <DeckSelectMy
                          decks={props.decks}
                          activeDeck={props.activeDeck}
                          setActiveDeck={props.setActiveDeck}
                        />
                      ) : (
                        <DeckSelectPrecon
                          activeDeck={props.activeDeck}
                          setActiveDeck={props.setActiveDeck}
                        />
                      )}
                    </div>
                    {selectFrom == 'my' && isBranches && (
                      <div className="pl-1 w-25">
                        <DeckBranchSelect
                          decks={props.decks}
                          activeDeck={props.activeDeck}
                          setActiveDeck={props.setActiveDeck}
                        />
                      </div>
                    )}
                    <div className="d-flex">
                      {inventoryMode &&
                        isAuthor &&
                        props.deckRouter(props.activeDeck) && (
                          <div className="d-flex pl-1">
                            <Button
                              variant="outline-secondary"
                              onClick={() => toggleInventoryState()}
                            >
                              <div className="d-flex align-items-center">
                                {!props.deckRouter(props.activeDeck)
                                  .inventory_type && <At />}
                                {props.deckRouter(props.activeDeck)
                                  .inventory_type == 's' && <Shuffle />}
                                {props.deckRouter(props.activeDeck)
                                  .inventory_type == 'h' && <PinAngleFill />}
                              </div>
                            </Button>
                          </div>
                        )}
                      {isMobile && props.deckRouter(props.activeDeck) && (
                        <div className="d-flex pl-1">
                          <Button
                            variant="outline-secondary"
                            onClick={() => setShowInfo(!showInfo)}
                          >
                            <InfoCircle />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <Form className="py-1 my-0">
                    {username &&
                      props.decks &&
                      Object.keys(props.decks).length > 0 && (
                        <Form.Check
                          className="px-2"
                          checked={selectFrom == 'my'}
                          onChange={(e) => setSelectFrom(e.target.id)}
                          type="radio"
                          id="my"
                          label={
                            <div className="blue">
                              <b>My Decks</b>
                            </div>
                          }
                          inline
                        />
                      )}
                    <Form.Check
                      className="px-2"
                      checked={selectFrom == 'precons'}
                      onChange={(e) => setSelectFrom(e.target.id)}
                      type="radio"
                      id="precons"
                      label={
                        <div className="blue">
                          <b>Precon Decks</b>
                        </div>
                      }
                      inline
                    />
                  </Form>
                </Col>
              </Row>
            </Col>
            <Col lg={7} className="px-0 px-lg-3">
              {((showInfo && props.deckRouter(props.activeDeck)) ||
                (!isMobile && props.deckRouter(props.activeDeck))) && (
                <>
                  <Row className={isMobile ? 'mx-0' : 'mx-0 pb-2'}>
                    <Col
                      md={isBranches ? 6 : 8}
                      className={isMobile ? 'px-0' : 'pl-0 pr-1'}
                    >
                      <DeckChangeName
                        name={props.deckRouter(props.activeDeck).name}
                        deckid={props.activeDeck.deckid}
                        deckUpdate={deckUpdate}
                        isAuthor={isAuthor}
                      />
                    </Col>
                    {isBranches && (
                      <Col md={2} className={isMobile ? 'px-0' : 'pl-0 pr-0'}>
                        <DeckChangeBranchName
                          branchName={
                            props.deckRouter(props.activeDeck).branchName
                          }
                          deckid={props.activeDeck.deckid}
                          deckUpdate={deckUpdate}
                          isAuthor={isAuthor}
                        />
                      </Col>
                    )}
                    <Col md={4} className={isMobile ? 'px-0' : 'pl-1 pr-0'}>
                      <DeckChangeAuthor
                        author={props.deckRouter(props.activeDeck).author}
                        deckid={props.activeDeck.deckid}
                        deckUpdate={deckUpdate}
                        isAuthor={isAuthor}
                      />
                    </Col>
                  </Row>
                  <Row className="mx-0">
                    <Col className="px-0">
                      <DeckChangeDescription
                        description={
                          props.deckRouter(props.activeDeck).description
                        }
                        deckid={props.activeDeck.deckid}
                        deckUpdate={deckUpdate}
                        isAuthor={isAuthor}
                      />
                    </Col>
                  </Row>
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
          {props.deckRouter(props.activeDeck) && (
            <Row>
              <Col lg={7} className="px-0 px-lg-3">
                <DeckCrypt
                  changeTimer={props.changeTimer}
                  cardAdd={props.cardAdd}
                  cardChange={props.cardChange}
                  deckid={props.activeDeck.deckid}
                  cards={props.deckRouter(props.activeDeck).crypt}
                  isAuthor={isAuthor}
                  decks={props.decks}
                  deckUpdate={deckUpdate}
                  showFloatingButtons={showFloatingButtons}
                  setShowFloatingButtons={setShowFloatingButtons}
                />
              </Col>
              <Col lg={5} className="pt-4 pt-lg-0 px-0 px-lg-3">
                <DeckLibrary
                  cardAdd={props.cardAdd}
                  cardChange={props.cardChange}
                  deckid={props.activeDeck.deckid}
                  cards={props.deckRouter(props.activeDeck).library}
                  isAuthor={isAuthor}
                  decks={props.decks}
                  deckUpdate={deckUpdate}
                  showFloatingButtons={showFloatingButtons}
                  setShowFloatingButtons={setShowFloatingButtons}
                />
              </Col>
            </Row>
          )}
        </Col>
        {!isMobile && (
          <Col lg={2} className="px-0 px-lg-3">
            <DeckButtons
              isAuthor={isAuthor}
              deck={props.deckRouter(props.activeDeck)}
              getDecks={props.getDecks}
              activeDeck={props.activeDeck}
              setActiveDeck={props.setActiveDeck}
              setShowInfo={setShowInfo}
              setShowButtons={handleShowButtons}
              missingCrypt={missingCrypt}
              missingLibrary={missingLibrary}
              history={history}
            />
          </Col>
        )}
      </Row>
      {!username && !props.activeDeck.deckid && (
        <Row className="h-50 align-items-center justify-content-center px-2">
          <Col md={12} lg={5} className="px-0">
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
              <AccountRegister whoAmI={props.whoAmI} />
            </div>
          </Col>
        </Row>
      )}

      {username && props.decks && Object.keys(props.decks).length == 0 && (
        <Row className="h-50 align-items-center justify-content-center px-2">
          <Col md={12} lg={5} className="justify-content-center px-0">
            <div className="d-flex justify-content-center py-2">
              <h6>You do not have any decks in your collection yet.</h6>
            </div>
            <div className="d-flex justify-content-center py-2">
              <h6>Start by creating new one or import from Lackey/Amaranth.</h6>
            </div>
            <div className="d-flex justify-content-center py-2">
              <h6>Or browse official preconstructed decks.</h6>
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
            className="float-right-bottom menu"
          >
            <div className="pt-2 float-menu">
              <List viewBox="0 0 16 16" />
            </div>
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
          <Modal.Body className="p-1">
            <Container className="px-0" fluid>
              <Row className="px-0">
                <Col>
                  <button
                    type="button"
                    className="close m-1"
                    onClick={() => {
                      setShowMenuButtons(false);
                      setShowFloatingButtons(true);
                    }}
                  >
                    <X width="32" height="32" viewBox="0 0 16 16" />
                  </button>
                </Col>
              </Row>
              <DeckButtons
                isAuthor={isAuthor}
                deck={props.deckRouter(props.activeDeck)}
                getDecks={props.getDecks}
                activeDeck={props.activeDeck}
                setActiveDeck={props.setActiveDeck}
                setShowInfo={setShowInfo}
                setShowButtons={handleShowButtons}
                missingCrypt={missingCrypt}
                missingLibrary={missingLibrary}
                history={history}
              />
              {isMobile && (
                <div className="button-block">
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      setInventoryMode(!inventoryMode);
                      handleShowButtons(false);
                    }}
                    block
                  >
                    <ArchiveFill viewBox="0 0 16 16" /> Toggle Inventory Mode (
                    {inventoryMode ? 'On' : 'Off'})
                  </Button>
                </div>
              )}
            </Container>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
}

export default Decks;
