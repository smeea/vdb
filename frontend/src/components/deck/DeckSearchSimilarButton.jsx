import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
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

  const ButtonOptions = (
    <>
      <Dropdown.Item
        onClick={() => handleClick('twd')}
        title="Search similar Decks in Tournament Winning Decks Archive"
      >
        Search in TWD
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => handleClick('pda')}
        title="Search similar Decks in Public Decks Archive"
      >
        Search in PDA
      </Dropdown.Item>
    </>
  );

  return (
    <DropdownButton
      as={ButtonGroup}
      variant="secondary"
      title={
        <div
          title="Search similar Decks in TWD/PDA"
          className="flex justify-center items-center"
        >
          <div className="flex pe-2">
            <SymmetryVertical />
          </div>
          Similar Decks
        </div>
      }
    >
      {ButtonOptions}
    </DropdownButton>
  );
};

export default DeckSearchSimilarButton;
