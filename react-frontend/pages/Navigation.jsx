import React from 'react';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import DeckSelectDeck from './components/DeckSelectDeck.jsx';

function AddModeSwitch(props) {
  return(
    <Form.Check
      onChange={props.handleAddModeSwitch}
      checked={props.addMode}
      type="switch"
      id="addmode-switch"
      label="Deck Mode"
    />
  );
};

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
          { props.username &&
            <>
              <span className='nav-link px-2'>
                <AddModeSwitch addMode={props.addMode} handleAddModeSwitch={props.handleAddModeSwitch} />
              </span>
              <span className='nav-link px-2'>
                <DeckSelectDeck handleActiveDeckSelect={props.handleActiveDeckSelect} decks={props.decks} activeDeck={props.activeDeck} />
              </span>
            </>
          }
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

  const toggleSearchButton = () => {
    console.log('toggle search button');
  };

  return (
      <NavBar />
  );
}

export default withRouter(Navigation);
