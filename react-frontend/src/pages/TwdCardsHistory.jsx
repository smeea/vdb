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
  const { cryptCardBase, libraryCardBase, isWide } = useApp();

  const [crypt, setCrypt] = useState(undefined);
  const [library, setLibrary] = useState(undefined);
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

          setCrypt(Object.values(c).sort(byName));
          setLibrary(Object.values(l).sort(byName));
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
                <tr>
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
                </tr>
              </thead>
              <tbody>
                {crypt.map((card, idx) => (
                  <tr
                    key={card.Id}
                    className={`result-${idx % 2 ? 'even' : 'odd'} ${
                      card.deckid ? '' : 'bold blue'
                    }`}
                  >
                    <TwdCardsHistoryCardCrypt
                      handleClick={() => handleClick(idx)}
                      card={card}
                    />
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
                <tr>
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
                </tr>
              </thead>
              <tbody>
                {library.map((card, idx) => (
                  <tr
                    key={card.Id}
                    className={`result-${idx % 2 ? 'even' : 'odd'} ${
                      card.deckid ? '' : 'bold blue'
                    }`}
                  >
                    <TwdCardsHistoryCardLibrary
                      handleClick={() => handleClick(idx)}
                      card={card}
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
