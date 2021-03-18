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
import preconDecksData from './preconDecks.json';
import preconData from './pages/components/forms_data/precons.json';
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
  const isMobile = window.matchMedia('(max-width: 540px)').matches;
  const isWide = window.matchMedia('(min-width: 1600px)').matches;

  const [twdFormState, setTwdFormState] = useState(defaultsTwdForm);
  const [cryptFormState, setCryptFormState] = useState(defaultsCryptForm);
  const [libraryFormState, setLibraryFormState] = useState(defaultsLibraryForm);

  const [username, setUsername] = useState(undefined);
  const [publicName, setPublicName] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  const [showImage, setShowImage] = useState(true);
  const [addMode, setAddMode] = useState(!isMobile);
  const [inventoryMode, setInventoryMode] = useState(false);
  const [hideMissing, setHideMissing] = useState(false);

  const [decks, setDecks] = useState(undefined);
  const [preconDecks, setPreconDecks] = useState({});
  const [activeDeck, setActiveDeck] = useState({ src: null, deckid: null });
  const [lastDeck, setLastDeck] = useState({});
  const [sharedDeck, setSharedDeck] = useState(undefined);

  const [inventory, setInventory] = useState({ crypt: {}, library: {} });
  const [usedCards, setUsedCards] = useState({
    softCrypt: {},
    hardCrypt: {},
    softLibrary: {},
    hardLibrary: {},
  });
  const isInventory = Object.keys(inventory.crypt).length > 0 || Object.keys(inventory.library).length > 0

  const [cryptCardBase, setCryptCardBase] = useState(undefined);
  const [libraryCardBase, setLibraryCardBase] = useState(undefined);

  const [twdResults, setTwdResults] = useState(undefined);
  const [cryptResults, setCryptResults] = useState(undefined);
  const [libraryResults, setLibraryResults] = useState(undefined);

  const [showTwdSearch, setShowTwdSearch] = useState(true);
  const [showCryptSearch, setShowCryptSearch] = useState(true);
  const [showLibrarySearch, setShowLibrarySearch] = useState(true);

  const [changeTimer, setChangeTimer] = useState(false);
  const [timers, setTimers] = useState([]);

  const deckRouter = (pointer) => {
    if (pointer) {
      switch (pointer['src']) {
        case 'my':
          return decks && decks[pointer['deckid']];
        case 'precons':
          return preconDecks && preconDecks[pointer['deckid']];
        case 'shared':
        case 'twd':
          return sharedDeck && sharedDeck[pointer['deckid']];
      }
    }
  };

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

  const inventoryDeckAdd = (deck) => {
    const cards = {};

    Object.keys(deck.crypt).forEach((card) => {
      if (deck.crypt[card].q) {
        cards[card] = deck.crypt[card].q;
      }
    });

    Object.keys(deck.library).forEach((card) => {
      if (deck.library[card].q) {
        cards[card] = deck.library[card].q;
      }
    });

    const url = `${process.env.API_URL}inventory/add`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cards),
    };

    const oldState = { ...inventory };
    fetch(url, options).catch((error) => {
      setInventory(oldState);
    });

    Object.keys(cards).forEach((cardid) => {
      if (cardid > 200000) {
        setInventory((prevState) => {
          const oldState = { ...prevState };
          oldState.crypt[cardid] = {
            c: cryptCardBase[cardid],
            q: prevState.crypt[cardid]
              ? prevState.crypt[cardid].q + cards[cardid]
              : cards[cardid],
          };
          return oldState;
        });
      } else {
        setInventory((prevState) => {
          const oldState = { ...prevState };
          oldState.library[cardid] = {
            c: libraryCardBase[cardid],
            q: prevState.library[cardid]
              ? prevState.library[cardid].q + cards[cardid]
              : cards[cardid],
          };
          return oldState;
        });
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

    const oldState = { ...inventory };
    fetch(url, options).catch((error) => {
      setInventory(oldState);
    });

    if (cardid > 200000) {
      setInventory((prevState) => {
        const oldState = { ...prevState };
        oldState['crypt'][cardid] = {
          c: cryptCardBase[cardid],
          q: 1,
        };
        return oldState;
      });
    } else {
      setInventory((prevState) => {
        const oldState = { ...prevState };
        oldState['library'][cardid] = {
          c: libraryCardBase[cardid],
          q: 1,
        };
        return oldState;
      });
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
    const part = cardid > 200000 ? 'crypt' : 'library';

    if (count >= 0 || (count < 0 && inventory[part][cardid])) {
      const oldState = { ...inventory };

      fetch(url, options).catch((error) => {
        setInventory(oldState);
      });

      if (count >= 0) {
        setInventory((prevState) => {
          const oldState = { ...prevState };
          if (oldState[part][cardid]) {
            oldState[part][cardid].q = count;
          } else {
            oldState[part][cardid] = {
              q: count,
              c:
                part == 'crypt'
                  ? cryptCardBase[cardid]
                  : libraryCardBase[cardid],
            };
          }
          return oldState;
        });
      } else {
        setInventory((prevState) => {
          const oldState = { ...prevState };
          delete oldState[part][cardid];
          return oldState;
        });
      }
    }
  };

  const getPreconDecks = () => {
    const precons = {};

    Object.keys(preconDecksData).map((set) => {
      Object.keys(preconDecksData[set]).map((precon) => {
        const deckid = `${set}:${precon}`;
        const name = preconData.filter(i => i[1] == set && i[2] == precon)[0][3]

        precons[deckid] = {
          name: `${name}`,
          deckid: deckid,
          author: '',
          description: `Preconstructed deck from ${set}`,
          crypt: {},
          library: {},
        };
        Object.keys(preconDecksData[set][precon]).map((card) => {
          if (card > 200000) {
            precons[deckid]['crypt'][card] = {
              c: cryptCardBase[card],
              q: preconDecksData[set][precon][card],
            };
          } else {
            precons[deckid]['library'][card] = {
              c: libraryCardBase[card],
              q: preconDecksData[set][precon][card],
            };
          }
        });
      });
    });

    setPreconDecks(precons);
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
        } else {
          setDecks({});
        }
      });
  };

  const deckCardAdd = (cardid) => {
    const url = `${process.env.API_URL}deck/${activeDeck.deckid}`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cardAdd: { [cardid]: 1 } }),
    };

    const oldState = { ...decks };

    fetch(url, options).catch((error) => {
      setDecks(oldState);
    });

    if (cardid > 200000) {
      setDecks((prevState) => {
        const oldState = { ...prevState };
        oldState[activeDeck.deckid]['crypt'][cardid] = {
          c: cryptCardBase[cardid],
          q: 1,
        };
        return oldState;
      });
    } else {
      setDecks((prevState) => {
        const oldState = { ...prevState };
        oldState[activeDeck.deckid]['library'][cardid] = {
          c: libraryCardBase[cardid],
          q: 1,
        };
        return oldState;
      });
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

    const oldState = { ...decks };

    fetch(url, options).catch((error) => {
      setDecks(oldState);
    });

    const part = cardid > 200000 ? 'crypt' : 'library';

    if (count >= 0) {
      setDecks((prevState) => {
        const oldState = { ...prevState };
        oldState[deckid][part][cardid].q = count;
        return oldState;
      });
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
        data.username && setUsername(data.username);
        data.public_name && setPublicName(data.public_name);
        data.email && setEmail(data.email);
      });
  };

  useEffect(() => {
    const byTimestamp = (a, b) => {
      return new Date(b[1]) - new Date(a[1]);
    };

    if (decks) {
      const decksForSort = [];

      Object.keys(decks).map((key) => {
        decksForSort.push([decks[key], decks[key].timestamp]);
      });

      const lastDeckArray = decksForSort.sort(byTimestamp)[0];
      if (lastDeckArray) {
        setLastDeck(lastDeckArray[0]);
      }
    }
  }, [decks]);

  useEffect(() => {
    if (inventory && decks) {
      const softCrypt = {};
      const softLibrary = {};
      const hardCrypt = {};
      const hardLibrary = {};
      Object.keys(decks).forEach((deckid) => {
        if (decks[deckid].inventory_type == 's') {
          Object.keys(decks[deckid].crypt).forEach((id) => {
            if (decks[deckid].crypt[id].q) {
              if (softCrypt[id]) {
                softCrypt[id][deckid] = decks[deckid].crypt[id].q;
              } else {
                softCrypt[id] = {};
                softCrypt[id][deckid] = decks[deckid].crypt[id].q;
              }
            }
          });
          Object.keys(decks[deckid].library).forEach((id) => {
            if (decks[deckid].library[id].q) {
              if (softLibrary[id]) {
                softLibrary[id][deckid] = decks[deckid].library[id].q;
              } else {
                softLibrary[id] = {};
                softLibrary[id][deckid] = decks[deckid].library[id].q;
              }
            }
          });
        } else if (decks[deckid].inventory_type == 'h') {
          Object.keys(decks[deckid].crypt).forEach((id) => {
            if (decks[deckid].crypt[id].q) {
              if (hardCrypt[id]) {
                hardCrypt[id][deckid] = decks[deckid].crypt[id].q;
              } else {
                hardCrypt[id] = {};
                hardCrypt[id][deckid] = decks[deckid].crypt[id].q;
              }
            }
          });
          Object.keys(decks[deckid].library).forEach((id) => {
            if (decks[deckid].library[id].q) {
              if (hardLibrary[id]) {
                hardLibrary[id][deckid] = decks[deckid].library[id].q;
              } else {
                hardLibrary[id] = {};
                hardLibrary[id][deckid] = decks[deckid].library[id].q;
              }
            }
          });
        }
        Object.keys(decks[deckid].crypt).forEach((id) => {
          if (decks[deckid].crypt[id].i == 's' && decks[deckid].crypt[id].q) {
            if (softCrypt[id]) {
              softCrypt[id][deckid] = decks[deckid].crypt[id].q;
            } else {
              softCrypt[id] = {};
              softCrypt[id][deckid] = decks[deckid].crypt[id].q;
            }
            delete hardCrypt[id][deckid];
          }
          if (decks[deckid].crypt[id].i == 'h' && decks[deckid].crypt[id].q) {
            if (hardCrypt[id]) {
              hardCrypt[id][deckid] = decks[deckid].crypt[id].q;
            } else {
              hardCrypt[id] = {};
              hardCrypt[id][deckid] = decks[deckid].crypt[id].q;
            }
            delete softCrypt[id][deckid];
          }
        });
        Object.keys(decks[deckid].library).forEach((id) => {
          if (
            decks[deckid].library[id].i == 's' &&
            decks[deckid].library[id].q
          ) {
            if (softLibrary[id]) {
              softLibrary[id][deckid] = decks[deckid].library[id].q;
            } else {
              softLibrary[id] = {};
              softLibrary[id][deckid] = decks[deckid].library[id].q;
            }
            delete hardLibrary[id][deckid];
          }
          if (
            decks[deckid].library[id].i == 'h' &&
            decks[deckid].library[id].q
          ) {
            if (hardLibrary[id]) {
              hardLibrary[id][deckid] = decks[deckid].library[id].q;
            } else {
              hardLibrary[id] = {};
              hardLibrary[id][deckid] = decks[deckid].library[id].q;
            }
            delete softLibrary[id][deckid];
          }
        });
      });
      setUsedCards({
        softCrypt: softCrypt,
        softLibrary: softLibrary,
        hardCrypt: hardCrypt,
        hardLibrary: hardLibrary,
      });
    }
  }, [inventory, decks]);

  useEffect(() => {
    whoAmI();
    (!cryptCardBase || !libraryCardBase) && getCardBase();
  }, []);

  useEffect(() => {
    if (username) {
      whoAmI();
      cryptCardBase && libraryCardBase && getInventory();
      cryptCardBase && libraryCardBase && getDecks();
    } else {
      setDecks(undefined);
    }
    cryptCardBase && libraryCardBase && getPreconDecks();
  }, [username, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (lastDeck && lastDeck.deckid && !activeDeck.deckid) {
      setActiveDeck({ src: 'my', deckid: lastDeck.deckid });
    }
  }, [lastDeck]);

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
          inventoryMode={inventoryMode}
          setInventoryMode={setInventoryMode}
        />

        <Switch>
          <Suspense fallback={<></>}>
            <Route path="/" exact component={() => <Redirect to="/about" />} />
            <Route path="/about" exact component={() => <About
                                                          isMobile={isMobile}
                                                        />} />
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
                inventoryMode={inventoryMode}
                setInventoryMode={setInventoryMode}
                addMode={addMode}
                formState={twdFormState}
                setFormState={setTwdFormState}
                setActiveDeck={setActiveDeck}
                username={username}
              />
            </Route>
            <Route path="/inventory">
              <Inventory
                inventory={inventory}
                setInventory={setInventory}
                inventoryDeckAdd={inventoryDeckAdd}
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
                usedCards={usedCards}
                decks={decks}
              />
            </Route>
            <Route path="/decks">
              <Decks
                deckRouter={deckRouter}
                changeTimer={changeTimer}
                isMobile={isMobile}
                isWide={isWide}
                decks={decks}
                preconDecks={preconDecks}
                usedCards={usedCards}
                getDecks={getDecks}
                activeDeck={activeDeck}
                setActiveDeck={setActiveDeck}
                sharedDeck={sharedDeck}
                setSharedDeck={setSharedDeck}
                inventory={inventory}
                inventoryMode={inventoryMode}
                setInventoryMode={setInventoryMode}
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
                deckRouter={deckRouter}
                changeTimer={changeTimer}
                isWide={isWide}
                isMobile={isMobile}
                hideMissing={hideMissing}
                setHideMissing={setHideMissing}
                showSearch={showCryptSearch}
                setShowSearch={setShowCryptSearch}
                cardAdd={deckCardAdd}
                cardChange={deckCardChange}
                decks={decks}
                getDecks={getDecks}
                activeDeck={
                  activeDeck.src == 'my'
                    ? activeDeck
                    : { src: 'my', deckid: lastDeck.deckid }
                }
                setActiveDeck={setActiveDeck}
                showImage={showImage}
                setShowImage={setShowImage}
                results={cryptResults}
                setResults={setCryptResults}
                inventory={inventory}
                inventoryMode={inventoryMode}
                isInventory={isInventory}
                setInventoryMode={setInventoryMode}
                addMode={addMode}
                setAddMode={setAddMode}
                formState={cryptFormState}
                setFormState={setCryptFormState}
                cryptCardBase={cryptCardBase}
                libraryCardBase={libraryCardBase}
                usedCards={usedCards}
                username={username}
              />
            </Route>
            <Route path="/library">
              <Library
                deckRouter={deckRouter}
                changeTimer={changeTimer}
                isWide={isWide}
                isMobile={isMobile}
                hideMissing={hideMissing}
                setHideMissing={setHideMissing}
                showSearch={showLibrarySearch}
                setShowSearch={setShowLibrarySearch}
                cardAdd={deckCardAdd}
                cardChange={deckCardChange}
                decks={decks}
                getDecks={getDecks}
                activeDeck={
                  activeDeck.src == 'my'
                    ? activeDeck
                    : { src: 'my', deckid: lastDeck.deckid }
                }
                setActiveDeck={setActiveDeck}
                showImage={showImage}
                setShowImage={setShowImage}
                results={libraryResults}
                setResults={setLibraryResults}
                inventory={inventory}
                inventoryMode={inventoryMode}
                isInventory={isInventory}
                setInventoryMode={setInventoryMode}
                addMode={addMode}
                setAddMode={setAddMode}
                formState={libraryFormState}
                setFormState={setLibraryFormState}
                cryptCardBase={cryptCardBase}
                libraryCardBase={libraryCardBase}
                usedCards={usedCards}
                username={username}
              />
            </Route>
            <Route
              path="/cards"
              exact
              component={(props) => (
                <Cards
                  isMobile={isMobile}
                  isWide={isWide}
                  cryptCardBase={cryptCardBase}
                  libraryCardBase={libraryCardBase}
                />
              )}
            />
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
