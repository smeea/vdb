import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
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

  return (
    <>
      <div
        className="white-font pl-2 pt-1"
        onClick={() => setShowMenu(!showMenu)}
      >
        <List width="24" height="24" viewBox="0 0 16 16" />
      </div>
      {showMenu && (
        <div className="mobile-menu p-2">
          <NavLink to="/account" className="nav-link px-2 py-1">
            <div className="d-flex align-items-center">
              <PersonFill />
              <div className="pl-2">{username ? 'Account' : 'Login'}</div>
            </div>
          </NavLink>
          <NavLink to="/about" className="nav-link px-2 py-1">
            <div className="d-flex align-items-center">
              <InfoCircleFill />
              <div className="pl-2">About</div>
            </div>
          </NavLink>
          <div
            className="d-flex align-items-center white-font px-2 py-1"
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
          <div className="d-flex align-items-center justify-content-between pb-2 pt-3">
            <LanguageSelect />
          </div>
        </div>
      )}
    </>
  );
};

export default NavMobileMenu;
