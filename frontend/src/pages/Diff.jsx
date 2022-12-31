import React, { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useParams } from 'react-router-dom';
import List from 'assets/images/icons/list.svg';
import {
  DiffButtons,
  DiffCrypt,
  DiffLibrary,
  DiffSelect,
  ButtonFloat,
  Modal,
} from 'components';
import { useApp, deckStore, setDeck } from 'context';
import { useDeck } from 'hooks';

const Diff = () => {
  const {
    addRecentDeck,
    preconDecks,
    cryptCardBase,
    libraryCardBase,
    isMobile,
    showFloatingButtons,
    setShowFloatingButtons,
    showMenuButtons,
    setShowMenuButtons,
  } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const decks = useSnapshot(deckStore).decks;
  const { deckidFrom, deckidTo } = useParams();

  const [errorFrom, setErrorFrom] = useState(false);
  const [errorTo, setErrorTo] = useState(false);
  const [deckTo, setDeckTo] = useState();

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

  const X_SPACING = 'space-x-8';
  const Y_SPACING = 'space-y-8';
  const TOP_SPACING = 'pt-8';

  return (
    <div className="deck-container mx-auto">
      <div className={`flex flex-row ${X_SPACING} ${TOP_SPACING}`}>
        <div className={`basis-full lg:basis-10/12 ${Y_SPACING}`}>
          <DiffSelect
            decks={decks}
            deck={deck}
            deckTo={deckTo}
            deckidFrom={deckidFrom}
            deckidTo={deckidTo}
          />
          {(errorFrom || errorTo) && (
            <div className="flex flex-row">
              {errorFrom && (
                <div className="error-message flex items-center justify-center font-bold">
                  NO DECK WITH THIS ID
                </div>
              )}
              {errorTo && (
                <div className="error-message flex items-center justify-center font-bold">
                  NO DECK WITH THIS ID
                </div>
              )}
            </div>
          )}
          {deck && deckTo && (
            <div className={`flex flex-row ${X_SPACING}`}>
              <div className="md:basis-7/12">
                <div
                  className={
                    isMobile
                      ? null
                      : 'top-[32px] z-10 bg-bgPrimary dark:bg-bgPrimaryDark'
                  }
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
              <div className="md:basis-5/12">
                <div
                  className={
                    isMobile
                      ? null
                      : 'top-[32px] z-10 bg-bgPrimary dark:bg-bgPrimaryDark'
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
          <div className="hidden lg:flex lg:basis-2/12">
            <div className="top-[77px] z-20 bg-bgPrimary dark:bg-bgPrimaryDark">
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
        <ButtonFloat
          onClick={() => {
            setShowMenuButtons(true);
            setShowFloatingButtons(false);
          }}
          variant="lg:hidden bg-[#707070] opacity-80"
        >
          <List width="35" height="35" viewBox="0 0 16 16" />
        </ButtonFloat>
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
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Diff;
