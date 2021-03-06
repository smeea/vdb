import React from 'react';
import { Button } from 'react-bootstrap';
import NodePlusFill from '../../assets/images/icons/node-plus-fill.svg';

function DeckBranchCreate(props) {
  const branchCreate = () => {
    let newdeckid;
    const url = `${process.env.API_URL}branch/create`;

    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        master: props.deck.master ? props.deck.master : props.deck.deckid,
        source: props.deck.deckid,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) newdeckid = data.deckid;
      })
      .then(() => props.getDecks())
      .then(() => props.setActiveDeck({ src: 'my', deckid: newdeckid }))
      .then(() => props.isMobile && props.setShowInfo(true));
  };

  return (
    <>
      <Button variant="outline-secondary" onClick={branchCreate} block>
        <NodePlusFill /> New Revision
      </Button>
    </>
  );
}

export default DeckBranchCreate;
