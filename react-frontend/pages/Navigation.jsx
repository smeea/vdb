import React from 'react';
import { useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function Navigation(props) {
  const NavBar = ({location}) => {
    function AccountEntry(props) {
      if (props.username) {
        return props.username;
      } else {
        return 'Login';
      }
    };

    useEffect(() => {
      props.whoAmI();
    }, []);

    useEffect(() => {
      props.getDecks();
    }, [props.username]);

    return(
      <Navbar bg='dark' variant='dark'>
        <Nav className='container justify-content-end'>
            <NavLink to='/account' className='nav-link px-2'>
              <AccountEntry username={props.username} />
            </NavLink>
            <NavLink to='/about' className='nav-link px-2'>
              About
            </NavLink>
            <NavLink to='/deck' className='nav-link px-2'>
              Deck
            </NavLink>
            <NavLink to='/crypt' className='nav-link px-2'>
              Crypt
            </NavLink>
            <NavLink to='/library' className='nav-link px-2'>
              Library
            </NavLink>
        </Nav>
      </Navbar>
    );
  };

  return (
      <NavBar />
  );
}

export default withRouter(Navigation);
