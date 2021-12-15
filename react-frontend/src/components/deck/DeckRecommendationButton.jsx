import React from 'react';
import { Button } from 'react-bootstrap';
import LightbulbFill from 'assets/images/icons/lightbulb-fill.svg';
import { useApp } from 'context';

const DeckRecommendationButton = (props) => {
  const { isMobile } = useApp();

  return (
    <Button
      onClick={() => {
        isMobile && props.setShowButtons(false);
        props.setShowRecommendation(true);
      }}
      variant="secondary"
    >
      <div className="d-flex justify-content-center align-items-center">
        <div className="pe-2">
          <LightbulbFill />
        </div>
        Card Ideas
      </div>
    </Button>
  );
};

export default DeckRecommendationButton;
