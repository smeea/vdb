import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { MenuButton, Button } from 'components';
import Gem from 'assets/images/icons/gem.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import ClockHistory from 'assets/images/icons/clock-history.svg';
import LightbulbFill from 'assets/images/icons/lightbulb-fill.svg';

const TwdMoreButton = ({ noText }) => {
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton
        title="More interesting stuff"
        icon={<Gem size={24} />}
        text={noText ? null : 'More'}
      />
      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          <div onClick={() => navigate('/twd/hall_of_fame/tournaments')}>
            <div className="flex items-center justify-start py-1">
              <div className="pr-2 flex">
                <TrophyFill />
              </div>
              Hall Of Fame - Tournaments
            </div>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={() => navigate('/twd/hall_of_fame/cards')}>
            <div className="flex items-center justify-start py-1">
              <div className="pr-2 flex">
                <LightbulbFill />
              </div>
              Hall Of Fame - Cards Appearance
            </div>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={() => navigate('/twd/cards_history')}>
            <div className="flex items-center justify-start py-1">
              <div className="pr-2 flex">
                <ClockHistory />
              </div>
              Cards Appearance History
            </div>
          </div>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default TwdMoreButton;
