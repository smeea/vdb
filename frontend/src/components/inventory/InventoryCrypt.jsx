import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  InventoryCryptTable,
  InventoryFilterForm,
  SortButton,
} from '@/components';
import { useApp, usedStore } from '@/context';
import { getHardTotal, getSoftMax } from '@/utils';
import imbuedClansList from '@/assets/data/imbuedClansList.json';
import vampireClansList from '@/assets/data/vampireClansList.json';

const InventoryCrypt = ({
  compact,
  withCompact,
  category,
  cards,
  clan,
  setClan,
  newFocus,
  setMissingCryptByClan,
  inShared,
}) => {
  const usedCrypt = useSnapshot(usedStore).crypt;
  const { cryptCardBase } = useApp();
  const [sortMethod, setSortMethod] = useState('Name');
  const sortMethods = {
    Name: 'N',
    Quantity: 'Q',
    Clan: 'CL',
    Group: 'G',
    'Capacity - Min to Max': 'C↑',
    'Capacity - Max to Min': 'C↓',
  };

  const cardsByClan = {};
  const cardsByClanTotal = {};
  const cardsByClanUnique = {};
  const missingByClan = {};
  const missingByClanTotal = {};

  const clansSorted = ['All', ...vampireClansList, ...imbuedClansList];

  clansSorted.map((i) => {
    cardsByClan[i] = {};
    cardsByClanTotal[i] = 0;
    cardsByClanUnique[i] = 0;
    missingByClan[i] = {};
    missingByClanTotal[i] = 0;
  });

  if (compact) {
    Object.keys(cards).map((cardid) => {
      cardsByClan['All'] = {
        card: cards[cardid],
      };
    });
  } else {
    Object.keys(cards).map((cardid) => {
      const i = cards[cardid].c.Clan;

      const softUsedMax = getSoftMax(usedCrypt.soft[cardid]);
      const hardUsedTotal = getHardTotal(usedCrypt.hard[cardid]);
      const miss = softUsedMax + hardUsedTotal - cards[cardid].q;

      if (miss > 0) {
        missingByClan[i][cardid] = { q: miss, c: cards[cardid].c };
        missingByClan['All'][cardid] = {
          q: miss,
          c: cards[cardid].c,
        };
      }

      if (category === 'nok') {
        if (miss > 0) {
          cardsByClan[i][cardid] = cards[cardid];
          cardsByClan['All'][cardid] = cards[cardid];
        }
      } else {
        cardsByClan[i][cardid] = cards[cardid];
        cardsByClan['All'][cardid] = cards[cardid];
      }
    });

    Object.keys(usedCrypt.soft).map((cardid) => {
      if (!cards[cardid]) {
        const i = cryptCardBase[cardid].Clan;

        if (category !== 'ok') {
          cardsByClan[i][cardid] = {
            q: cards[cardid] ? cards[cardid].q : 0,
            c: cryptCardBase[cardid],
          };
          cardsByClan['All'][cardid] = {
            q: cards[cardid] ? cards[cardid].q : 0,
            c: cryptCardBase[cardid],
          };
        }

        const softUsedMax = getSoftMax(usedCrypt.soft[cardid]);

        missingByClan[i][cardid] = {
          q: softUsedMax,
          c: cryptCardBase[cardid],
        };
        missingByClan['All'][cardid] = {
          q: softUsedMax,
          c: cryptCardBase[cardid],
        };
      }
    });

    Object.keys(usedCrypt.hard).map((cardid) => {
      if (!cards[cardid]) {
        const i = cryptCardBase[cardid].Clan;

        if (category !== 'ok') {
          cardsByClan[i][cardid] = {
            q: cards[cardid] ? cards[cardid].q : 0,
            c: cryptCardBase[cardid],
          };
          cardsByClan['All'][cardid] = {
            q: cards[cardid] ? cards[cardid].q : 0,
            c: cryptCardBase[cardid],
          };
        }

        const hardUsedTotal = getHardTotal(usedCrypt.hard[cardid]);

        if (missingByClan[i][cardid]) {
          missingByClan[i][cardid].q += hardUsedTotal;
          missingByClan['All'][cardid].q += hardUsedTotal;
        } else {
          missingByClan[i][cardid] = {
            q: hardUsedTotal,
            c: cryptCardBase[cardid],
          };
          missingByClan['All'][cardid] = {
            q: hardUsedTotal,
            c: cryptCardBase[cardid],
          };
        }
      }
    });

    Object.keys(missingByClan).map((i) => {
      Object.values(missingByClan[i]).map((card) => {
        missingByClanTotal[i] += card.q;
      });
    });
  }

  if (!compact) {
    Object.keys(cardsByClan).map((c) => {
      cardsByClanTotal[c] = 0;
      cardsByClanUnique[c] = 0;
    });

    Object.keys(cardsByClan).map((c) => {
      Object.keys(cardsByClan[c]).map((cardid) => {
        cardsByClanTotal[c] += cardsByClan[c][cardid].q;
        if (cardsByClan[c][cardid].q) {
          cardsByClanUnique[c] += 1;
        }
      });
    });
  }

  useEffect(() => {
    if (!compact) setMissingCryptByClan(missingByClan);
  }, [cards]);

  return (
    <>
      {!compact && (
        <div className="flex items-center justify-between bg-bgSecondary dark:bg-bgSecondaryDark">
          <div className="w-3/4 p-1">
            <InventoryFilterForm
              value={clan}
              setValue={setClan}
              values={Object.keys(cardsByClan).filter((i) => {
                return Object.keys(cardsByClan[i]).length;
              })}
              byTotal={cardsByClanTotal}
              byUnique={cardsByClanUnique}
              target="crypt"
            />
            <div className="flex justify-end font-bold  text-midGray dark:text-midGrayDark">
              {missingByClanTotal[clan] ? (
                <>
                  {missingByClanTotal[clan]} (
                  {Object.values(missingByClan[clan]).length} uniq) miss
                </>
              ) : null}
            </div>
          </div>
          <SortButton
            sortMethods={sortMethods}
            sortMethod={sortMethod}
            setSortMethod={setSortMethod}
          />
        </div>
      )}
      <InventoryCryptTable
        sortMethod={sortMethod}
        compact={compact}
        withCompact={withCompact}
        cards={
          compact
            ? Object.values(cardsByClan['All'])
            : Object.values(cardsByClan[clan])
        }
        newFocus={newFocus}
        inShared={inShared}
      />
    </>
  );
};

export default InventoryCrypt;
