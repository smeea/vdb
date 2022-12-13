import React, { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate, useParams } from 'react-router-dom';
import List from 'assets/images/icons/list.svg';
import X from 'assets/images/icons/x.svg';
import Check2 from 'assets/images/icons/check2.svg';
import ArrowLeftRight from 'assets/images/icons/arrow-left-right.svg';
import {
  ButtonIconed,
  DeckSelectMy,
  DeckBranchSelect,
  DeckSelectPrecon,
  DeckSelectRecent,
  DiffButtons,
  DiffCrypt,
  DiffLibrary,
  Button,
  Modal,
} from 'components';
import { useApp, deckStore, setDeck } from 'context';
import { useDeck } from 'hooks';

const Diff = () => {
  const {
    recentDecks,
    addRecentDeck,
    preconDecks,
    cryptCardBase,
    libraryCardBase,
    inventoryMode,
    username,
    isMobile,
    showFloatingButtons,
    setShowFloatingButtons,
    showMenuButtons,
    setShowMenuButtons,
  } = useApp();
  const navigate = useNavigate();
  const deck = useSnapshot(deckStore).deck;
  const decks = useSnapshot(deckStore).decks;
  const { deckidFrom, deckidTo } = useParams();

  const [errorFrom, setErrorFrom] = useState(false);
  const [errorTo, setErrorTo] = useState(false);
  const [selectFrom, setSelectFrom] = useState('from-my');
  const [selectTo, setSelectTo] = useState('to-my');
  const [urlFrom, setUrlFrom] = useState('');
  const [urlTo, setUrlTo] = useState('');
  const [deckTo, setDeckTo] = useState();

  const handleUrlChange = (e) => {
    if (e.taret.name === 'from') {
      setUrlFrom(e.target.value);
    } else {
      setUrlTo(e.target.value);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();

    let newId;
    if (e.taret.name === 'from') {
      newId = urlFrom.replace(`${process.env.ROOT_URL}decks/`, '');
      navigate(`/diff/${newId}/${deckidTo}`);
    } else {
      newId = urlTo.replace(`${process.env.ROOT_URL}decks/`, '');
      navigate(`/diff/${deckidFrom}/${newId}`);
    }
  };

  const handleSwap = () => {
    navigate(`/diff/${deckidTo}/${deckidFrom}`);
  };

  const getDeck = (id, setD, setE) => {
    setE(false);
    const url = `${process.env.API_URL}deck/${id}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then((deckData) => {
        const cardsData = useDeck(
          deckData.cards,
          cryptCardBase,
          libraryCardBase
        );

        const d = {
          author: deckData.author,
          crypt: cardsData.crypt,
          deckid: deckData.deckid,
          description: deckData.description,
          isAuthor: deckData.isAuthor,
          isBranches: Boolean(deckData.master || deckData.branches?.length > 0),
          isNonEditable: deckData.isNonEditable,
          isPublic: Boolean(deckData.publicParent),
          library: cardsData.library,
          name: deckData.name,
          publicChild: deckData.publicChild,
          publicParent: deckData.publicParent,
          tags: deckData.tags,
          timestamp: deckData.timestamp,
        };

        addRecentDeck(d);
        setD(d);
      })
      .catch((error) => {
        if (error.message == 400) {
          setE('NO DECK WITH THIS ID');
        } else {
          setE('CONNECTION PROBLEM');
        }
        setD(undefined);
      });
  };

  const handleSelectFrom = (e) => {
    navigate(`/diff/${e.value}/${deckidTo}`);
  };

  const handleSelectTo = (e) => {
    navigate(`/diff/${deckidFrom}/${e.value}`);
  };

  useEffect(() => {
    if (cryptCardBase && libraryCardBase && decks !== undefined) {
      if (deckidFrom && (deck?.deckid != deckidFrom || !deck)) {
        if (decks[deckidFrom]) {
          setDeck(decks[deckidFrom]);
        } else if (deckidFrom.includes(':')) {
          if (preconDecks && preconDecks[deckidFrom]) {
            setDeck(preconDecks[deckidFrom]);
          } else {
            setDeck(undefined);
            setErrorFrom('NO DECK WITH THIS ID');
          }
        } else {
          getDeck(deckidFrom, setDeck, setErrorFrom);
        }
      }
    }
  }, [deckidFrom, decks, preconDecks, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (cryptCardBase && libraryCardBase && decks !== undefined) {
      if (deckidTo && (deck?.deckid != deckidTo || !deckTo)) {
        if (decks[deckidTo]) {
          setDeckTo(decks[deckidTo]);
        } else if (deckidTo.includes(':')) {
          if (preconDecks && preconDecks[deckidTo]) {
            setDeckTo(preconDecks[deckidTo]);
          } else {
            setDeckTo(undefined);
            setErrorTo('NO DECK WITH THIS ID');
          }
        } else {
          getDeck(deckidTo, setDeckTo, setErrorTo);
        }
      }
    }
  }, [deckidTo, decks, preconDecks, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (deckidFrom?.includes(':')) {
      setSelectFrom('from-precons');
    } else if (decks && decks[deckidFrom]) {
      setSelectFrom('from-my');
    } else {
      setSelectFrom('from-recent');
    }
  }, [deckidFrom, decks]);

  useEffect(() => {
    if (deckidTo?.includes(':')) {
      setSelectTo('to-precons');
    } else if (decks && decks[deckidTo]) {
      setSelectTo('to-my');
    } else {
      setSelectTo('to-recent');
    }
  }, [deckidTo, decks]);

  useEffect(() => {
    if (deck) setErrorFrom(false);
  }, [deck]);

  useEffect(() => {
    if (deckTo) setErrorTo(false);
  }, [deckTo]);

  const [missingCrypt, setMissingCrypt] = useState({});
  const [missingLibrary, setMissingLibrary] = useState({});

  useEffect(() => {
    if (deck && deckTo) {
      const crypt = {};
      const library = {};

      Object.keys(deck.crypt)
        .filter((card) => deck.crypt[card].q > 0)
        .map((card) => {
          if (!deckTo.crypt[card]) {
            crypt[card] = { q: deck.crypt[card].q, c: cryptCardBase[card] };
          } else if (deck.crypt[card].q > deckTo.crypt[card].q) {
            crypt[card] = {
              q: deck.crypt[card].q - deckTo.crypt[card].q,
              c: cryptCardBase[card],
            };
          }
        });

      Object.keys(deck.library)
        .filter((card) => deck.library[card].q > 0)
        .map((card) => {
          if (!deckTo.library[card]) {
            library[card] = {
              q: deck.library[card].q,
              c: libraryCardBase[card],
            };
          } else if (deck.library[card].q > deckTo.library[card].q) {
            library[card] = {
              q: deck.library[card].q - deckTo.library[card].q,
              c: libraryCardBase[card],
            };
          }
        });

      setMissingCrypt(crypt);
      setMissingLibrary(library);
    }
  }, [deck, deckTo]);

  return (
    <div className="deck-container    mx-auto ">
      <div className=" flex flex-row">
        <div className="xl:basis-1/12"></div>
        <div className="  basis-full lg:basis-5/6 xl:basis-9/12">
          <div className="  flex flex-row   ">
            <div className=" ">
              <div className="text-blue  flex flex-row  font-bold">
                Deck You Edit:
              </div>
              {selectFrom === 'from-url' ? (
                <form
                  name="from"
                  onSubmit={handleUrlSubmit}
                  className=" min-w-[270px]"
                >
                  <input
                    placeholder="First Deck (ID or URL)"
                    type="text"
                    name="from"
                    value={urlFrom}
                    onChange={handleUrlChange}
                  />
                  <Button variant="primary" type="submit">
                    <Check2 />
                  </Button>
                  {isMobile && (
                    <Button variant="primary" onClick={handleSwap}>
                      <ArrowLeftRight />
                    </Button>
                  )}
                </form>
              ) : (
                <div
                  className={
                    inventoryMode || !isMobile ? 'flex' : 'flex justify-between'
                  }
                >
                  <div
                    className={
                      deck?.isBranches && selectFrom == 'from-my'
                        ? 'w-3/4'
                        : 'w-full'
                    }
                  >
                    {selectFrom == 'from-my' && decks ? (
                      <>
                        <DeckSelectMy
                          handleSelect={handleSelectFrom}
                          deckid={deck?.deckid}
                        />
                      </>
                    ) : selectFrom == 'from-recent' ? (
                      <DeckSelectRecent
                        handleSelect={handleSelectFrom}
                        deckid={deck?.deckid}
                      />
                    ) : (
                      <DeckSelectPrecon
                        handleSelect={handleSelectFrom}
                        deckid={deck?.deckid}
                      />
                    )}
                  </div>
                  {selectFrom == 'from-my' && decks && deck.isBranches && (
                    <div className="w-1/4">
                      <DeckBranchSelect
                        handleSelect={handleSelectFrom}
                        deck={deck}
                      />
                    </div>
                  )}
                  {isMobile && (
                    <Button variant="primary" onClick={handleSwap}>
                      <ArrowLeftRight />
                    </Button>
                  )}
                </div>
              )}
              <div className="flex items-center justify-between ">
                <form className="  ">
                  {username && decks && Object.keys(decks).length > 0 && (
                    <input
                      checked={selectFrom == 'from-my'}
                      onChange={(e) => setSelectFrom(e.target.id)}
                      type="radio"
                      id="from-my"
                      label={
                        <div className="text-blue">
                          <b>{isMobile ? 'My' : 'My Decks'}</b>
                        </div>
                      }
                      inline
                    />
                  )}
                  <input
                    checked={selectFrom == 'from-precons'}
                    onChange={(e) => setSelectFrom(e.target.id)}
                    type="radio"
                    id="from-precons"
                    label={
                      <div className="text-blue">
                        <b>Precons</b>
                      </div>
                    }
                    inline
                  />
                  {recentDecks.length > 0 && (
                    <input
                      checked={selectFrom == 'from-recent'}
                      onChange={(e) => setSelectFrom(e.target.id)}
                      type="radio"
                      id="from-recent"
                      label={
                        <div className="text-blue">
                          <b>Recent</b>
                        </div>
                      }
                      inline
                    />
                  )}
                  <input
                    checked={selectFrom == 'from-url'}
                    onChange={(e) => setSelectFrom(e.target.id)}
                    type="radio"
                    id="from-url"
                    label={
                      <div className="text-blue">
                        <b>URL</b>
                      </div>
                    }
                    inline
                  />
                </form>
              </div>
            </div>
            {!isMobile && (
              <div className="flex basis-1/12 justify-center ">
                <Button variant="primary" onClick={handleSwap}>
                  <ArrowLeftRight />
                </Button>
              </div>
            )}
            <div className="   ">
              <div className="text-blue  flex flex-row  font-bold">
                Show Changes Against:
              </div>
              {selectTo === 'to-url' ? (
                <form
                  name="to"
                  onSubmit={handleUrlSubmit}
                  className=" min-w-[270px]"
                >
                  <input
                    placeholder="First Deck (ID or URL)"
                    type="text"
                    name="to"
                    value={urlTo}
                    onChange={handleUrlChange}
                  />
                  <Button variant="primary" type="submit">
                    <Check2 />
                  </Button>
                </form>
              ) : (
                <div
                  className={
                    inventoryMode
                      ? 'flex'
                      : isMobile
                      ? 'flex min-w-[270px] justify-between'
                      : 'flex'
                  }
                >
                  <div
                    className={
                      deckTo?.isBranches && selectTo == 'to-my'
                        ? 'w-3/4'
                        : 'w-full'
                    }
                  >
                    {selectTo == 'to-my' && decks ? (
                      <DeckSelectMy
                        handleSelect={handleSelectTo}
                        deckid={deckTo?.deckid}
                      />
                    ) : selectTo == 'to-recent' ? (
                      <DeckSelectRecent
                        handleSelect={handleSelectTo}
                        deckid={deckTo?.deckid}
                      />
                    ) : (
                      <DeckSelectPrecon
                        handleSelect={handleSelectTo}
                        deckid={deckTo?.deckid}
                      />
                    )}
                  </div>
                  {selectTo == 'to-my' && decks && deckTo?.isBranches && (
                    <div className="w-1/4">
                      <DeckBranchSelect
                        handleSelect={handleSelectTo}
                        deck={deckTo}
                      />
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-center justify-between ">
                <form className="  ">
                  {username && decks && Object.keys(decks).length > 0 && (
                    <input
                      checked={selectTo == 'to-my'}
                      onChange={(e) => setSelectTo(e.target.id)}
                      type="radio"
                      id="to-my"
                      label={
                        <div className="text-blue">
                          <b>{isMobile ? 'My' : 'My Decks'}</b>
                        </div>
                      }
                      inline
                    />
                  )}
                  <input
                    checked={selectTo == 'to-precons'}
                    onChange={(e) => setSelectTo(e.target.id)}
                    type="radio"
                    id="to-precons"
                    label={
                      <div className="text-blue">
                        <b>Precons</b>
                      </div>
                    }
                    inline
                  />
                  {recentDecks.length > 0 && (
                    <input
                      checked={selectTo == 'to-recent'}
                      onChange={(e) => setSelectTo(e.target.id)}
                      type="radio"
                      id="to-recent"
                      label={
                        <div className="text-blue">
                          <b>Recent</b>
                        </div>
                      }
                      inline
                    />
                  )}
                  <input
                    checked={selectTo == 'to-url'}
                    onChange={(e) => setSelectTo(e.target.id)}
                    type="radio"
                    id="to-url"
                    label={
                      <div className="text-blue">
                        <b>URL</b>
                      </div>
                    }
                    inline
                  />
                </form>
              </div>
            </div>
          </div>
          {(errorFrom || errorTo) && (
            <div className="flex flex-row ">
              <div className=" ">
                {errorFrom && (
                  <div className="error-message flex items-center justify-center">
                    <b>NO DECK WITH THIS ID</b>
                  </div>
                )}
              </div>
              <div className="basis-1/12 "></div>
              <div className=" ">
                {errorTo && (
                  <div className="error-message flex items-center justify-center">
                    <b>NO DECK WITH THIS ID</b>
                  </div>
                )}
              </div>
            </div>
          )}
          {deck && deckTo && (
            <div className=" flex flex-row">
              <div className="      md:basis-7/12">
                <div className={` ${isMobile ? null : 'sticky-deck-crypt'}`}>
                  <DiffCrypt
                    deckid={deck.deckid}
                    isEditable={
                      deck.isAuthor && !deck.isPublic && !deck.isFrozen
                    }
                    cardsFrom={deck.crypt}
                    cardsTo={deckTo.crypt}
                  />
                </div>
              </div>
              <div className="      md:basis-5/12">
                <div className={!isMobile ? 'sticky-deck-library  ' : null}>
                  <DiffLibrary
                    deckid={deck.deckid}
                    isEditable={
                      deck.isAuthor && !deck.isPublic && !deck.isFrozen
                    }
                    cardsFrom={deck.library}
                    cardsTo={deckTo.library}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {!isMobile && (
          <div className="hide-on-lt992px    lg:basis-1/6">
            <div className="sticky top-[77px] z-2">
              <DiffButtons
                missingCrypt={missingCrypt}
                missingLibrary={missingLibrary}
                deckFrom={deck}
                deckTo={deckTo}
              />
            </div>
          </div>
        )}
      </div>
      {showFloatingButtons && (
        <div
          onClick={() => {
            setShowMenuButtons(true);
            setShowFloatingButtons(false);
          }}
          className="hide-on-gt992px float-right-bottom float-menu flex items-center justify-center"
        >
          <List viewBox="0 0 16 16" />
        </div>
      )}
      {showMenuButtons && (
        <Modal
          show={showMenuButtons}
          handleClose={() => {
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
          centered={true}
          size="sm"
        >
          <div>
            <DiffButtons
              missingCrypt={missingCrypt}
              missingLibrary={missingLibrary}
              deckFrom={deck}
              deckTo={deckTo}
            />
            <div className="flex justify-end ">
              <ButtonIconed
                variant="secondary"
                onClick={() => {
                  setShowMenuButtons(false);
                  setShowFloatingButtons(true);
                }}
                title="Close"
                icon={<X width="24" height="24" viewBox="0 0 16 16" />}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Diff;
