import React from 'react';

function ResultCryptClan(props) {
  const imgClass = 'clan-image-results';
  const imgSrc = '/images/clans/' + props.value.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif';

  return (
    <span className='clan'>
      <img className={imgClass} src={imgSrc} title={props.value} />
    </span>
  );
}

export default ResultCryptClan;
