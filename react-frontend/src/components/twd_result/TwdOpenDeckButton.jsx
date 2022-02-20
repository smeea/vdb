import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PlayFill from 'assets/images/icons/play-fill.svg';
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
      <div className="d-flex justify-content-center align-items-center">
        <div className="pe-2">
          <PlayFill height="18" viewBox="0 0 12 14" />
        </div>
        Open
      </div>
    </Button>
  );
}

export default TwdOpenDeckButton;
