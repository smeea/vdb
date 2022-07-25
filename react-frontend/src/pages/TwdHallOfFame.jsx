import React, { Suspense, useState, useEffect } from 'react';
import { Container, Row, Col, Accordion, Button } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import {
  TwdResultDescription,
  TwdResultCrypt,
  TwdResultLibraryByType,
  TwdResultLibraryKeyCards,
} from 'components';
import { useApp } from 'context';

const TwdHallOfFame = (props) => {
  const { isMobile, cryptCardBase, libraryCardBase } = useApp();

  const [players, setPlayers] = useState(undefined);
  // const [cards, setCards] = useState(undefined);

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

  // const DeckToggle = ({ children, deck }) => {
  //   const onClick = useAccordionButton(deck.deckid, () => getDeck(deck));

  //   return <div onClick={onClick}>{children}</div>;
  // };

  const getDeck = async (deckid) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  };

  const DeckBody = ({ deck }) => {
    getDeck(deck.deckid).then((result) => {
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
    });

    return (
      <Row className="py-2 px-0 mx-0">
        FOO
        {/* <> */}
        {/*   {isMobile ? ( */}
        {/*     <> */}
        {/*       <Col xs={6} className="ps-0 pe-1"> */}
        {/*         <TwdResultCrypt crypt={crypt} /> */}
        {/*       </Col> */}
        {/*       <Col xs={6} className="ps-1 pe-0"> */}
        {/*         <TwdResultLibraryKeyCards library={library} /> */}
        {/*       </Col> */}
        {/*     </> */}
        {/*   ) : ( */}
        {/*     <> */}
        {/*       <Col xs={12} md={4} xl={3} className="px-2"> */}
        {/*         <TwdResultCrypt crypt={crypt} /> */}
        {/*       </Col> */}
        {/*       <Col xs={12} md={4} xl={3} className="px-2"> */}
        {/*         <TwdResultLibraryByType library={library} /> */}
        {/*       </Col> */}
        {/*       <Col xs={12} md={4} xl={3} className="pe-0 ps-2"> */}
        {/*         <TwdResultLibraryKeyCards library={library} /> */}
        {/*       </Col> */}
        {/*     </> */}
        {/*   )} */}
        {/* </> */}
      </Row>
    );
  };

  const Deck = ({ deck }) => {
    return (
      <Accordion.Item eventKey={deck.deckid}>
        <Accordion.Header>
          {/* <DeckToggle deck={deck} eventKey={deck.deckid}> */}
          {`${deck.event}: ${deck.location} [${deck.date}] - ${deck.players} players`}
          {/* </DeckToggle> */}
        </Accordion.Header>
        <Accordion.Body>
          <DeckBody deck={deck} />
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  const Player = ({ name }) => {
    return (
      <Accordion.Item eventKey={name}>
        <Accordion.Header>
          [{Object.keys(players[name]).length}] - {name}
        </Accordion.Header>
        <Accordion.Body>
          <Accordion>
            {cryptCardBase &&
              libraryCardBase &&
              players[name].sort(byDate).map((deck) => {
                return <Deck key={deck.deckid} deck={deck} />;
              })}
          </Accordion>
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
