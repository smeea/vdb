import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { TwdCardsHistoryCrypt, TwdCardsHistoryLibrary } from '@/components';
import { useApp } from '@/context';
import { byName } from '@/utils';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const TwdCardsHistory = () => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const [crypt, setCrypt] = useState();
  const [library, setLibrary] = useState();
  const [players, setPlayers] = useState();

  useEffect(() => {
    if (cryptCardBase && libraryCardBase) {
      const url = `${import.meta.env.VITE_BASE_URL}/data/twd_cards_history.json`;
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
