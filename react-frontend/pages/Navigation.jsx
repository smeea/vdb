import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import PersonFill from '../assets/images/icons/person-fill.svg';
import InfoCircleFill from '../assets/images/icons/info-circle-fill.svg';
import Search from '../assets/images/icons/search.svg';
import ToggleOn from '../assets/images/icons/toggle-on.svg';
import ToggleOff from '../assets/images/icons/toggle-off.svg';

function Navigation(props) {
  const ToggleSearch = (props) => {
    return (
      <Button
        className="px-2"
        onClick={() => {
          props.setShowSearch(!props.showSearch);
          window.scrollTo(0, 0);
        }}
        variant="secondary"
        active={!props.showSearch}
        disabled={!props.isResults}
      >
        <Search />
      </Button>
    );
  };

  const NavBar = ({ location }) => {
    return (
      <Navbar sticky="top" bg="dark" variant="dark">
        <Nav className="container justify-content-between">
          <div className="d-flex align-items-center pr-1">
            {props.username &&
              props.isActiveDeck &&
              ((props.location.pathname == '/crypt' &&
                !props.showCryptSearch) ||
                (props.location.pathname == '/library' &&
                  !props.showLibrarySearch)) && (
                <div
                  className="d-flex align-items-center pl-1"
                  onClick={() => props.setAddMode(!props.addMode)}
                >
                  {props.addMode ? (
                    <>
                      <div className="d-flex white-font-toggle">
                        <ToggleOn viewBox="0 0 16 16"/>
                      </div>
                      {!props.isMobile ? (
                        <div className="d-inline pl-1 white-font">
                          Add to Deck Mode
                        </div>
                      ) : (
                        <div className="d-inline pl-1 pb-1 white-font">[+]</div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="d-flex gray-font-toggle">
                        <ToggleOff viewBox="0 0 16 16"/>
                      </div>
                      {!props.isMobile ? (
                        <div className="d-inline pl-1 gray-font">
                          Add to Deck Mode
                        </div>
                      ) : (
                        <div className="d-inline pl-1 pb-1 gray-font">[+]</div>
                      )}
                    </>
                  )}
                </div>
              )}
          </div>

          <div className="d-flex align-items-center">
            <NavLink to="/account" className="nav-link pr-2 pl-1">
              {props.username ? <PersonFill /> : 'Login'}
            </NavLink>
            <NavLink to="/about" className="nav-link pr-2 pl-1">
              {props.isMobile ? <InfoCircleFill /> : 'About'}
            </NavLink>
            <NavLink to="/twd" className="nav-link pr-2 pl-1">
              TWD
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
            {props.isMobile && (
              <>
                <div className="toggle-search">
                  {props.location.pathname == '/crypt' && (
                    <ToggleSearch
                      showSearch={props.showCryptSearch}
                      setShowSearch={props.setShowCryptSearch}
                      isResults={props.isCryptResults}
                    />
                  )}
                  {props.location.pathname == '/library' && (
                    <ToggleSearch
                      showSearch={props.showLibrarySearch}
                      setShowSearch={props.setShowLibrarySearch}
                      isResults={props.isLibraryResults}
                    />
                  )}
                  {props.location.pathname == '/twd' && (
                    <ToggleSearch
                      showSearch={props.showTwdSearch}
                      setShowSearch={props.setShowTwdSearch}
                      isResults={props.isTwdResults}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </Nav>
      </Navbar>
    );
  };

  return <NavBar />;
}

export default withRouter(Navigation);
