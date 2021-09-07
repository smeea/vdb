import React from 'react';
import Hammer from '../../assets/images/icons/hammer.svg';

function ResultCryptName(props) {
  const imgClass = 'advanced-image-results';
  let imgSrc = '';
  let imgTitle = '';
  if (props.card['Adv']) {
    imgSrc = `${process.env.ROOT_URL}images/misc/advanced.svg`;
    imgTitle = 'Advanced';
  }

  return (
    <>
      <div className="d-inline name">
        {props.card['Banned'] ? (
          <strike>{props.card['Name']}</strike>
        ) : (
          <>{props.card['Name']}</>
        )}
        {props.card['Adv'] && (
          <span className="pl-1">
            <img className={imgClass} src={imgSrc} title={imgTitle} />
          </span>
        )}
        {props.card['Banned'] && (
          <span className="pl-1">
            <Hammer />
          </span>
        )}
      </div>
    </>
  );
}

export default ResultCryptName;
