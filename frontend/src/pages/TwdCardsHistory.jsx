import React, { useMemo } from 'react';
import { Tab } from '@headlessui/react';
import { TwdCardsHistoryCrypt, TwdCardsHistoryLibrary } from '@/components';
import { useApp } from '@/context';
import { byName } from '@/utils';
import { useFetch } from '@/hooks';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const TwdCardsHistory = () => {
  const { cryptCardBase, libraryCardBase } = useApp();

  const url = `${import.meta.env.VITE_BASE_URL}/data/twd_cards_history.json`;
  const { value } = useFetch(url, {}, []);

  const { crypt, library, players } = useMemo(() => {
    if (value && cryptCardBase && libraryCardBase) {
      const c = {};
      const l = {};
      const p = {};

      Object.keys(value).map((cardid) => {
        const target = cardid > 200000 ? c : l;
        const cardBase = cardid > 200000 ? cryptCardBase : libraryCardBase;
        target[cardid] = { ...value[cardid], ...cardBase[cardid] };

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

        if (value[cardid].deckid) {
          if (!p[value[cardid].player]) {
            p[value[cardid].player] = { crypt: 0, library: 0 };
          }
          if (cardid > 200000) {
            p[value[cardid].player].crypt += 1;
          } else {
            p[value[cardid].player].library += 1;
          }
        }
      });

      const crypt = Object.values(c).sort(byName);
      const library = Object.values(l).sort(byName);

      return {
        crypt: crypt,
        library: library,
        players: p,
      };
    } else return {};
  }, [value, cryptCardBase, libraryCardBase]);

  return (
    <div className="hof-history-container mx-auto">
      <Tab.Group manual>
        <Tab.List className="bg-blue-900 flex space-x-1 rounded p-1">
          <Tab
            className={({ selected }) =>
              `w-full rounded px-3 py-1.5 ${
                selected ? 'bg-midGray dark:bg-midGrayDark ' : ''
              }`
            }
          >
            Crypt
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full rounded px-3 py-1.5 ${
                selected ? 'bg-midGray dark:bg-midGrayDark ' : ''
              }`
            }
          >
            Library
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {crypt && <TwdCardsHistoryCrypt cards={crypt} players={players} />}
          </Tab.Panel>
          <Tab.Panel>
            {library && (
              <TwdCardsHistoryLibrary cards={library} players={players} />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TwdCardsHistory;
