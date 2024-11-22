import React from 'react';
import { useNavigate } from 'react-router';
import PeopleFill from '@/assets/images/icons/people-fill.svg?react';
import { ButtonIconed } from '@/components';
import { useApp } from '@/context';
import { PUBLIC_PARENT, PUBLIC_CHILD } from '@/constants';

const DeckPublicSwitchButton = ({ deck }) => {
  const { isDesktop } = useApp();
  const navigate = useNavigate();
  const isChild = !!deck[PUBLIC_PARENT];

  const handleClick = () => {
    navigate(`/decks/${isChild ? deck[PUBLIC_PARENT] : deck[PUBLIC_CHILD]}`);
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
