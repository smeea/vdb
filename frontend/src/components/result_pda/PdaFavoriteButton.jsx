import React, { useState } from 'react';
import Star from '@/assets/images/icons/star.svg?react';
import StarFill from '@/assets/images/icons/star-fill.svg?react';
import { useApp } from '@/context';
import { ButtonIconed } from '@/components';

const PdaFavoriteButton = ({ deck }) => {
  const { username } = useApp();
  const [isFavorited, setIsFavorited] = useState(deck.isFavorited);
  const [favoritedBy, setFavoritedBy] = useState(deck.favoritedBy);

  const handleClick = () => {
    if (!username) return;

    const url = `${import.meta.env.VITE_API_URL}/pda/favorite/${deck.deckid}`;
    const options = {
      method: isFavorited ? 'DELETE' : 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, options).then(() => {
      setIsFavorited(!isFavorited);
      setFavoritedBy((prevState) =>
        isFavorited ? prevState - 1 : prevState + 1,
      );
    });
  };

  return (
    <ButtonIconed
      variant={isFavorited ? 'third' : 'primary'}
      onClick={handleClick}
      icon={isFavorited ? <StarFill /> : <Star />}
      text={favoritedBy}
    />
  );
};

export default PdaFavoriteButton;
