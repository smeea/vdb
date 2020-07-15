import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Button, Navbar, Nav } from 'react-bootstrap';


function Navigation(props) {
  const NavBar = ({location}) => {

    function AccountEntry(props) {
      if (props.username) {
        return props.username;
      } else {
        return 'Login';
      }
    };

    return(
      <Navbar bg="dark" variant="dark">
        <Nav className="container justify-content-end">
          <NavLink to="/account" className="nav-link px-2">
            <AccountEntry username={props.username} />
          </NavLink>
          <NavLink to="/about" className="nav-link px-2">
            About
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

          <Button className="js-filter-btn navbar-toggler d-inline d-xl-none ml-3" type="button" onClick={toggleSearchButton}>
            <svg width="1em" height="1.2em" viewBox="0 0 16 16" fill="white">
              <path d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" />
              <path d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"/>
            </svg>
          </Button>
        </Nav>
      </Navbar>
    )
  }

  const toggleSearchButton = () => {
    console.log('toggle search button');
  }

  return (

    <div>
      <NavBar />
    </div>
  );
}

export default withRouter(Navigation);
