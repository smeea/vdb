import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import DeckSelect from './components/DeckSelect.jsx';
import PersonFill from '../assets/images/icons/person-fill.svg';

function Navigation(props) {

  const ToggleLeft = (props) => {
    const toggle = () => {
      props.setShowCols((prevState) => ({
        ...prevState,
        left: !props.showCols.left,
      }));
    };

    return (
      <>
        {props.showCols.left ?
         <Button variant="secondary" onClick={() => toggle(props)}>L</Button>
         :
         <Button variant="outline-secondary" onClick={() => toggle(props)}>L</Button>
         }
      </>
    );
  };

  const NavBar = ({ location }) => {
    function AccountEntry(props) {
      if (props.isMobile) {
        return <PersonFill />;
      } else if (props.username) {
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
        <Nav className="container justify-content-between">
          {props.isMobile &&
           <>
             {props.showCols.left ?
              <Button variant="secondary" onClick={() => props.setShowCols({left: !props.showCols.left})}>{'>'}</Button>
              :
              <Button variant="outline-secondary" onClick={() => props.setShowCols({left: !props.showCols.left})}>{'>'}</Button>
             }
           </>
          }
          <div className="w-25">
            {Object.keys(props.decks).length > 0 && (
              <DeckSelect
                preview={true}
                decks={props.decks}
                activeDeck={props.activeDeck}
                setActiveDeck={props.setActiveDeck}
              />
            )}
          </div>
          <div className="d-flex align-items-center">
            <NavLink to="/account" className="nav-link px-2">
              <AccountEntry isMobile={props.isMobile} username={props.username} />
            </NavLink>
            <NavLink to="/about" className="nav-link px-2">
              {props.isMobile ? 'A' : 'About'}
            </NavLink>
            <NavLink to="/deck" className="nav-link px-2">
              {props.isMobile ? 'D' : 'Decks'}
            </NavLink>
            <NavLink to="/crypt" className="nav-link px-2">
              {props.isMobile ? 'C' : 'Crypt'}
            </NavLink>
            <NavLink to="/library" className="nav-link px-2">
              {props.isMobile ? 'L' : 'Library'}
            </NavLink>
            {props.isMobile &&
             <>
               {props.showCols.right ?
                <Button variant="secondary" onClick={() => props.setShowCols({right: !props.showCols.right})}>{'<'}</Button>
                :
                <Button variant="outline-secondary" onClick={() => props.setShowCols({right: !props.showCols.right})}>{'<'}</Button>
               }
             </>
            }
          </div>
        </Nav>
      </Navbar>
    );
  };

  return <NavBar />;
}

export default withRouter(Navigation);
