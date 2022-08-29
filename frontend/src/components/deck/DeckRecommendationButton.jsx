import React from 'react';
import LightbulbFill from 'assets/images/icons/lightbulb-fill.svg';
import { useApp } from 'context';
import { ButtonIconed } from 'components';

const DeckRecommendationButton = ({ setShowRecommendation }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();

  return (
    <ButtonIconed
      variant="secondary"
      onClick={() => {
        setShowRecommendation(true);
        setShowMenuButtons(false);
        setShowFloatingButtons(false);
      }}
      title="Get Recommendation based on TWD with similar cards"
      icon={<LightbulbFill />}
      text="Card Ideas"
    />
  );
};

export default DeckRecommendationButton;
