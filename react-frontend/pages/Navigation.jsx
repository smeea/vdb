import React, { useState, useContext, useRef } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav, Overlay, Popover } from 'react-bootstrap';
import LightningFill from '../assets/images/icons/lightning-fill.svg';
import PersonFill from '../assets/images/icons/person-fill.svg';
import InfoCircleFill from '../assets/images/icons/info-circle-fill.svg';
import ToggleOn from '../assets/images/icons/toggle-on.svg';
import ToggleOff from '../assets/images/icons/toggle-off.svg';
import SunFill from '../assets/images/icons/sun-fill.svg';
import MoonFill from '../assets/images/icons/moon-fill.svg';
import List from '../assets/images/icons/list.svg';
import FlagEn from '../assets/images/misc/en.svg';
import FlagEs from '../assets/images/misc/es.svg';
import FlagFr from '../assets/images/misc/fr.svg';
import AppContext from '../context/AppContext.js';
import ThemeContext from '../context/ThemeContext.js';

function Navigation(props) {
  const { isMobile, lang, changeLang, username } = useContext(AppContext);
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const MobileMenu = (
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
        <div
          className={lang == 'en-EN' ? 'flag-active mx-2' : 'mx-2'}
          onClick={() => changeLang('en-EN')}
        >
          <FlagEn width="18" height="18" viewBox="0 0 500 500" />
        </div>
        <div
          className={lang == 'es-ES' ? 'flag-active mx-2' : 'mx-2'}
          onClick={() => changeLang('es-ES')}
        >
          <FlagEs width="18" height="18" viewBox="0 0 500 500" />
        </div>
        <div
          className={lang == 'fr-FR' ? 'flag-active mx-2' : 'mx-2'}
          onClick={() => changeLang('fr-FR')}
        >
          <FlagFr width="18" height="18" viewBox="0 0 500 500" />
        </div>
      </div>
    </div>
  );

  return (
    <Navbar sticky="top" variant="dark">
      <Nav className="container justify-content-between">
        <div className="d-flex align-items-center pr-1">
          {isMobile && (
            <>
              <div
                className="white-font pl-2 pt-1"
                onClick={() => setShowMenu(!showMenu)}
              >
                <List width="24" height="24" viewBox="0 0 16 16" />
              </div>
              {showMenu && MobileMenu}
            </>
          )}
          {!isMobile && (
            <>
              <div
                ref={menuRef}
                className="px-3"
                onClick={() => setShowMenu(!showMenu)}
              >
                {lang == 'en-EN' ? (
                  <FlagEn width="18" height="18" viewBox="0 0 500 500" />
                ) : lang == 'es-ES' ? (
                  <FlagEs width="18" height="18" viewBox="0 0 500 500" />
                ) : (
                  <FlagFr width="18" height="18" viewBox="0 0 500 500" />
                )}
              </div>
              <Overlay target={menuRef} show={showMenu} placement="bottom">
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <Popover {...props} className="langPopover">
                    <Popover.Content>
                      <div className="d-flex align-items-center justify-content-between">
                        <div
                          className={
                            lang == 'en-EN' ? 'flag-active mx-2' : 'mx-2'
                          }
                          onClick={() => {
                            changeLang('en-EN');
                            setShowMenu(false);
                          }}
                        >
                          <FlagEn
                            width="18"
                            height="18"
                            viewBox="0 0 500 500"
                          />
                        </div>
                        <div
                          className={
                            lang == 'es-ES' ? 'flag-active mx-2' : 'mx-2'
                          }
                          onClick={() => {
                            changeLang('es-ES');
                            setShowMenu(false);
                          }}
                        >
                          <FlagEs
                            width="18"
                            height="18"
                            viewBox="0 0 500 500"
                          />
                        </div>
                        <div
                          className={
                            lang == 'fr-FR' ? 'flag-active mx-2' : 'mx-2'
                          }
                          onClick={() => {
                            changeLang('fr-FR');
                            setShowMenu(false);
                          }}
                        >
                          <FlagFr
                            width="18"
                            height="18"
                            viewBox="0 0 500 500"
                          />
                        </div>
                      </div>
                    </Popover.Content>
                  </Popover>
                )}
              </Overlay>
              <div className="white-font px-3" onClick={() => toggleTheme()}>
                {isDarkTheme ? <MoonFill /> : <SunFill />}
              </div>
            </>
          )}
          {username &&
            !isMobile &&
            (location.pathname == '/decks' ||
              location.pathname == '/crypt' ||
              location.pathname == '/library' ||
              location.pathname == '/twd') && (
              <div
                className="d-flex align-items-center pl-1 pr-4"
                onClick={() => props.setInventoryMode(!props.inventoryMode)}
              >
                <div
                  className={
                    props.inventoryMode
                      ? 'd-flex white-font-toggle'
                      : 'd-flex gray-font-toggle'
                  }
                >
                  {props.inventoryMode ? (
                    <ToggleOn viewBox="0 0 16 16" />
                  ) : (
                    <ToggleOff viewBox="0 0 16 16" />
                  )}
                </div>
                <div
                  className={
                    props.inventoryMode
                      ? 'd-inline pl-1 white-font'
                      : 'd-inline pl-1 gray-font'
                  }
                >
                  Inventory Mode
                </div>
              </div>
            )}
        </div>
        <div className="d-flex align-items-center">
          {!isMobile && (
            <>
              <NavLink to="/account" className="nav-link pr-2 pl-1">
                {username ? <PersonFill /> : 'Login'}
              </NavLink>
              <NavLink to="/about" className="nav-link pr-2 pl-1">
                {isMobile ? <InfoCircleFill /> : 'About'}
              </NavLink>
            </>
          )}
          <NavLink to="/twd" className="nav-link pr-2 pl-1">
            TWD
          </NavLink>
          <NavLink to="/inventory" className="nav-link pr-2 pl-1">
            Inventory
          </NavLink>
          <NavLink to="/decks" className="nav-link pr-2 pl-1">
            Decks
          </NavLink>
          <NavLink to="/crypt" className="nav-link pr-2 pl-1">
            Crypt
          </NavLink>
          <NavLink to="/library" className="nav-link pr-2 pl-1">
            Library
          </NavLink>
          <NavLink to="/cards" className="nav-link pr-2 pl-1">
            <LightningFill />
          </NavLink>
        </div>
      </Nav>
    </Navbar>
  );
}

export default withRouter(Navigation);
