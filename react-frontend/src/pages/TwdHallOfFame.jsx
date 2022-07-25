import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import PersonFill from 'assets/images/icons/person-fill.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import {
  TwdResultDescription,
  TwdResultCrypt,
  TwdResultLibraryByType,
  TwdResultLibraryKeyCards,
} from 'components';
import { useApp } from 'context';

const TwdHallOfFame = (props) => {
  const { isMobile, cryptCardBase, libraryCardBase } = useApp();

  const [showDecks, setShowDecks] = useState({});
  const [players, setPlayers] = useState(undefined);
  const [cards, setCards] = useState({});

  useEffect(() => {
    const url = `${process.env.API_URL}twd/hall_of_fame`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
      });
  }, []);

  const byWins = (a, b) => {
    return Object.keys(players[b]).length - Object.keys(players[a]).length;
  };

  const byDate = (a, b) => {
    return b.date - a.date;
  };

  const handleDeckClick = (deckid) => {
    if (!cards[deckid]) getCards(deckid);
    setShowDecks((prevState) => {
      return { ...prevState, [deckid]: !prevState[deckid] };
    });
  };

  const getCards = (deckid) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        const crypt = {};
        const library = {};
        Object.keys(result.cards).map((i) => {
          if (i > 200000) {
            crypt[i] = {
              q: result.cards[i],
              c: cryptCardBase[i],
            };
          } else {
            library[i] = {
              q: result.cards[i],
              c: libraryCardBase[i],
            };
          }
        });
        setCards((prevState) => {
          return { ...prevState, [deckid]: { crypt: crypt, library: library } };
        });
      });
  };

  const DeckBody = ({ deck }) => {
    return (
      <Row className="py-2 px-0 mx-0">
        <Col xs={12} md={12} xl={3} className={isMobile ? 'px-0' : 'ps-0 pe-2'}>
          <TwdResultDescription deck={deck} />
        </Col>
        {isMobile ? (
          <>
            <Col xs={6} className="ps-0 pe-1">
              <TwdResultCrypt crypt={deck.crypt} />
            </Col>
            <Col xs={6} className="ps-1 pe-0">
              <TwdResultLibraryKeyCards library={deck.library} />
            </Col>
          </>
        ) : (
          <>
            <Col xs={12} md={4} xl={3} className="px-2">
              <TwdResultCrypt crypt={deck.crypt} />
            </Col>
            <Col xs={12} md={4} xl={3} className="px-2">
              <TwdResultLibraryByType library={deck.library} />
            </Col>
            <Col xs={12} md={4} xl={3} className="pe-0 ps-2">
              <TwdResultLibraryKeyCards library={deck.library} />
            </Col>
          </>
        )}
      </Row>
    );
  };

  const DeckHeader = ({ deck }) => {
    return (
      <>
        <div className="border-thick p-2 mt-1 mb-3">
          {cryptCardBase && libraryCardBase && (
            <div
              onClick={() => handleDeckClick(deck.deckid)}
              className="link-like"
            >
              <span className="pe-1">{deck.players}</span>
              <PersonFill viewBox="0 0 16 16" />
              {` - ${deck.event}: ${deck.location} - [${deck.date}]`}
              {/* TODO star mark */}
            </div>
          )}
          {showDecks[deck.deckid] && cards[deck.deckid] && (
            <div className="p-1">
              <DeckBody
                deck={{
                  ...deck,
                  creation_date: deck.date,
                  crypt: cards[deck.deckid].crypt,
                  library: cards[deck.deckid].library,
                }}
              />
            </div>
          )}
        </div>
      </>
    );
  };

  const Player = ({ name }) => {
    return (
      <Accordion.Item eventKey={name}>
        <Accordion.Header>
          <div className="d-flex align-items-center">
            <span className="pe-1">{Object.keys(players[name]).length}</span>
            <TrophyFill viewBox="0 0 20 20" />- {name}
            {/* TODO star marks */}
          </div>
        </Accordion.Header>
        <Accordion.Body>
          {players[name].sort(byDate).map((deck) => {
            return (
              <DeckHeader key={deck.deckid} deck={{ ...deck, author: name }} />
            );
          })}
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  return (
    <Container className="main-container p-md-3">
      {players && (
        <Accordion alwaysOpen>
          {Object.keys(players)
            .sort(byWins)
            .map((player) => (
              <Player key={player} name={player} />
            ))}
        </Accordion>
      )}
    </Container>
  );
};

export default TwdHallOfFame;
