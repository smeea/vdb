import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Files from '@/assets/images/icons/files.svg?react';
import { useApp } from '@/context';
import { deckServices } from '@/services';
import { ButtonIconed } from '@/components';

const DeckCloneButton = ({ deck, inTwdPda, noText }) => {
  const { isDesktop, setShowMenuButtons } = useApp();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    deckServices.deckClone(deck).then((deckid) => {
      if (!inTwdPda) navigate(`/decks/${deckid}`);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setShowMenuButtons(false);
      }, 1000);
    });
  };

  return (
    <ButtonIconed
      className="w-full"
      variant={success ? 'success' : inTwdPda || noText || !isDesktop ? 'primary' : 'secondary'}
      onClick={handleClick}
      title="Clone Deck to your account for editing"
      icon={<Files />}
      text={!noText && (success ? 'Cloned' : 'Clone')}
    />
  );
};

export default DeckCloneButton;
