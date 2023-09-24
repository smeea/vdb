import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import NodePlusFill from '@/assets/images/icons/node-plus-fill.svg?react';
import {
  DeckSelectAdvModal,
  MenuItems,
  MenuItem,
  MenuButton,
} from '@/components';
import { deckStore, useApp } from '@/context';

const DeckBranchCreateButton = ({ deck }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const navigate = useNavigate();
  const [showSelect, setShowSelect] = useState();

  const master = deck.master ? deck.master : deck.deckid;
  const url = `${import.meta.env.VITE_API_URL}/deck/${master}/branch`;

  const branchCreate = (d) => {
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deckid: d.deckid,
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
            d.description
          }`,
          crypt: { ...d.crypt },
          library: { ...d.library },
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
    <>
      <Menu as="div" className="relative">
        <MenuButton
          title="Create New Revision of the Deck"
          icon={<NodePlusFill width="21" height="21" viewBox="0 0 16 16" />}
          variant={isDesktop ? 'secondary' : 'primary'}
          text="Add Revision"
        />
        <MenuItems>
          <MenuItem onClick={() => branchCreate(deck)}>
            From Active Deck
          </MenuItem>
          <MenuItem onClick={() => setShowSelect(true)}>
            Select From Decks
          </MenuItem>
        </MenuItems>
      </Menu>
      {showSelect && (
        <DeckSelectAdvModal
          setShow={setShowSelect}
          onClick={branchCreate}
          short
        />
      )}
    </>
  );
};

export default DeckBranchCreateButton;
