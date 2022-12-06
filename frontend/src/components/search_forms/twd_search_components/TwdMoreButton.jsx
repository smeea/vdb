import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { Button } from 'components';
import Gem from 'assets/images/icons/gem.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import ClockHistory from 'assets/images/icons/clock-history.svg';
import LightbulbFill from 'assets/images/icons/lightbulb-fill.svg';

const TwdMoreButton = ({ noText }) => {
  const navigate = useNavigate();

  return (
    <Menu>
      <Menu.Button>
        <>
          {noText ? (
            <Gem size={24} />
          ) : (
            <div className="flex justify-center items-center">
              <div className="flex pe-2">
                <Gem size={24} />
              </div>
              More
            </div>
          )}
        </>
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item><div onClick={() => navigate('/twd/hall_of_fame/tournaments')}>
          <div className="flex justify-start items-center py-1">
            <div className="flex pe-2">
              <TrophyFill />
            </div>
            Hall Of Fame - Tournaments
          </div>
        </div></Menu.Item>
        <Menu.Item><div onClick={() => navigate('/twd/hall_of_fame/cards')}>
          <div className="flex justify-start items-center py-1">
            <div className="flex pe-2">
              <LightbulbFill />
            </div>
            Hall Of Fame - Cards Appearance
          </div>
        </div></Menu.Item>
        <Menu.Item><div onClick={() => navigate('/twd/cards_history')}>
          <div className="flex justify-start items-center py-1">
            <div className="flex pe-2">
              <ClockHistory />
            </div>
            Cards Appearance History
          </div>
        </div></Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default TwdMoreButton;
