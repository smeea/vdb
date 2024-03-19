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
import { deckServices } from '@/services';
import { useApp } from '@/context';

const DeckBranchCreateButton = ({ deck }) => {
  const { isDesktop, setShowMenuButtons } = useApp();
  const navigate = useNavigate();
  const [showSelect, setShowSelect] = useState();

  const handleClick = (branch) => {
    deckServices.branchCreate(deck, branch).then((newDeckid) => {
      navigate(`/decks/${newDeckid}`);
      setShowMenuButtons(false);
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
          <MenuItem onClick={() => handleClick(deck)}>
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
          onClick={handleClick}
          short
        />
      )}
    </>
  );
};

export default DeckBranchCreateButton;
