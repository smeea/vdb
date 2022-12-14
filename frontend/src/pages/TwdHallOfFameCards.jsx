import React, { useState, useEffect } from 'react';
import { Disclosure, Tab } from '@headlessui/react';
import { TwdHallFameCardsPlayer } from 'components';
import { useApp } from 'context';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';

const TwdHallOfFameCards = () => {
  const { cryptCardBase, libraryCardBase } = useApp();

  const [players, setPlayers] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const INNOVATION_PERIOD = 2 * 365;
  const IGNORED_TOURNAMENTS_DATE = '1999-04-11'; // first was 1997-04-11
  const MS_TO_DAYS = 1000 * 60 * 60 * 24;

  const byName = (a, b) => {
    return a.localeCompare(b);
  };

  useEffect(() => {
    if (cryptCardBase && libraryCardBase) {
      const url = `${process.env.ROOT_URL}data/twd_cards_history.json`;
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
            const player = data[cardid].player;
            const deckid = data[cardid].deckid;

            let releaseDate = null;
            const twdDate = data[cardid].twd_date;

            Object.keys(card.Set)
              .filter((set) => set !== 'POD')
              .map((set) => {
                const d =
                  set === 'Promo'
                    ? Object.keys(card.Set.Promo)[0]
                    : setsAndPrecons[set].date;

                if (!releaseDate || releaseDate > d) {
                  releaseDate = d;
                }
              });

            if (twdDate) {
              if (!p[player]) {
                p[player] = {
                  [cardid]: {
                    ...card,
                    deckid: deckid,
                    twdDate: twdDate,
                    releaseDate: releaseDate,
                  },
                };
              } else {
                p[player][cardid] = {
                  ...card,
                  deckid: deckid,
                  twdDate: twdDate,
                  releaseDate: releaseDate,
                };
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

  const isInnovation = (card) => {
    const twdAppearanceDelay =
      (new Date(card.twdDate) - new Date(card.releaseDate)) / MS_TO_DAYS;

    if (card.twdDate < IGNORED_TOURNAMENTS_DATE) return false;

    return twdAppearanceDelay > INNOVATION_PERIOD;
  };

  const getInnovationCards = (cards) => {
    const innovationCards = {};
    Object.values(cards).map((card) => {
      if (isInnovation(card)) {
        innovationCards[card.Id] = card;
      }
    });
    return innovationCards;
  };

  const byInnovation = (a, b) => {
    return (
      Object.keys(getInnovationCards(players[b])).length -
      Object.keys(getInnovationCards(players[a])).length
    );
  };

  return (
    <div className="hof-cards-container  mx-auto ">
      {/* TODO add styling to Tabs */}
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List>
          <Tab>By Total</Tab>
          <Tab>By Innovation</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {players && (
              <Disclosure>
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
              </Disclosure>
            )}
          </Tab.Panel>
          <Tab.Panel>
            <div className="border">
              Only counts cards first appeared in TWD {INNOVATION_PERIOD / 365}{' '}
              years after card print, and excluding cards from first 2 years of
              active tournaments (till {IGNORED_TOURNAMENTS_DATE})
            </div>
            {players && (
              <Disclosure>
                {Object.keys(players)
                  .sort(byName)
                  .sort(byInnovation)
                  .filter(
                    (player) =>
                      Object.keys(getInnovationCards(players[player])).length
                  )
                  .map((player) => (
                    <TwdHallFameCardsPlayer
                      key={player}
                      name={player}
                      cards={getInnovationCards(players[player])}
                    />
                  ))}
              </Disclosure>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TwdHallOfFameCards;
