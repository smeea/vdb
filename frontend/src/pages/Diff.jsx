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
    <div className="deck-container px-md-2 px-xl-4 py-md-3 mx-auto px-0">
      <div className="mx-0 flex flex-row">
        <div className="xl:basis-1/12"></div>
        <div className="px-md-2 px-xl-3 basis-full lg:basis-5/6 xl:basis-9/12">
          <div className="px-md-0 pt-md-0 flex flex-row px-1 py-1 pb-0">
            <div className="pl-lg-3 px-0">
              <div className="text-blue mx-0 flex flex-row pb-1 font-bold">
                Deck You Edit:
              </div>
              {selectFrom === 'from-url' ? (
                <form
                  name="from"
                  onSubmit={handleUrlSubmit}
                  className="my-0 min-w-[270px]"
                >
                  <div className="input-group">
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
                      <Button
                        className="ms-1"
                        variant="primary"
                        onClick={handleSwap}
                      >
                        <ArrowLeftRight />
                      </Button>
                    )}
                  </div>
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
                        ? 'w-75'
                        : 'w-100'
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
                    <div className="pl-1 w-25">
                      <DeckBranchSelect
                        handleSelect={handleSelectFrom}
                        deck={deck}
                      />
                    </div>
                  )}
                  {isMobile && (
                    <Button
                      className="ms-1"
                      variant="primary"
                      onClick={handleSwap}
                    >
                      <ArrowLeftRight />
                    </Button>
                  )}
                </div>
              )}
              <div className="flex items-center justify-between pt-1">
                <form className="my-0 py-1 px-2">
                  {username && decks && Object.keys(decks).length > 0 && (
                    <input
                      checked={selectFrom == 'from-my'}
                      onChange={(e) => setSelectFrom(e.target.id)}
                      type="radio"
                      id="from-my"
                      label={
                        <div className="blue">
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
                      <div className="blue">
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
                        <div className="blue">
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
                      <div className="blue">
                        <b>URL</b>
                      </div>
                    }
                    inline
                  />
                </form>
              </div>
            </div>
            {!isMobile && (
              <div className="flex basis-1/12 justify-center px-0">
                <Button variant="primary" onClick={handleSwap}>
                  <ArrowLeftRight />
                </Button>
              </div>
            )}
            <div className="pt-md-0 pr-lg-3 px-0 pt-1">
              <div className="text-blue mx-0 flex flex-row pb-1 font-bold">
                Show Changes Against:
              </div>
              {selectTo === 'to-url' ? (
                <form
                  name="to"
                  onSubmit={handleUrlSubmit}
                  className="my-0 min-w-[270px]"
                >
                  <div className="input-group">
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
                  </div>
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
                        ? 'w-75'
                        : 'w-100'
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
                    <div className="pl-1 w-25">
                      <DeckBranchSelect
                        handleSelect={handleSelectTo}
                        deck={deckTo}
                      />
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-center justify-between pt-1">
                <form className="my-0 py-1 px-2">
                  {username && decks && Object.keys(decks).length > 0 && (
                    <input
                      checked={selectTo == 'to-my'}
                      onChange={(e) => setSelectTo(e.target.id)}
                      type="radio"
                      id="to-my"
                      label={
                        <div className="blue">
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
                      <div className="blue">
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
                        <div className="blue">
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
                      <div className="blue">
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
            <div className="flex flex-row py-1">
              <div className="pl-lg-3 px-0">
                {errorFrom && (
                  <div className="error-message flex items-center justify-center p-2">
                    <b>NO DECK WITH THIS ID</b>
                  </div>
                )}
              </div>
              <div className="basis-1/12 px-0"></div>
              <div className="pr-lg-3 px-0">
                {errorTo && (
                  <div className="error-message flex items-center justify-center p-2">
                    <b>NO DECK WITH THIS ID</b>
                  </div>
                )}
              </div>
            </div>
          )}
          {deck && deckTo && (
            <div className="pt-md-2 flex flex-row">
              <div className="px-md-2 pl-xl-2 pr-xl-3 pt-md-0 px-0 pt-3 md:basis-7/12">
                <div
                  className={`pt-md-4 ${isMobile ? null : 'sticky-deck-crypt'}`}
                >
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
              <div className="px-md-2 pl-xl-3 pr-xl-2 pt-md-0 px-0 pt-3 md:basis-5/12">
                <div
                  className={
                    !isMobile ? 'sticky-deck-library pt-md-4 pt-4' : null
                  }
                >
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
          <div className="hide-on-lt992px pl-lg-2 pr-lg-1 px-xl-3 lg:basis-1/6">
            <div className="sticky-buttons">
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
            <div className="flex justify-end pt-1">
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
