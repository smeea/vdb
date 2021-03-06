import React from 'react';

function ResultCryptClan(props) {
  const imgClass = 'clan-image-results';
  const imgSrc = `${
    process.env.ROOT_URL
  }images/clans/${props.value.toLowerCase().replace(/[\s,:!?'.\-]/g, '')}.svg`;

  if (props.total > 0) {
    return (
      <div className="d-flex align-items-center">
        <span className="clan">
          <img className={imgClass} src={imgSrc} title={props.value} />
        </span>
        <div className="px-1">
          {props.value} [{props.total}]
        </div>
      </div>
    );
  } else if (props.total == 0) {
    return (
      <div className="d-flex align-items-center">
        <span className="clan">
          <img className={imgClass} src={imgSrc} title={props.value} />
        </span>
        <div className="px-1">{props.clan}</div>
      </div>
    );
  } else {
    return (
      <span className="clan">
        <img className={imgClass} src={imgSrc} title={props.value} />
      </span>
    );
  }
}

export default ResultCryptClan;
