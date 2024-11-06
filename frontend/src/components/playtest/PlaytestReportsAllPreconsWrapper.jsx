import React, { useMemo } from 'react';
import { FlexGapped, PlaytestReportsAllCardOrPrecon } from '@/components';
import { useApp } from '@/context';

const PlaytestReportsAllPreconsWrapper = ({ reports, maxSameScore }) => {
  const { preconDecks } = useApp();
  const products = useMemo(
    () =>
      Object.values(preconDecks || {}).filter((i) => {
        return i[DECKID].includes('PLAYTEST:');
      }),
    [preconDecks],
  );

  return (
    <FlexGapped className="flex-col">
      {products.map((i, idx) => {
        const id = i[DECKID].replace('PLAYTEST:', '');
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
    </FlexGapped>
  );
};

export default PlaytestReportsAllPreconsWrapper;
