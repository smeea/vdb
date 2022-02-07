import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PlayCircleFill from 'assets/images/icons/play-circle-fill.svg';
import { useApp } from 'context';

function TwdOpenDeckButton(props) {
  const { setActiveDeck } = useApp();
  const navigate = useNavigate();

  const handleClick = () => {
    setActiveDeck({
      src: props.inPda ? 'shared' : 'twd',
      deckid: props.deckid,
    });
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
