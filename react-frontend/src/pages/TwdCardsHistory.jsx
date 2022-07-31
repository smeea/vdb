import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { TwdCardsHistoryCard } from 'components';
import { useApp } from 'context';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';

const TwdCardsHistory = (props) => {
  const { cryptCardBase, libraryCardBase } = useApp();

  const [cryptHistory, setCryptHistory] = useState(undefined);
  const [libraryHistory, setLibraryHistory] = useState(undefined);

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
          const crypt = {};
          const library = {};

          Object.keys(data).map((card) => {
            const target = card > 200000 ? crypt : library;
            const cardBase = card > 200000 ? cryptCardBase : libraryCardBase;
            target[card] = data[card];

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

          setCryptHistory(crypt);
          setLibraryHistory(library);
        });
    }
  }, [cryptCardBase, libraryCardBase]);

  return (
    <Container className="hall-of-fame-container px-0 p-md-3">
      {cryptHistory && (
        <>
          {Object.keys(cryptHistory)
            .sort(byName)
            .map((cardid) => (
              <TwdCardsHistoryCard
                key={cardid}
                card={cryptCardBase[cardid]}
                history={cryptHistory[cardid]}
              />
            ))}
        </>
      )}
      {libraryHistory && (
        <>
          {Object.keys(libraryHistory)
            .sort(byName)
            .map((cardid) => (
              <TwdCardsHistoryCard
                key={cardid}
                card={libraryCardBase[cardid]}
                history={libraryHistory[cardid]}
              />
            ))}
        </>
      )}
    </Container>
  );
};

export default TwdCardsHistory;
