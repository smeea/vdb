import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import {
  TwdCardsHistoryCardCrypt,
  TwdCardsHistoryCardLibrary,
} from 'components';
import { useApp } from 'context';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';

const TwdCardsHistory = (props) => {
  const { cryptCardBase, libraryCardBase, isWide } = useApp();

  const [crypt, setCrypt] = useState(undefined);
  const [library, setLibrary] = useState(undefined);
  const [tab, setTab] = useState('crypt');

  const byName = (a, b) => {
    const cardBase = a > 200000 ? cryptCardBase : libraryCardBase;

    if (cardBase[a]['ASCII Name'] < cardBase[b]['ASCII Name']) {
      return -1;
    }
    if (cardBase[a]['ASCII Name'] > cardBase[b]['ASCII Name']) {
      return 1;
    }
    return 0;
  };

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
          const c = {};
          const l = {};

          Object.keys(data).map((card) => {
            const target = card > 200000 ? c : l;
            const cardBase = card > 200000 ? cryptCardBase : libraryCardBase;
            target[card] = { ...data[card], ...cardBase[card] };

            Object.keys(cardBase[card].Set)
              .filter((set) => set !== 'POD')
              .map((set) => {
                let d = null;
                if (set === 'Promo') {
                  d = Object.keys(cardBase[card].Set.Promo)[0].slice(0, 4);
                } else {
                  d = setsAndPrecons[set].date.slice(0, 4);
                }

                if (
                  !target[card]['release_date'] ||
                  !target[card]['release_date'] > d
                ) {
                  target[card]['release_date'] = parseInt(d);
                }
              });
          });

          setCrypt(c);
          setLibrary(l);
        });
    }
  }, [cryptCardBase, libraryCardBase]);

  return (
    <Container className="hall-of-fame-container px-0 p-md-3">
      <Tabs
        activeKey={tab}
        onSelect={(k) => setTab(k)}
        justify
        transition={false}
      >
        {crypt && (
          <Tab eventKey="crypt" title="Crypt">
            <table>
              <thead className="info-message blue">
                <th />
                <th />
                <th />
                <th />
                <th />
                {isWide && <th />}
                {isWide && <th />}
                <th title="First Print Date">Print</th>
                <th title="First TWD Appearance Date">Win</th>
                <th title="Years to Win">YtW</th>
                <th title="First Winner">Player</th>
                <th />
              </thead>
              <tbody>
                {Object.keys(crypt)
                  .sort(byName)
                  .map((cardid, idx) => (
                    <tr
                      key={cardid}
                      className={`result-${idx % 2 ? 'even' : 'odd'}`}
                    >
                      <TwdCardsHistoryCardCrypt card={crypt[cardid]} />
                    </tr>
                  ))}
              </tbody>
            </table>
          </Tab>
        )}
        {library && (
          <Tab eventKey="library" title="Library">
            <table>
              <thead className="info-message blue">
                <th />
                <th />
                <th />
                <th />
                <th />
                <th />
                <th title="First Print Date">Print</th>
                <th title="First TWD Appearance Date">Win</th>
                <th title="Years to Win">YtW</th>
                <th title="First Winner">Player</th>
                <th />
              </thead>
              <tbody>
                {Object.keys(library)
                  .sort(byName)
                  .map((cardid, idx) => (
                    <tr
                      key={cardid}
                      className={`result-${idx % 2 ? 'even' : 'odd'} ${
                        library[cardid].deckid ? '' : 'bold blue'
                      }`}
                    >
                      <TwdCardsHistoryCardLibrary
                        key={cardid}
                        card={library[cardid]}
                      />
                    </tr>
                  ))}
              </tbody>
            </table>
          </Tab>
        )}
      </Tabs>
    </Container>
  );
};

export default TwdCardsHistory;
