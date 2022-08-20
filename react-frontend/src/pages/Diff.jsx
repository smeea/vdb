import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  DeckSelectMy,
  DeckBranchSelect,
  DeckSelectPrecon,
  DeckSelectRecent,
  DiffButtons,
  DiffCrypt,
  DiffLibrary,
} from 'components';
import { useApp } from 'context';

const Diff = (props) => {
  const {
    inventoryMode,
    deckRouter,
    activeDeck,
    setActiveDeck,
    sharedDeck,
    setSharedDeck,
    decks,
    recentDecks,
    addRecentDeck,
    preconDecks,
    parseDeckCards,
    cryptCardBase,
    libraryCardBase,
    username,
    isMobile,
    showFloatingButtons,
    setShowFloatingButtons,
    showMenuButtons,
    setShowMenuButtons,
  } = useApp();

  const query = new URLSearchParams(useLocation().search);
  const fromQuery = query.get('from');
  const toQuery = query.get('to');

  const [deckErrorFrom, setDeckErrorFrom] = useState(false);
  const [deckErrorTo, setDeckErrorTo] = useState(false);
  const navigate = useNavigate();

  const [selectFrom, setSelectFrom] = useState('from-my');
  const [selectTo, setSelectTo] = useState('to-my');

  const [formFrom, setFormFrom] = useState('');
  const [formTo, setFormTo] = useState('');
  const [secondaryDeck, setSecondaryDeck] = useState({
    src: null,
    deckid: null,
  });
  const [sharedDeckTo, setSharedDeckTo] = useState(undefined);

  const deckToRouter = (pointer) => {
    if (pointer) {
      switch (pointer['src']) {
        case 'my':
          return decks && decks[pointer['deckid']];
        case 'precons':
          return preconDecks && preconDecks[pointer['deckid']];
        case 'shared':
        case 'twd':
          return sharedDeckTo && sharedDeckTo[pointer['deckid']];
      }
    }
  };

  const handleFormChange = (e) => {
    switch (e.target.name) {
      case 'from':
        setFormFrom(e.target.value);
        break;
      case 'to':
        setFormTo(e.target.value);
        break;
    }
  };

  const handleSubmit = (e) => {
    event.preventDefault();

    switch (e.target.name) {
      case 'from':
        let deckFromId = formFrom;
        if (formFrom.includes(`${process.env.ROOT_URL}decks?id=`)) {
          deckFromId = formFrom.replace(`${process.env.ROOT_URL}decks?id=`, '');
        }
        setActiveDeck({ src: null, deckid: null });
        navigate(`/diff?from=${deckFromId}&to=${toQuery}`);
        break;

      case 'to':
        let deckToId = formTo;
        if (formTo.includes(`${process.env.ROOT_URL}decks?id=`)) {
          deckToId = formTo.replace(`${process.env.ROOT_URL}decks?id=`, '');
        }
        setSecondaryDeck({ src: null, deckid: null });
        navigate(`/diff?from=${fromQuery}&to=${deckToId}`);
        break;
    }
  };

  const handleSwap = () => {
    let deckFromId = formFrom;
    if (formFrom.includes(`${process.env.ROOT_URL}decks?id=`)) {
      deckFromId = formFrom.replace(`${process.env.ROOT_URL}decks?id=`, '');
    }
    let deckToId = formTo;
    if (formTo.includes(`${process.env.ROOT_URL}decks?id=`)) {
      deckToId = formTo.replace(`${process.env.ROOT_URL}decks?id=`, '');
    }
    setActiveDeck({ src: null, deckid: null });
    setSecondaryDeck({ src: null, deckid: null });
    navigate(`/diff?from=${deckToId}&to=${deckFromId}`);
  };

  const getDeck = (deckid, setDeck, setError) => {
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
        addRecentDeck(data);
        setDeck({ [data.deckid]: data });
      })
      .catch((error) => {
        if (error.message == 400) {
          setError('NO DECK WITH THIS ID');
        } else {
          setError('CONNECTION PROBLEM');
        }
      });
  };

  let isPublic;
  let isAuthor;
  let isBranchesFrom;
  let isBranchesTo;
  if (deckRouter(activeDeck)) {
    isPublic = Boolean(deckRouter(activeDeck).public_parent);
    isAuthor = deckRouter(activeDeck).is_yours;
    isBranchesFrom =
      deckRouter(activeDeck).master ||
      (deckRouter(activeDeck).branches &&
        deckRouter(activeDeck).branches.length > 0);
  }
  if (deckToRouter(secondaryDeck)) {
    isBranchesTo =
      deckToRouter(secondaryDeck).master ||
      (deckToRouter(secondaryDeck).branches &&
        deckToRouter(secondaryDeck).branches.length > 0);
  }

  useEffect(() => {
    setFormFrom(fromQuery);

    if (!activeDeck.deckid && fromQuery && cryptCardBase && libraryCardBase) {
      if (fromQuery.length == 32) {
        setActiveDeck({ src: 'shared', deckid: fromQuery });
        getDeck(fromQuery, setSharedDeck, setDeckErrorFrom);
      } else if (fromQuery.includes(':')) {
        setActiveDeck({ src: 'precons', deckid: fromQuery });
      } else {
        setActiveDeck({ src: 'twd', deckid: fromQuery });
        getDeck(fromQuery, setSharedDeck, setDeckErrorFrom);
      }
    }

    if (activeDeck.deckid && activeDeck.deckid != fromQuery) {
      navigate(`/diff?from=${activeDeck.deckid}&to=${toQuery}`);
    }

    if (
      cryptCardBase &&
      libraryCardBase &&
      (activeDeck.src === 'twd' || activeDeck.src === 'shared') &&
      !(sharedDeck && sharedDeck[activeDeck.deckid])
    ) {
      getDeck(activeDeck.deckid, setSharedDeck, setDeckErrorFrom);
    }
  }, [fromQuery, activeDeck, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (activeDeck.src == 'my' || activeDeck.src == 'precons') {
      setSelectFrom(`from-${activeDeck.src}`);
    } else {
      setSelectFrom('from-recent');
    }

    if (decks && decks[activeDeck.deckid] && activeDeck.src != 'my') {
      setActiveDeck({ src: 'my', deckid: activeDeck.deckid });
    }

    if (deckRouter(activeDeck)) setDeckErrorFrom(false);
  }, [activeDeck, decks]);

  useEffect(() => {
    setFormTo(toQuery);

    if (!secondaryDeck.deckid && toQuery && cryptCardBase && libraryCardBase) {
      if (toQuery.length == 32) {
        setSecondaryDeck({ src: 'shared', deckid: toQuery });
        getDeck(toQuery, setSharedDeckTo, setDeckErrorTo);
      } else if (toQuery.includes(':')) {
        setSecondaryDeck({ src: 'precons', deckid: toQuery });
      } else {
        setSecondaryDeck({ src: 'twd', deckid: toQuery });
        getDeck(toQuery, setSharedDeckTo, setDeckErrorTo);
      }
    }

    if (secondaryDeck.deckid && secondaryDeck.deckid != toQuery)
      navigate(`/diff?from=${fromQuery}&to=${secondaryDeck.deckid}`);

    if (
      cryptCardBase &&
      libraryCardBase &&
      (secondaryDeck.src === 'twd' || secondaryDeck.src === 'shared') &&
      !(sharedDeckTo && sharedDeckTo[secondaryDeck.deckid])
    ) {
      getDeck(secondaryDeck.deckid, setSharedDeckTo, setDeckErrorTo);
    }
  }, [toQuery, secondaryDeck, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (secondaryDeck.src == 'my' || secondaryDeck.src == 'precons') {
      setSelectTo(`to-${secondaryDeck.src}`);
    } else {
      setSelectTo('to-recent');
    }

    if (decks && decks[secondaryDeck.deckid] && secondaryDeck.src != 'my') {
      setSecondaryDeck({ src: 'my', deckid: secondaryDeck.deckid });
    }

    if (deckToRouter(secondaryDeck)) setDeckErrorTo(false);
  }, [secondaryDeck, decks]);

  const [missingCrypt, setMissingCrypt] = useState({});
  const [missingLibrary, setMissingLibrary] = useState({});

  useEffect(() => {
    if (deckRouter(activeDeck) && deckToRouter(secondaryDeck)) {
      const fromCrypt = deckRouter(activeDeck).crypt;
      const fromLibrary = deckRouter(activeDeck).library;
      const toCrypt = deckToRouter(secondaryDeck).crypt;
      const toLibrary = deckToRouter(secondaryDeck).library;

      const crypt = {};
      const library = {};

      Object.keys(toCrypt).map((card) => {
        if (!fromCrypt[card]) {
          crypt[card] = { q: toCrypt[card].q, c: cryptCardBase[card] };
        } else if (toCrypt[card].q > fromCrypt[card].q) {
          crypt[card] = {
            q: toCrypt[card].q - fromCrypt[card].q,
            c: cryptCardBase[card],
          };
        }
      });

      Object.keys(toLibrary).map((card) => {
        if (!fromLibrary[card]) {
          library[card] = { q: toLibrary[card].q, c: libraryCardBase[card] };
        } else if (toLibrary[card].q > fromLibrary[card].q) {
          library[card] = {
            q: toLibrary[card].q - fromLibrary[card].q,
            c: libraryCardBase[card],
          };
        }
      });

      setMissingCrypt(crypt);
      setMissingLibrary(library);
    }
  }, [decks, activeDeck, secondaryDeck]);

  return (
    <Container className="deck-container px-0 px-md-2 px-xl-4 py-md-3">
      <Row className="mx-0">
        <Col xl={1}></Col>
        <Col sm={12} lg={10} xl={9} className="px-md-2 px-xl-3">
          <Row className="px-1 px-md-0 py-1 pb-0 pt-md-0 pb-xl-4">
            <Col className="px-0 ps-lg-3">
              <Row className="bold blue mx-0 pb-1">Source Deck:</Row>
              {selectFrom === 'from-url' ? (
                <Form
                  name="from"
                  onSubmit={handleSubmit}
                  className="diff-select my-0"
                >
                  <InputGroup>
                    <FormControl
                      placeholder="First Deck (ID or URL)"
                      type="text"
                      name="from"
                      value={formFrom}
                      onChange={handleFormChange}
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
                    inventoryMode
                      ? 'd-flex'
                      : isMobile
                      ? 'd-flex justify-content-between diff-select'
                      : 'd-flex'
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
                      <DeckSelectMy deckid={activeDeck.deckid} />
                    ) : selectFrom == 'from-recent' ? (
                      <DeckSelectRecent deckid={activeDeck.deckid} />
                    ) : (
                      <DeckSelectPrecon deckid={activeDeck.deckid} />
                    )}
                  </div>
                  {selectFrom == 'from-my' && decks && isBranchesFrom && (
                    <div className="ps-1 w-25">
                      <DeckBranchSelect deckid={activeDeck.deckid} />
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
              <Row className="bold blue mx-0 pb-1">Target Deck:</Row>
              {selectTo === 'to-url' ? (
                <Form
                  name="to"
                  onSubmit={handleSubmit}
                  className="diff-select my-0"
                >
                  <InputGroup>
                    <FormControl
                      placeholder="First Deck (ID or URL)"
                      type="text"
                      name="to"
                      value={formTo}
                      onChange={handleFormChange}
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
                        deckid={secondaryDeck.deckid}
                        setActiveDeck={setSecondaryDeck}
                      />
                    ) : selectTo == 'to-recent' ? (
                      <DeckSelectRecent
                        deckid={secondaryDeck.deckid}
                        setActiveDeck={setSecondaryDeck}
                      />
                    ) : (
                      <DeckSelectPrecon
                        deckid={secondaryDeck.deckid}
                        setActiveDeck={setSecondaryDeck}
                      />
                    )}
                  </div>
                  {selectTo == 'to-my' && decks && isBranchesTo && (
                    <div className="ps-1 w-25">
                      <DeckBranchSelect
                        deckid={secondaryDeck.deckid}
                        setActiveDeck={setSecondaryDeck}
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
          {(deckErrorFrom || deckErrorTo) && (
            <Row className="py-1">
              <Col className="px-0 ps-lg-3">
                {deckErrorFrom && (
                  <div className="d-flex align-items-center justify-content-center error-message p-2">
                    <b>NO DECK WITH THIS ID</b>
                  </div>
                )}
              </Col>
              <Col xs={1} className="px-0"></Col>
              <Col className="px-0 pe-lg-3">
                {deckErrorTo && (
                  <div className="d-flex align-items-center justify-content-center error-message p-2">
                    <b>NO DECK WITH THIS ID</b>
                  </div>
                )}
              </Col>
            </Row>
          )}
          {deckRouter(activeDeck) && deckToRouter(secondaryDeck) && (
            <Row className="pt-md-2">
              <Col md={7} className="px-0 px-md-2 ps-xl-2 pe-xl-3 pt-3 pt-md-0">
                <DiffCrypt
                  deckid={activeDeck.deckid}
                  isAuthor={isAuthor}
                  isPublic={isPublic}
                  cardsFrom={deckRouter(activeDeck).crypt}
                  cardsTo={deckToRouter(secondaryDeck).crypt}
                />
              </Col>
              <Col md={5} className="px-0 px-md-2 ps-xl-3 pe-xl-2 pt-3 pt-md-0">
                <DiffLibrary
                  deckid={activeDeck.deckid}
                  isAuthor={isAuthor}
                  isPublic={isPublic}
                  cardsFrom={deckRouter(activeDeck).library}
                  cardsTo={deckToRouter(secondaryDeck).library}
                />
              </Col>
            </Row>
          )}
        </Col>
        {!isMobile && (
          <Col lg={2} className="hide-on-lt992px ps-lg-2 pe-lg-1 px-xl-3">
            <div className="sticky-buttons">
              <DiffButtons
                isAuthor={isAuthor}
                isPublic={isPublic}
                deck={deckRouter(activeDeck)}
                activeDeck={activeDeck}
                missingCrypt={missingCrypt}
                missingLibrary={missingLibrary}
                fromQuery={fromQuery}
                toQuery={toQuery}
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
              <DiffButtons
                deck={deckRouter(activeDeck)}
                activeDeck={activeDeck}
                missingCrypt={missingCrypt}
                missingLibrary={missingLibrary}
                fromQuery={fromQuery}
                toQuery={toQuery}
              />
            </Container>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default Diff;
