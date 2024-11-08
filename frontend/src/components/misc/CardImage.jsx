import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useApp } from '@/context';
import { useCardImageUrl } from '@/hooks';
import { NAME, CLAN, ID, EN } from '@/constants';
import legacyImagesClans from '@/assets/data/legacyImagesClansList.json';

const CardImage = ({ card, set, className = 'max-sm:w-full', size = 'md', onClick }) => {
  const { lang, showLegacyImage } = useApp();
  const { baseUrl, otherUrl, legacyUrl } = useCardImageUrl(card, set, lang);
  const hasLegacyImage = card[ID] > 200000 && legacyImagesClans.includes(card[CLAN]);
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
      {set || lang != EN ? (
        <img
          className={twMerge(sizeStyle[size], className)}
          src={`${otherUrl}.jpg?v=${import.meta.env.VITE_IMAGE_VERSION}`}
          alt={card[NAME]}
          onClick={onClick}
          onError={resetImgSrc}
        />
      ) : (
        <picture>
          <source
            media="(max-width: 576px)"
            srcSet={`${url}.webp?v=${import.meta.env.VITE_IMAGE_VERSION}`}
            type="image/webp"
          />
          <img
            className={twMerge(sizeStyle[size], className)}
            src={`${url}.jpg?v=${import.meta.env.VITE_IMAGE_VERSION}`}
            alt={card[NAME]}
            onClick={onClick}
            onError={resetImgSrc}
          />
        </picture>
      )}
    </>
  );
};

export default CardImage;
