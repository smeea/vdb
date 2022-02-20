import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Star from 'assets/images/icons/star.svg';
import StarFill from 'assets/images/icons/star-fill.svg';

function PdaFavoriteButton(props) {
  const [isFavorited, setIsFavorited] = useState(props.deck.isFavorited);

  const handleClick = () => {
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
    });
  };

  return (
    <Button onClick={handleClick} variant="secondary">
      <div className="d-flex justify-content-center align-items-center">
        <div className="pe-2">{isFavorited ? <StarFill /> : <Star />}</div>
        {isFavorited ? 'Favorite' : 'Add to Favorite'}
      </div>
    </Button>
  );
}

export default PdaFavoriteButton;
