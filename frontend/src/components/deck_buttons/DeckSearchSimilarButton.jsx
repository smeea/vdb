import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import SymmetryVertical from '@/assets/images/icons/symmetry-vertical.svg?react';
import { MenuItems, MenuItem, MenuButton } from '@/components';
import { useApp, clearSearchForm, searchTwdForm, searchPdaForm } from '@/context';
import { TWD, PDA } from '@/utils/constants';

const DeckSearchSimilarButton = ({ deck }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const navigate = useNavigate();

  const handleClick = (target) => {
    clearSearchForm(target);
    if (target === PDA) {
      searchPdaForm.similar = deck.deckid;
    } else {
      searchTwdForm.similar = deck.deckid;
    }
    navigate(`/${target}?q={"similar"%3A"${deck.deckid}"}`);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton
        title="Search similar Decks in TWD/PDA"
        icon={<SymmetryVertical />}
        variant={isDesktop ? 'secondary' : 'primary'}
        text="Similar Decks"
      />
      <MenuItems>
        <MenuItem
          title="Search similar Decks in Tournament Winning Decks Archive"
          onClick={() => handleClick(TWD)}
        >
          Search in TWD
        </MenuItem>
        <MenuItem
          title="Search similar Decks in Public Decks Archive"
          onClick={() => handleClick(PDA)}
        >
          Search in PDA
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default DeckSearchSimilarButton;
