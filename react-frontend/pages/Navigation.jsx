import React, { useContext } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import LightningFill from '../assets/images/icons/lightning-fill.svg';
import PersonFill from '../assets/images/icons/person-fill.svg';
import InfoCircleFill from '../assets/images/icons/info-circle-fill.svg';
import ToggleOn from '../assets/images/icons/toggle-on.svg';
import ToggleOff from '../assets/images/icons/toggle-off.svg';
import SunFill from '../assets/images/icons/sun-fill.svg';
import MoonFill from '../assets/images/icons/moon-fill.svg';
import AppContext from '../context/AppContext.js';
import ThemeContext from '../context/ThemeContext.js';
import NavMobileMenu from './components/NavMobileMenu.jsx';
import LanguageSelect from './components/LanguageSelect.jsx';
import cryptDefaults from './components/forms_data/defaultsCryptForm.json';
import libraryDefaults from './components/forms_data/defaultsLibraryForm.json';
import twdDefaults from './components/forms_data/defaultsTwdForm.json';
import sanitizeFormState from './components/sanitizeFormState.js';

function Navigation(props) {
  const {
    cryptFormState,
    libraryFormState,
    twdFormState,
    inventoryMode,
    toggleInventoryMode,
    isMobile,
    username,
    activeDeck,
  } = useContext(AppContext);
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  let twdUrl = '/twd';
  let cryptUrl = '/crypt';
  let libraryUrl = '/library';
  let decksUrl = '/decks';

  if (JSON.stringify(cryptFormState) != JSON.stringify(cryptDefaults)) {
    const input = sanitizeFormState('crypt', cryptFormState);
    cryptUrl = `/crypt?q=${encodeURIComponent(JSON.stringify(input))}`;
  }
  if (JSON.stringify(libraryFormState) != JSON.stringify(libraryDefaults)) {
    const input = sanitizeFormState('library', libraryFormState);
    libraryUrl = `/library?q=${encodeURIComponent(JSON.stringify(input))}`;
  }
  if (JSON.stringify(twdFormState) != JSON.stringify(twdDefaults)) {
    const input = sanitizeFormState('twd', twdFormState);
    twdUrl = `/twd?q=${encodeURIComponent(JSON.stringify(input))}`;
  }
  if (activeDeck.deckid) {
    decksUrl = `/decks?id=${activeDeck.deckid}`;
  }

  return (
    <Navbar sticky="top" variant="dark">
      <Nav className="container justify-content-between">
        <div className="d-flex align-items-center pr-1">
          {isMobile && <NavMobileMenu />}
          {!isMobile && (
            <>
              <LanguageSelect />
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
                className="d-flex align-items-center px-3"
                onClick={() => toggleInventoryMode()}
              >
                <div
                  className={
                    inventoryMode
                      ? 'd-flex white-font-toggle'
                      : 'd-flex gray-font-toggle'
                  }
                >
                  {inventoryMode ? (
                    <ToggleOn viewBox="0 0 16 16" />
                  ) : (
                    <ToggleOff viewBox="0 0 16 16" />
                  )}
                </div>
                <div
                  className={
                    inventoryMode
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
          <NavLink to={twdUrl} className="nav-link pr-2 pl-1">
            TWD
          </NavLink>
          <NavLink to="/inventory" className="nav-link pr-2 pl-1">
            Inventory
          </NavLink>
          <NavLink to={decksUrl} className="nav-link pr-2 pl-1">
            Decks
          </NavLink>
          <NavLink to={cryptUrl} className="nav-link pr-2 pl-1">
            Crypt
          </NavLink>
          <NavLink to={libraryUrl} className="nav-link pr-2 pl-1">
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
