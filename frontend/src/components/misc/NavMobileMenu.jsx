import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PersonFill from 'assets/images/icons/person-fill.svg';
import InfoCircleFill from 'assets/images/icons/info-circle-fill.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';
import List from 'assets/images/icons/list.svg';
import { LanguageSelect, ThemeSelect } from 'components';
import { useApp } from 'context';

const NavMobileMenu = ({ showMenu, setShowMenu }) => {
  const { inventoryMode, toggleInventoryMode, username } = useApp();
  const menuRef = useRef();

  return (
    <div
      ref={menuRef}
      className="text-[#ffffff] h-full flex px-1 items-center relative"
      onClick={() => setShowMenu(!showMenu)}
    >
      <List width="30" height="30" viewBox="0 0 16 16" />
      {showMenu && (
        <div className="absolute bottom-10 rounded-lg border border-borderPrimary bg-bgPrimary py-4 space-y-0 text-lg text-fgPrimary dark:border-borderPrimaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark">
          <div className="w-full">
            <NavLink
              to="/account"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `text-fgPrimary dark:text-fgPrimaryDark flex items-center px-3 py-1.5 space-x-2 ${
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
                `text-fgPrimary dark:text-fgPrimaryDark flex items-center px-3 py-1.5 space-x-2 ${
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
            className="flex items-center px-3 py-1.5 space-x-2"
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
                inventoryMode ? '' : 'text-[#afafaf]'
              }`}
            >
              Inventory Mode
            </div>
          </div>
          <div className="px-3 py-1.5">
            <hr />
          </div>
          <div className="flex px-3 py-1.5">
            <LanguageSelect showMenu={showMenu} setShowMenu={setShowMenu} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMobileMenu;
