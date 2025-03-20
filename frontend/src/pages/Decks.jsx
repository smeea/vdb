import { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate, useParams, useSearchParams } from 'react-router';
import { useSnapshot } from 'valtio';
import {
  ButtonFloatClose,
  ButtonFloatMenu,
  DeckButtons,
  DeckCrypt,
  DeckDetails,
  DeckDraw,
  DeckImport,
  DeckImportAmaranth,
  DeckImportBadCardsModal,
  DeckImportText,
  DeckLibrary,
  DeckMissingModalWrapper,
  DeckNewCardFloating,
  DeckProxySelectModal,
  DeckQrModal,
  DeckRecommendation,
  DeckSelect,
  DeckSelectAdvModal,
  ErrorMessage,
  FlexGapped,
  LoginBlock,
  Modal,
  Seating,
} from '@/components';
import {
  AUTHOR,
  BRANCHES,
  CARDS,
  CRYPT,
  DECK,
  DECKID,
  DECKS,
  DESCRIPTION,
  IS_ANONYMOUS,
  IS_BRANCHES,
  IS_PUBLIC,
  LIBRARY,
  MASTER,
  NAME,
  PUBLIC_PARENT,
  SHOW,
  TAGS,
} from '@/constants';
import { deckStore, setDeck, useApp } from '@/context';
import { useDecksTagsAll } from '@/hooks';
import { getIsEditable, getRestrictions, getTags, parseDeck, parseDeckHash } from '@/utils';

const IS_FROM_URL = 'isFromUrl';

const Decks = () => {
  const {
    addRecentDeck,
    isMobile,
    isDesktop,
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
  const [searchParams] = useSearchParams();
  const loaderData = useLoaderData();

  const [error, setError] = useState(false);
  const [qrUrl, setQrUrl] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [showDraw, setShowDraw] = useState(false);
  const [showSeating, setShowSeating] = useState(false);
  const [showMissing, setShowMissing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showProxySelect, setShowProxySelect] = useState(false);
  const [showImportAmaranth, setShowImportAmaranth] = useState(false);
  const [showImportText, setShowImportText] = useState(false);
  const [badImportCards, setBadImportCards] = useState([]);
  const isEditable = getIsEditable(deck);
  const { hasPlaytest } = getRestrictions(deck);

  const getDeck = async () => {
    const deckData = await loaderData[DECK].catch((e) => {
      switch (e.response.status) {
        case 400:
          setError('NO DECK WITH THIS ID');
          break;
        default:
          setError('CONNECTION PROBLEM');
      }
      setDeck(undefined);
    });

    setError(false);
    const cardsData = parseDeck(deckData[CARDS], cryptCardBase, libraryCardBase);
    if (deckid.length !== 9 || deckData[PUBLIC_PARENT]) {
      deckData[TAGS] = [];
      Object.values(getTags(cardsData[CRYPT], cardsData[LIBRARY])).forEach((v) => {
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
    delete d[CARDS];

    addRecentDeck(d);
    setDeck(d);
  };

  const handleSelect = (e) => {
    navigate(`/decks/${e.value.replace(' ', '_')}`);
  };

  const allTagsOptions = useDecksTagsAll(decks);

  useEffect(() => {
    if (hash && cryptCardBase && libraryCardBase) {
      const { crypt, library } = parseDeckHash(hash, cryptCardBase, libraryCardBase);

      setDeck({
        [DECKID]: DECK,
        [NAME]: searchParams.get(NAME) ?? '',
        [AUTHOR]: searchParams.get(AUTHOR) ?? '',
        [DESCRIPTION]: searchParams.get(DESCRIPTION) ?? '',
        [CRYPT]: crypt,
        [LIBRARY]: library,
      });
    }
  }, [hash, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (cryptCardBase && libraryCardBase) {
      if (deckid) {
        if (!deckStore[DECK] || deckStore[DECK][DECKID] !== deckid) {
          if (deckStore[DECKS]?.[deckid]) {
            setDeck(deckStore[DECKS][deckid]);
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
        } else if (deckStore[DECK][IS_FROM_URL] && deckStore[DECKS]?.[deckid]) {
          setDeck(deckStore[DECKS][deckid]);
        }
      } else if (deckStore[DECKS]?.[lastDeckId]) {
        navigate(`/decks/${lastDeckId}`);
      }
    }
  }, [deckid, loaderData, lastDeckId, decks, preconDecks, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (deckStore[DECK]) {
      setError(false);
      if (!deckid) navigate(`/decks/${deckStore[DECK][DECKID]}`);
    }
  }, [deckStore[DECK]?.[DECKID]]);

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
                deck={deck}
                deckid={deckid}
                decks={decks}
                handleSelect={handleSelect}
                setShowInfo={setShowInfo}
                setShowSelect={setShowSelect}
                showInfo={showInfo}
              />
            </div>
            {(showInfo || !isMobile) && (
              <div className="sm:basis-7/12">
                {deck && <DeckDetails deck={deck} allTagsOptions={allTagsOptions} />}
              </div>
            )}
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {deck && (
            <FlexGapped className="max-sm:flex-col">
              {playtestMode || !hasPlaytest ? (
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
          <div className="bg-bgPrimary dark:bg-bgPrimaryDark sticky z-20 w-full lg:top-10">
            <DeckButtons
              deck={deck}
              setQrUrl={setQrUrl}
              setShowDraw={setShowDraw}
              setShowInfo={setShowInfo}
              setShowMissing={setShowMissing}
              setShowRecommendation={setShowRecommendation}
              setShowSeating={setShowSeating}
              setShowProxySelect={setShowProxySelect}
              setShowImportAmaranth={setShowImportAmaranth}
              setShowImportText={setShowImportText}
              setBadImportCards={setBadImportCards}
            />
          </div>
        </div>
      </FlexGapped>
      {username === null && !deckid && !hash && (
        <div className="flex min-h-[70vh] place-items-center max-sm:px-2">
          <LoginBlock>Login to create your decks</LoginBlock>
        </div>
      )}
      {username && ((decks && Object.keys(decks).length === 0) || !decks) && !deck && (
        <div className="flex min-h-[70vh] place-items-center justify-center max-sm:px-2">
          <div className="flex flex-col items-center justify-center gap-6 sm:basis-1/2">
            <div className="flex flex-col gap-4 text-center text-lg text-balance">
              You do not have any decks in your collection yet Start by creating new one, import
              from Lackey / Amaranth / Text or browse official preconstructed decks
            </div>
            <DeckImport
              setShowImportAmaranth={setShowImportAmaranth}
              setShowImportText={setShowImportText}
              setBadImportCards={setBadImportCards}
              isOnlyNew
            />
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
        <Modal handleClose={handleClose} centered size="xs" withMobileMargin noClose={!isDesktop}>
          <>
            <DeckButtons
              deck={deck}
              setQrUrl={setQrUrl}
              setShowDraw={setShowDraw}
              setShowInfo={setShowInfo}
              setShowMissing={setShowMissing}
              setShowRecommendation={setShowRecommendation}
              setShowSeating={setShowSeating}
              setShowProxySelect={setShowProxySelect}
              setShowImportAmaranth={setShowImportAmaranth}
              setShowImportText={setShowImportText}
              setBadImportCards={setBadImportCards}
            />
            <div className="lg:hidden">
              <ButtonFloatClose handleClose={handleClose} />
            </div>
          </>
        </Modal>
      )}
      {showSelect && <DeckSelectAdvModal setShow={setShowSelect} />}
      {showDraw && <DeckDraw setShow={setShowDraw} deck={deck} />}
      {showSeating && <Seating setShow={setShowSeating} />}
      {showRecommendation && <DeckRecommendation deck={deck} setShow={setShowRecommendation} />}
      {qrUrl && <DeckQrModal qrUrl={qrUrl} setQrUrl={setQrUrl} deck={deck} />}
      {showMissing && <DeckMissingModalWrapper deck={deck} setShow={setShowMissing} />}
      {showProxySelect && <DeckProxySelectModal setShow={setShowProxySelect} deck={deck} />}
      {showImportAmaranth && <DeckImportAmaranth setShow={setShowImportAmaranth} />}
      {showImportText[SHOW] && (
        <DeckImportText
          isAnonymous={showImportText[IS_ANONYMOUS]}
          setShow={setShowImportText}
          setBadCards={setBadImportCards}
        />
      )}
      {badImportCards.length > 0 && (
        <DeckImportBadCardsModal
          deckid={deck?.[DECKID]}
          badCards={badImportCards}
          setBadCards={setBadImportCards}
        />
      )}
    </div>
  );
};

export default Decks;
