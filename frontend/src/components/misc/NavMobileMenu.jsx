import React from 'react';
import { NavLink } from 'react-router-dom';
import PersonFill from '@/assets/images/icons/person-fill.svg?react';
import InfoCircleFill from '@/assets/images/icons/info-circle-fill.svg?react';
import List from '@/assets/images/icons/list.svg?react';
import { NavMobileToggle, LanguageMenu, ThemeSelect, Hr } from '@/components';
import { useApp } from '@/context';

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
          <div className="w-full">
            <NavLink
              to="/account"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-1.5 text-fgPrimary dark:text-fgPrimaryDark ${
                  isActive
                    ? 'bg-borderNestModal dark:bg-borderNestModalDark'
                    : ''
                }`
              }
            >
              <div className="flex min-w-[30px] justify-center">
                <PersonFill height="20" width="20" viewBox="0 0 16 16" />
              </div>
              <div>{username ? 'Account' : 'Login'}</div>
            </NavLink>
          </div>
          <div className="w-full">
            <NavLink
              to="/"
              end
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-1.5 text-fgPrimary dark:text-fgPrimaryDark ${
                  isActive
                    ? 'bg-borderNestModal dark:bg-borderNestModalDark'
                    : ''
                }`
              }
            >
              <div className="flex min-w-[30px] justify-center">
                <InfoCircleFill height="20" width="20" viewBox="0 0 16 16" />
              </div>
              <div>About</div>
            </NavLink>
          </div>
          <ThemeSelect setShowMenu={setShowMenu} />
          <NavMobileToggle
            isOn={inventoryMode}
            onToggle={() => {
              toggleInventoryMode();
              setShowMenu(false);
            }}
            text="Inventory Mode"
          />
          {isLimited && (
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
