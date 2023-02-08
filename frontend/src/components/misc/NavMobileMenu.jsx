import React from 'react';
import { NavLink } from 'react-router-dom';
import PersonFill from '@/assets/images/icons/person-fill.svg';
import InfoCircleFill from '@/assets/images/icons/info-circle-fill.svg';
import ToggleOn from '@/assets/images/icons/toggle-on.svg';
import ToggleOff from '@/assets/images/icons/toggle-off.svg';
import List from '@/assets/images/icons/list.svg';
import { LanguageMenu, ThemeSelect, Hr } from '@/components';
import { useApp } from '@/context';

const NavMobileMenu = ({ showMenu, setShowMenu }) => {
  const { inventoryMode, toggleInventoryMode, username } = useApp();

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
          <div
            className="flex items-center space-x-2 px-3 py-1.5"
            onClick={() => {
              toggleInventoryMode();
              setShowMenu(false);
            }}
          >
            <div className="flex min-w-[30px] justify-center">
              {inventoryMode ? (
                <ToggleOn height="26" width="26" viewBox="0 0 16 16" />
              ) : (
                <ToggleOff height="26" width="26" viewBox="0 0 16 16" />
              )}
            </div>
            <div
              className={`whitespace-nowrap ${
                inventoryMode ? '' : 'text-midGray dark:text-midGrayDark'
              }`}
            >
              Inventory Mode
            </div>
          </div>
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
