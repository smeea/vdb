import React from 'react';
import { useNavigate } from 'react-router-dom';
import Folder2Open from '@/assets/images/icons/folder2-open.svg?react';
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
      icon={<Folder2Open />}
      text="Back to Decks"
    />
  );
};

export default DiffBackButton;
