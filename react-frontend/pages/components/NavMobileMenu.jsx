import React, { useRef, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Overlay, Popover } from 'react-bootstrap';
import PersonFill from '../../assets/images/icons/person-fill.svg';
import InfoCircleFill from '../../assets/images/icons/info-circle-fill.svg';
import SunFill from '../../assets/images/icons/sun-fill.svg';
import MoonFill from '../../assets/images/icons/moon-fill.svg';
import List from '../../assets/images/icons/list.svg';
import LanguageSelect from './LanguageSelect.jsx';
import AppContext from '../../context/AppContext.js';
import ThemeContext from '../../context/ThemeContext.js';

const NavMobileMenu = (props) => {
  const { username } = useContext(AppContext);
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  return (
    <>
      <div
        ref={menuRef}
        className="white-font pl-2 pt-1"
        onClick={() => setShowMenu(!showMenu)}
      >
        <List width="24" height="24" viewBox="0 0 16 16" />
      </div>
      {showMenu && (
        <Overlay target={menuRef} show={showMenu} placement="bottom">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <Popover {...props} className="navMenu mobile">
              <Popover.Content>
                <NavLink to="/account" className="nav-link px-2 py-1">
                  <div className="d-flex align-items-center main-font">
                    <PersonFill />
                    <div className="pl-2">{username ? 'Account' : 'Login'}</div>
                  </div>
                </NavLink>
                <NavLink to="/about" className="nav-link px-2 py-1">
                  <div className="d-flex align-items-center main-font">
                    <InfoCircleFill />
                    <div className="pl-2">About</div>
                  </div>
                </NavLink>
                <div
                  className="d-flex align-items-center px-2 py-1"
                  onClick={() => toggleTheme()}
                >
                  {isDarkTheme ? (
                    <>
                      <MoonFill />
                      <div className="pl-2">Dark Theme</div>
                    </>
                  ) : (
                    <>
                      <SunFill />
                      <div className="pl-2">Light Theme</div>
                    </>
                  )}
                </div>
                <div className="d-flex align-items-center justify-content-between py-2">
                  <LanguageSelect />
                </div>
              </Popover.Content>
            </Popover>
          )}
        </Overlay>
      )}
    </>
  );
};

export default NavMobileMenu;
