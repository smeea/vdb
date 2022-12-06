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
  const menuRef = useRef(null);

  return (
    <div
      ref={menuRef}
      className="text-white ps-2 relative"
      onClick={() => setShowMenu(!showMenu)}
    >
      <List width="30" height="30" viewBox="0 0 16 16" />
      {showMenu && (
        <div className="absolute nav-menu text-lg">
          <NavLink
            to="/account"
            onClick={() => setShowMenu(false)}
            className="nav-link px-2 py-1"
          >
            <div className="flex items-center main-font">
              <div className="flex justify-center min-w-[30px]">
                <PersonFill height="20" width="20" viewBox="0 0 16 16" />
              </div>
              <div className="ps-2">{username ? 'Account' : 'Login'}</div>
            </div>
          </NavLink>
          <NavLink
            to="/"
            end
            onClick={() => setShowMenu(false)}
            className="nav-link px-2 py-1"
          >
            <div className="flex items-center main-font">
              <div className="flex justify-center min-w-[30px]">
                <InfoCircleFill height="20" width="20" viewBox="0 0 16 16" />
              </div>
              <div className="ps-2">About</div>
            </div>
          </NavLink>

          <ThemeSelect setShowMenu={setShowMenu} />
          <div
            className="flex items-center px-2 py-1"
            onClick={() => {
              toggleInventoryMode();
              setShowMenu(false);
            }}
          >
            <div className="flex justify-center min-w-[30px]">
              {inventoryMode ? (
                <ToggleOn height="26" width="26" viewBox="0 0 16 16" />
              ) : (
                <ToggleOff height="26" width="26" viewBox="0 0 16 16" />
              )}
            </div>
            <div
              className={`${
                inventoryMode ? '' : 'gray'
              } ps-2 whitespace-nowrap`}
            >
              Inventory Mode
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <LanguageSelect setShowMenu={setShowMenu} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMobileMenu;
