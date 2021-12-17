import React from 'react';
import { ResultClanImage } from 'components';

function ResultLibraryClan(props) {
  let clanImages = null;

  if (props.value.indexOf('/') != -1) {
    const clans = props.value.split('/');
    let items = clans.length;
    clanImages = clans.map((clan, index) => {
      if (items > 1) {
        items -= 1;
        return (
          <span key={index}>
            <ResultClanImage value={clan} />
            {' / '}
          </span>
        );
      } else {
        return (
          <span key={index}>
            <ResultClanImage value={clan} />
          </span>
        );
      }
    });
  } else if (props.value) {
    clanImages = <ResultClanImage value={props.value} />;
  }

  return <span className="clan">{clanImages}</span>;
}

export default ResultLibraryClan;
