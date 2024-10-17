import React from 'react';
import { useApp } from '@/context';
import { useCardImageUrl } from '@/hooks';
import { EN } from '@/utils/constants';

const legacyImagesClans = [
  'Abomination',
  'Ahrimane',
  'Baali',
  'Banu Haqim',
  'Blood Brother',
  'Caitiff',
  'Daughter of Cacophony',
  'Gargoyle',
  'Giovanni',
  'Harbinger of Skulls',
  'Kiasyd',
  'Ministry',
  'Nagaraja',
  'Pander',
  'Ravnos',
  'Salubri antitribu',
  'Salubri',
  'Samedi',
  'Toreador',
  'Tremere',
  'True Brujah',
  'Tzimisce',
  'Ventrue',
];

const CardImage = ({ card, set, className = 'max-sm:w-full', size = 'md', onClick }) => {
  const { lang, showLegacyImage } = useApp();
  const { baseUrl, otherUrl, legacyUrl } = useCardImageUrl(card, set, lang);
  const hasLegacyImage = card.Id > 200000 && legacyImagesClans.includes(card.Clan);
  const url = showLegacyImage && hasLegacyImage ? legacyUrl : lang == EN ? baseUrl : otherUrl;

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
      {set ? (
        <img
          className={`${sizeStyle[size]} ${className}`}
          src={`${otherUrl}.jpg?v=${import.meta.env.VITE_IMAGE_VERSION}`}
          alt={card.Name}
          onClick={onClick}
          onError={resetImgSrc}
        />
      ) : (
        <picture>
          <source
            media="(max-width: 576px)"
            srcSet={`${url}.webp?v=${import.meta.env.VITE_IMAGE_VERSION}`}
            type="image/webp"
            onError={resetImgSrc}
          />
          <img
            className={`${sizeStyle[size]} ${className}`}
            src={`${url}.jpg?v=${import.meta.env.VITE_IMAGE_VERSION}`}
            alt={card.Name}
            onClick={onClick}
            onError={resetImgSrc}
          />
        </picture>
      )}
    </>
  );
};

export default CardImage;
