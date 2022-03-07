import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Star from 'assets/images/icons/star.svg';
import StarFill from 'assets/images/icons/star-fill.svg';
import { useApp } from 'context';

function PdaFavoriteButton(props) {
  const { username } = useApp();
  const [isFavorited, setIsFavorited] = useState(props.deck.isFavorited);
  const [favoritedBy, setFavoritedBy] = useState(props.deck.favoritedBy);

  const handleClick = () => {
    if (!username) return;

    const url = `${process.env.API_URL}pda/favorite/${props.deck.deckid}`;
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
        isFavorited ? prevState - 1 : prevState + 1
      );
    });
  };

  return (
    <Button onClick={handleClick} variant={isFavorited ? 'third' : 'secondary'}>
      <div className="d-flex justify-content-center align-items-center">
        <div className="pe-1">{isFavorited ? <StarFill /> : <Star />}</div>
        {favoritedBy}
      </div>
    </Button>
  );
}

export default PdaFavoriteButton;
