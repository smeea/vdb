import React from 'react';
import { useNavigate } from 'react-router-dom';
import Folder2Open from 'assets/images/icons/folder2-open.svg';
import { useApp } from 'context';
import { ButtonIconed } from 'components';

const DiffBackButton = ({ deckid }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();

  const navigate = useNavigate();

  return (
    <ButtonIconed
      variant="secondary"
      onClick={() => {
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
        navigate(deckid ? `/decks?id=${deckid}` : '/decks');
      }}
      title="Back to Decks"
      icon={<Folder2Open />}
      text="Back to Decks"
    />
  );
};

export default DiffBackButton;
