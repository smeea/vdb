import React from 'react';
import { ResultClanImage } from 'components';

const ResultLibraryClan = ({ value }) => {
  let clanImages = null;

  if (value.indexOf('/') != -1) {
    const clans = value.split('/');
    let items = clans.length;
    clanImages = clans.map((clan, index) => {
      if (items > 1) {
        items -= 1;
        return (
          <React.Fragment key={index}>
            <ResultClanImage value={clan} />
            {' / '}
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={index}>
            <ResultClanImage value={clan} />
          </React.Fragment>
        );
      }
    });
  } else if (value) {
    clanImages = <ResultClanImage value={value} />;
  }

  return <>{clanImages}</>;
};

export default ResultLibraryClan;
