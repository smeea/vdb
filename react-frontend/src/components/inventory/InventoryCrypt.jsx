import React, { useEffect, useState } from 'react';
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
  setMissingByClan,
}) => {
  const { usedCryptCards, cryptCardBase } = useApp();
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

      let softUsedMax = 0;
      if (usedCryptCards.soft[cardid]) {
        Object.keys(usedCryptCards.soft[cardid]).map((id) => {
          if (softUsedMax < usedCryptCards.soft[cardid][id]) {
            softUsedMax = usedCryptCards.soft[cardid][id];
          }
        });
      }

      let hardUsedTotal = 0;
      if (usedCryptCards.hard[cardid]) {
        Object.keys(usedCryptCards.hard[cardid]).map((id) => {
          hardUsedTotal += usedCryptCards.hard[cardid][id];
        });
      }

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

    Object.keys(usedCryptCards.soft).map((cardid) => {
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

        let softUsedMax = 0;
        Object.keys(usedCryptCards.soft[cardid]).map((id) => {
          if (softUsedMax < usedCryptCards.soft[cardid][id]) {
            softUsedMax = usedCryptCards.soft[cardid][id];
          }
        });

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

    Object.keys(usedCryptCards.hard).map((cardid) => {
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

        let hardUsedTotal = 0;
        if (usedCryptCards.hard[cardid]) {
          Object.keys(usedCryptCards.hard[cardid]).map((id) => {
            hardUsedTotal += usedCryptCards.hard[cardid][id];
          });
        }

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
    if (!compact) setMissingByClan(missingByClan);
  }, [cards]);

  return (
    <>
      {!compact && (
        <div className="d-flex align-items-center justify-content-between inventory-info">
          <div className="w-75 p-1">
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
