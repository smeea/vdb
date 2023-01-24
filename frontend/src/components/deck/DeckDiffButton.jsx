import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlusSlashMinus from '@/assets/images/icons/plus-slash-minus.svg';
import { useApp } from '@/context';
import { ButtonIconed } from '@/components';

const DeckDiffButton = ({ deckid }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const navigate = useNavigate();

  return (
    <ButtonIconed
      variant="secondary"
      onClick={() => {
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
        navigate(`/diff/${deckid}/${deckid}`);
      }}
      title="Compare Decks"
      icon={<PlusSlashMinus />}
      text="Compare"
    />
  );
};

export default DeckDiffButton;
