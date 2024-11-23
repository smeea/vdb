import React, { useState } from 'react';
import Star from '@/assets/images/icons/star.svg?react';
import StarFill from '@/assets/images/icons/star-fill.svg?react';
import { useApp } from '@/context';
import { ButtonIconed } from '@/components';
import { miscServices } from '@/services';
import { DECKID, FAVORITED_BY } from '@/constants';
const IS_FAVORITED = 'isFavorited';

const PdaFavoriteButton = ({ deck }) => {
  const { username } = useApp();
  const [isFavorited, setIsFavorited] = useState(deck[IS_FAVORITED]);
  const [favoritedBy, setFavoritedBy] = useState(deck[FAVORITED_BY]);

  const handleClick = () => {
    if (!username) return;

    miscServices.pdaToggle(deck[DECKID], deck[IS_FAVORITED]).then(() => {
      setIsFavorited(!isFavorited);
      setFavoritedBy((prevState) => (isFavorited ? prevState - 1 : prevState + 1));
    });
  };

  return (
    <ButtonIconed
      variant={isFavorited ? 'third' : 'primary'}
      className="w-full"
      onClick={handleClick}
      icon={isFavorited ? <StarFill /> : <Star />}
      text={favoritedBy}
    />
  );
};

export default PdaFavoriteButton;
