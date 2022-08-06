import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tabs, Tab, Accordion } from 'react-bootstrap';
import { TwdHallFameCardsPlayer } from 'components';
import { useApp } from 'context';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';

const TwdHallOfFameCards = (props) => {
  const { cryptCardBase, libraryCardBase } = useApp();

  const [players, setPlayers] = useState(undefined);
  const [tab, setTab] = useState('innovation');

  useEffect(() => {
    if (cryptCardBase && libraryCardBase) {
      const url = `${process.env.ROOT_URL}twd_cards_history.json`;
      const options = {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      };

      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          const p = {};

          Object.keys(data).map((cardid) => {
            const cardBase = cardid > 200000 ? cryptCardBase : libraryCardBase;
            const card = cardBase[cardid];
            let releaseDate = null;
            const twdDate = data[cardid].twd_date;
            const player = data[cardid].player;

            Object.keys(card.Set)
              .filter((set) => set !== 'POD')
              .map((set) => {
                const d =
                  set === 'Promo'
                    ? Object.keys(card.Set.Promo)[0].slice(0, 4)
                    : setsAndPrecons[set].date.slice(0, 4);

                if (!releaseDate || releaseDate > d) {
                  releaseDate = d;
                }
              });

            if (twdDate) {
              if (!p[player]) {
                p[player] = { [cardid]: { ...card, twdDate: twdDate } };
              } else {
                p[player][cardid] = { ...card, twdDate: twdDate };
              }
            }
          });

          setPlayers(p);
        });
    }
  }, [cryptCardBase, libraryCardBase]);

  const byTotal = (a, b) => {
    return Object.keys(players[b]).length - Object.keys(players[a]).length;
  };

  const byInnovation = (a, b) => {
    // TODO
    return Object.keys(players[b]).length - Object.keys(players[a]).length;
  };

  const byName = (a, b) => {
    return a.localeCompare(b);
  };

  return (
    <Container className="cards-container px-0 p-md-3">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Tabs
            activeKey={tab}
            onSelect={(k) => setTab(k)}
            justify
            transition={false}
          >
            <Tab eventKey="innovation" title="By Innovation">
              {players && (
                <Accordion alwaysOpen>
                  {Object.keys(players)
                    .sort(byName)
                    .sort(byInnovation)
                    .map((player) => (
                      <TwdHallFameCardsPlayer
                        key={player}
                        name={player}
                        cards={players[player]}
                      />
                    ))}
                </Accordion>
              )}
            </Tab>
            <Tab eventKey="total" title="By Total">
              {players && (
                <Accordion alwaysOpen>
                  {Object.keys(players)
                    .sort(byName)
                    .sort(byTotal)
                    .map((player) => (
                      <TwdHallFameCardsPlayer
                        key={player}
                        name={player}
                        cards={players[player]}
                      />
                    ))}
                </Accordion>
              )}
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default TwdHallOfFameCards;
