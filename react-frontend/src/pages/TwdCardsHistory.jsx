import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import {
  TwdCardsHistoryCardCrypt,
  TwdCardsHistoryCardLibrary,
  ResultModal,
} from 'components';
import { useApp } from 'context';
import { useModalCardController } from 'hooks';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';

const TwdCardsHistory = (props) => {
  const { cryptCardBase, libraryCardBase, isMobile, isWide } = useApp();

  const [crypt, setCrypt] = useState(undefined);
  const [library, setLibrary] = useState(undefined);
  const [players, setPlayers] = useState(undefined);
  const [tab, setTab] = useState('crypt');

  const byName = (a, b) => {
    if (a['ASCII Name'] < b['ASCII Name']) {
      return -1;
    }
    if (a['ASCII Name'] > b['ASCII Name']) {
      return 1;
    }
    return 0;
  };

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(
    tab === 'crypt'
      ? crypt && Object.values(crypt)
      : library && Object.values(library)
  );

  const handleClick = (idx) => {
    handleModalCardOpen(idx);
  };

  const handleCloseModal = () => {
    handleModalCardClose();
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
          const p = {};

          Object.keys(data).map((cardid) => {
            const target = cardid > 200000 ? c : l;
            const cardBase = cardid > 200000 ? cryptCardBase : libraryCardBase;
            target[cardid] = { ...data[cardid], ...cardBase[cardid] };

            Object.keys(cardBase[cardid].Set)
              .filter((set) => set !== 'POD')
              .map((set) => {
                const d =
                  set === 'Promo'
                    ? Object.keys(cardBase[cardid].Set.Promo)[0].slice(0, 4)
                    : setsAndPrecons[set].date.slice(0, 4);

                if (
                  !target[cardid].release_date ||
                  target[cardid].release_date > d
                ) {
                  target[cardid].release_date = parseInt(d);
                }
              });

            if (data[cardid].deckid) {
              if (!p[data[cardid].player]) {
                p[data[cardid].player] = { crypt: 0, library: 0 };
              }
              if (cardid > 200000) {
                p[data[cardid].player].crypt += 1;
              } else {
                p[data[cardid].player].library += 1;
              }
            }
          });

          setCrypt(Object.values(c).sort(byName));
          setLibrary(Object.values(l).sort(byName));
          setPlayers(p);
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
            <table className="crypt-history-table">
              <thead className="info-message blue">
                <tr>
                  <th />
                  {!isMobile && <th />}
                  {!isMobile && <th />}
                  {!isMobile && <th />}
                  {!isMobile && <th />}
                  <th className="text-align-center" title="First Print Date">
                    Print
                  </th>
                  {!isMobile && (
                    <th
                      className="text-align-center"
                      title="First TWD Appearance Date"
                    >
                      Win
                    </th>
                  )}
                  <th className="text-align-center" title="Years to Win">
                    YtW
                  </th>
                  <th className="px-0 px-md-2" title="First Winner">
                    Player
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {crypt.map((card, idx) => (
                  <tr
                    key={card.Id}
                    className={`result-${idx % 2 ? 'even' : 'odd'}`}
                  >
                    <TwdCardsHistoryCardCrypt
                      handleClick={() => handleClick(idx)}
                      card={card}
                      byPlayer={players[card.player]}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>
        )}
        {library && (
          <Tab eventKey="library" title="Library">
            <table className="library-history-table">
              <thead className="info-message blue">
                <tr>
                  <th />
                  {!isMobile && <th />}
                  {!isMobile && <th />}
                  {!isMobile && <th />}
                  <th className="text-align-center" title="First Print Date">
                    Print
                  </th>
                  {!isMobile && (
                    <th
                      className="text-align-center"
                      title="First TWD Appearance Date"
                    >
                      Win
                    </th>
                  )}
                  <th className="text-align-center" title="Years to Win">
                    YtW
                  </th>
                  <th className="px-0 px-md-2" title="First Winner">
                    Player
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {library.map((card, idx) => (
                  <tr
                    key={card.Id}
                    className={`result-${idx % 2 ? 'even' : 'odd'}`}
                  >
                    <TwdCardsHistoryCardLibrary
                      handleClick={() => handleClick(idx)}
                      card={card}
                      byPlayer={players[card.player]}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab>
        )}
      </Tabs>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default TwdCardsHistory;
