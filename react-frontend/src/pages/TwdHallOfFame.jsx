import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import StarFill from 'assets/images/icons/star-fill.svg';
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

  const byName = (a, b) => {
    return a.localeCompare(b);
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

  const testStar = (eventName) => {
    return (
      RegExp(
        /(NAC|NC|EC|RESAC|SAC|ACC|Continental Championship) \d{4}( -- |$)/i,
        'i'
      ).test(eventName) ||
      RegExp(/(NAC|NC|EC) \d{4} Day 2$/i, 'i').test(eventName)
    );
  };

  const getStars = (decks) => {
    let stars = 0;
    decks.map((deck) => {
      if (testStar(deck['event'])) {
        stars += 1;
      }
    });

    return stars;
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
      <Row className="py-0 px-0 mx-0">
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
    const isStar = testStar(deck['event']);
    RegExp(/(NAC|NC|EC|RESAC|SAC|Continental Championship) \d{4}$/i, 'i').test(
      deck['event']
    ) || RegExp(/(NAC|NC|EC) \d{4} Day 2$/i, 'i').test(deck['event']);

    return (
      <>
        <div className="border-thick p-2 m-1 m-md-2">
          {cryptCardBase && libraryCardBase && (
            <div
              onClick={() => handleDeckClick(deck.deckid)}
              className={`d-flex justify-content-between link-like ${
                isStar ? 'bold' : ''
              }`}
            >
              <div className="d-flex align-items-center">
                {deck.players}
                <div className="d-flex pt-1 ps-1 pe-3">
                  <PeopleFill viewBox="0 0 18 18" />
                </div>
                {`${deck.event}: ${deck.location}`}
              </div>
              <div className="nowrap ps-2">
                {isMobile ? deck.date.slice(0, 4) : deck.date}
              </div>
            </div>
          )}
          {showDecks[deck.deckid] && cards[deck.deckid] && (
            <div className="p-0">
              <hr />
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
    const starsQty = getStars(players[name]);
    const stars = [];
    for (let i = 0; i < starsQty; i++) {
      stars.push(
        <StarFill key={i} height="13" width="12" viewBox="0 0 18 18" />
      );
    }

    return (
      <Accordion.Item eventKey={name}>
        <Accordion.Header>
          <div className="d-flex align-items-center">
            {Object.keys(players[name]).length}
            <div className="d-flex pt-1 ps-1 pe-3">
              <TrophyFill height="13" width="13" viewBox="0 0 18 18" />
            </div>
            <div className="d-flex nowrap align-items-center">
              {name}
              <div
                className="d-flex pt-1 px-1"
                title="National or Continental Championships (in bold below)"
              >
                {stars}
              </div>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body className="p-0">
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
    <Container className="hall-of-fame-container px-0 p-md-3">
      {players && (
        <Accordion alwaysOpen>
          {Object.keys(players)
            .sort(byName)
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
