import React from 'react';
import { useApp } from '@/context';
import { useCardImageUrl } from '@/hooks';

const CardImage = ({ card, set, className = 'min-w-[358px]', onClick }) => {
  const { lang } = useApp();
  const { baseUrl, otherUrl } = useCardImageUrl(card, set, lang);

  const resetImgSrc = (event) => {
    if (event.target.src != `${baseUrl}.jpg`) {
      event.target.src = `${baseUrl}.jpg`;
    }
  };

  return (
    <>
      {lang !== 'en-EN' || set ? (
        <img
          className={className}
          src={`${otherUrl}.jpg`}
          alt={card['Name']}
          onClick={onClick}
          onError={resetImgSrc}
        />
      ) : (
        <picture className={className}>
          <source
            media="(max-width: 576px)"
            src={`${baseUrl}.webp?v=${import.meta.env.VITE_CARD_VERSION}`}
            type="image/webp"
          />
          <img
            className={className}
            src={`${baseUrl}.jpg?v=${import.meta.env.VITE_CARD_VERSION}`}
            alt={card['Name']}
            onClick={onClick}
          />
        </picture>
      )}
    </>
  );
};

export default CardImage;
