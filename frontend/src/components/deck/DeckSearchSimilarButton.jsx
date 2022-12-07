import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import SymmetryVertical from 'assets/images/icons/symmetry-vertical.svg';
import { useApp } from 'context';
import { clearSearchForm, searchTwdForm, searchPdaForm } from 'context';

const DeckSearchSimilarButton = ({ deck }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const navigate = useNavigate();

  const handleClick = (target) => {
    clearSearchForm(target);
    if (target === 'pda') {
      searchPdaForm.similar = deck.deckid;
    } else {
      searchTwdForm.similar = deck.deckid;
    }
    navigate(`/${target}?q={"similar"%3A"${deck.deckid}"}`);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <Menu>
      <Menu.Button>
        {/* variant="secondary" */}
        <div
          title="Search similar Decks in TWD/PDA"
          className="flex items-center justify-center"
        >
          <div className="pe-2 flex">
            <SymmetryVertical />
          </div>
          Similar Decks
        </div>
      </Menu.Button>
      <Menu.Items>
        <Menu.Item title="Search similar Decks in Tournament Winning Decks Archive">
          <div onClick={() => handleClick('twd')}>Search in TWD</div>
        </Menu.Item>
        <Menu.Item title="Search similar Decks in Public Decks Archive">
          <div onClick={() => handleClick('pda')}>Search in PDA</div>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default DeckSearchSimilarButton;
