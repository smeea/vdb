import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import List from 'assets/images/icons/list.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import ClockHistory from 'assets/images/icons/clock-history.svg';

const TwdMoreButton = (props) => {
  const navigate = useNavigate();

  return (
    <DropdownButton
      className="h-100"
      as={ButtonGroup}
      variant="primary"
      title={
        <div className="d-flex justify-content-center align-items-center">
          <List size={24} />
        </div>
      }
    >
      <Dropdown.Item onClick={() => navigate('/twd/hall_of_fame')}>
        <div className="d-flex justify-content-center align-items-center py-1">
          <div className="d-flex pe-2">
            <TrophyFill />
          </div>
          Hall Of Fame
        </div>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => navigate('/twd/cards_history')}>
        <div className="d-flex justify-content-center align-items-center py-1">
          <div className="d-flex pe-2">
            <ClockHistory />
          </div>
          Cards History
        </div>
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default TwdMoreButton;
