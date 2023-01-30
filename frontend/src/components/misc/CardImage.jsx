import React from 'react';
import { useApp } from '@/context';
import { useCardImageUrl } from '@/hooks';

const CardImage = ({ card, set, className, onClick }) => {
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
          className={className ?? 'min-w-[358px]'}
          src={`${otherUrl}.jpg`}
          alt={card['Name']}
          onClick={onClick}
          onError={resetImgSrc}
        />
      ) : (
        <picture className={className ?? 'min-w-[358px]'}>
          <source
            media="(max-width: 576px)"
            srcSet={`${baseUrl}.webp`}
            type="image/webp"
          />
          <img
            className={className ?? 'min-w-[358px]'}
            src={`${baseUrl}.jpg`}
            alt={card['Name']}
            onClick={onClick}
          />
        </picture>
      )}
    </>
  );
};

export default CardImage;
