import React, { useMemo } from 'react';
import { FlexGapped, PlaytestReportsAllCardOrPrecon } from '@/components';
import { useApp } from '@/context';
import { DECKID, PLAYTEST, PLAYTEST_OLD } from '@/constants';

const PlaytestReportsAllPreconsWrapper = ({ reports, maxSameScore }) => {
  const { preconDecks } = useApp();
  const products = useMemo(
    () =>
      Object.values(preconDecks || {}).filter((i) => {
        return i[DECKID].includes(`${PLAYTEST}:`) && !i[PLAYTEST_OLD];
      }),
    [preconDecks],
  );

  return (
    <FlexGapped className="flex-col">
      {products.map((i) => {
        const id = i[DECKID].replace(`${PLAYTEST}:`, '');
        return (
          <PlaytestReportsAllCardOrPrecon
            key={id}
            product={i}
            report={reports?.[id]}
            maxSameScore={maxSameScore}
            isPrecon
          />
        );
      })}
    </FlexGapped>
  );
};

export default PlaytestReportsAllPreconsWrapper;
