import React from 'react';
import { useNavigate } from 'react-router';
import PlusSlashMinus from '@/assets/images/icons/plus-slash-minus.svg?react';
import { useApp } from '@/context';
import { ButtonIconed } from '@/components';

const DeckDiffButton = ({ deckid }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const navigate = useNavigate();
  const handleClick = () => {
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
    navigate(`/diff/${deckid}/${deckid}`);
  };

  return (
    <ButtonIconed
      variant={isDesktop ? 'secondary' : 'primary'}
      onClick={handleClick}
      title="Compare Decks"
      icon={<PlusSlashMinus />}
      text="Compare"
    />
  );
};

export default DeckDiffButton;
