import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams, useLoaderData } from 'react-router';
import { useSnapshot } from 'valtio';
import { useImmer } from 'use-immer';
import {
  ButtonFloatMenu,
  ButtonFloatClose,
  DeckNewCardFloating,
  DeckDetails,
  ErrorMessage,
  Modal,
  ReviewButtons,
  ReviewCrypt,
  ReviewLibrary,
  FlexGapped,
} from '@/components';
import { useApp, deckStore } from '@/context';
import {
  BRANCHES,
  CARDS,
  CRYPT,
  DECKID,
  DECKS,
  DESCRIPTION,
  ID,
  IS_BRANCHES,
  IS_NON_EDITABLE,
  IS_PUBLIC,
  LIBRARY,
  MASTER,
  TAGS,
  PUBLIC_PARENT,
} from '@/constants';
import { getTags, parseDeck, deepClone } from '@/utils';

const Review = () => {
  const {
    isMobile,
    cryptCardBase,
    libraryCardBase,
    preconDecks,
    showFloatingButtons,
    setShowFloatingButtons,
    setShowMenuButtons,
    showMenuButtons,
  } = useApp();
  const decks = useSnapshot(deckStore)[DECKS];
  const navigate = useNavigate();
  const { deckid } = useParams();
  const { hash } = useLocation();
  const loaderData = useLoaderData();

  const [deckFrom, setDeckFrom] = useImmer();
  const [deckTo, setDeckTo] = useImmer();
  const [error, setError] = useState(false);
  const [isFoldedDescription, setIsFoldedDescription] = useState(true);
  const [urlDiff, setUrlDiff] = useState();

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
      setDeckTo(undefined);
      setDeckFrom(undefined);
      return;
    }

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
      [IS_NON_EDITABLE]: false,
    };
    delete d.cards;

    setDeckTo(d);
    setDeckFrom(d);
  };

  const getDiff = (cardsFrom, cardsTo) => {
    const diff = {};

    [...Object.keys(cardsFrom), ...Object.keys(cardsTo)].forEach((cardid) => {
      const fromQty = cardsFrom[cardid] ? cardsFrom[cardid].q : 0;
      const toQty = cardsTo[cardid] ? cardsTo[cardid].q : 0;
      if (fromQty !== toQty) {
        diff[cardid] = fromQty - toQty;
      }
    });

    return diff;
  };

  useEffect(() => {
    if (deckFrom && deckTo) {
      const diff = getDiff(
        { ...deckFrom?.[CRYPT], ...deckFrom?.[LIBRARY] },
        { ...deckTo?.[CRYPT], ...deckTo?.[LIBRARY] },
      );

      const cards = [];
      Object.keys(diff).forEach((card) => {
        cards.push(`${card}=${diff[card]};`);
      });

      const u = cards.toString().replace(/,/g, '').replace(/;$/, '');
      setUrlDiff(u);
      navigate(`/review/${deckid}#${u}`);
    }
  }, [deckFrom, deckTo]);

  const cardChange = (_, card, count) => {
    if (count >= 0) {
      const cardSrc = card[ID] > 200000 ? CRYPT : LIBRARY;

      setDeckFrom((draft) => {
        draft[cardSrc][card[ID]] = {
          c: card,
          q: count,
        };
      });
    }
  };

  useEffect(() => {
    if (hash && deckTo) {
      const deckWithHash = deepClone({ [CRYPT]: deckTo[CRYPT], [LIBRARY]: deckTo[LIBRARY] });

      hash
        .slice(1)
        .split(';')
        .forEach((i) => {
          const j = i.split('=');
          if (j[0] > 200000) {
            deckWithHash[CRYPT][j[0]] = {
              q: (deckTo[CRYPT][j[0]]?.q || 0) + parseInt(j[1]),
              c: cryptCardBase[j[0]],
            };
          } else {
            deckWithHash[LIBRARY][j[0]] = {
              q: (deckTo[LIBRARY][j[0]]?.q || 0) + parseInt(j[1]),
              c: libraryCardBase[j[0]],
            };
          }
        });
      if (
        JSON.stringify({ [CRYPT]: deckFrom[CRYPT], [LIBRARY]: deckFrom[LIBRARY] }) !=
        JSON.stringify(deckWithHash)
      ) {
        setDeckFrom((draft) => {
          draft[CRYPT] = deckWithHash[CRYPT];
          draft[LIBRARY] = deckWithHash[LIBRARY];
        });
      }
    }
  }, [deckTo]);

  useEffect(() => {
    if (cryptCardBase && libraryCardBase && deckid) {
      if (!deckFrom || deckFrom[DECKID] != deckid) {
        getDeck();
      }
    }
  }, [deckid, loaderData, decks, preconDecks, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (deckFrom) setError(false);
  }, [deckFrom]);

  const parentId = deckFrom?.[DESCRIPTION].replace(
    `Review of ${import.meta.env.VITE_BASE_URL}/decks/`,
    '',
  );
  const inDecks = decks ? Object.keys(decks).includes(parentId) : null;

  const handleClose = () => {
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  return (
    <div className="deck-container mx-auto">
      <FlexGapped className="w-full">
        <div className="min-w-[175px] max-xl:hidden" />
        <FlexGapped className="w-full flex-col">
          {deckFrom && (
            <DeckDetails
              deck={{ ...deckFrom, [IS_NON_EDITABLE]: false }}
              isFolded={isFoldedDescription}
              setIsFolded={setIsFoldedDescription}
            />
          )}
          {error && (
            <div>
              <ErrorMessage>{error}</ErrorMessage>
            </div>
          )}
          {deckFrom && (
            <FlexGapped className="max-sm:flex-col">
              <div className="basis-full sm:basis-5/9">
                <ReviewCrypt
                  cardsFrom={deckFrom[CRYPT]}
                  cardsTo={deckTo[CRYPT]}
                  cardChange={cardChange}
                />
              </div>
              <div className="basis-full sm:basis-4/9">
                <ReviewLibrary
                  cardsFrom={deckFrom[LIBRARY]}
                  cardsTo={deckTo[LIBRARY]}
                  cardChange={cardChange}
                />
              </div>
            </FlexGapped>
          )}
        </FlexGapped>
        <div className="min-w-[175px] max-lg:hidden">
          <div className="sticky z-20 w-full bg-bgPrimary dark:bg-bgPrimaryDark lg:top-10">
            <ReviewButtons deck={deckFrom} urlDiff={urlDiff} parentId={inDecks ? parentId : null} />
          </div>
        </div>
      </FlexGapped>
      {isMobile && showFloatingButtons && (
        <>
          <DeckNewCardFloating
            target={CRYPT}
            deckid={deckFrom?.[DECKID]}
            cards={Object.values(deckFrom?.[CRYPT] ?? {})}
          />
          <DeckNewCardFloating
            target={LIBRARY}
            deckid={deckFrom?.[DECKID]}
            cards={Object.values(deckFrom?.[LIBRARY] ?? {})}
          />
        </>
      )}
      <div className="lg:hidden">
        <ButtonFloatMenu />
      </div>
      {showMenuButtons && (
        <Modal handleClose={handleClose} centered size="xs">
          <ReviewButtons deck={deckFrom} urlDiff={urlDiff} parentId={inDecks ? parentId : null} />
          <div className="lg:hidden">
            <ButtonFloatClose handleClose={handleClose} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Review;
