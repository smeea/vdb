import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import NodePlusFill from '../../assets/images/icons/node-plus-fill.svg';
import AppContext from '../../context/AppContext';

function DeckBranchCreate(props) {
  const { setActiveDeck, isMobile } = useContext(AppContext);

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
      .then(() => setActiveDeck({ src: 'my', deckid: newdeckid }))
      .then(() => isMobile && props.setShowButtons(false));
  };

  return (
    <>
      <Button variant="outline-secondary" onClick={branchCreate} block>
        <NodePlusFill width="21" height="21" viewBox="0 0 16 16" /> New Revision
      </Button>
    </>
  );
}

export default DeckBranchCreate;
