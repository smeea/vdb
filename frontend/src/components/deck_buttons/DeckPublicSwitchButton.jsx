import React from 'react';
import { useNavigate } from 'react-router-dom';
import PeopleFill from '@/assets/images/icons/people-fill.svg?react';
import { ButtonIconed } from '@/components';
import { useApp } from '@/context';

const DeckPublicSwitchButton = ({ deck }) => {
  const { isDesktop } = useApp();
  const navigate = useNavigate();
  const isChild = !!deck.publicParent;

  const handleClick = () => {
    navigate(`/decks/${isChild ? deck.publicParent : deck.publicChild}`);
  };

  return (
    <ButtonIconed
      variant={isDesktop ? 'secondary' : 'primary'}
      onClick={handleClick}
      title={isChild ? 'Go to Main Deck' : 'Go to Public Deck'}
      text={isChild ? 'Go to Main Deck' : 'Go to Public Deck'}
      icon={<PeopleFill />}
    />
  );
};

export default DeckPublicSwitchButton;
