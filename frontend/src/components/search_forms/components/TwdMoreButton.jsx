import { Menu } from "@headlessui/react";
import Calendar2EventFill from "@icons/calendar2-event-fill.svg?react";
import ClockHistory from "@icons/clock-history.svg?react";
import Gem from "@icons/gem.svg?react";
import LightbulbFill from "@icons/lightbulb-fill.svg?react";
import TrophyFill from "@icons/trophy-fill.svg?react";
import { useNavigate } from "react-router";
import { MenuButton, MenuItem, MenuItems } from "@/components";

const TwdMoreButton = () => {
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton title="More interesting stuff" icon={<Gem />} text="More" />
      <MenuItems>
        <MenuItem onClick={() => navigate("/twd/hall_of_fame/tournaments")}>
          <div className="flex items-center gap-2">
            <TrophyFill />
            Hall Of Fame - Tournaments
          </div>
        </MenuItem>
        <MenuItem onClick={() => navigate("/twd/hall_of_fame/cards")}>
          <div className="flex items-center gap-2">
            <LightbulbFill />
            Hall Of Fame - Cards Appearance
          </div>
        </MenuItem>
        <MenuItem onClick={() => navigate("/twd/cards_history")}>
          <div className="flex items-center gap-2">
            <ClockHistory />
            Cards Appearance History
          </div>
        </MenuItem>
        <MenuItem onClick={() => navigate("/twd/check")}>
          <div className="flex items-center gap-2">
            <Calendar2EventFill />
            Check TWD Report
          </div>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default TwdMoreButton;
