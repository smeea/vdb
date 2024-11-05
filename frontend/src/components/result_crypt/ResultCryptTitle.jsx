import React from 'react';
import {
  TITLED,
  PRIMOGEN,
  PRINCE,
  JUSTICAR,
  INNER_CIRCLE,
  BARON,
  BISHOP,
  ARCHBISHOP,
  PRISCUS,
  CARDINAL,
  REGENT,
  MAGAJI,
  VOTE_1,
  VOTE_2,
} from '@/utils/constants';

const ResultCryptTitle = ({ value, noTitle }) => {
  const titles = {
    [PRIMOGEN]: ['Primogen', 'Pg'],
    [PRINCE]: ['Prince', 'Pc'],
    [JUSTICAR]: ['Justicar', 'Js'],
    [INNER_CIRCLE]: ['Inner Circle', 'IC'],
    [BARON]: ['Baron', 'Br'],
    [VOTE_1]: ['1 vote (titled)', '1v'],
    [VOTE_2]: ['2 votes (titled)', '2v'],
    [BISHOP]: ['Bishop', 'Bs'],
    [ARCHBISHOP]: ['Archbishop', 'Ar'],
    [PRISCUS]: ['Priscus', 'Ps'],
    [CARDINAL]: ['Cardinal', 'Cr'],
    [REGENT]: ['Regent', 'Rg'],
    [MAGAJI]: ['Magaji', 'Mj'],
    [TITLED]: ['Titled', 'T'],
  };

  return (
    <div
      className="text-fg-fgSecondary inline dark:text-fgSecondaryDark"
      title={noTitle ? null : titles[value][0]}
    >
      {titles[value][1]}
    </div>
  );
};

export default ResultCryptTitle;
