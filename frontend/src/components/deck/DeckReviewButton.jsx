import React from 'react';
import { useNavigate } from 'react-router-dom';
import PencilSquare from 'assets/images/icons/pencil-square.svg';
import { useApp } from 'context';
import { ButtonIconed } from 'components';

const DeckReviewButton = ({ deckid }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const navigate = useNavigate();

  return (
    <ButtonIconed
      variant="secondary"
      onClick={() => {
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
        navigate(`/review?id=${deckid}`);
      }}
      title="Review Deck"
      icon={<PencilSquare />}
      text="Review Deck"
    />
  );
};

export default DeckReviewButton;
