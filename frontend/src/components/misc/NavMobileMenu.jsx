import React from 'react';
import { NavLink } from 'react-router-dom';
import PersonFill from '@/assets/images/icons/person-fill.svg?react';
import InfoCircleFill from '@/assets/images/icons/info-circle-fill.svg?react';
import List from '@/assets/images/icons/list.svg?react';
import StoplightsFill from '@/assets/images/icons/stoplights-fill.svg?react';
import { NavMobileToggle, LanguageMenu, ThemeSelect, Hr } from '@/components';
import { useApp } from '@/context';

const LinkItem = ({ target, icon, text, setShowMenu }) => {
  return (
    <div className="w-full">
      <NavLink
        to={target}
        onClick={() => setShowMenu(false)}
        className={({ isActive }) =>
          `flex items-center space-x-2 px-3 py-1.5 text-fgPrimary dark:text-fgPrimaryDark ${
            isActive ? 'bg-borderPrimary dark:bg-borderPrimaryDark' : ''
          }`
        }
      >
        <div className="flex min-w-[30px] justify-center">{icon}</div>
        <div>{text}</div>
      </NavLink>
    </div>
  );
};

const NavMobileMenu = ({ isLimited, showMenu, setShowMenu }) => {
  const {
    limitedMode,
    inventoryMode,
    toggleLimitedMode,
    toggleInventoryMode,
    isPlaytester,
    playtestMode,
    togglePlaytestMode,
    username,
  } = useApp();

  return (
    <div
      className="relative flex h-full items-center px-1 text-white"
      onClick={() => setShowMenu(!showMenu)}
    >
      <List width="30" height="30" viewBox="0 0 16 16" />
      {showMenu && (
        <div className="absolute bottom-10 space-y-0 rounded-lg border border-borderPrimary bg-bgPrimary text-lg text-fgPrimary dark:border-borderPrimaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark">
          <LinkItem
            target="/account"
            text={username ? 'Account' : 'Login'}
            icon={<PersonFill height="20" width="20" viewBox="0 0 16 16" />}
            setShowMenu={setShowMenu}
          />
          {isPlaytester && (
            <LinkItem
              target="/playtest"
              text="Playtest"
              icon={<StoplightsFill height="20" width="20" viewBox="0 0 16 16" />}
              setShowMenu={setShowMenu}
            />
          )}
          <LinkItem
            target="/"
            text="About"
            icon={<InfoCircleFill height="20" width="20" viewBox="0 0 16 16" />}
            setShowMenu={setShowMenu}
          />
          <ThemeSelect setShowMenu={setShowMenu} />
          {username && (
            <NavMobileToggle
              isOn={inventoryMode}
              onToggle={() => {
                toggleInventoryMode();
                setShowMenu(false);
              }}
              text="Inventory Mode"
            />
          )}
          {(isLimited || limitedMode) && (
            <NavMobileToggle
              isOn={limitedMode}
              onToggle={() => {
                toggleLimitedMode();
                setShowMenu(false);
              }}
              text="Limited Mode"
            />
          )}
          {isPlaytester && (
            <NavMobileToggle
              isOn={playtestMode}
              onToggle={() => {
                togglePlaytestMode();
                setShowMenu(false);
              }}
              text="Playtest Mode"
            />
          )}
          <div className="px-3.5 pt-2.5">
            <Hr />
          </div>
          <div className="flex p-3.5">
            <LanguageMenu setShowMenu={setShowMenu} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMobileMenu;
