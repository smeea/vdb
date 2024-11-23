import React, { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useParams } from 'react-router';
import {
  ButtonFloatClose,
  ButtonFloatMenu,
  DeckNewCardFloating,
  DeckProxySelectModal,
  DiffButtons,
  DiffCrypt,
  DiffLibrary,
  DiffMissingModalWrapper,
  DiffSelect,
  ErrorMessage,
  FlexGapped,
  Modal,
} from '@/components';
import { useApp, deckStore, setDeck } from '@/context';
import { deckServices } from '@/services';
import { parseDeck, getIsPlaytest, getIsEditable } from '@/utils';
import {
  IS_BRANCHES,
  IS_PUBLIC,
  PUBLIC_PARENT,
  MASTER,
  DECKID,
  BRANCHES,
  CRYPT,
  LIBRARY,
} from '@/constants';

const Diff = () => {
  const {
    addRecentDeck,
    preconDecks,
    playtestMode,
    cryptCardBase,
    libraryCardBase,
    isMobile,
    showFloatingButtons,
    setShowFloatingButtons,
    showMenuButtons,
    setShowMenuButtons,
  } = useApp();
  const { deck, decks } = useSnapshot(deckStore);
  const { deckidFrom, deckidTo } = useParams();

  const [errorFrom, setErrorFrom] = useState(false);
  const [errorTo, setErrorTo] = useState(false);
  const [deckTo, setDeckTo] = useState();
  const [showMissing, setShowMissing] = useState(false);
  const [showProxySelect, setShowProxySelect] = useState(false);
  const isEditable = getIsEditable(deck);

  const getDeck = async (id, setD, setE) => {
    let deckData;
    try {
      deckData = await deckServices.getDeck(id);
    } catch (e) {
      switch (e.response.status) {
        case 400:
          setE('NO DECK WITH THIS ID');
          break;
        default:
          setE('CONNECTION PROBLEM');
      }
      setD(undefined);
      return;
    }

    setE(false);
    const cardsData = parseDeck(deckData.cards, cryptCardBase, libraryCardBase);
    const d = {
      ...deckData,
      [CRYPT]: cardsData[CRYPT],
      [LIBRARY]: cardsData[LIBRARY],
      [IS_BRANCHES]: !!(deckData[MASTER] || deckData[BRANCHES]?.length > 0),
      [IS_PUBLIC]: !!deckData[PUBLIC_PARENT],
    };

    addRecentDeck(d);
    setD(d);
  };

  useEffect(() => {
    if (cryptCardBase && libraryCardBase && decks !== undefined) {
      if (deckidFrom && deck?.[DECKID] != deckidFrom) {
        if (decks[deckidFrom]) {
          setDeck(decks[deckidFrom]);
        } else if (deckidFrom.includes(':')) {
          if (preconDecks?.[deckidFrom]) {
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
      if (deckidTo && deckTo?.[DECKID] != deckidTo) {
        if (decks[deckidTo]) {
          setDeckTo(decks[deckidTo]);
        } else if (deckidTo.includes(':')) {
          if (preconDecks?.[deckidTo]) {
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
  }, [deck?.[DECKID]]);

  useEffect(() => {
    if (deckTo) setErrorTo(false);
  }, [deckTo?.[DECKID]]);

  const handleClose = () => {
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <div className="deck-container mx-auto">
      <FlexGapped>
        <FlexGapped className="w-full flex-col lg:basis-10/12">
          <DiffSelect
            decks={decks}
            deck={deck}
            deckTo={deckTo}
            deckidFrom={deckidFrom}
            deckidTo={deckidTo}
          />
          {(errorFrom || errorTo) && (
            <div className="flex">
              <div className="w-full">
                {errorFrom && <ErrorMessage>NO DECK WITH THIS ID</ErrorMessage>}
              </div>
              <div className="w-full">
                {errorTo && <ErrorMessage>NO DECK WITH THIS ID</ErrorMessage>}
              </div>
            </div>
          )}

          {deck && deckTo && (
            <FlexGapped className="max-sm:flex-col">
              {playtestMode ||
              !Object.keys({ ...deck[CRYPT], ...deck[LIBRARY] }).some((cardid) =>
                getIsPlaytest(cardid),
              ) ? (
                <>
                  <div className="basis-full sm:basis-5/9">
                    <DiffCrypt deck={deck} cardsTo={deckTo[CRYPT]} />
                  </div>
                  <div className="basis-full sm:basis-4/9">
                    <DiffLibrary deck={deck} cardsTo={deckTo[LIBRARY]} />
                  </div>
                </>
              ) : (
                <ErrorMessage>CONTAINS PLAYTEST CARDS</ErrorMessage>
              )}
            </FlexGapped>
          )}
        </FlexGapped>
        {!isMobile && (
          <div className="basis-2/12 max-lg:hidden">
            <div className="top-[77px] z-20 bg-bgPrimary dark:bg-bgPrimaryDark">
              <DiffButtons
                deckFrom={deck}
                deckTo={deckTo}
                setShowMissing={setShowMissing}
                setShowProxySelect={setShowProxySelect}
              />
            </div>
          </div>
        )}
      </FlexGapped>
      {isEditable && isMobile && showFloatingButtons && (
        <>
          <DeckNewCardFloating
            target={CRYPT}
            deckid={deck[DECKID]}
            cards={Object.values(deck[CRYPT])}
          />
          <DeckNewCardFloating
            target={LIBRARY}
            deckid={deck[DECKID]}
            cards={Object.values(deck[LIBRARY])}
          />
        </>
      )}
      <div className="lg:hidden">
        <ButtonFloatMenu />
      </div>
      {showMenuButtons && (
        <Modal handleClose={handleClose} centered size="sm">
          <DiffButtons
            deckFrom={deck}
            deckTo={deckTo}
            setShowMissing={setShowMissing}
            setShowProxySelect={setShowProxySelect}
          />
          <div className="lg:hidden">
            <ButtonFloatClose handleClose={handleClose} />
          </div>
        </Modal>
      )}
      {showMissing && (
        <DiffMissingModalWrapper deckFrom={deck} deckTo={deckTo} setShow={setShowMissing} />
      )}

      {showProxySelect && <DeckProxySelectModal setShow={setShowProxySelect} deck={deck} />}
    </div>
  );
};

export default Diff;
