import React from 'react';
import NodePlusFill from 'assets/images/icons/node-plus-fill.svg';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckBranchCreateButton = (props) => {
  const { getDecks, setActiveDeck, isMobile } = useApp();

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
      .then(() => getDecks())
      .then(() => setActiveDeck({ src: 'my', deckid: newdeckid }))
      .then(() => isMobile && props.setShowButtons(false));
  };

  return (
    <ButtonIconed
      variant="secondary"
      onClick={branchCreate}
      title="Create New Revision of the Deck"
      icon={<NodePlusFill width="21" height="21" viewBox="0 0 16 16" />}
      text="New Revision"
    />
  );
};

export default DeckBranchCreateButton;
