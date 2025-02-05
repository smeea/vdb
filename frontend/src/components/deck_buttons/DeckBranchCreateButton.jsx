import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { useNavigate } from 'react-router';
import NodePlusFill from '@icons/node-plus-fill.svg?react';
import { DeckSelectAdvModal, MenuItems, MenuItem, MenuButton } from '@/components';
import { deckServices } from '@/services';
import { useApp } from '@/context';

const DeckBranchCreateButton = ({ deck }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const navigate = useNavigate();
  const [showSelect, setShowSelect] = useState();

  const handleShowAdv = () => setShowSelect(true);

  const handleClick = (branch) => {
    deckServices
      .branchCreate(deck, branch)
      .then((newDeckid) => {
        navigate(`/decks/${newDeckid}`);
      })
      .finally(() => {
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
      });
  };

  return (
    <>
      <Menu>
        <MenuButton
          title="Create New Revision of the Deck"
          icon={<NodePlusFill width="21" height="21" viewBox="0 0 16 16" />}
          variant={isDesktop ? 'secondary' : 'primary'}
          text="Add Revision"
        />
        <MenuItems>
          <MenuItem onClick={() => handleClick(deck)}>From Active Deck</MenuItem>
          <MenuItem onClick={handleShowAdv}>Select From Decks</MenuItem>
        </MenuItems>
      </Menu>
      {showSelect && <DeckSelectAdvModal setShow={setShowSelect} onClick={handleClick} short />}
    </>
  );
};

export default DeckBranchCreateButton;
