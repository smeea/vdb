import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { MenuItems, MenuItem, MenuButton } from 'components';
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
      <MenuItems className="divide-gray-100 bg-white  ring-black absolute right-0 w-56 origin-top-right divide-y rounded-md shadow-lg ring-1 ring-opacity-5 focus:outline-none">
        <MenuItem>
          <div onClick={() => navigate('/twd/hall_of_fame/tournaments')}>
            <div className="flex items-center justify-start ">
              <div className="flex ">
                <TrophyFill />
              </div>
              Hall Of Fame - Tournaments
            </div>
          </div>
        </MenuItem>
        <MenuItem>
          <div onClick={() => navigate('/twd/hall_of_fame/cards')}>
            <div className="flex items-center justify-start ">
              <div className="flex ">
                <LightbulbFill />
              </div>
              Hall Of Fame - Cards Appearance
            </div>
          </div>
        </MenuItem>
        <MenuItem>
          <div onClick={() => navigate('/twd/cards_history')}>
            <div className="flex items-center justify-start ">
              <div className="flex ">
                <ClockHistory />
              </div>
              Cards Appearance History
            </div>
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default TwdMoreButton;
