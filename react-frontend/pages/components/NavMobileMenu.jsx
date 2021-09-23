import React, { useRef, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Overlay, Popover } from 'react-bootstrap';
import PersonFill from '../../assets/images/icons/person-fill.svg';
import InfoCircleFill from '../../assets/images/icons/info-circle-fill.svg';
import ToggleOn from '../../assets/images/icons/toggle-on.svg';
import ToggleOff from '../../assets/images/icons/toggle-off.svg';
import SunFill from '../../assets/images/icons/sun-fill.svg';
import MoonFill from '../../assets/images/icons/moon-fill.svg';
import List from '../../assets/images/icons/list.svg';
import LanguageSelect from './LanguageSelect.jsx';
import AppContext from '../../context/AppContext.js';
import ThemeContext from '../../context/ThemeContext.js';

const NavMobileMenu = (props) => {
  const { inventoryMode, toggleInventoryMode, username } =
    useContext(AppContext);
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  return (
    <>
      <div
        ref={menuRef}
        className="white-font ps-2 pt-1"
        onClick={() => setShowMenu(!showMenu)}
      >
        <List width="24" height="24" viewBox="0 0 16 16" />
      </div>
      {showMenu && (
        <Overlay
          popperConfig={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -255],
                },
              },
            ],
          }}
          target={menuRef}
          show={showMenu}
          placement="bottom"
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <Popover {...props} className="navMenu mobile">
              <Popover.Body>
                <NavLink
                  to="/account"
                  onClick={() => setShowMenu(false)}
                  className="nav-link px-2 py-1"
                >
                  <div className="d-flex align-items-center main-font">
                    <PersonFill />
                    <div className="ps-2">{username ? 'Account' : 'Login'}</div>
                  </div>
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={() => setShowMenu(false)}
                  className="nav-link px-2 py-1"
                >
                  <div className="d-flex align-items-center main-font">
                    <InfoCircleFill />
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
                  {isDarkTheme ? <MoonFill /> : <SunFill />}
                  <div className="ps-2">Theme</div>
                </div>
                <div
                  className="d-flex align-items-center px-2 py-1"
                  onClick={() => {
                    toggleInventoryMode();
                    setShowMenu(false);
                  }}
                >
                  {inventoryMode ? <ToggleOn /> : <ToggleOff />}
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
