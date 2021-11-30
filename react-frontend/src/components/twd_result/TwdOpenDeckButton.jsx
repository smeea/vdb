import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PlayCircleFill from 'assets/images/icons/play-circle-fill.svg';
import AppContext from 'context/AppContext';

function TwdOpenDeckButton(props) {
  const { setActiveDeck } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setActiveDeck({ src: 'twd', deckid: props.deckid });
    navigate(`/decks?id=${props.deckid}`);
  };

  return (
    <Button onClick={handleClick} variant="secondary">
      <PlayCircleFill />
      <span className="ps-1">Open Deck</span>
    </Button>
  );
}

export default TwdOpenDeckButton;
