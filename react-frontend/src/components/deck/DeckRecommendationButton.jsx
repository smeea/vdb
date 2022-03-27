import React from 'react';
import LightbulbFill from 'assets/images/icons/lightbulb-fill.svg';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckRecommendationButton = (props) => {
  const { isMobile } = useApp();

  return (
    <ButtonIconed
      variant="secondary"
      onClick={() => {
        isMobile && props.setShowButtons(false);
        props.setShowRecommendation(true);
      }}
      title="Get Recommendation based on TWD with similar cards"
      icon={<LightbulbFill />}
      text="Card Ideas"
    />
  );
};

export default DeckRecommendationButton;
