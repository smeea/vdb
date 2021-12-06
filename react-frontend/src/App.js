import React, { useState, useEffect, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';
import { useApp, ThemeProvider } from 'context';
import About from 'pages/About.jsx';
import Account from 'pages/Account.jsx';
import Cards from 'pages/Cards.jsx';
import Crypt from 'pages/Crypt.jsx';
import Decks from 'pages/Decks.jsx';
import Diff from 'pages/Diff.jsx';
import Documentation from 'pages/Documentation.jsx';
import Inventory from 'pages/Inventory.jsx';
import Library from 'pages/Library.jsx';
import Navigation from 'pages/Navigation.jsx';
import Twd from 'pages/Twd.jsx';
import preconDecksData from 'assets/data/preconDecks.json';
import setsAndPrecons from 'components/forms_data/setsAndPrecons.json';
import 'assets/css/bootstrap.min.css';
import 'assets/css/style.styl';

const Changelog = React.lazy(() => import('pages/Changelog.jsx'));

function App(props) {
  const {
    username,
    setUsername,
    setPublicName,
    setEmail,
    lang,
    localizedCrypt,
    setLocalizedCrypt,
    localizedLibrary,
    setLocalizedLibrary,
    nativeCrypt,
    setNativeCrypt,
    nativeLibrary,
    setNativeLibrary,
    cryptCardBase,
    setCryptCardBase,
    libraryCardBase,
    setLibraryCardBase,
    setUsedCryptCards,
    setUsedLibraryCards,
    inventoryCrypt,
    setInventoryCrypt,
    inventoryLibrary,
    setInventoryLibrary,
    setInventoryMode,
    decks,
    setDecks,
    recentDecks,
    updateRecentDecks,
    activeDeck,
    setActiveDeck,
    getDecks,
    setPreconDecks,
  } = useApp();

  const [lastDeck, setLastDeck] = useState({});

  const getCardBase = () => {
    const urlCrypt = `${process.env.ROOT_URL}cardbase_crypt.json?v=2021-12-05`;
    const urlLibrary = `${process.env.ROOT_URL}cardbase_lib.json?v=2021-12-05`;
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
          const en = {};
          Object.keys(data).map((id) => {
            en[id] = {
              Name: data[id]['Name'],
              'Card Text': data[id]['Card Text'],
            };
          });
          setNativeCrypt(en);
        }
      });

    fetch(urlLibrary, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          setLibraryCardBase(data);
          const en = {};
          Object.keys(data).map((id) => {
            en[id] = {
              Name: data[id]['Name'],
              'Card Text': data[id]['Card Text'],
            };
          });
          setNativeLibrary(en);
        }
      });
  };

  const getLocalization = (lang) => {
    const urlCrypt = `${process.env.ROOT_URL}cardbase_crypt.${lang}.json`;
    const urlLibrary = `${process.env.ROOT_URL}cardbase_lib.${lang}.json`;

    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(urlCrypt, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          setLocalizedCrypt((prevState) => ({
            ...prevState,
            [lang]: data,
          }));
        }
      });

    fetch(urlLibrary, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          setLocalizedLibrary((prevState) => ({
            ...prevState,
            [lang]: data,
          }));
        }
      });
  };

  const applyLocalization = (lang, part) => {
    const nativeSrc = part == 'crypt' ? nativeCrypt : nativeLibrary;
    const setState = part == 'crypt' ? setCryptCardBase : setLibraryCardBase;

    setState((prevState) => {
      const state = { ...prevState };
      Object.keys(nativeSrc).map((k) => {
        state[k]['Name'] = nativeSrc[k]['Name'];
        state[k]['Card Text'] = nativeSrc[k]['Card Text'];
      });

      if (lang != 'en-EN') {
        const localizedSrc =
          part == 'crypt' ? localizedCrypt[lang] : localizedLibrary[lang];

        Object.keys(localizedSrc).map((k) => {
          state[k]['Name'] = localizedSrc[k]['Name'];
          state[k]['Card Text'] = localizedSrc[k]['Card Text'];
        });
      }
      return state;
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
          setInventoryCrypt(data.crypt);
          setInventoryLibrary(data.library);
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

    const oldCryptState = { ...inventoryCrypt };
    const oldLibraryState = { ...inventoryLibrary };
    fetch(url, options).catch((error) => {
      setInventoryCrypt(oldCryptState);
      setInventoryLibrary(oldLibraryState);
    });

    inventoryAddToState(cards);
  };

  const inventoryAddToState = (cards) => {
    setInventoryCrypt((prevState) => {
      const oldState = { ...prevState };

      Object.keys(cards)
        .filter((cardid) => cardid > 200000)
        .forEach((cardid) => {
          oldState[cardid] = {
            c: cryptCardBase[cardid],
            q: prevState[cardid]
              ? prevState[cardid].q + cards[cardid]
              : cards[cardid],
          };
        });

      return oldState;
    });

    setInventoryLibrary((prevState) => {
      const oldState = { ...prevState };

      Object.keys(cards)
        .filter((cardid) => cardid < 200000)
        .forEach((cardid) => {
          oldState[cardid] = {
            c: libraryCardBase[cardid],
            q: prevState[cardid]
              ? prevState[cardid].q + cards[cardid]
              : cards[cardid],
          };
        });

      return oldState;
    });
  };

  const inventoryDeckDelete = (deck) => {
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

    const url = `${process.env.API_URL}inventory/del`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cards),
    };

    const oldCryptState = { ...inventoryCrypt };
    const oldLibraryState = { ...inventoryLibrary };
    fetch(url, options).catch((error) => {
      setInventoryCrypt(oldCryptState);
      setInventoryLibrary(oldLibraryState);
    });

    inventoryDeleteFromState(cards);
  };

  const inventoryDeleteFromState = (cards) => {
    Object.keys(cards).forEach((cardid) => {
      if (cardid > 200000) {
        setInventoryCrypt((prevState) => {
          const oldState = { ...prevState };
          if (prevState[cardid]) {
            if (prevState[cardid].q > cards[cardid]) {
              oldState[cardid] = {
                c: cryptCardBase[cardid],
                q: prevState[cardid].q - cards[cardid],
              };
            } else {
              delete oldState[cardid];
            }
          }
          return oldState;
        });
      } else {
        setInventoryLibrary((prevState) => {
          const oldState = { ...prevState };
          if (prevState[cardid]) {
            if (prevState[cardid].q > cards[cardid]) {
              oldState[cardid] = {
                c: libraryCardBase[cardid],
                q: prevState[cardid].q - cards[cardid],
              };
            } else {
              delete oldState[cardid];
            }
          }
          return oldState;
        });
      }
    });
  };

  const getPreconDecks = () => {
    const precons = {};

    Object.keys(preconDecksData).map((set) => {
      Object.keys(preconDecksData[set]).map((precon) => {
        const deckid = `${set}:${precon}`;
        const name = setsAndPrecons[set]['precons'][precon]['name'];

        precons[deckid] = {
          name: `${name}`,
          deckid: deckid,
          author: 'VTES Team',
          description: `Preconstructed from "${setsAndPrecons[set]['name']}" [${setsAndPrecons[set]['year']}]`,
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
        if (!data.username) {
          setInventoryMode(false);
        }
        setUsername(data.username);
        setPublicName(data.public_name);
        setEmail(data.email);
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
    if (decks) {
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
      setUsedCryptCards({
        soft: softCrypt,
        hard: hardCrypt,
      });
      setUsedLibraryCards({
        soft: softLibrary,
        hard: hardLibrary,
      });
    }
  }, [decks]);

  useEffect(() => {
    getCardBase();
    whoAmI();
  }, []);

  useEffect(() => {
    cryptCardBase && libraryCardBase && getPreconDecks();
  }, [cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (username) {
      if (nativeCrypt && nativeLibrary) {
        getInventory();
        getDecks();
      }
    } else {
      setInventoryCrypt({});
      setInventoryLibrary({});
      setDecks(undefined);
      setActiveDeck({ src: null, deckid: null });
      setLastDeck({});
      setEmail(undefined);
    }
  }, [username, nativeCrypt, nativeLibrary]);

  useEffect(() => {
    if (decks) {
      const d = recentDecks.filter((v) => !decks[v.deckid]);
      if (d.length < recentDecks.length) {
        updateRecentDecks(d);
      }
    }
  }, [decks, recentDecks]);

  useEffect(() => {
    if (lastDeck && lastDeck.deckid && !activeDeck.deckid) {
      setActiveDeck({ src: 'my', deckid: lastDeck.deckid });
    }
  }, [lastDeck]);

  useEffect(() => {
    if (lang == 'en-EN') {
      if (nativeCrypt) {
        applyLocalization(lang, 'crypt');
      }
    } else if (nativeCrypt && localizedCrypt && localizedCrypt[lang]) {
      applyLocalization(lang, 'crypt');
    }
  }, [lang, nativeCrypt, localizedCrypt]);

  useEffect(() => {
    if (lang == 'en-EN') {
      if (nativeLibrary) {
        applyLocalization(lang, 'library');
      }
    } else if (nativeLibrary && localizedLibrary && localizedLibrary[lang]) {
      applyLocalization(lang, 'library');
    }
  }, [lang, nativeLibrary, localizedLibrary]);

  useEffect(() => {
    if (lang != 'en-EN') {
      if (
        !(localizedCrypt && localizedCrypt[lang]) ||
        !(localizedLibrary && localizedLibrary[lang])
      ) {
        getLocalization(lang);
      }
    }
  }, [lang]);

  return (
    <div className="App">
      <Suspense fallback={<div />}>
        <Router>
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>

          <Routes>
            <Route path="*" element={<Navigate to="/about" />} />
            <Route path="about" element={<About />} />
            <Route path="documentation" element={<Documentation />} />
            <Route path="changelog" element={<Changelog />} />
            <Route path="account" element={<Account />} />
            <Route path="diff" element={<Diff />} />
            <Route path="twd" element={<Twd />} />
            <Route
              path="inventory"
              element={
                <Inventory
                  inventoryDeckAdd={inventoryDeckAdd}
                  inventoryDeckDelete={inventoryDeckDelete}
                  inventoryAddToState={inventoryAddToState}
                  setInventoryCrypt={setInventoryCrypt}
                  setInventoryLibrary={setInventoryLibrary}
                />
              }
            />
            <Route path="decks" element={<Decks />} />
            <Route
              path="crypt"
              element={
                <Crypt
                  activeDeck={
                    activeDeck.src == 'my'
                      ? activeDeck
                      : { src: 'my', deckid: lastDeck.deckid }
                  }
                />
              }
            />
            <Route
              path="library"
              element={
                <Library
                  activeDeck={
                    activeDeck.src == 'my'
                      ? activeDeck
                      : { src: 'my', deckid: lastDeck.deckid }
                  }
                />
              }
            />
            <Route path="cards" element={<Cards />} />
            <Route path="cards/:id" element={<Cards />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
