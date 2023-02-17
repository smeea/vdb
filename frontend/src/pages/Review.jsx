import React, { useState, useEffect } from 'react';
import {
  useNavigate,
  useLocation,
  useParams,
  useLoaderData,
} from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { useImmer } from 'use-immer';
import {
  ButtonFloatMenu,
  DeckNewCardFloating,
  DeckDetails,
  ErrorMessage,
  Modal,
  ReviewButtons,
  ReviewCrypt,
  ReviewLibrary,
} from '@/components';
import { useApp, deckStore } from '@/context';
import { useDeck, useTags } from '@/hooks';

const Review = () => {
  const {
    isMobile,
    cryptCardBase,
    libraryCardBase,
    preconDecks,
    setShowFloatingButtons,
    setShowMenuButtons,
    showMenuButtons,
  } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const decks = useSnapshot(deckStore).decks;
  const navigate = useNavigate();
  const { deckid } = useParams();
  const { hash } = useLocation();
  const query = new URLSearchParams(useLocation().search);
  const loaderData = useLoaderData();

  // Redirect from old links
  if (query.get('id') && hash) {
    const url = `/review/${deckid}${hash}`;
    navigate(url);
  }

  const [deckFrom, setDeckFrom] = useImmer();
  const [deckTo, setDeckTo] = useImmer();
  const [error, setError] = useState(false);
  const [foldedDescription, setFoldedDescription] = useState(!isMobile);
  const [urlDiff, setUrlDiff] = useState();

  const getDeck = async () => {
    const { deckData } = await loaderData;

    if (deckData.error) {
      if (deckData.error == 400) {
        setError('NO DECK WITH THIS ID');
      } else {
        setError('CONNECTION PROBLEM');
      }
      setDeckTo(undefined);
      setDeckFrom(undefined);
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
    setDeckTo(d);
    setDeckFrom(d);
  };

  const getDiff = (cardsFrom, cardsTo) => {
    const diff = {};

    [...Object.keys(cardsFrom), ...Object.keys(cardsTo)].map((cardid) => {
      const fromQty = cardsFrom[cardid] ? cardsFrom[cardid].q : 0;
      const toQty = cardsTo[cardid] ? cardsTo[cardid].q : 0;
      if (fromQty !== toQty) {
        diff[cardid] = fromQty - toQty;
      }
    });

    return diff;
  };

  useEffect(() => {
    const diff = getDiff(
      { ...deckFrom?.crypt, ...deckFrom?.library },
      { ...deckTo?.crypt, ...deckTo?.library }
    );

    if (Object.keys(diff).length) {
      const cards = [];
      Object.keys(diff).map((card) => {
        cards.push(`${card}=${diff[card]};`);
      });

      const u = cards.toString().replace(/,/g, '').replace(/;$/, '');
      setUrlDiff(u);
      navigate(`/review/${deckid}#${u}`);
    }
  }, [deckFrom]);

  const cardChange = (_, card, count) => {
    if (count >= 0) {
      const cardSrc = card.Id > 200000 ? 'crypt' : 'library';

      setDeckFrom((draft) => {
        draft[cardSrc][card.Id] = {
          c: card,
          q: count,
        };
      });
    }
  };

  useEffect(() => {
    if (hash && deckTo) {
      const deckWithHash = JSON.parse(
        JSON.stringify({ crypt: deckTo.crypt, library: deckTo.library })
      );

      hash
        .slice(1)
        .split(';')
        .map((i) => {
          const j = i.split('=');
          if (j[0] > 200000) {
            deckWithHash.crypt[j[0]] = {
              q: (deckWithHash.crypt[j[0]]?.q || 0) + parseInt(j[1]),
              c: cryptCardBase[j[0]],
            };
          } else {
            deckWithHash.library[j[0]] = {
              q: (deckWithHash.library[j[0]]?.q || 0) + parseInt(j[1]),
              c: libraryCardBase[j[0]],
            };
          }
        });

      if (
        JSON.stringify({ crypt: deckFrom.crypt, library: deckFrom.library }) !=
        JSON.stringify(deckWithHash)
      ) {
        setDeckFrom((draft) => {
          draft.crypt = deckWithHash.crypt;
          draft.library = deckWithHash.library;
        });
      }
    }
  }, [deckTo]);

  useEffect(() => {
    if (cryptCardBase && libraryCardBase && deckid) {
      if (!deck || deck.deckid != deckid) {
        if (decks?.[deckid]) {
          setDeckFrom(decks[deckid]);
        } else if (deckid.includes(':') && preconDecks) {
          const deckidFixed = deckid.replace('_', ' ');
          if (preconDecks[deckidFixed]) {
            setDeckFrom(preconDecks[deckidFixed]);
          } else {
            setDeckFrom(undefined);
            setError('NO DECK WITH THIS ID');
          }
        } else if (loaderData) {
          getDeck();
        }
      }
    }
  }, [deckid, loaderData, decks, preconDecks, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (deckFrom) setError(false);
  }, [deckFrom]);

  const parentId = deckFrom?.description.replace(
    `Review of ${import.meta.env.VITE_BASE_URL}/decks/`,
    ''
  );
  const inDecks = decks ? Object.keys(decks).includes(parentId) : null;

  return (
    <div className="deck-container mx-auto">
      <div className="flex sm:gap-4 lg:gap-6 xl:gap-8">
        <div className="max-xl:hidden min-w-[175px]" />
        <div className="flex basis-full flex-col sm:gap-4 lg:gap-6 xl:gap-8">
          {deckFrom && (
            <DeckDetails
              deck={deckFrom}
              folded={foldedDescription}
              setFolded={setFoldedDescription}
            />
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {deckFrom && (
            <div className="flex flex-col sm:flex-row sm:gap-4 lg:gap-6 xl:gap-8">
              <div className="basis-full sm:basis-5/9">
                <ReviewCrypt
                  cardsFrom={deckFrom.crypt}
                  cardsTo={deckTo.crypt}
                  cardChange={cardChange}
                />
              </div>
              <div className="basis-full sm:basis-4/9">
                <ReviewLibrary
                  cardsFrom={deckFrom.library}
                  cardsTo={deckTo.library}
                  cardChange={cardChange}
                />
              </div>
            </div>
          )}
        </div>
        <div className="max-lg:hidden min-w-[175px]">
          <div className="sticky z-20 w-full bg-bgPrimary dark:bg-bgPrimaryDark sm:top-[56px] lg:top-[64px] xl:top-[72px]">
            <ReviewButtons
              deck={deckFrom}
              urlDiff={urlDiff}
              parentId={inDecks ? parentId : null}
            />
          </div>
        </div>
      </div>
      <DeckNewCardFloating
        target="crypt"
        deckid={deckFrom?.deckid}
        cards={deckFrom?.crypt}
      />
      <DeckNewCardFloating
        target="library"
        deckid={deckFrom?.deckid}
        cards={deckFrom?.library}
      />
      <ButtonFloatMenu />
      {showMenuButtons && (
        <Modal
          handleClose={() => {
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
          size="sm"
          centered
        >
          <ReviewButtons
            backDeckid={deck?.deckid}
            deckid={deckFrom?.deckid}
            urlDiff={urlDiff}
          />
        </Modal>
      )}
    </div>
  );
};

export default Review;
