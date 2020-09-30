import React from 'react';


function ResultLibraryClan(props) {

  const imgClass='clan-image-results';
  let clan_images = null;

  if (props.value.indexOf('/') != -1) {
    const clans = props.value.split('/');
    let items = clans.length;
    clan_images = clans.map((clan, index) => {
      const imgSrc = '/images/clans/' + clan.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif';

      if (items > 1) {
        items -= 1;
        return (
          <span key={index}>
            <img className={imgClass} src={imgSrc} />{' / '}
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
    const imgSrc = '/images/clans/' + props.value.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif';
    clan_images =
      <img className={imgClass} src={imgSrc} title={props.value} />;
  }

  return (
    <span className='clan'>
      {clan_images}
    </span>
  );
}

export default ResultLibraryClan;
