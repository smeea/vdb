import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import {
  TwdCardsHistoryCrypt,
  TwdCardsHistoryLibrary,
  ResultModal,
} from 'components';
import { useApp } from 'context';
import { useModalCardController } from 'hooks';
import { byName } from 'utils';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';

const TwdCardsHistory = () => {
  const { cryptCardBase, libraryCardBase } = useApp();

  const [crypt, setCrypt] = useState(undefined);
  const [library, setLibrary] = useState(undefined);
  const [players, setPlayers] = useState(undefined);
  const [tab, setTab] = useState('crypt');

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
                    ? Object.keys(cardBase[cardid].Set.Promo)[0]
                    : setsAndPrecons[set].date;

                if (
                  !target[cardid].release_date ||
                  target[cardid].release_date > d
                ) {
                  target[cardid].release_date = d;
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
    <Container className="hof-history-container px-0 p-md-3">
      <Tabs
        activeKey={tab}
        onSelect={(k) => setTab(k)}
        justify
        transition={false}
      >
        {crypt && (
          <Tab eventKey="crypt" title="Crypt">
            <TwdCardsHistoryCrypt
              cards={crypt}
              players={players}
              handleClick={handleClick}
            />
          </Tab>
        )}
        {library && (
          <Tab eventKey="library" title="Library">
            <TwdCardsHistoryLibrary
              cards={library}
              players={players}
              handleClick={handleClick}
            />
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
