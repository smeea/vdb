import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
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
  const [libraryResults, setLibraryResults] = useState([]);
  const [librarySortMethod, setLibrarySortMethod] = useState('Default');
  const [cryptResults, setCryptResults] = useState([]);
  const [cryptSortMethod, setCryptSortMethod] = useState('Default');

  const [showImage, setShowImage] = useState(false);
  const toggleImage = () => setShowImage(!showImage);

  const [libraryFormState, setLibraryFormState] = useState({
    text: '',
    type: 'ANY',
    discipline: 'ANY',
    blood: 'ANY',
    bloodmoreless: 'le',
    pool: 'ANY',
    poolmoreless: 'le',
    clan: 'ANY',
    sect: 'ANY',
    title: 'ANY',
    traits: {
      'intercept': false,
      'stealth': false,
      'bleed': false,
      'strength': false,
      'dodge': false,
      'optional maneuver': false,
      'additional strike': false,
      aggravated: false,
      prevent: false,
      'optional press': false,
      'combat ends': false,
      'bounce bleed': false,
      'black hand': false,
      seraph: false,
      anarch: false,
      infernal: false,
    },
    set: 'ANY',
  });

  const [cryptFormState, setCryptFormState] = useState({
    text: '',
    disciplines: {
      Abombwe: 0,
      Animalism: 0,
      Auspex: 0,
      Celerity: 0,
      Chimerstry: 0,
      Daimoinon: 0,
      Dementation: 0,
      Dominate: 0,
      Fortitude: 0,
      Melpominee: 0,
      Mytherceria: 0,
      Necromancy: 0,
      Obeah: 0,
      Obfuscate: 0,
      Obtenebration: 0,
      Potence: 0,
      Presence: 0,
      Protean: 0,
      Quietus: 0,
      Sanguinus: 0,
      Serpentis: 0,
      Spiritus: 0,
      Temporis: 0,
      Thanatosis: 0,
      Thaumaturgy: 0,
      Valeren: 0,
      Vicissitude: 0,
      Visceratika: 0,
    },
    virtues: {
      Defense: 0,
      Innocence: 0,
      Judgment: 0,
      Martyrdom: 0,
      Redemption: 0,
      Vengeance: 0,
      Vision: 0,
    },
    capacity: 'ANY',
    capacitymoreless: 'le',
    clan: 'ANY',
    sect: 'ANY',
    votes: 'ANY',
    titles: {
      primogen: false,
      prince: false,
      justicar: false,
      innercircle: false,
      baron: false,
      '1 votes': false,
      '2 votes': false,
      bishop: false,
      archbishop: false,
      priscus: false,
      cardinal: false,
      regent: false,
      magaji: false,
    },
    group: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
    },
    traits: {
      '1 intercept': false,
      '1 stealth': false,
      '1 bleed': false,
      '2 bleed': false,
      '1 strength': false,
      '1 strength': false,
      'additional strike': false,
      'optional maneuver': false,
      'optional press': false,
      prevent: false,
      aggravated: false,
      'enter combat': false,
      'black hand': false,
      seraph: false,
      infernal: false,
      'red list': false,
      flight: false,
    },
    set: 'ANY',
  });

  const [decks, setDecks] = useState({});
  const [activeDeck, setActiveDeck] = useState(undefined);

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

  const deckCardAdd = (cardid) => {
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


  const deckCardChange = (deckid, cardid, count) => {
    const url = process.env.API_URL + 'deck/' + deckid;
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
      .then(data => setUsername(data.username))
  };


  useEffect(() => {
    if (username) {
      getDecks();
    } else {
      setDecks({});
    }
  }, [username]);

  useEffect(() => {
      whoAmI();
  }, []);


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
              setUsername={setUsername}
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
              id={props.match.params.id}
            /> } />
          <Route path='/crypt' exact component={() =>
            <Crypt
              cards={cryptResults}
              setResults={setCryptResults}
              deckCardAdd={deckCardAdd}
              deckCardChange={deckCardChange}
              decks={decks}
              getDecks={getDecks}
              activeDeck={activeDeck}
              setActiveDeck={setActiveDeck}
              sortMethod={cryptSortMethod}
              setSortMethod={setCryptSortMethod}
              showImage={showImage}
              toggleImage={toggleImage}
              formState={cryptFormState}
              setFormState={setCryptFormState}
            /> } />
          <Route path='/library' exact component={() =>
            <Library
              cards={libraryResults}
              setResults={setLibraryResults}
              deckCardAdd={deckCardAdd}
              deckCardChange={deckCardChange}
              decks={decks}
              getDecks={getDecks}
              activeDeck={activeDeck}
              setActiveDeck={setActiveDeck}
              sortMethod={librarySortMethod}
              setSortMethod={setLibrarySortMethod}
              showImage={showImage}
              toggleImage={toggleImage}
              formState={libraryFormState}
              setFormState={setLibraryFormState}
            /> } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
