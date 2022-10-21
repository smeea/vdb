import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import List from 'assets/images/icons/list.svg';
import X from 'assets/images/icons/x.svg';
import Check2 from 'assets/images/icons/check2.svg';
import ArrowLeftRight from 'assets/images/icons/arrow-left-right.svg';
import {
  ButtonIconed,
  DeckSelectMy,
  DeckBranchSelect,
  DeckSelectPrecon,
  DeckSelectRecent,
  DiffButtons,
  DiffCrypt,
  DiffLibrary,
} from 'components';
import { useApp } from 'context';

const Diff = () => {
  const {
    deck,
    setDeck,
    decks,
    recentDecks,
    addRecentDeck,
    preconDecks,
    parseDeckCards,
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
  // const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const { deckidFrom, deckidTo } = useParams();

  const [errorFrom, setErrorFrom] = useState(false);
  const [errorTo, setErrorTo] = useState(false);
  const [selectFrom, setSelectFrom] = useState('from-my');
  const [selectTo, setSelectTo] = useState('to-my');
  const [urlFrom, setUrlFrom] = useState('');
  const [urlTo, setUrlTo] = useState('');
  const [deckTo, setDeckTo] = useState();

  const handleUrlChange = (e) => {
    if (e.taret.name === 'from') {
      setUrlFrom(e.target.value);
    } else {
      setUrlTo(e.target.value);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();

    let newId;
    if (e.taret.name === 'from') {
      newId = urlFrom.replace(`${process.env.ROOT_URL}decks/`, '');
      navigate(`/diff/${newId}/${deckidTo}`);
    } else {
      newId = urlTo.replace(`${process.env.ROOT_URL}decks/`, '');
      navigate(`/diff/${deckidFrom}/${newId}`);
    }
  };

  const handleSwap = () => {
    navigate(`/diff/${deckidTo}/${deckidFrom}`);
  };

  const getDeck = (id, setD, setE) => {
    const url = `${process.env.API_URL}deck/${id}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    setE(false);
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
        addRecentDeck(data);
        setD(data);
      })
      .catch((error) => {
        if (error.message == 400) {
          setE('NO DECK WITH THIS ID');
        } else {
          setE('CONNECTION PROBLEM');
        }
      });
  };

  const handleSelectFrom = (e) => {
    navigate(`/diff/${e.value}/${deckidTo}`);
  };

  const handleSelectTo = (e) => {
    navigate(`/diff/${deckidFrom}/${e.value}`);
  };

  const isPublic = Boolean(deck?.public_parent);
  const isAuthor = deck?.is_yours;
  const isBranchesFrom = deck?.master || deck?.branches?.length > 0;
  const isBranchesTo = deckTo?.master || deckTo?.branches?.length > 0;

  useEffect(() => {
    if (
      decks &&
      preconDecks &&
      cryptCardBase &&
      libraryCardBase &&
      deckidFrom &&
      (deck?.deckid !== deckidFrom || !deck)
    ) {
      if (decks[deckidFrom]) {
        setDeck(decks[deckidFrom]);
      } else if (deckidFrom.includes(':')) {
        if (preconDecks[deckidFrom]) {
          setDeck(preconDecks[deckidFrom]);
        } else {
          setErrorFrom('NO DECK WITH THIS ID');
        }
      } else {
        getDeck(deckidFrom, setDeck, setErrorFrom);
      }
    }
  }, [deckidFrom, decks, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (deckidFrom?.includes(':')) {
      setSelectFrom('from-precons');
    } else if (decks && decks[deckidFrom]) {
      setSelectFrom('from-my');
    } else {
      setSelectFrom('from-recent');
    }

    if (deck) setErrorFrom(false);
  }, [deckidFrom, deck, decks]);

  useEffect(() => {
    if (deck) setErrorFrom(false);
  }, [deck]);

  useEffect(() => {
    if (
      decks &&
      preconDecks &&
      cryptCardBase &&
      libraryCardBase &&
      deckidTo &&
      (deckTo?.deckid !== deckidTo || !deckTo)
    ) {
      if (decks[deckidTo]) {
        setDeckTo(decks[deckidTo]);
      } else if (deckidTo.includes(':')) {
        if (preconDecks[deckidTo]) {
          setDeckTo(preconDecks[deckidTo]);
        } else {
          setErrorTo('NO DECK WITH THIS ID');
        }
      } else {
        getDeck(deckidTo, setDeckTo, setErrorTo);
      }
    }
  }, [deckidTo, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (deckidTo?.includes(':')) {
      setSelectTo('to-precons');
    } else if (decks && decks[deckidTo]) {
      setSelectTo('to-my');
    } else {
      setSelectTo('to-recent');
    }

    if (deckTo) setErrorTo(false);
  }, [deckidTo, deckTo, decks]);

  const [missingCrypt, setMissingCrypt] = useState({});
  const [missingLibrary, setMissingLibrary] = useState({});

  useEffect(() => {
    if (deck && deckTo) {
      const crypt = {};
      const library = {};

      Object.keys(deckTo.crypt).map((card) => {
        if (!deck.crypt[card]) {
          crypt[card] = { q: deckTo.crypt[card].q, c: cryptCardBase[card] };
        } else if (deckTo.crypt[card].q > deck.crypt[card].q) {
          crypt[card] = {
            q: deckTo.crypt[card].q - deck.crypt[card].q,
            c: cryptCardBase[card],
          };
        }
      });

      Object.keys(deckTo.library).map((card) => {
        if (!deck.library[card]) {
          library[card] = {
            q: deckTo.library[card].q,
            c: libraryCardBase[card],
          };
        } else if (deckTo.library[card].q > deck.library[card].q) {
          library[card] = {
            q: deckTo.library[card].q - deck.library[card].q,
            c: libraryCardBase[card],
          };
        }
      });

      setMissingCrypt(crypt);
      setMissingLibrary(library);
    }
  }, [deck, deckTo]);

  return (
    <Container className="deck-container px-0 px-md-2 px-xl-4 py-md-3">
      <Row className="mx-0">
        <Col xl={1}></Col>
        <Col sm={12} lg={10} xl={9} className="px-md-2 px-xl-3">
          <Row className="px-1 px-md-0 py-1 pb-0 pt-md-0 pb-xl-4">
            <Col className="px-0 ps-lg-3">
              <Row className="bold blue mx-0 pb-1">Deck You Edit:</Row>
              {selectFrom === 'from-url' ? (
                <Form
                  name="from"
                  onSubmit={handleUrlSubmit}
                  className="diff-select my-0"
                >
                  <InputGroup>
                    <FormControl
                      placeholder="First Deck (ID or URL)"
                      type="text"
                      name="from"
                      value={urlFrom}
                      onChange={handleUrlChange}
                    />
                    <Button variant="primary" type="submit">
                      <Check2 />
                    </Button>
                    {isMobile && (
                      <Button
                        className="ms-1"
                        variant="primary"
                        onClick={handleSwap}
                      >
                        <ArrowLeftRight />
                      </Button>
                    )}
                  </InputGroup>
                </Form>
              ) : (
                <div
                  className={
                    inventoryMode || !isMobile
                      ? 'd-flex'
                      : 'd-flex justify-content-between'
                  }
                >
                  <div
                    className={
                      isBranchesFrom && selectFrom == 'from-my'
                        ? 'w-75'
                        : 'w-100'
                    }
                  >
                    {selectFrom == 'from-my' && decks ? (
                      <>
                        <DeckSelectMy
                          handleSelect={handleSelectFrom}
                          deckid={deck?.deckid}
                        />
                      </>
                    ) : selectFrom == 'from-recent' ? (
                      <DeckSelectRecent
                        handleSelect={handleSelectFrom}
                        deckid={deck?.deckid}
                      />
                    ) : (
                      <DeckSelectPrecon
                        handleSelect={handleSelectFrom}
                        deckid={deck?.deckid}
                      />
                    )}
                  </div>
                  {selectFrom == 'from-my' && decks && isBranchesFrom && (
                    <div className="ps-1 w-25">
                      <DeckBranchSelect deckid={deck.deckid} />
                    </div>
                  )}
                  {isMobile && (
                    <Button
                      className="ms-1"
                      variant="primary"
                      onClick={handleSwap}
                    >
                      <ArrowLeftRight />
                    </Button>
                  )}
                </div>
              )}
              <div className="d-flex justify-content-between align-items-center pt-1">
                <Form className="py-1 my-0 px-2">
                  {username && decks && Object.keys(decks).length > 0 && (
                    <Form.Check
                      checked={selectFrom == 'from-my'}
                      onChange={(e) => setSelectFrom(e.target.id)}
                      type="radio"
                      id="from-my"
                      label={
                        <div className="blue">
                          <b>{isMobile ? 'My' : 'My Decks'}</b>
                        </div>
                      }
                      inline
                    />
                  )}
                  <Form.Check
                    checked={selectFrom == 'from-precons'}
                    onChange={(e) => setSelectFrom(e.target.id)}
                    type="radio"
                    id="from-precons"
                    label={
                      <div className="blue">
                        <b>Precons</b>
                      </div>
                    }
                    inline
                  />
                  {recentDecks.length > 0 && (
                    <Form.Check
                      checked={selectFrom == 'from-recent'}
                      onChange={(e) => setSelectFrom(e.target.id)}
                      type="radio"
                      id="from-recent"
                      label={
                        <div className="blue">
                          <b>Recent</b>
                        </div>
                      }
                      inline
                    />
                  )}
                  <Form.Check
                    checked={selectFrom == 'from-url'}
                    onChange={(e) => setSelectFrom(e.target.id)}
                    type="radio"
                    id="from-url"
                    label={
                      <div className="blue">
                        <b>URL</b>
                      </div>
                    }
                    inline
                  />
                </Form>
              </div>
            </Col>
            {!isMobile && (
              <Col xs={1} className="d-flex justify-content-center px-0">
                <Button variant="primary" onClick={handleSwap}>
                  <ArrowLeftRight />
                </Button>
              </Col>
            )}
            <Col className="pt-1 pt-md-0 px-0 pe-lg-3">
              <Row className="bold blue mx-0 pb-1">Show Changes Against:</Row>
              {selectTo === 'to-url' ? (
                <Form
                  name="to"
                  onSubmit={handleUrlSubmit}
                  className="diff-select my-0"
                >
                  <InputGroup>
                    <FormControl
                      placeholder="First Deck (ID or URL)"
                      type="text"
                      name="to"
                      value={urlTo}
                      onChange={handleUrlChange}
                    />
                    <Button variant="primary" type="submit">
                      <Check2 />
                    </Button>
                  </InputGroup>
                </Form>
              ) : (
                <div
                  className={
                    inventoryMode
                      ? 'd-flex'
                      : isMobile
                      ? 'd-flex justify-content-between diff-select'
                      : 'd-flex'
                  }
                >
                  <div
                    className={
                      isBranchesTo && selectTo == 'to-my' ? 'w-75' : 'w-100'
                    }
                  >
                    {selectTo == 'to-my' && decks ? (
                      <DeckSelectMy
                        handleSelect={handleSelectTo}
                        deckid={deckTo?.deckid}
                      />
                    ) : selectTo == 'to-recent' ? (
                      <DeckSelectRecent
                        handleSelect={handleSelectTo}
                        deckid={deckTo?.deckid}
                      />
                    ) : (
                      <DeckSelectPrecon
                        handleSelect={handleSelectTo}
                        deckid={deckTo?.deckid}
                      />
                    )}
                  </div>
                  {selectTo == 'to-my' && decks && isBranchesTo && (
                    <div className="ps-1 w-25">
                      <DeckBranchSelect
                        /* TODO handler */
                        deckid={deckTo.deckid}
                      />
                    </div>
                  )}
                </div>
              )}
              <div className="d-flex justify-content-between align-items-center pt-1">
                <Form className="py-1 my-0 px-2">
                  {username && decks && Object.keys(decks).length > 0 && (
                    <Form.Check
                      checked={selectTo == 'to-my'}
                      onChange={(e) => setSelectTo(e.target.id)}
                      type="radio"
                      id="to-my"
                      label={
                        <div className="blue">
                          <b>{isMobile ? 'My' : 'My Decks'}</b>
                        </div>
                      }
                      inline
                    />
                  )}
                  <Form.Check
                    checked={selectTo == 'to-precons'}
                    onChange={(e) => setSelectTo(e.target.id)}
                    type="radio"
                    id="to-precons"
                    label={
                      <div className="blue">
                        <b>Precons</b>
                      </div>
                    }
                    inline
                  />
                  {recentDecks.length > 0 && (
                    <Form.Check
                      checked={selectTo == 'to-recent'}
                      onChange={(e) => setSelectTo(e.target.id)}
                      type="radio"
                      id="to-recent"
                      label={
                        <div className="blue">
                          <b>Recent</b>
                        </div>
                      }
                      inline
                    />
                  )}
                  <Form.Check
                    checked={selectTo == 'to-url'}
                    onChange={(e) => setSelectTo(e.target.id)}
                    type="radio"
                    id="to-url"
                    label={
                      <div className="blue">
                        <b>URL</b>
                      </div>
                    }
                    inline
                  />
                </Form>
              </div>
            </Col>
          </Row>
          {(errorFrom || errorTo) && (
            <Row className="py-1">
              <Col className="px-0 ps-lg-3">
                {errorFrom && (
                  <div className="d-flex align-items-center justify-content-center error-message p-2">
                    <b>NO DECK WITH THIS ID</b>
                  </div>
                )}
              </Col>
              <Col xs={1} className="px-0"></Col>
              <Col className="px-0 pe-lg-3">
                {errorTo && (
                  <div className="d-flex align-items-center justify-content-center error-message p-2">
                    <b>NO DECK WITH THIS ID</b>
                  </div>
                )}
              </Col>
            </Row>
          )}
          {deck && deckTo && (
            <Row className="pt-md-2">
              <Col md={7} className="px-0 px-md-2 ps-xl-2 pe-xl-3 pt-3 pt-md-0">
                <DiffCrypt
                  deckid={deck.deckid}
                  isAuthor={isAuthor}
                  isPublic={isPublic}
                  cardsFrom={deck.crypt}
                  cardsTo={deckTo.crypt}
                />
              </Col>
              <Col md={5} className="px-0 px-md-2 ps-xl-3 pe-xl-2 pt-3 pt-md-0">
                <DiffLibrary
                  deckid={deck.deckid}
                  isAuthor={isAuthor}
                  isPublic={isPublic}
                  cardsFrom={deck.library}
                  cardsTo={deckTo.library}
                />
              </Col>
            </Row>
          )}
        </Col>
        {!isMobile && (
          <Col lg={2} className="hide-on-lt992px ps-lg-2 pe-lg-1 px-xl-3">
            <div className="sticky-buttons">
              <DiffButtons
                missingCrypt={missingCrypt}
                missingLibrary={missingLibrary}
                deck={deck}
                deckTo={deckTo}
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
              <DiffButtons
                deck={deck}
                deckTo={deckTo}
                missingCrypt={missingCrypt}
                missingLibrary={missingLibrary}
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

export default Diff;
