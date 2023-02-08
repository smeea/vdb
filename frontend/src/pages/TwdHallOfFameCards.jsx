import React, { useMemo } from 'react';
import { Disclosure, Tab } from '@headlessui/react';
import { TwdHallFameCardsPlayer } from '@/components';
import { useApp } from '@/context';
import { useFetch } from '@/hooks';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const TwdHallOfFameCards = () => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const INNOVATION_PERIOD = 2 * 365;
  const IGNORED_BEFORE_DATE = '1999-04-11'; // first was 1997-04-11
  const MS_TO_DAYS = 1000 * 60 * 60 * 24;

  const byName = (a, b) => {
    return a.localeCompare(b);
  };

  const url = `${import.meta.env.VITE_BASE_URL}/data/twd_cards_history.json`;
  const { value } = useFetch(url, {}, []);

  const players = useMemo(() => {
    if (value && cryptCardBase && libraryCardBase) {
      const p = {};

      Object.keys(value).map((cardid) => {
        const cardBase = cardid > 200000 ? cryptCardBase : libraryCardBase;
        const card = cardBase[cardid];
        const player = value[cardid].player;
        const deckid = value[cardid].deckid;

        let releaseDate = null;

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

        const twdDate = value[cardid].twd_date;
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

      return p;
    } else return {};
  }, [value, cryptCardBase, libraryCardBase]);

  const byTotal = (a, b) => {
    return Object.keys(players[b]).length - Object.keys(players[a]).length;
  };

  const isInnovation = (card) => {
    const twdAppearanceDelay =
      (new Date(card.twdDate) - new Date(card.releaseDate)) / MS_TO_DAYS;

    if (card.twdDate < IGNORED_BEFORE_DATE) return false;
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
      <Tab.Group manual>
        <Tab.List className="bg-blue-900 flex space-x-1 rounded p-1">
          <Tab
            className={({ selected }) =>
              `w-full rounded px-3 py-1.5 ${
                selected ? 'bg-midGray dark:bg-midGrayDark ' : ''
              }`
            }
          >
            By Total
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full rounded px-3 py-1.5 ${
                selected ? 'bg-midGray dark:bg-midGrayDark ' : ''
              }`
            }
          >
            By Innovation
          </Tab>
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
              active tournaments (till {IGNORED_BEFORE_DATE})
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
