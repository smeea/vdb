import React, { useMemo } from 'react';
import { Tab } from '@headlessui/react';
import {
  TabButton,
  TwdCardsHistoryCrypt,
  TwdCardsHistoryLibrary,
} from '@/components';
import { useApp } from '@/context';
import { byName } from '@/utils';
import { useFetch } from '@/hooks';
import { POD, PROMO } from '@/utils/constants';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const TwdCardsHistory = () => {
  const { cryptCardBase, libraryCardBase } = useApp();

  const url = `${import.meta.env.VITE_BASE_URL}/data/twd_cards_history.json`;
  const { value } = useFetch(url, {}, []);

  const { crypt, library, players } = useMemo(() => {
    if (value && cryptCardBase && libraryCardBase) {
      const c = {};
      const l = {};
      const players = {};

      Object.keys(value).forEach((cardid) => {
        const target = cardid > 200000 ? c : l;
        const cardBase = cardid > 200000 ? cryptCardBase : libraryCardBase;
        target[cardid] = { ...value[cardid], ...cardBase[cardid] };

        Object.keys(cardBase[cardid].Set)
          .filter((set) => set !== POD)
          .forEach((set) => {
            const d =
              set === PROMO
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
          if (!players[value[cardid].player]) {
            players[value[cardid].player] = { crypt: 0, library: 0 };
          }
          if (cardid > 200000) {
            players[value[cardid].player].crypt += 1;
          } else {
            players[value[cardid].player].library += 1;
          }
        }
      });

      const crypt = Object.values(c).toSorted(byName);
      const library = Object.values(l).toSorted(byName);

      return {
        crypt,
        library,
        players,
      };
    } else return {};
  }, [value, cryptCardBase, libraryCardBase]);

  return (
    <div className="hof-history-container mx-auto flex flex-col gap-1.5">
      <Tab.Group manual>
        <Tab.List className="flex gap-1.5">
          <TabButton>Crypt</TabButton>
          <TabButton>Library</TabButton>
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
