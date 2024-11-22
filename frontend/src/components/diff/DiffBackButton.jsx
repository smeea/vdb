import React from 'react';
import { useNavigate } from 'react-router';
import Arrow90DegLeft from '@/assets/images/icons/arrow-90deg-left.svg?react';
import { useApp } from '@/context';
import { ButtonIconed } from '@/components';

const DiffBackButton = ({ deckid }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const navigate = useNavigate();

  return (
    <ButtonIconed
      variant={isDesktop ? 'secondary' : 'primary'}
      onClick={() => {
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
        navigate(deckid ? `/decks/${deckid}` : '/decks');
      }}
      title="Back to Decks"
      icon={<Arrow90DegLeft />}
      text="Back to Decks"
    />
  );
};

export default DiffBackButton;
