import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PlayCircleFill from '../../assets/images/icons/play-circle-fill.svg';
import AppContext from '../../context/AppContext';

function TwdOpenDeckButton(props) {
  const { setActiveDeck } = useContext(AppContext);

  const handleClick = () => {
    setActiveDeck({ src: 'twd', deckid: props.deckid });
  };

  return (
    <Link to={`/decks?id=${props.deckid}`} className="noUnderline">
      <Button onClick={handleClick} variant="outline-secondary" block>
        <PlayCircleFill />
        <span className="pl-1">Open Deck</span>
      </Button>
    </Link>
  );
}

export default TwdOpenDeckButton;
