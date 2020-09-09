import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/css/bootstrap.min.css';
import './assets/css/style.styl';
import Navigation from './pages/Navigation.jsx';
import Account from './pages/Account.jsx';
import About from './pages/About.jsx';
import Deck from './pages/Deck.jsx';
import Crypt from './pages/Crypt.jsx';
import Library from './pages/Library.jsx';

function App(props) {
  const [addMode, setAddMode] = useState(false);

  const handleAddModeSwitch = () => {
    if (addMode == true) {
      setAddMode(false);
    } else {
      setAddMode(true);
    }
  };

  const [decks, setDecks] = useState({});
  const [activeDeck, setActiveDeck] = useState(undefined);

  const handleActiveDeckSelect = event => {
    setActiveDeck(event.target.value);
  };

  const getDecks = () => {
    const url = process.env.API_URL + 'decks';
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

  const cardAdd = (cardid) => {
    const url = process.env.API_URL + 'deck/' + activeDeck;
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

  const [username, setUsername] = useState(undefined);

  const whoAmI= () => {
    const url = process.env.API_URL + 'login';
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => setUsername(data.username));
  };

  return (
    <div className='App'>
      <Router>
        <Navigation
          username={username}
          whoAmI={whoAmI}
          getDecks={getDecks}
          addMode={addMode}
          handleAddModeSwitch={handleAddModeSwitch}
          handleActiveDeckSelect={handleActiveDeckSelect}
          decks={decks}
          activeDeck={activeDeck}

        />
        <Switch>
          <Route path='/' exact component={() => <About />} />
          <Route path='/about' exact component={() => <About />} />
          <Route path='/account' exact component={() =>
            <Account
              username={username}
              updateUsername={setUsername}
              whoAmI={whoAmI}
            /> } />
          <Route path='/deck' exact component={() =>
            <Deck
              handleActiveDeckSelect={handleActiveDeckSelect}
              decks={decks}
              activeDeck={activeDeck}
              setActiveDeck={setActiveDeck}
              getDecks={getDecks}

              username={username}
            /> } />
          <Route path='/deck/:id' component={(props) =>
            <Deck
              handleActiveDeckSelect={handleActiveDeckSelect}
              decks={decks}
              activeDeck={activeDeck}
              setActiveDeck={setActiveDeck}
              getDecks={getDecks}
              setAddMode={setAddMode}
              id={props.match.params.id}

              username={username}
              addMode={addMode}
              handleAddModeSwitch={handleAddModeSwitch}
            /> } />
          <Route path='/crypt' exact component={() =>
            <Crypt
              addMode={addMode}
              cardAdd={cardAdd}
              getDecks={getDecks}
              deck={decks[activeDeck]}

              username={username}
              handleAddModeSwitch={handleAddModeSwitch}
              handleActiveDeckSelect={handleActiveDeckSelect}
              decks={decks}
              activeDeck={activeDeck}
            /> } />
          <Route path='/library' exact component={() =>
            <Library
              addMode={addMode}
              cardAdd={cardAdd}
              getDecks={getDecks}
              deck={decks[activeDeck]}

              username={username}
              handleAddModeSwitch={handleAddModeSwitch}
              handleActiveDeckSelect={handleActiveDeckSelect}
              decks={decks}
              activeDeck={activeDeck}
            /> } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
