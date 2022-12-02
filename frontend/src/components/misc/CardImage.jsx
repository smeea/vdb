import React from 'react';
import { useApp } from 'context';

const CardImage = ({ card, set, className, onClick }) => {
  const { lang } = useApp();

  let imgEnSrc = null;
  if (card.Id > 200000) {
    imgEnSrc = `${process.env.ROOT_URL}images/cards/en-EN/${card['ASCII Name']
      .toLowerCase()
      .replace(/[\s,:!?'".\-\(\)\/]/g, '')}g${card.Group.toLowerCase()}${
      card.Adv[0] ? 'adv' : ''
    }`;
  } else {
    imgEnSrc = `${process.env.ROOT_URL}images/cards/en-EN/${card['ASCII Name']
      .toLowerCase()
      .replace(/[\s,:!?'".\-\(\)\/]/g, '')}`;
  }

  let imgSrc = null;
  if (lang !== 'en-EN' || set) {
    if (card.Id > 200000) {
      imgSrc = `${process.env.ROOT_URL}images/cards/${
        set ? `set/${set}` : lang
      }/${card['ASCII Name']
        .toLowerCase()
        .replace(/[\s,:!?'".\-\(\)\/]/g, '')}g${card.Group.toLowerCase()}${
        card.Adv[0] ? 'adv' : ''
      }`;
    } else {
      imgSrc = `${process.env.ROOT_URL}images/cards/${
        set ? `set/${set}` : lang
      }/${card['ASCII Name']
        .toLowerCase()
        .replace(/[\s,:!?'".\-\(\)\/]/g, '')}`;
    }
  }

  const resetImgSrc = (event) => {
    if (event.target.src != `${imgEnSrc}.jpg`) {
      event.target.src = `${imgEnSrc}.jpg`;
    }
  };

  return (
    <>
      {lang !== 'en-EN' || set ? (
        <img
          className={className ?? 'h-[420px]'}
          src={`${imgSrc}.jpg`}
          alt={card['Name']}
          onClick={onClick}
          onError={resetImgSrc}
        />
      ) : (
        <picture>
          <source
            media="(max-width: 576px)"
            srcSet={`${imgEnSrc}.webp`}
            type="image/webp"
          />
          <img
            className={className ?? 'h-[420px]'}
            src={`${imgEnSrc}.jpg`}
            alt={card['Name']}
            onClick={onClick}
          />
        </picture>
      )}
    </>
  );
};

export default CardImage;
