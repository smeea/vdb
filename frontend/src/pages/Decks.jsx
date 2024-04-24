import React, { useState, useEffect, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import {
  useNavigate,
  useLocation,
  useParams,
  useLoaderData,
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
  FlexGapped,
  ErrorMessage,
  LoginBlock,
  Modal,
  Seating,
} from '@/components';
import { deckStore, useApp, setDeck } from '@/context';
import { useDeck, useTags } from '@/hooks';

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
  const deck = useSnapshot(deckStore).deck;
  const decks = useSnapshot(deckStore).decks;
  const navigate = useNavigate();
  const { deckid } = useParams();
  const { hash } = useLocation();
  const query = new URLSearchParams(useLocation().search);
  const loaderData = useLoaderData();

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
    const deckData = await loaderData.deckData;

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
      Object.values(useTags(cardsData.crypt, cardsData.library)).forEach(
        (v) => {
          deckData.tags = deckData.tags.concat(v);
        },
      );
    }
    const d = {
      author: deckData.author,
      crypt: cardsData.crypt,
      deckid: deckData.deckid,
      description: deckData.description,
      isFrozen: deckData.isFrozen,
      isAuthor: deckData.isAuthor,
      isBranches: !!(deckData.master || deckData.branches?.length > 0),
      isNonEditable: deckData.isNonEditable,
      isPublic: !!deckData.publicParent,
      library: cardsData.library,
      branches: deckData.branches,
      master: deckData.master,
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
    navigate(`/decks/${e.value.replace(' ', '_')}`);
  };

  const allTagsOptions = useMemo(() => {
    const allTags = new Set();

    if (decks) {
      Object.keys(decks).forEach((id) => {
        if (decks[id].tags) {
          decks[id].tags.forEach((tag) => {
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
        .forEach((i) => {
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
      } else if (decks?.[lastDeckId]) {
        setDeck(decks[lastDeckId]);
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
  }, [deck?.deckid]);

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
                <DeckDetails
                  deck={deck}
                  folded={foldedDescription}
                  setFolded={setFoldedDescription}
                  allTagsOptions={allTagsOptions}
                />
              </div>
            )}
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {deck && (
            <FlexGapped className="max-sm:flex-col">
              {playtestMode ||
              !(
                Object.keys(deck.crypt).some((cardid) => cardid > 210000) ||
                Object.keys(deck.library).some((cardid) => cardid > 110000)
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
                Start by creating new one, import from Lackey / Amaranth / Text
                or browse official preconstructed decks
              </div>
            </div>
            <DeckImport isOnlyNew={true} />
          </div>
        </div>
      )}
      {isEditable && isMobile && showFloatingButtons && (
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
          centered
          size="sm"
        >
          <DeckButtons
            deck={deck}
            setShowInfo={setShowInfo}
            setShowDraw={setShowDraw}
            setShowSeating={setShowSeating}
            setShowRecommendation={setShowRecommendation}
            setQrUrl={setQrUrl}
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
