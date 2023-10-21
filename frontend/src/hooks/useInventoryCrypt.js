import { useSnapshot } from 'valtio';
import imbuedClansList from '@/assets/data/imbuedClansList.json';
import vampireClansList from '@/assets/data/vampireClansList.json';
import { getHardTotal, getSoftMax } from '@/utils';
import { useApp, usedStore } from '@/context';

const useInventoryCrypt = (cards = {}, category = 'ok', compact) => {
  const usedCrypt = useSnapshot(usedStore).crypt;
  const { cryptCardBase } = useApp();

  const cardsByClan = {};
  const cardsByClanTotal = {};
  const cardsByClanUnique = {};
  const missingByClan = {};
  const missingByClanTotal = {};

  const clansSorted = ['All', ...vampireClansList, ...imbuedClansList];

  clansSorted.map((clan) => {
    cardsByClan[clan] = {};
    cardsByClanTotal[clan] = 0;
    cardsByClanUnique[clan] = 0;
    missingByClan[clan] = {};
    missingByClanTotal[clan] = 0;
  });

  if (compact) {
    Object.keys(cards).map((cardid) => {
      cardsByClan['All'] = {
        card: cards[cardid],
      };
    });
  } else {
    Object.keys(cards).map((cardid) => {
      const clan = cards[cardid].c.Clan;

      const softUsedMax = getSoftMax(usedCrypt.soft[cardid]);
      const hardUsedTotal = getHardTotal(usedCrypt.hard[cardid]);
      const miss = softUsedMax + hardUsedTotal - cards[cardid].q;

      if (miss > 0) {
        missingByClan[clan][cardid] = { q: miss, c: cards[cardid].c };
        missingByClan['All'][cardid] = {
          q: miss,
          c: cards[cardid].c,
        };
      }

      if (category === 'nok') {
        if (miss > 0) {
          cardsByClan[clan][cardid] = cards[cardid];
          cardsByClan['All'][cardid] = cards[cardid];
        }
      } else {
        cardsByClan[clan][cardid] = cards[cardid];
        cardsByClan['All'][cardid] = cards[cardid];
      }
    });

    Object.keys(usedCrypt.soft)
      .filter((cardid) => cardid < 210000 && !cards[cardid])
      .map((cardid) => {
        const clan = cryptCardBase[cardid].Clan;

        if (category !== 'ok') {
          cardsByClan[clan][cardid] = {
            q: 0,
            c: cryptCardBase[cardid],
          };
          cardsByClan['All'][cardid] = {
            q: 0,
            c: cryptCardBase[cardid],
          };
        }

        const softUsedMax = getSoftMax(usedCrypt.soft[cardid]);

        missingByClan[clan][cardid] = {
          q: softUsedMax,
          c: cryptCardBase[cardid],
        };
        missingByClan['All'][cardid] = {
          q: softUsedMax,
          c: cryptCardBase[cardid],
        };
      });

    Object.keys(usedCrypt.hard)
      .filter((cardid) => cardid < 210000 && !cards[cardid])
      .map((cardid) => {
        const clan = cryptCardBase[cardid].Clan;

        if (category !== 'ok') {
          cardsByClan[clan][cardid] = {
            q: cards[cardid] ? cards[cardid].q : 0,
            c: cryptCardBase[cardid],
          };
          cardsByClan['All'][cardid] = {
            q: cards[cardid] ? cards[cardid].q : 0,
            c: cryptCardBase[cardid],
          };
        }

        const hardUsedTotal = getHardTotal(usedCrypt.hard[cardid]);

        if (missingByClan[clan][cardid]) {
          missingByClan[clan][cardid].q += hardUsedTotal;
          missingByClan['All'][cardid].q += hardUsedTotal;
        } else {
          missingByClan[clan][cardid] = {
            q: hardUsedTotal,
            c: cryptCardBase[cardid],
          };
          missingByClan['All'][cardid] = {
            q: hardUsedTotal,
            c: cryptCardBase[cardid],
          };
        }
      });

    Object.keys(missingByClan).map((clan) => {
      Object.values(missingByClan[clan]).map((card) => {
        missingByClanTotal[clan] += card.q;
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

  return {
    cardsByClan: cardsByClan,
    cardsByClanTotal: cardsByClanTotal,
    cardsByClanUnique: cardsByClanUnique,
    missingByClan: missingByClan,
    missingByClanTotal: missingByClanTotal,
  };
};

export default useInventoryCrypt;
