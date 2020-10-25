import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import PersonFill from '../assets/images/icons/person-fill.svg';
import Search from '../assets/images/icons/search.svg';
import FolderFill from '../assets/images/icons/folder-fill.svg';

function Navigation(props) {

  const ToggleSearch = (props) => {
    return (
      <Button
        onClick={() => props.setShowCols({
          search: !props.showCols.search,
          result: props.showCols.search,
        })}
        variant={props.showCols.search ? 'secondary' : 'outline-secondary'}
      ><Search /></Button>
    );
  };

  const ToggleDeck = (props) => {
    return (
      <Button
        onClick={() => props.setShowCols({
          deck: !props.showCols.deck,
          result: props.showCols.deck,
        })}
        variant={props.showCols.deck ? 'secondary' : 'outline-secondary'}
      ><FolderFill /></Button>
    );
  };

  const NavBar = ({ location }) => {
    return (
      <Navbar sticky="top" bg="dark" variant="dark">
        <Nav className="container justify-content-between">
          {props.isMobile && <ToggleDeck showCols={props.showCols} setShowCols={props.setShowCols} />}
          <div />
          <div className="d-flex align-items-center">
            <NavLink to="/account" className="nav-link px-2">
              { props.username ? <PersonFill /> : 'Login' }
            </NavLink>
            <NavLink to="/about" className="nav-link px-2">
              About
            </NavLink>
            <NavLink to="/deck" className="nav-link px-2">
              Decks
            </NavLink>
            <NavLink to="/crypt" className="nav-link px-2">
              Crypt
            </NavLink>
            <NavLink to="/library" className="nav-link px-2">
              Library
            </NavLink>
          </div>
          {props.isMobile && <ToggleSearch showCols={props.showCols} setShowCols={props.setShowCols} />}
        </Nav>
      </Navbar>
    );
  };

  return <NavBar />;
}

export default withRouter(Navigation);
