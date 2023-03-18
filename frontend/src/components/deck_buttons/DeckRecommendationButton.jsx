import React from 'react';
import LightbulbFill from '@/assets/images/icons/lightbulb-fill.svg';
import { useApp } from '@/context';
import { ButtonIconed } from '@/components';

const DeckRecommendationButton = ({ setShowRecommendation }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();

  const handleClick = () => {
    setShowRecommendation(true);
    setShowMenuButtons(false);
    setShowFloatingButtons(false);
  };

  return (
    <ButtonIconed
      variant={isDesktop ? 'secondary' : 'primary'}
      onClick={handleClick}
      title="Get Recommendation based on TWD with similar cards"
      icon={<LightbulbFill />}
      text="Card Ideas"
    />
  );
};

export default DeckRecommendationButton;
