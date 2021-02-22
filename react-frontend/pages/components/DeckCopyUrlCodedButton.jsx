import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ShareFill from '../../assets/images/icons/share-fill.svg';

function DeckCopyUrlCodedButton(props) {
  const cards = []

  Object.keys(props.deck.crypt).map(card => {
    cards.push(`${card}=${props.deck.crypt[card].q};`)
  });
  Object.keys(props.deck.library).map(card => {
    cards.push(`${card}=${props.deck.library[card].q};`)
  });

  const description = []
  props.deck.name && description.push(`name=${props.deck.name}`);
  props.deck.author && description.push(`author=${props.deck.author}`);
  props.deck.description && description.push(`description=${props.deck.description}`);

  const url = `${process.env.ROOT_URL}decks?${description.toString().replace(/,/g, "&").replace(/ /g, "%20")}#${cards.toString().replace(/,/g, "").replace(/;$/, "")}`;

  const handleButton = () => {
    navigator.clipboard.writeText(url);
    setState(true);
    setTimeout(() => {
      setState(false);
      props.setShowButtons(false);
    }, 1000);
  };

  const [state, setState] = useState(false);

  return (
    <Button variant={state ? "success" : "outline-secondary"} onClick={handleButton} block>
      <ShareFill /> {state ? "Copied" : "Copy Deck-in-URL"}
    </Button>
  );
}

export default DeckCopyUrlCodedButton;
