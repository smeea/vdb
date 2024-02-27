import React from 'react';
import { useNavigate } from 'react-router-dom';
import PencilSquare from '@/assets/images/icons/pencil-square.svg?react';
import { deckServices } from '@/services';
import { useApp } from '@/context';
import { ButtonIconed } from '@/components';

const DeckReviewButton = ({ deck }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons, publicName } =
    useApp();
  const navigate = useNavigate();

  const handleClick = () => {
    deckServices
      .deckSnapshot({
        ...deck,
        description: `Review of ${import.meta.env.VITE_BASE_URL}/decks/${
          deck.deckid
        }`,
        author: publicName ? `review by ${publicName}` : '',
      })
      .then((deckid) => {
        navigate(`/review/${deckid}`);
        setShowMenuButtons(false);
        setShowFloatingButtons(true);
      });
  };

  return (
    <ButtonIconed
      variant={isDesktop ? 'secondary' : 'primary'}
      onClick={handleClick}
      title="Review Deck"
      icon={<PencilSquare />}
      text="Review"
    />
  );
};

export default DeckReviewButton;
