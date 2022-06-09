import React from 'react';
import { useApp } from 'context';

const CardImage = ({ card, set, className, onClick }) => {
  const { lang } = useApp();

  let imgEnSrc = null;
  let imgSrc = null;

  if (card.Id > 200000) {
    imgEnSrc = `${process.env.ROOT_URL}images/cards/en-EN/${card['ASCII Name']
      .toLowerCase()
      .replace(/[\s,:!?'".\-\(\)\/]/g, '')}g${card.Group.toLowerCase()}${
      card.Adv[0] ? 'adv' : ''
    }.jpg`;
    imgSrc = imgEnSrc;
  } else {
    imgEnSrc = `${process.env.ROOT_URL}images/cards/en-EN/${card['ASCII Name']
      .toLowerCase()
      .replace(/[\s,:!?'".\-\(\)\/]/g, '')}.jpg`;
    imgSrc = imgEnSrc;
  }

  if (lang !== 'en-EN' || set) {
    if (card.Id > 200000) {
      imgSrc = `${process.env.ROOT_URL}images/cards/${
        set ? `set/${set}` : lang
      }/${card['ASCII Name'].toLowerCase().replace(/[\s,:!?'".\-\(\)\/]/g, '')}
g${card.Group.toLowerCase()}
${card.Adv[0] ? 'adv' : ''}.jpg`;
    } else {
      imgSrc = `${process.env.ROOT_URL}images/cards/${
        set ? `set/${set}` : lang
      }/${card['ASCII Name']
        .toLowerCase()
        .replace(/[\s,:!?'".\-\(\)\/]/g, '')}.jpg`;
    }
  }

  const resetImgSrc = (event) => {
    if (event.target.src != imgEnSrc) {
      event.target.src = imgEnSrc;
    }
  };

  return (
    <img
      className={className ? className : 'card-popover'}
      src={imgSrc}
      alt={card['Name']}
      onClick={onClick}
      onError={resetImgSrc}
    />
  );
};

export default CardImage;
