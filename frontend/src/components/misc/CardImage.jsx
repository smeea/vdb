import React from 'react';
import { useApp } from '@/context';
import { useCardImageUrl } from '@/hooks';
import { EN } from '@/utils/constants';

const CardImage = ({ card, set, className = 'max-sm:w-full', size = 'md', onClick }) => {
  const { lang, showLegacyImage } = useApp();
  const { baseUrl, otherUrl, legacyUrl } = useCardImageUrl(card, set, lang);

  const resetImgSrc = (event) => {
    if (event.target.src != `${baseUrl}.jpg`) {
      event.target.src = `${baseUrl}.jpg`;
    }
  };

  const sizeStyle = {
    sm: 'sm:min-w-[320px] sm:max-w-[320px]',
    md: 'sm:min-w-[358px] sm:max-w-[358px]',
  };

  return (
    <>
      {lang !== EN ||
      set ||
      (showLegacyImage &&
        card.Id > 200000 &&
        [
          'Abomination',
          'Ahrimane',
          'Baali',
          'Blood Brother',
          'Caitiff',
          'Daughter of Cacophony',
          'Gargoyle',
          'Nagaraja',
          'Ravnos',
          'Tzimisce',
        ].includes(card.Clan)) ? (
        <img
          className={`${sizeStyle[size]} ${className}`}
          src={`${set ? otherUrl : showLegacyImage ? legacyUrl : otherUrl}.jpg?v=${import.meta.env.VITE_CARD_VERSION}`}
          alt={card.Name}
          onClick={onClick}
          onError={resetImgSrc}
        />
      ) : (
        <picture>
          <source
            media="(max-width: 576px)"
            src={`${baseUrl}.webp?v=${import.meta.env.VITE_CARD_VERSION}`}
            type="image/webp"
          />
          <img
            className={`${sizeStyle[size]} ${className}`}
            src={`${baseUrl}.jpg?v=${import.meta.env.VITE_CARD_VERSION}`}
            alt={card.Name}
            onClick={onClick}
          />
        </picture>
      )}
    </>
  );
};

export default CardImage;
