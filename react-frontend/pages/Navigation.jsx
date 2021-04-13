import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import LightningFill from '../assets/images/icons/lightning-fill.svg';
import PersonFill from '../assets/images/icons/person-fill.svg';
import InfoCircleFill from '../assets/images/icons/info-circle-fill.svg';
import ToggleOn from '../assets/images/icons/toggle-on.svg';
import ToggleOff from '../assets/images/icons/toggle-off.svg';
import SunFill from '../assets/images/icons/sun-fill.svg';
import MoonFill from '../assets/images/icons/moon-fill.svg';

function Navigation(props) {
  const NavBar = ({ location }) => {
    return (
      <Navbar sticky="top" variant="dark">
        <Nav className="container justify-content-between">
          <div className="d-flex align-items-center pr-1">
            <div
              className="text-light px-2"
              onClick={() => props.toggleTheme()}
            >
              {props.isDarkTheme ? <MoonFill /> : <SunFill />}
            </div>
            {props.username &&
              !props.isMobile &&
              (props.location.pathname == '/decks' ||
                props.location.pathname == '/crypt' ||
                props.location.pathname == '/library' ||
                props.location.pathname == '/twd') && (
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
            <NavLink to="/account" className="nav-link pr-2 pl-1">
              {props.username ? <PersonFill /> : 'Login'}
            </NavLink>
            <NavLink to="/about" className="nav-link pr-2 pl-1">
              {props.isMobile ? <InfoCircleFill /> : 'About'}
            </NavLink>
            <NavLink to="/twd" className="nav-link pr-2 pl-1">
              TWD
            </NavLink>
            <NavLink to="/inventory" className="nav-link pr-2 pl-1">
              {props.isMobile ? 'Inv' : 'Inventory'}
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
  };

  return <NavBar />;
}

export default withRouter(Navigation);
