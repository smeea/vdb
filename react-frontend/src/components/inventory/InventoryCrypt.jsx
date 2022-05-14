import React, { useState } from 'react';
import {
  InventoryCryptTable,
  InventoryFilterForm,
  SortButton,
} from 'components';
import clansList from '~/src/assets/data/clansList.json';
import { useApp } from 'context';

const InventoryCrypt = ({
  compact,
  withCompact,
  category,
  cards,
  clan,
  setClan,
}) => {
  const { usedCryptCards, cryptCardBase } = useApp();
  const [sortMethod, setSortMethod] = useState('Name');
  const sortMethods = {
    Name: 'N',
    Quantity: 'Q',
    Clan: 'Cl',
    Group: 'G',
    'Capacity - Min to Max': 'C↑',
    'Capacity - Max to Min': 'C↓',
  };

  const cryptByClan = {};
  const cryptByClanTotal = {};
  const cryptByClanUnique = {};
  const missingCryptByClan = {};
  const missingCryptByClanTotal = {};

  const clansSorted = ['All', ...clansList];

  clansSorted.map((i) => {
    cryptByClan[i] = {};
    cryptByClanTotal[i] = 0;
    cryptByClanUnique[i] = 0;
    missingCryptByClan[i] = {};
    missingCryptByClanTotal[i] = 0;
  });

  if (compact) {
    Object.keys(cards).map((card) => {
      cryptByClan['All'] = {
        card: cards[card],
      };
    });
  } else {
    Object.keys(cards).map((card) => {
      const i = cards[card].c.Clan;

      if (cards[card].q > 0) {
        cryptByClanTotal[i] += cards[card].q;
        cryptByClanTotal['All'] += cards[card].q;
        cryptByClanUnique[i] += 1;
        cryptByClanUnique['All'] += 1;
      }

      let softUsedMax = 0;
      if (usedCryptCards.soft[card]) {
        Object.keys(usedCryptCards.soft[card]).map((id) => {
          if (softUsedMax < usedCryptCards.soft[card][id]) {
            softUsedMax = usedCryptCards.soft[card][id];
          }
        });
      }

      let hardUsedTotal = 0;
      if (usedCryptCards.hard[card]) {
        Object.keys(usedCryptCards.hard[card]).map((id) => {
          hardUsedTotal += usedCryptCards.hard[card][id];
        });
      }

      const miss = softUsedMax + hardUsedTotal - cards[card].q;

      if (miss > 0) {
        missingCryptByClan[i][card] = { q: miss, c: cards[card].c };
        missingCryptByClan['All'][card] = {
          q: miss,
          c: cards[card].c,
        };
      }

      if (category === 'nok') {
        if (miss > 0) {
          cryptByClan[i][card] = cards[card];
          cryptByClan['All'][card] = cards[card];
        }
      } else {
        cryptByClan[i][card] = cards[card];
        cryptByClan['All'][card] = cards[card];
      }
    });

    Object.keys(usedCryptCards.soft).map((card) => {
      if (!cards[card]) {
        const i = cryptCardBase[card].Clan;

        if (category !== 'ok') {
          cryptByClan[i][card] = {
            q: cards[card] ? cards[card].q : 0,
            c: cryptCardBase[card],
          };
          cryptByClan['All'][card] = {
            q: cards[card] ? cards[card].q : 0,
            c: cryptCardBase[card],
          };
        }

        let softUsedMax = 0;
        Object.keys(usedCryptCards.soft[card]).map((id) => {
          if (softUsedMax < usedCryptCards.soft[card][id]) {
            softUsedMax = usedCryptCards.soft[card][id];
          }
        });

        missingCryptByClan[i][card] = {
          q: softUsedMax,
          c: cryptCardBase[card],
        };
        missingCryptByClan['All'][card] = {
          q: softUsedMax,
          c: cryptCardBase[card],
        };
      }
    });

    Object.keys(usedCryptCards.hard).map((card) => {
      if (!cards[card]) {
        const i = cryptCardBase[card].Clan;

        if (category !== 'ok') {
          cryptByClan[i][card] = {
            q: cards[card] ? cards[card].q : 0,
            c: cryptCardBase[card],
          };
          cryptByClan['All'][card] = {
            q: cards[card] ? cards[card].q : 0,
            c: cryptCardBase[card],
          };
        }

        let hardUsedTotal = 0;
        if (usedCryptCards.hard[card]) {
          Object.keys(usedCryptCards.hard[card]).map((id) => {
            hardUsedTotal += usedCryptCards.hard[card][id];
          });
        }

        if (missingCryptByClan[i][card]) {
          missingCryptByClan[i][card].q += hardUsedTotal;
          missingCryptByClan['All'][card].q += hardUsedTotal;
        } else {
          missingCryptByClan[i][card] = {
            q: hardUsedTotal,
            c: cryptCardBase[card],
          };
          missingCryptByClan['All'][card] = {
            q: hardUsedTotal,
            c: cryptCardBase[card],
          };
        }
      }
    });

    Object.keys(missingCryptByClan).map((i) => {
      Object.values(missingCryptByClan[i]).map((card) => {
        missingCryptByClanTotal[i] += card.q;
      });
    });
  }

  return (
    <>
      {!compact && (
        <div className="d-flex align-items-center justify-content-between px-1 inventory-info">
          <div className="w-70 py-1">
            <InventoryFilterForm
              value={clan}
              setValue={setClan}
              values={Object.keys(cryptByClan).filter((i) => {
                return Object.keys(cryptByClan[i]).length;
              })}
              byTotal={cryptByClanTotal}
              byUnique={cryptByClanUnique}
              target="crypt"
            />
            <div className="d-flex justify-content-end bold gray px-1">
              {missingCryptByClanTotal[clan] ? (
                <>
                  {missingCryptByClanTotal[clan]} (
                  {Object.values(missingCryptByClan[clan]).length} uniq) miss
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
            ? Object.values(cryptByClan['All'])
            : Object.values(cryptByClan[clan])
        }
      />
    </>
  );
};

export default InventoryCrypt;
