import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import Gem from 'assets/images/icons/gem.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import ClockHistory from 'assets/images/icons/clock-history.svg';
import LightbulbFill from 'assets/images/icons/lightbulb-fill.svg';

const TwdMoreButton = () => {
  const navigate = useNavigate();

  return (
    <DropdownButton
      className="h-100"
      as={ButtonGroup}
      variant="primary"
      title={
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex pe-2">
            <Gem size={24} />
          </div>
          More
        </div>
      }
    >
      <Dropdown.Item onClick={() => navigate('/twd/hall_of_fame/tournaments')}>
        <div className="d-flex justify-content-start align-items-center py-1">
          <div className="d-flex pe-2">
            <TrophyFill />
          </div>
          Hall Of Fame - Tournaments
        </div>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => navigate('/twd/hall_of_fame/cards')}>
        <div className="d-flex justify-content-start align-items-center py-1">
          <div className="d-flex pe-2">
            <LightbulbFill />
          </div>
          Hall Of Fame - Cards Appearance
        </div>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => navigate('/twd/cards_history')}>
        <div className="d-flex justify-content-start align-items-center py-1">
          <div className="d-flex pe-2">
            <ClockHistory />
          </div>
          Cards Appearance History
        </div>
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default TwdMoreButton;
