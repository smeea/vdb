import React from 'react';
import NodePlusFill from 'assets/images/icons/node-plus-fill.svg';
import { useApp } from 'context';
import { ButtonIconed } from 'components';

const DeckBranchCreateButton = ({ deck }) => {
  const {
    setDecks,
    setActiveDeck,
    setShowFloatingButtons,
    setShowMenuButtons,
  } = useApp();

  const branchCreate = () => {
    const master = deck.master ? deck.master : deck.deckid;
    const url = `${process.env.API_URL}deck/${master}/branch`;

    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deckid: deck.deckid,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        const now = new Date();
        setDecks((prevState) => ({
          ...prevState,
          [master]: {
            ...prevState[master],
            branches: prevState[master].branches
              ? [...prevState[master].branches, data[0].deckid]
              : [data[0].deckid],
          },
          [data[0].deckid]: {
            ...deck,
            deckid: data[0].deckid,
            crypt: { ...deck.crypt },
            library: { ...deck.library },
            inventoryType: '',
            master: master,
            branchName: data[0].branch_name,
            timestamp: now.toUTCString(),
          },
        }));
        setActiveDeck({ src: 'my', deckid: data[0].deckid });
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
      });
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
