import React from 'react';
import { useNavigate } from 'react-router-dom';
import PeopleFill from '@/assets/images/icons/people-fill.svg';
import { ButtonIconed } from '@/components';

const DeckPublicSwitchButton = ({ deck }) => {
  const navigate = useNavigate();
  const isChild = Boolean(deck.publicParent);

  const handleSwitch = () => {
    navigate(`/decks/${isChild ? deck.publicParent : deck.publicChild}`);
  };

  return (
    <ButtonIconed
      variant="secondary"
      onClick={() => handleSwitch(deck.deckid)}
      title={isChild ? 'Go to Main Deck' : 'Go to Public Deck'}
      text={isChild ? 'Go to Main Deck' : 'Go to Public Deck'}
      icon={<PeopleFill />}
    />
  );
};

export default DeckPublicSwitchButton;
