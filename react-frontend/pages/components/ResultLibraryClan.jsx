import React from 'react';

function ResultLibraryClan(props) {
  const imgClass = 'clan-image-results';
  let clanImages = null;

  if (props.value.indexOf('/') != -1) {
    const clans = props.value.split('/');
    let items = clans.length;
    clanImages = clans.map((clan, index) => {
      const imgSrc =
        process.env.ROOT_URL +
        'images/clans/' +
        clan.toLowerCase().replace(/[\s,:!?'.\-]/g, '') +
        '.gif';

      if (items > 1) {
        items -= 1;
        return (
          <span key={index}>
            <img className={imgClass} src={imgSrc} />
            {' / '}
          </span>
        );
      } else {
        return (
          <span key={index}>
            <img className={imgClass} src={imgSrc} title={props.value} />
          </span>
        );
      }
    });
  } else if (props.value) {
    const imgSrc =
      process.env.ROOT_URL +
      'images/clans/' +
      props.value.toLowerCase().replace(/[\s,:!?'.\-]/g, '') +
      '.gif';
    clanImages = <img className={imgClass} src={imgSrc} title={props.value} />;
  }

  return <span className="clan">{clanImages}</span>;
}

export default ResultLibraryClan;
