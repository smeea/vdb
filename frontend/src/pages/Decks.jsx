import React, { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate, useLocation, useParams, useLoaderData } from 'react-router-dom';
import {
  ButtonFloatMenu,
  ButtonFloatClose,
  DeckButtons,
  DeckCrypt,
  DeckDetails,
  DeckDraw,
  DeckImport,
  DeckLibrary,
  DeckNewCardFloating,
  DeckQrModal,
  DeckRecommendation,
  DeckSelect,
  DeckSelectAdvModal,
  FlexGapped,
  ErrorMessage,
  LoginBlock,
  Modal,
  Seating,
} from '@/components';
import { deckStore, useApp, setDeck } from '@/context';
import { useDecksTagsAll, useDeck, useTags } from '@/hooks';
import { getIsEditable, parseDeckHash } from '@/utils';
import {
  AUTHOR,
  BRANCHES,
  CRYPT,
  DECK,
  DECKID,
  DECKS,
  DESCRIPTION,
  LIBRARY,
  MASTER,
  NAME,
  TAGS,
  PUBLIC_PARENT,
  IS_BRANCHES,
  IS_PUBLIC,
} from '@/constants';
const IS_FROM_URL = 'isFromUrl';

const Decks = () => {
  const {
    addRecentDeck,
    isMobile,
    playtestMode,
    preconDecks,
    showFloatingButtons,
    setShowFloatingButtons,
    setShowMenuButtons,
    showMenuButtons,
    username,
    lastDeckId,
    cryptCardBase,
    libraryCardBase,
  } = useApp();
  const { [DECK]: deck, [DECKS]: decks } = useSnapshot(deckStore);
  const navigate = useNavigate();
  const { deckid } = useParams();
  const { hash } = useLocation();
  const query = new URLSearchParams(useLocation().search);
  const loaderData = useLoaderData();

  const [error, setError] = useState(false);
  const [qrUrl, setQrUrl] = useState(false);
  const [showDeckSelectAdv, setShowDeckSelectAdv] = useState(false);
  const [showDraw, setShowDraw] = useState(false);
  const [showSeating, setShowSeating] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const isEditable = getIsEditable(deck);

  const getDeck = async () => {
    let deckData;
    try {
      deckData = await loaderData.deckData;
    } catch (e) {
      switch (e.response.status) {
        case 400:
          setError('NO DECK WITH THIS ID');
          break;
        default:
          setError('CONNECTION PROBLEM');
      }
      setDeck(undefined);
      return;
    }

    setError(false);
    const cardsData = useDeck(deckData.cards, cryptCardBase, libraryCardBase);
    if (deckid.length !== 9 || deckData[PUBLIC_PARENT]) {
      deckData[TAGS] = [];
      Object.values(useTags(cardsData[CRYPT], cardsData[LIBRARY])).forEach((v) => {
        deckData[TAGS] = deckData[TAGS].concat(v);
      });
    }

    const d = {
      ...deckData,
      [CRYPT]: cardsData[CRYPT],
      [LIBRARY]: cardsData[LIBRARY],
      [IS_BRANCHES]: !!(deckData[MASTER] || deckData[BRANCHES]?.length > 0),
      [IS_PUBLIC]: !!deckData[PUBLIC_PARENT],
      [IS_FROM_URL]: true,
    };
    delete d.cards;

    addRecentDeck(d);
    setDeck(d);
  };

  const handleSelect = (e) => {
    navigate(`/decks/${e.value.replace(' ', '_')}`);
  };

  const allTagsOptions = useDecksTagsAll(decks);

  useEffect(() => {
    if (hash && cryptCardBase && libraryCardBase) {
      const { [CRYPT]: crypt, [LIBRARY]: library } = parseDeckHash(
        hash,
        cryptCardBase,
        libraryCardBase,
      );

      setDeck({
        [DECKID]: DECK,
        [NAME]: query.get(NAME) ?? '',
        [AUTHOR]: query.get(AUTHOR) ?? '',
        [DESCRIPTION]: query.get(DESCRIPTION) ?? '',
        [CRYPT]: crypt,
        [LIBRARY]: library,
      });
    }
  }, [hash, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (cryptCardBase && libraryCardBase) {
      if (deckid) {
        if (!deck || deck[DECKID] != deckid) {
          if (decks?.[deckid]) {
            setDeck(decks[deckid]);
          } else if (deckid.includes(':') && preconDecks) {
            const deckidFixed = deckid.replace('_', ' ');
            if (preconDecks[deckidFixed]) {
              setDeck(preconDecks[deckidFixed]);
            } else {
              setError('NO DECK WITH THIS ID');
            }
          } else if (!hash) {
            getDeck();
          }
        } else if (deck[IS_FROM_URL] && decks?.[deckid]) {
          setDeck(decks[deckid]);
        }
      } else if (decks?.[lastDeckId]) {
        navigate(`/decks/${lastDeckId}`);
      }
    }
  }, [deckid, loaderData, lastDeckId, decks, preconDecks, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (deck) {
      setError(false);
      if (!deckid) navigate(`/decks/${deck[DECKID]}`);
    }
  }, [deck?.[DECKID]]);

  const handleClose = () => {
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <div className="deck-container mx-auto">
      <FlexGapped>
        <FlexGapped className="flex w-full flex-col">
          <div className="flex gap-2 max-sm:flex-col max-sm:px-2 max-sm:pt-2 sm:gap-4">
            <div className="sm:basis-5/12">
              <DeckSelect
                deckid={deckid}
                deck={deck}
                decks={decks}
                handleSelect={handleSelect}
                setShowDeckSelectAdv={setShowDeckSelectAdv}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
              />
            </div>
            {deck && (showInfo || !isMobile) && (
              <div className="sm:basis-7/12">
                <DeckDetails deck={deck} allTagsOptions={allTagsOptions} />
              </div>
            )}
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {deck && (
            <FlexGapped className="max-sm:flex-col">
              {playtestMode ||
              !(
                Object.keys(deck[CRYPT]).some((cardid) => cardid > 210000) ||
                Object.keys(deck[LIBRARY]).some((cardid) => cardid > 110000)
              ) ? (
                <>
                  <div className="sm:basis-5/9">
                    <DeckCrypt deck={deck} />
                  </div>
                  <div className="sm:basis-4/9">
                    <DeckLibrary deck={deck} />
                  </div>
                </>
              ) : (
                <ErrorMessage>CONTAINS PLAYTEST CARDS</ErrorMessage>
              )}
            </FlexGapped>
          )}
        </FlexGapped>
        <div className="min-w-[175px] max-lg:hidden">
          <div className="sticky z-20 w-full bg-bgPrimary dark:bg-bgPrimaryDark lg:top-10">
            <DeckButtons
              deck={deck}
              setShowInfo={setShowInfo}
              setShowDraw={setShowDraw}
              setShowSeating={setShowSeating}
              setShowRecommendation={setShowRecommendation}
              setQrUrl={setQrUrl}
            />
          </div>
        </div>
      </FlexGapped>
      {username === null && !deckid && !hash && (
        <div className="grid h-[70vh] place-items-center max-sm:px-2">
          <LoginBlock>Login to create your decks</LoginBlock>
        </div>
      )}
      {username && decks && Object.keys(decks).length === 0 && !deck && (
        <div className="grid h-[70vh] place-items-center max-sm:px-2">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col gap-4 text-center text-lg">
              <div>You do not have any decks in your collection yet</div>
              <div>
                Start by creating new one, import from Lackey / Amaranth / Text or browse official
                preconstructed decks
              </div>
            </div>
            <DeckImport isOnlyNew={true} />
          </div>
        </div>
      )}
      {isEditable && isMobile && showFloatingButtons && (
        <>
          <DeckNewCardFloating target={CRYPT} deckid={deckid} cards={Object.values(deck[CRYPT])} />
          <DeckNewCardFloating
            target={LIBRARY}
            deckid={deckid}
            cards={Object.values(deck[LIBRARY])}
          />
        </>
      )}
      <div className="lg:hidden">
        <ButtonFloatMenu />
      </div>
      {showMenuButtons && (
        <Modal handleClose={handleClose} centered size="sm" withMobileMargin>
          <>
            <DeckButtons
              deck={deck}
              setShowInfo={setShowInfo}
              setShowDraw={setShowDraw}
              setShowSeating={setShowSeating}
              setShowRecommendation={setShowRecommendation}
              setQrUrl={setQrUrl}
            />
            <div className="lg:hidden">
              <ButtonFloatClose handleClose={handleClose} />
            </div>
          </>
        </Modal>
      )}
      {showDeckSelectAdv && (
        <DeckSelectAdvModal setShow={setShowDeckSelectAdv} allTagsOptions={allTagsOptions} />
      )}
      {showDraw && <DeckDraw setShow={setShowDraw} deck={deck} />}
      {showSeating && <Seating setShow={setShowSeating} />}
      {showRecommendation && <DeckRecommendation deck={deck} setShow={setShowRecommendation} />}
      {qrUrl && <DeckQrModal qrUrl={qrUrl} setQrUrl={setQrUrl} deck={deck} />}
    </div>
  );
};

export default Decks;
