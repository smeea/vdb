import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PlayCircleFill from '../../assets/images/icons/play-circle-fill.svg';

function TwdOpenDeckButton({ deckid }) {
  const deckUrl = `/decks?id=${deckid}`;

  return (
    <Link to={deckUrl} className="noUnderline">
      <Button variant="outline-secondary" block>
        <PlayCircleFill />
        <span className="pl-1">Open Deck</span>
      </Button>
    </Link>
  );
}

export default TwdOpenDeckButton;
