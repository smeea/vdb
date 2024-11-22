import React from 'react';
import { useNavigate } from 'react-router';
import { Menu } from '@headlessui/react';
import { MenuItems, MenuItem, MenuButton } from '@/components';
import Gem from '@/assets/images/icons/gem.svg?react';
import TrophyFill from '@/assets/images/icons/trophy-fill.svg?react';
import ClockHistory from '@/assets/images/icons/clock-history.svg?react';
import LightbulbFill from '@/assets/images/icons/lightbulb-fill.svg?react';
import Calendar2EventFill from '@/assets/images/icons/calendar2-event-fill.svg?react';
import PieChartFill from '@/assets/images/icons/pie-chart-fill.svg?react';

const TwdMoreButton = () => {
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative">
      <MenuButton title="More interesting stuff" icon={<Gem />} text="More" />
      <MenuItems>
        <MenuItem onClick={() => navigate('/twd/hall_of_fame/tournaments')}>
          <div className="flex items-center gap-2">
            <TrophyFill />
            Hall Of Fame - Tournaments
          </div>
        </MenuItem>
        <MenuItem onClick={() => navigate('/twd/hall_of_fame/cards')}>
          <div className="flex items-center gap-2">
            <LightbulbFill />
            Hall Of Fame - Cards Appearance
          </div>
        </MenuItem>
        <MenuItem onClick={() => navigate('/twd/cards_history')}>
          <div className="flex items-center gap-2">
            <ClockHistory />
            Cards Appearance History
          </div>
        </MenuItem>
        <MenuItem onClick={() => navigate('/twd/check')}>
          <div className="flex items-center gap-2">
            <Calendar2EventFill />
            Check TWD Report
          </div>
        </MenuItem>
        <MenuItem onClick={() => navigate('/tournament_analyze')}>
          <div className="flex items-center gap-2">
            <PieChartFill />
            Analyze Tournaments
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default TwdMoreButton;
