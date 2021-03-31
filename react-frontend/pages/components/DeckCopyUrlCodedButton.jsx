import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ShareFill from '../../assets/images/icons/share-fill.svg';

function DeckCopyUrlCodedButton(props) {
  const cards = [];

  Object.keys(props.deck.crypt).map((card) => {
    cards.push(`${card}=${props.deck.crypt[card].q};`);
  });
  Object.keys(props.deck.library).map((card) => {
    cards.push(`${card}=${props.deck.library[card].q};`);
  });

  const info = [];
  props.deck.name && info.push(encodeURI(`name=${props.deck.name}`));
  props.deck.author && info.push(encodeURI(`author=${props.deck.author}`));
  props.deck.description &&
    info.push(
      encodeURI(`description=${props.deck.description.substring(0, 7168)}`)
        .replace(/#/g, '%23')
        .replace(/&/g, '%26')
        .replace(/,/g, '%2C')
    );

  const url = `${process.env.ROOT_URL}decks?${info
    .toString()
    .replace(/,/g, '&')}#${cards
    .toString()
    .replace(/,/g, '')
    .replace(/;$/, '')}`;

  const handleButton = () => {
    navigator.clipboard.writeText(url);
    setState(true);
    setTimeout(() => {
      setState(false);
      props.isMobile && props.setShowButtons(false);
    }, 1000);
  };

  const [state, setState] = useState(false);

  return (
    <Button
      variant={state ? 'success' : 'outline-secondary'}
      onClick={handleButton}
      block
    >
      <ShareFill /> {state ? 'Copied' : 'Copy Deck-in-URL'}
    </Button>
  );
}

export default DeckCopyUrlCodedButton;
