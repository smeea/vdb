import React, { useState, useEffect, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Navigation from './pages/Navigation.jsx';
import defaultsTwdForm from './pages/components/forms_data/defaultsTwdForm.json';
import defaultsCryptForm from './pages/components/forms_data/defaultsCryptForm.json';
import defaultsLibraryForm from './pages/components/forms_data/defaultsLibraryForm.json';
import './assets/css/bootstrap.min.css';
import './assets/css/style.styl';

const Crypt = lazy(() => import('./pages/Crypt.jsx'));
const Library = lazy(() => import('./pages/Library.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Twd = lazy(() => import('./pages/Twd.jsx'));
const Decks = lazy(() => import('./pages/Decks.jsx'));
const Account = lazy(() => import('./pages/Account.jsx'));
const Cards = lazy(() => import('./pages/Cards.jsx'));
const Inventory = lazy(() => import('./pages/Inventory.jsx'));

function App(props) {
  const [twdFormState, setTwdFormState] = useState(defaultsTwdForm);
  const [cryptFormState, setCryptFormState] = useState(defaultsCryptForm);
  const [libraryFormState, setLibraryFormState] = useState(defaultsLibraryForm);

  const [username, setUsername] = useState(undefined);
  const [publicName, setPublicName] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  const [showImage, setShowImage] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const [inventoryMode, setInventoryMode] = useState(false);
  const [showDeck, setShowDeck] = useState(true);

  const [decks, setDecks] = useState({});
  const [activeDeck, setActiveDeck] = useState(undefined);
  const [lastDeck, setLastDeck] = useState({});
  const [sharedDeck, setSharedDeck] = useState(undefined);

  const [inventory, setInventory] = useState({})
  const [consumers, setConsumers] = useState([])
  const [consumedCards, setConsumedCards] = useState({})

  const [cryptCardBase, setCryptCardBase] = useState(undefined);
  const [libraryCardBase, setLibraryCardBase] = useState(undefined);

  const [twdResults, setTwdResults] = useState(undefined);
  const [cryptResults, setCryptResults] = useState(undefined);
  const [libraryResults, setLibraryResults] = useState(undefined);


  const isMobile = window.matchMedia('(max-width: 540px)').matches;
  const isWide = window.matchMedia('(min-width: 1600px)').matches;

  const [showTwdSearch, setShowTwdSearch] = useState(true);
  const [showCryptSearch, setShowCryptSearch] = useState(true);
  const [showLibrarySearch, setShowLibrarySearch] = useState(true);

  const [changeTimer, setChangeTimer] = useState(false);
  const [timers, setTimers] = useState([]);

  const getCardBase = () => {
    const urlCrypt = `${process.env.ROOT_URL}cardbase_crypt.json`;
    const urlLibrary = `${process.env.ROOT_URL}cardbase_library.json`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(urlCrypt, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          setCryptCardBase(data);
        }
      });

    fetch(urlLibrary, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          setLibraryCardBase(data);
        }
      });
  };

  const getConsumers = () => {
    const url = `${process.env.API_URL}inventory/consumers`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.error === undefined) {
          setConsumers(data);
        }
      });
  };

  const addConsumer = (deckid) => {
    const url = `${process.env.API_URL}inventory/consumers`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ add: deckid }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          setConsumers((prevState) => ([...prevState, deckid]));
        }
      });
  };

  const delConsumer = (deckid) => {
    const url = `${process.env.API_URL}inventory/consumers`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ delete: deckid }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          setConsumers((prevState) => (
            [...prevState.filter((value) => {return value != deckid})]
          ));
        }
      });
  };


  const getInventory = () => {
    const url = `${process.env.API_URL}inventory`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          Object.keys(data.crypt).map((i) => {
            data.crypt[i].c = cryptCardBase[i];
          });
          Object.keys(data.library).map((i) => {
            data.library[i].c = libraryCardBase[i];
          });
          setInventory(data);
        }
      });
  };

  const inventoryCardAdd = (cardid) => {
    const url = `${process.env.API_URL}inventory/add`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [cardid]: 1 }),
    };

    const oldState = inventory;
    fetch(url, options).catch((error) => {
      setInventory(oldState);
    });

    if (cardid > 200000) {
      setInventory((prevState) => ({
        ...prevState,
        crypt: {
          ...prevState.crypt,
          [cardid]: {
            c: cryptCardBase[cardid],
            q: 1,
          }
        }
      }));
    } else {
      setInventory((prevState) => ({
        ...prevState,
        library: {
          ...prevState.library,
          [cardid]: {
            c: libraryCardBase[cardid],
            q: 1,
          }
        }
      }));
    }
  };

 const inventoryCardChange = (deckid, cardid, count) => {
    const url = `${process.env.API_URL}inventory/change`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [cardid]: count }),
    };

    const oldState = decks;

    fetch(url, options).catch((error) => {
      setInventory(oldState);
    });

    const part = cardid > 200000 ? 'crypt' : 'library';

    if (count >= 0) {
      setInventory((prevState) => ({
        ...prevState,
        [part]: {
          ...prevState[part],
          [cardid]: {
            ...prevState[part][cardid],
            q: count,
          },
        },
      }));
    } else {
      setInventory((prevState) => {
        const oldState = { ...prevState };
        delete oldState[part][cardid];
        return oldState;
      });
    }
  };

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
          Object.keys(data).map((i) => {
            Object.keys(data[i].crypt).map((j) => {
              data[i].crypt[j].c = cryptCardBase[j];
            });
            Object.keys(data[i].library).map((j) => {
              data[i].library[j].c = libraryCardBase[j];
            });
          });
          setDecks(data);
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

    const oldState = decks;

    fetch(url, options).catch((error) => {
      setDecks(oldState);
    });

    if (cardid > 200000) {
      setDecks((prevState) => ({
        ...prevState,
        [activeDeck]: {
          ...prevState[activeDeck],
          crypt: {
            ...prevState[activeDeck].crypt,
            [cardid]: {
              c: cryptCardBase[cardid],
              q: 1,
            },
          },
        },
      }));
    } else {
      setDecks((prevState) => ({
        ...prevState,
        [activeDeck]: {
          ...prevState[activeDeck],
          library: {
            ...prevState[activeDeck].library,
            [cardid]: {
              c: libraryCardBase[cardid],
              q: 1,
            },
          },
        },
      }));
    }

    setChangeTimer(!changeTimer);
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

    const oldState = decks;

    fetch(url, options).catch((error) => {
      setDecks(oldState);
    });

    const part = cardid > 200000 ? 'crypt' : 'library';

    if (count >= 0) {
      setDecks((prevState) => ({
        ...prevState,
        [deckid]: {
          ...prevState[deckid],
          [part]: {
            ...prevState[deckid][part],
            [cardid]: {
              ...prevState[deckid][part][cardid],
              q: count,
            },
          },
        },
      }));
    } else {
      setDecks((prevState) => {
        const oldState = { ...prevState };
        delete oldState[deckid][part][cardid];
        return oldState;
      });
    }

    const startTimer = () => {
      let counter = 1;
      timers.map((timerId) => {
        clearInterval(timerId);
      });
      setTimers([]);

      const timerId = setInterval(() => {
        if (counter > 0) {
          counter = counter - 1;
        } else {
          clearInterval(timerId);
          setChangeTimer(!changeTimer);
        }
      }, 500);

      setTimers([...timers, timerId]);
    };

    startTimer();
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
    const byTimestamp = (a, b) => {
      return new Date(b[1]) - new Date(a[1]);
    };

    const decksForSort = [];

    Object.keys(decks).map((key) => {
      decksForSort.push([decks[key], decks[key].timestamp]);
    });

    const lastDeckArray = decksForSort.sort(byTimestamp)[0];
    if (lastDeckArray) {
      setLastDeck(lastDeckArray[0]);
    }
  }, [decks]);

  useEffect(() => {
    if (Object.keys(decks).length > 0) {
      if (consumers && inventory) {
        const crypt = {}
        const library = {}
        consumers.forEach(deckid => {
          Object.keys(decks[deckid].crypt).forEach(id => {
            if (crypt[id]) {
              crypt[id][deckid] = decks[deckid].crypt[id].q;
            } else {
              crypt[id] = {}
              crypt[id][deckid] = decks[deckid].crypt[id].q;
            }
          })
          Object.keys(decks[deckid].library).forEach(id => {
            if (library[id]) {
              library[id][deckid] = decks[deckid].library[id].q;
            } else {
              library[id] = {}
              library[id][deckid] = decks[deckid].library[id].q;
            }
          })
        })
        setConsumedCards({crypt: crypt, library: library})
      }
    }
  }, [consumers, inventory, decks])

  useEffect(() => {
    whoAmI();
    (!cryptCardBase || !libraryCardBase) && getCardBase();
  }, []);

  useEffect(() => {
    if (username) {
      whoAmI();
      getConsumers();
      cryptCardBase && libraryCardBase && getInventory();
      cryptCardBase && libraryCardBase && getDecks();
    } else {
      setDecks({});
    }
  }, [username, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (lastDeck && !sharedDeck) {
      setActiveDeck(lastDeck.deckid);
    }
  }, [lastDeck]);

  // useEffect(() => {
  //   setChangeTimer(!changeTimer);
  // }, [decks[activeDeck] && decks[activeDeck]['Name']]);

  // useEffect(() => {
  //   setChangeTimer(!changeTimer);
  // }, [sharedDeck]);

  return (
    <div className="App">
      <Router>
        <Navigation
          isMobile={isMobile}
          showCryptSearch={showCryptSearch}
          showLibrarySearch={showLibrarySearch}
          username={username}
          decks={decks}
          activeDeck={activeDeck}
          setActiveDeck={setActiveDeck}
          addMode={addMode}
          setAddMode={setAddMode}
          inventoryMode={inventoryMode}
          setInventoryMode={setInventoryMode}
          isActiveDeck={activeDeck ? true : false}
        />

        <Switch>
          <Suspense fallback={<></>}>
            <Route path="/" exact component={() => <Redirect to="/about" />} />
            <Route path="/about" exact component={() => <About />} />
            <Route path="/account">
              <Account
                isMobile={isMobile}
                username={username}
                publicName={publicName}
                email={email}
                setUsername={setUsername}
                setPublicName={setPublicName}
                setEmail={setEmail}
                whoAmI={whoAmI}
              />
            </Route>
            <Route path="/twd">
              <Twd
                isWide={isWide}
                isMobile={isMobile}
                showSearch={showTwdSearch}
                setShowSearch={setShowTwdSearch}
                getDecks={getDecks}
                showImage={showImage}
                setShowImage={setShowImage}
                results={twdResults}
                setResults={setTwdResults}
                cryptCardBase={cryptCardBase}
                libraryCardBase={libraryCardBase}
                addMode={addMode}
                formState={twdFormState}
                setFormState={setTwdFormState}
                setActiveDeck={setActiveDeck}
              />
            </Route>
            <Route path="/inventory">
              <Inventory
                inventory={inventory}
                getInventory={getInventory}
                cardAdd={inventoryCardAdd}
                cardChange={inventoryCardChange}
                cryptCardBase={cryptCardBase}
                libraryCardBase={libraryCardBase}
                isMobile={isMobile}
                isWide={isWide}
                showImage={showImage}
                setShowImage={setShowImage}
                whoAmI={whoAmI}
                username={username}
                setUsername={setUsername}
                consumedCards={consumedCards}
                decks={decks}
              />
            </Route>
            <Route path="/decks">
              <Decks
                changeTimer={changeTimer}
                isMobile={isMobile}
                isWide={isWide}
                decks={decks}
                getDecks={getDecks}
                activeDeck={activeDeck}
                setActiveDeck={setActiveDeck}
                sharedDeck={sharedDeck}
                setSharedDeck={setSharedDeck}
                inventory={inventory}
                inventoryMode={inventoryMode}
                consumers={consumers}
                addConsumer={addConsumer}
                delConsumer={delConsumer}
                cardAdd={deckCardAdd}
                cardChange={deckCardChange}
                showImage={showImage}
                setShowImage={setShowImage}
                whoAmI={whoAmI}
                username={username}
                setUsername={setUsername}
                cryptCardBase={cryptCardBase}
                libraryCardBase={libraryCardBase}
              />
            </Route>
            <Route path="/crypt">
              <Crypt
                changeTimer={changeTimer}
                isWide={isWide}
                isMobile={isMobile}
                showSearch={showCryptSearch}
                setShowSearch={setShowCryptSearch}
                showDeck={showDeck}
                setShowDeck={setShowDeck}
                cardAdd={deckCardAdd}
                cardChange={deckCardChange}
                decks={decks}
                getDecks={getDecks}
                activeDeck={activeDeck}
                setActiveDeck={setActiveDeck}
                showImage={showImage}
                setShowImage={setShowImage}
                results={cryptResults}
                setResults={setCryptResults}
                inventory={inventory}
                inventoryMode={inventoryMode}
                addMode={addMode}
                setAddMode={setAddMode}
                formState={cryptFormState}
                setFormState={setCryptFormState}
                cryptCardBase={cryptCardBase}
                libraryCardBase={libraryCardBase}
              />
            </Route>
            <Route path="/library">
              <Library
                changeTimer={changeTimer}
                isWide={isWide}
                isMobile={isMobile}
                showSearch={showLibrarySearch}
                setShowSearch={setShowLibrarySearch}
                showDeck={showDeck}
                setShowDeck={setShowDeck}
                cardAdd={deckCardAdd}
                cardChange={deckCardChange}
                decks={decks}
                getDecks={getDecks}
                activeDeck={activeDeck}
                setActiveDeck={setActiveDeck}
                showImage={showImage}
                setShowImage={setShowImage}
                results={libraryResults}
                setResults={setLibraryResults}
                inventory={inventory}
                inventoryMode={inventoryMode}
                addMode={addMode}
                setAddMode={setAddMode}
                formState={libraryFormState}
                setFormState={setLibraryFormState}
                cryptCardBase={cryptCardBase}
                libraryCardBase={libraryCardBase}
              />
            </Route>
            <Route
              path="/cards/:id"
              component={(props) => (
                <Cards
                  isMobile={isMobile}
                  isWide={isWide}
                  id={props.match.params.id}
                  cryptCardBase={cryptCardBase}
                  libraryCardBase={libraryCardBase}
                  showImage={showImage}
                  setShowImage={setShowImage}
                />
              )}
            />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
