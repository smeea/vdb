import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useLocation, Redirect } from 'react-router-dom';

import './assets/css/bootstrap.min.css';
import './assets/css/style.styl';

import Navigation from './pages/Navigation.jsx';
import Account from './pages/Account.jsx';
import About from './pages/About.jsx';
import Deck from './pages/Deck.jsx';
import Crypt from './pages/Crypt.jsx';
import Library from './pages/Library.jsx';

function App(props) {
  const [username, setUsername] = useState(undefined);
  const [publicName, setPublicName] = useState(undefined);

  const [showImage, setShowImage] = useState(false);
  const toggleImage = () => setShowImage(!showImage);

  const [decks, setDecks] = useState({});
  const [activeDeck, setActiveDeck] = useState(undefined);

  const getDecks = () => {
    const url = '/decks';
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        if (data.error === undefined) {
          if (!_.isEqual(data, decks)) {
            setDecks(data);
          }
        } else {
          console.log('Error: ', data.error);
        }
      });
  };

  const deckCardAdd = (cardid) => {
    const url = '/deck/' + activeDeck;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({add: {[cardid]: 1}})
    };

    fetch(url, options)
      .then(() => getDecks());
  };

  const deckCardChange = (deckid, cardid, count) => {
    const url = '/deck/' + deckid;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({update: {[cardid]: count}})
    };

    fetch(url, options)
      .then(() => getDecks());
  };


  const whoAmI= () => {
    const url = 'login';
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        setUsername(data.username);
        setPublicName(data.public_name);
      })
  };

  useEffect(() => {
      whoAmI();
  }, []);

  useEffect(() => {
    if (username) {
      getDecks();
    } else {
      setDecks({});
    }
  }, [username]);

  return (
    <div className='App'>
      <Router>
        <Navigation
          username={username}
        />
        <Switch>
          <Route path='/' exact component={() => <About />} />
          <Route path='/about' exact component={() => <About />} />
          <Route path='/account' exact component={() =>
            <Account
              username={username}
              publicName={publicName}
              setUsername={setUsername}
              setPublicName={setPublicName}
            /> } />
          <Route path='/deck' exact component={() =>
            <Deck
              decks={decks}
              activeDeck={activeDeck}
              setActiveDeck={setActiveDeck}
              deckCardAdd={deckCardAdd}
              deckCardChange={deckCardChange}
              getDecks={getDecks}
              showImage={showImage}
              toggleImage={toggleImage}
              username={username}
              whoAmI={whoAmI}
            /> } />
          <Route path='/deck/:id' component={(props) =>
            <Deck
              decks={decks}
              activeDeck={activeDeck}
              setActiveDeck={setActiveDeck}
              deckCardAdd={deckCardAdd}
              deckCardChange={deckCardChange}
              getDecks={getDecks}
              showImage={showImage}
              toggleImage={toggleImage}
              username={username}
              whoAmI={whoAmI}
              id={props.match.params.id}
            /> } />
          <Route path='/crypt'>
            <Crypt
              deckCardAdd={deckCardAdd}
              deckCardChange={deckCardChange}
              decks={decks}
              getDecks={getDecks}
              activeDeck={activeDeck}
              setActiveDeck={setActiveDeck}
              showImage={showImage}
              toggleImage={toggleImage}
            />
          </Route>
          <Route path='/library'>
            <Library
              deckCardAdd={deckCardAdd}
              deckCardChange={deckCardChange}
              decks={decks}
              getDecks={getDecks}
              activeDeck={activeDeck}
              setActiveDeck={setActiveDeck}
              showImage={showImage}
              toggleImage={toggleImage}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
