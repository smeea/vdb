import React from 'react';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';

// import DeckSelectDeck from './components/DeckSelectDeck.jsx';
// import AddModeSwitch from './components/AddModeSwitch.jsx';

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
        <Nav className='container justify-content-between'>
          <div className='d-flex'>
            {/* { */}
            {/*   props.username && */}
            {/*     <span className='nav-link px-2'> */}
            {/*       <AddModeSwitch addMode={props.addMode} handleAddModeSwitch={props.handleAddModeSwitch} /> */}
            {/*     </span> */}
            {/* } */}
            {/* { props.addMode && */}
            {/*   <span className='nav-link px-2'> */}
            {/*     <DeckSelectDeck handleActiveDeckSelect={props.handleActiveDeckSelect} decks={props.decks} activeDeck={props.activeDeck} /> */}
            {/*   </span> */}
            {/* } */}
          </div>
          <div className='d-flex'>
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
          </div>
        </Nav>
      </Navbar>
    );
  };

  return (
      <NavBar />
  );
}

export default withRouter(Navigation);
