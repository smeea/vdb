import React from 'react';

const ResultCryptTitle = ({ value, noTitle }) => {
  const titles = {
    primogen: ['Primogen', 'Pg'],
    prince: ['Prince', 'Pc'],
    justicar: ['Justicar', 'Js'],
    'inner circle': ['Inner Circle', 'IC'],
    baron: ['Baron', 'Br'],
    '1 vote': ['1 vote (titled)', '1v'],
    '2 votes': ['2 votes (titled)', '2v'],
    bishop: ['Bishop', 'Bs'],
    archbishop: ['Archbishop', 'Ar'],
    priscus: ['Priscus', 'Ps'],
    cardinal: ['Cardinal', 'Cr'],
    regent: ['Regent', 'Rg'],
    magaji: ['Magaji', 'Mj'],
  };

  return (
    <div
      className="inline text-fg-fgSecondary dark:text-fgSecondaryDark"
      title={noTitle ? null : titles[value][0]}
    >
      {titles[value][1]}
    </div>
  );
};

export default ResultCryptTitle;
