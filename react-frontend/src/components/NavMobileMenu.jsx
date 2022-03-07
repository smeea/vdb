import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Overlay, Popover } from 'react-bootstrap';
import PersonFill from 'assets/images/icons/person-fill.svg';
import InfoCircleFill from 'assets/images/icons/info-circle-fill.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';
import CloudSunFill from 'assets/images/icons/cloud-sun-fill.svg';
import SunFill from 'assets/images/icons/sun-fill.svg';
import MoonFill from 'assets/images/icons/moon-fill.svg';
import List from 'assets/images/icons/list.svg';
import { LanguageSelect } from 'components';
import { useApp, useTheme } from 'context';

const NavMobileMenu = (props) => {
  const { inventoryMode, toggleInventoryMode, username } = useApp();
  const { theme, toggleTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  return (
    <>
      <div
        ref={menuRef}
        className="white-font ps-2"
        onClick={() => setShowMenu(!showMenu)}
      >
        <List width="30" height="30" viewBox="0 0 16 16" />
      </div>
      {showMenu && (
        <Overlay
          popperConfig={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -295],
                },
              },
            ],
          }}
          target={menuRef}
          show={showMenu}
          placement="bottom"
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <Popover {...props} className="nav-menu large">
              <Popover.Body className="p-2">
                <NavLink
                  to="/account"
                  onClick={() => setShowMenu(false)}
                  className="nav-link px-2 py-1"
                >
                  <div className="d-flex align-items-center main-font">
                    <PersonFill height="20" width="20" viewBox="0 0 16 16" />
                    <div className="ps-2">{username ? 'Account' : 'Login'}</div>
                  </div>
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={() => setShowMenu(false)}
                  className="nav-link px-2 py-1"
                >
                  <div className="d-flex align-items-center main-font">
                    <InfoCircleFill
                      height="20"
                      width="20"
                      viewBox="0 0 16 16"
                    />
                    <div className="ps-2">About</div>
                  </div>
                </NavLink>
                <div
                  className="d-flex align-items-center px-2 py-1"
                  onClick={() => {
                    toggleTheme();
                    setShowMenu(false);
                  }}
                >
                  <div
                    className="d-flex align-items-center"
                    onClick={() => toggleTheme()}
                  >
                    {theme === 'dark' && (
                      <MoonFill height="20" width="20" viewBox="0 0 16 16" />
                    )}
                    {theme === 'light' && (
                      <SunFill height="20" width="20" viewBox="0 0 16 16" />
                    )}
                    {theme !== 'dark' && theme !== 'light' && (
                      <CloudSunFill
                        height="20"
                        width="20"
                        viewBox="0 0 16 16"
                      />
                    )}
                    <div className="ps-2">
                      {theme === 'dark' && 'Dark Theme'}
                      {theme === 'light' && 'Light Theme'}
                      {theme !== 'dark' && theme !== 'light' && 'System Theme'}
                    </div>
                  </div>
                </div>
                <div
                  className="d-flex align-items-center px-2 py-1"
                  onClick={() => {
                    toggleInventoryMode();
                    setShowMenu(false);
                  }}
                >
                  {inventoryMode ? (
                    <ToggleOn height="20" width="20" viewBox="0 0 16 16" />
                  ) : (
                    <ToggleOff height="20" width="20" viewBox="0 0 16 16" />
                  )}
                  <div className={inventoryMode ? 'ps-2' : 'gray ps-2'}>
                    Inventory Mode
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between py-2">
                  <LanguageSelect setShowMenu={setShowMenu} />
                </div>
              </Popover.Body>
            </Popover>
          )}
        </Overlay>
      )}
    </>
  );
};

export default NavMobileMenu;
