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
        onClick={() =>
          props.setShowCols({
            search: !props.showCols.search,
            result: props.showCols.search,
          })
        }
        variant="secondary"
        active={!props.showCols.search}
        disabled={!props.isResults}
      >
        <Search />
      </Button>
    );
  };

  const NavBar = ({ location }) => {
    return (
      <Navbar
        sticky="top"
        bg="dark"
        variant="dark"
      >
        <Nav className="container justify-content-between">
          <div className="d-flex align-items-center px-1">
            {props.username && props.isActiveDeck &&
             (props.location.pathname == "/crypt" || props.location.pathname == "/library") &&
             <Button
               onClick={() => props.setAddMode(!props.addMode)}
               variant="secondary"
             >
               {props.addMode ? <ToggleOn /> : <ToggleOff />}
             </Button>
            }
          </div>

          <div className="d-flex align-items-center">
            <NavLink to="/account" className="nav-link px-2">
              {props.username ? <PersonFill /> : 'Login'}
            </NavLink>
            <NavLink to="/about" className="nav-link px-2">
              {props.isMobile? <InfoCircleFill /> : 'About'}
            </NavLink>
            <NavLink to="/deck" className="nav-link px-2">
              Deck
            </NavLink>
            <NavLink to="/crypt" className="nav-link px-2">
              Crypt
            </NavLink>
            <NavLink to="/library" className="nav-link px-2">
              Library
            </NavLink>
            {props.isMobile && (
              <>
                <div className="toggle-search">
                  {(props.location.pathname == "/crypt") &&
                   <ToggleSearch
                     showCols={props.showCols}
                     setShowCols={props.setShowCols}
                     isResults={props.isCryptResults}
                   />
                  }
                  {(props.location.pathname == "/library") &&
                   <ToggleSearch
                     showCols={props.showCols}
                     setShowCols={props.setShowCols}
                     isResults={props.isLibraryResults}
                   />
                  }
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
