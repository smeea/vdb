import React, { useMemo } from 'react';
import { PlaytestReportsAllCardOrPrecon } from '@/components';
import { useApp } from '@/context';

const PlaytestReportsAllPreconsWrapper = ({ reports, maxSameScore }) => {
  const { preconDecks } = useApp();
  const products = useMemo(
    () =>
      Object.values(preconDecks || {}).filter((i) => {
        return i.deckid.includes('PLAYTEST:');
      }),
    [preconDecks],
  );

  return (
    <>
      {products.map((i, idx) => {
        const id = i.deckid.replace('PLAYTEST:', '');
        return (
          <PlaytestReportsAllCardOrPrecon
            key={id}
            product={i}
            report={reports?.[id]}
            maxSameScore={maxSameScore}
            withHr={idx + 1 < products.length}
            isPrecon
          />
        );
      })}
    </>
  );
};

export default PlaytestReportsAllPreconsWrapper;
