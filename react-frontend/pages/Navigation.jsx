import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import PersonFill from '../assets/images/icons/person-fill.svg';

function Navigation(props) {
  console.log(PersonFill)
  const NavBar = ({ location }) => {
    function AccountEntry(props) {
      if (props.username) {
        return (
          <div className="d-flex align-items-center">
            <PersonFill />
            {props.username}
          </div>
        );
      } else {
        return 'Login';
      }
    }

    return (
      <Navbar sticky="top" bg="dark" variant="dark">
        <Nav className="container justify-content-end">
          <NavLink to="/account" className="nav-link px-2">
            <AccountEntry username={props.username} />
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
        </Nav>
      </Navbar>
    );
  };

  return <NavBar />;
}

export default withRouter(Navigation);
