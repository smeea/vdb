import React, { useState, useEffect, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import {
  useNavigate,
  useLocation,
  useParams,
  useLoaderData,
  defer,
} from 'react-router-dom';
import {
  ButtonFloatMenu,
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
  ErrorMessage,
  LoginBlock,
  Modal,
  Seating,
} from '@/components';
import { deckStore, useApp, setDeck } from '@/context';
import { useDeck, useDeckMissing, useTags } from '@/hooks';

const Decks = () => {
  const {
    addRecentDeck,
    isMobile,
    playtest,
    preconDecks,
    setShowFloatingButtons,
    setShowMenuButtons,
    showMenuButtons,
    username,
    lastDeckId,
    cryptCardBase,
    libraryCardBase,
  } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const decks = useSnapshot(deckStore).decks;
  const navigate = useNavigate();
  const { deckid } = useParams();
  const { hash } = useLocation();
  const query = new URLSearchParams(useLocation().search);
  const loaderData = useLoaderData();

  if (hash && deckid !== 'deck') {
    const name = query.get('name') ?? '';
    const author = query.get('author') ?? '';
    const description = query.get('description') ?? '';
    const url = `/decks/deck?name=${name}&author=${author}&description=${description}${hash}`;
    navigate(url);
  }

  const [error, setError] = useState(false);
  const [foldedDescription, setFoldedDescription] = useState(!isMobile);
  const [qrUrl, setQrUrl] = useState(false);
  const [showDeckSelectAdv, setShowDeckSelectAdv] = useState(false);
  const [showDraw, setShowDraw] = useState(false);
  const [showSeating, setShowSeating] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const { isPublic, isAuthor, isFrozen } = deck || {};
  const isEditable = isAuthor && !isPublic && !isFrozen;

  const getDeck = async () => {
    const { deckData } = await loaderData;

    if (deckData.error) {
      if (deckData.error == 400) {
        setError('NO DECK WITH THIS ID');
      } else {
        setError('CONNECTION PROBLEM');
      }
      setDeck(undefined);
      return;
    }

    setError(false);
    const cardsData = useDeck(deckData.cards, cryptCardBase, libraryCardBase);
    if (deckid.length !== 32 || deckData.publicParent) {
      deckData.tags = [];
      Object.values(useTags(cardsData.crypt, cardsData.library)).map((v) => {
        deckData.tags = deckData.tags.concat(v);
      });
    }
    const d = {
      author: deckData.author,
      crypt: cardsData.crypt,
      deckid: deckData.deckid,
      description: deckData.description,
      isAuthor: deckData.isAuthor,
      isBranches: !!(deckData.master || deckData.branches?.length > 0),
      isNonEditable: deckData.isNonEditable,
      isPublic: !!deckData.publicParent,
      library: cardsData.library,
      name: deckData.name,
      publicChild: deckData.publicChild,
      publicParent: deckData.publicParent,
      tags: deckData.tags,
      timestamp: deckData.timestamp,
    };
    addRecentDeck(d);
    setDeck(d);
  };

  const handleSelect = (e) => {
    navigate(`/decks/${e.value.replace(' ', '_')}`, { replace: true });
  };

  const { missingCrypt, missingLibrary } = useDeckMissing(deck);

  const allTagsOptions = useMemo(() => {
    const allTags = new Set();

    if (decks) {
      Object.keys(decks).map((id) => {
        if (decks[id].tags) {
          decks[id].tags.map((tag) => {
            allTags.add(tag);
          });
        }
      });
    }

    const options = [...allTags].map((tag) => ({
      label: tag,
      value: tag,
    }));

    return options;
  }, [decks]);

  useEffect(() => {
    if (hash && cryptCardBase && libraryCardBase) {
      const crypt = {};
      const library = {};

      hash
        .slice(1)
        .split(';')
        .map((i) => {
          const j = i.split('=');
          if (j[0] > 200000) {
            crypt[j[0]] = {
              q: parseInt(j[1]),
              c: cryptCardBase[j[0]],
            };
          } else {
            library[j[0]] = {
              q: parseInt(j[1]),
              c: libraryCardBase[j[0]],
            };
          }
        });

      setDeck({
        deckid: 'deck',
        name: query.get('name') ?? '',
        author: query.get('author') ?? '',
        description: query.get('description') ?? '',
        crypt: crypt,
        library: library,
      });
    }
  }, [hash, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (cryptCardBase && libraryCardBase) {
      if (deckid) {
        if (!deck || deck.deckid != deckid) {
          if (decks?.[deckid]) {
            setDeck(decks[deckid]);
          } else if (deckid.includes(':') && preconDecks) {
            const deckidFixed = deckid.replace('_', ' ');
            if (preconDecks[deckidFixed]) {
              setDeck(preconDecks[deckidFixed]);
            } else {
              setDeck(undefined);
              setError('NO DECK WITH THIS ID');
            }
          } else if (loaderData) {
            getDeck();
          }
        }
      } else if (lastDeckId) {
        setDeck(decks?.[lastDeckId]);
      }
    }
  }, [
    deckid,
    loaderData,
    lastDeckId,
    decks,
    preconDecks,
    cryptCardBase,
    libraryCardBase,
  ]);

  useEffect(() => {
    if (deck) {
      setError(false);
      if (!deckid) navigate(`/decks/${deck.deckid}`);
    }
  }, [deck]);

  return (
    <div className="deck-container mx-auto">
      <div className="flex sm:gap-4 lg:gap-6 xl:gap-8">
        <div className="hidden min-w-[175px] xl:block" />
        <div className="flex basis-full flex-col sm:gap-4 lg:gap-6 xl:gap-8">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="basis-full sm:basis-5/12">
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
            <div className="basis-full sm:basis-7/12">
              {deck && (showInfo || !isMobile) && (
                <DeckDetails
                  deck={deck}
                  folded={foldedDescription}
                  setFolded={setFoldedDescription}
                  allTagsOptions={allTagsOptions}
                />
              )}
            </div>
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {deck && (
            <div className="flex flex-col sm:flex-row sm:gap-4 lg:gap-6 xl:gap-8">
              {playtest ||
              !(
                Object.keys(deck.crypt).some((cardid) => cardid > 210000) ||
                Object.keys(deck.library).some((cardid) => cardid > 110000)
              ) ? (
                <>
                  <div className="basis-full sm:basis-5/9">
                    <DeckCrypt deck={deck} />
                  </div>
                  <div className="basis-full sm:basis-4/9">
                    <DeckLibrary deck={deck} />
                  </div>
                </>
              ) : (
                <ErrorMessage>CONTAIN PLAYTEST CARDS</ErrorMessage>
              )}
            </div>
          )}
        </div>
        <div className="hidden min-w-[175px] lg:block">
          <div className="sticky z-20 w-full bg-bgPrimary dark:bg-bgPrimaryDark sm:top-[56px] lg:top-[64px] xl:top-[72px]">
            <DeckButtons
              deck={deck}
              setShowInfo={setShowInfo}
              setShowDraw={setShowDraw}
              setShowSeating={setShowSeating}
              setShowRecommendation={setShowRecommendation}
              setQrUrl={setQrUrl}
              missingCrypt={missingCrypt}
              missingLibrary={missingLibrary}
            />
          </div>
        </div>
      </div>
      {username === null && !deckid && !hash && (
        <LoginBlock>
          <div className="flex justify-center text-lg">
            Login to create your decks
          </div>
          <div className="flex justify-center text-lg">
            (Browse preconstructed decks without login)
          </div>
        </LoginBlock>
      )}
      {username && decks && Object.keys(decks).length === 0 && !deck && (
        <div className="flex h-[70vh] flex-col items-center justify-center space-y-8">
          <div className="justify-center font-bold text-fgSecondary dark:text-fgSecondaryDark">
            <div className="flex justify-center text-lg">
              You do not have any decks in your collection yet
            </div>
            <div className="flex justify-center text-lg">
              Start by creating new one, import from Lackey / Amaranth / Text or
              browse official preconstructed decks
            </div>
          </div>
          <div className="flex justify-center">
            <DeckImport isOnlyNew={true} />
          </div>
        </div>
      )}
      {isEditable && (
        <>
          <DeckNewCardFloating
            target="crypt"
            deckid={deckid}
            cards={deck.crypt}
          />
          <DeckNewCardFloating
            target="library"
            deckid={deckid}
            cards={deck.library}
          />
        </>
      )}
      <ButtonFloatMenu />
      {showMenuButtons && (
        <Modal
          handleClose={() => {
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
        >
          <DeckButtons
            deck={deck}
            setShowInfo={setShowInfo}
            setShowDraw={setShowDraw}
            setShowSeating={setShowSeating}
            setShowRecommendation={setShowRecommendation}
            setQrUrl={setQrUrl}
            missingCrypt={missingCrypt}
            missingLibrary={missingLibrary}
          />
        </Modal>
      )}
      {showDeckSelectAdv && (
        <DeckSelectAdvModal
          setShow={setShowDeckSelectAdv}
          allTagsOptions={allTagsOptions}
        />
      )}
      {showDraw && <DeckDraw setShow={setShowDraw} deck={deck} />}
      {showSeating && <Seating setShow={setShowSeating} />}
      {showRecommendation && (
        <DeckRecommendation deck={deck} setShow={setShowRecommendation} />
      )}
      {qrUrl && <DeckQrModal qrUrl={qrUrl} setQrUrl={setQrUrl} deck={deck} />}
    </div>
  );
};

export default Decks;

export const loader = async ({ params }) => {
  if (params.deckid === 'deck' || params.deckid.includes(':')) return null;

  const url = `${import.meta.env.VITE_API_URL}/deck/${params.deckid}`;
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  };

  const response = await fetch(url, options);
  if (!response.ok) return { error: response.status };
  const deckData = await response.json();

  return defer({ deckData });
};
