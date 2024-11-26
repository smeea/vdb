import React, { useMemo } from 'react';
import { FlexGapped, PlaytestReportsAllCardOrPrecon } from '@/components';
import { getIsPlaytest, cryptSort, librarySort } from '@/utils';
import { useApp } from '@/context';
import { PLAYTEST_OLD, CRYPT, ID } from '@/constants';

const PlaytestReportsAllCardsWrapper = ({ reports, target, sortMethod, maxSameScore }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const sort = target == CRYPT ? cryptSort : librarySort;
  const cardBase = target == CRYPT ? cryptCardBase : libraryCardBase;

  const products = useMemo(
    () =>
      sort(
        Object.values(cardBase || {}).filter((card) => {
          return getIsPlaytest(card[ID]) && !card[PLAYTEST_OLD];
        }),
        sortMethod,
      ),
    [sortMethod, cardBase],
  );

  return (
    <FlexGapped className="flex-col">
      {products.map((i, idx) => {
        return (
          <PlaytestReportsAllCardOrPrecon
            key={i[ID]}
            product={i}
            report={reports?.[i[ID]]}
            maxSameScore={maxSameScore}
            withHr={idx + 1 < products.length}
          />
        );
      })}
    </FlexGapped>
  );
};

export default PlaytestReportsAllCardsWrapper;
