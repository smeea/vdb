import React, { useState } from 'react';
import {
  InventoryCryptTable,
  InventoryFilterForm,
  SortButton,
} from 'components';
import imbuedClansList from 'assets/data/imbuedClansList.json';
import vampireClansList from 'assets/data/vampireClansList.json';
import { useApp } from 'context';

const InventoryCrypt = ({
  compact,
  withCompact,
  category,
  cards,
  clan,
  setClan,
  newFocus,
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
    Object.keys(cards).map((card) => {
      cardsByClan['All'] = {
        card: cards[card],
      };
    });
  } else {
    Object.keys(cards).map((card) => {
      const i = cards[card].c.Clan;

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
        missingByClan[i][card] = { q: miss, c: cards[card].c };
        missingByClan['All'][card] = {
          q: miss,
          c: cards[card].c,
        };
      }

      if (category === 'nok') {
        if (miss > 0) {
          cardsByClan[i][card] = cards[card];
          cardsByClan['All'][card] = cards[card];
        }
      } else {
        cardsByClan[i][card] = cards[card];
        cardsByClan['All'][card] = cards[card];
      }
    });

    Object.keys(usedCryptCards.soft).map((card) => {
      if (!cards[card]) {
        const i = cryptCardBase[card].Clan;

        if (category !== 'ok') {
          cardsByClan[i][card] = {
            q: cards[card] ? cards[card].q : 0,
            c: cryptCardBase[card],
          };
          cardsByClan['All'][card] = {
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

        missingByClan[i][card] = {
          q: softUsedMax,
          c: cryptCardBase[card],
        };
        missingByClan['All'][card] = {
          q: softUsedMax,
          c: cryptCardBase[card],
        };
      }
    });

    Object.keys(usedCryptCards.hard).map((card) => {
      if (!cards[card]) {
        const i = cryptCardBase[card].Clan;

        if (category !== 'ok') {
          cardsByClan[i][card] = {
            q: cards[card] ? cards[card].q : 0,
            c: cryptCardBase[card],
          };
          cardsByClan['All'][card] = {
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

        if (missingByClan[i][card]) {
          missingByClan[i][card].q += hardUsedTotal;
          missingByClan['All'][card].q += hardUsedTotal;
        } else {
          missingByClan[i][card] = {
            q: hardUsedTotal,
            c: cryptCardBase[card],
          };
          missingByClan['All'][card] = {
            q: hardUsedTotal,
            c: cryptCardBase[card],
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
    Object.keys(cardsByClan).map((d) => {
      cardsByClanTotal[d] = 0;
      cardsByClanUnique[d] = 0;
    });

    Object.keys(cardsByClan).map((c) => {
      Object.keys(cardsByClan[c]).map((cardid) => {
        cardsByClanTotal[c] += cardsByClan[c][cardid].q;
        cardsByClanUnique[c] += 1;
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
              values={Object.keys(cardsByClan).filter((i) => {
                return Object.keys(cardsByClan[i]).length;
              })}
              byTotal={cardsByClanTotal}
              byUnique={cardsByClanUnique}
              target="crypt"
            />
            <div className="d-flex justify-content-end bold gray px-1">
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
      />
    </>
  );
};

export default InventoryCrypt;
