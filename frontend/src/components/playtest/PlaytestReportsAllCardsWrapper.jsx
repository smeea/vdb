import React, { useMemo } from 'react';
import { PlaytestReportsAllCardOrPrecon } from '@/components';
import { cryptSort, librarySort } from '@/utils';
import { useApp } from '@/context';
import { CRYPT } from '@/utils/constants';

const PlaytestReportsAllCardsWrapper = ({ reports, target, sortMethod, maxSameScore }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const sort = target == CRYPT ? cryptSort : librarySort;
  const cardBase = target == CRYPT ? cryptCardBase : libraryCardBase;
  const playtestId = target == CRYPT ? 210000 : 110000;

  const products = useMemo(
    () =>
      sort(
        Object.values(cardBase || {}).filter((i) => {
          return i.Id > playtestId;
        }),
        sortMethod,
      ),
    [sortMethod, cardBase],
  );

  return (
    <>
      {products.map((i, idx) => {
        return (
          <PlaytestReportsAllCardOrPrecon
            key={i.Id}
            product={i}
            report={reports?.[i.Id]}
            maxSameScore={maxSameScore}
            withHr={idx + 1 < products.length}
          />
        );
      })}
    </>
  );
};

export default PlaytestReportsAllCardsWrapper;
