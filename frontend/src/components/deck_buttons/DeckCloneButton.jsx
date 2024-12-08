import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Files from '@icons/files.svg?react';
import { useApp } from '@/context';
import { deckServices } from '@/services';
import { ButtonIconed } from '@/components';

const DeckCloneButton = ({ deck, inTwdPda, noText }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    deckServices
      .deckClone(deck)
      .then((deckid) => {
        if (!inTwdPda) navigate(`/decks/${deckid}`);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1000);
      })
      .finally(() => {
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
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
