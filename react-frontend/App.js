import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './pages/Navigation.jsx';
import './assets/css/bootstrap.min.css';
import './assets/css/style.styl';

const Crypt = lazy(() => import('./pages/Crypt.jsx'));
const Library = lazy(() => import('./pages/Library.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Deck = lazy(() => import('./pages/Deck.jsx'));
const Account = lazy(() => import('./pages/Account.jsx'));

function App(props) {
  const [username, setUsername] = useState(undefined);
  const [publicName, setPublicName] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  const [showImage, setShowImage] = useState(false);
  const toggleImage = () => setShowImage(!showImage);

  const [decks, setDecks] = useState({});
  const [activeDeck, setActiveDeck] = useState(undefined);

  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 540px)').matches);

  const [showCols, setShowCols] = useState({
    left: true,
    middle: true,
    right: true,
  });

  const getDecks = () => {
    const url = `${process.env.API_URL}decks`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          if (JSON.stringify(data) != JSON.stringify(decks)) {
            setDecks(data);
          }
        } else {
          console.log('Error: ', data.error);
        }
      });
  };

  const deckCardAdd = (cardid) => {
    const url = `${process.env.API_URL}deck/${activeDeck}`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cardAdd: { [cardid]: 1 } }),
    };

    fetch(url, options).then(() => getDecks());
  };

  const deckCardChange = (deckid, cardid, count) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cardChange: { [cardid]: count } }),
    };

    fetch(url, options).then(() => getDecks());
  };

  const whoAmI = () => {
    const url = `${process.env.API_URL}login`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
        setPublicName(data.public_name);
        setEmail(data.email);
      });
  };

  useEffect(() => {
    whoAmI();
  }, []);

  useEffect(() => {
    if (username) {
      getDecks();
      whoAmI();
    } else {
      setDecks({});
    }
  }, [username]);

  useEffect(() => {
    isMobile && setShowCols({
      right: true,
    });
  }, [isMobile]);

  useEffect(() => {
    activeDeck && isMobile && setShowCols({
      left: true,
    });
    !activeDeck && isMobile && setShowCols({
      right: true,
    });
  }, [activeDeck]);

  return (
    <div className="App">
      <Router>
        <Navigation
          isMobile={isMobile}
          showCols={showCols}
          setShowCols={setShowCols}
          username={username}
          decks={decks}
          activeDeck={activeDeck}
          setActiveDeck={setActiveDeck}
        />

        <Switch>
          <Suspense fallback={<></>}>
            <Route path="/" exact>
              <About />
            </Route>
            <Route path="/about" exact component={() => <About />} />
            <Route path="/account">
              <Account
                username={username}
                publicName={publicName}
                email={email}
                setUsername={setUsername}
                setPublicName={setPublicName}
                setEmail={setEmail}
              />
            </Route>
            <Route path="/deck">
              <Deck
                decks={decks}
                getDecks={getDecks}
                activeDeck={activeDeck}
                setActiveDeck={setActiveDeck}
                deckCardAdd={deckCardAdd}
                deckCardChange={deckCardChange}
                showImage={showImage}
                toggleImage={toggleImage}
                username={username}
                whoAmI={whoAmI}
              />
            </Route>
            <Route
              path="/deck/:id"
              component={(props) => (
                <Deck
                  decks={decks}
                  getDecks={getDecks}
                  activeDeck={activeDeck}
                  setActiveDeck={setActiveDeck}
                  deckCardAdd={deckCardAdd}
                  deckCardChange={deckCardChange}
                  showImage={showImage}
                  toggleImage={toggleImage}
                  username={username}
                  whoAmI={whoAmI}
                  id={props.match.params.id}
                />
              )}
            />
            <Route path="/crypt">
              <Crypt
                isMobile={isMobile}
                showCols={showCols}
                setShowCols={setShowCols}
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
            <Route path="/library">
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
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
