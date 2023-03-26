import React from 'react';
import { useNavigate } from 'react-router-dom';
import NodePlusFill from '@/assets/images/icons/node-plus-fill.svg';
import { deckStore, useApp } from '@/context';
import { ButtonIconed } from '@/components';

const DeckBranchCreateButton = ({ deck }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const navigate = useNavigate();

  const branchCreate = () => {
    const master = deck.master ? deck.master : deck.deckid;
    const url = `${import.meta.env.VITE_API_URL}/deck/${master}/branch`;

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
        deckStore.decks[master].master = null;
        deckStore.decks[master].isBranches = true;
        deckStore.decks[master].branches = deckStore.decks[master].branches
          ? [...deckStore.decks[master].branches, data[0].deckid]
          : [data[0].deckid];

        deckStore.decks[data[0].deckid] = {
          ...deck,
          deckid: data[0].deckid,
          description: `[${now.toISOString().split('T')[0]}] \n${
            deck.description
          }`,
          crypt: { ...deck.crypt },
          library: { ...deck.library },
          inventoryType: '',
          master: master,
          branchName: data[0].branchName,
          isPublic: false,
          isBranches: true,
          timestamp: now.toUTCString(),
        };
        navigate(`/decks/${data[0].deckid}`);
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
      });
  };

  return (
    <ButtonIconed
      variant={isDesktop ? 'secondary' : 'primary'}
      onClick={branchCreate}
      title="Create New Revision of the Deck"
      icon={<NodePlusFill width="21" height="21" viewBox="0 0 16 16" />}
      text="New Revision"
    />
  );
};

export default DeckBranchCreateButton;
