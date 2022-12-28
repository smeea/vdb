import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { useImmer } from 'use-immer';
import List from 'assets/images/icons/list.svg';
import X from 'assets/images/icons/x.svg';
import {
  DeckTags,
  ButtonIconed,
  ReviewButtons,
  ReviewCrypt,
  ReviewLibrary,
  DeckChangeName,
  DeckChangeAuthor,
  DeckChangeDescription,
  Modal,
  ButtonFloat,
} from 'components';
import { useApp, deckStore } from 'context';
import { useDeck, useTags } from 'hooks';

const Review = () => {
  const {
    isMobile,
    cryptCardBase,
    libraryCardBase,
    preconDecks,
    setShowFloatingButtons,
    setShowMenuButtons,
    showFloatingButtons,
    showMenuButtons,
  } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const decks = useSnapshot(deckStore).decks;
  const navigate = useNavigate();
  const { deckid } = useParams();
  const { hash } = useLocation();
  const query = new URLSearchParams(useLocation().search);

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

  const getDeck = (deckid) => {
    setError(false);
    const url = `${process.env.API_URL}deck/${deckid}`;
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

        if (deckid.length !== 32 || deckData.publicParent) {
          deckData.tags = [];
          Object.values(useTags(deckData.crypt, deckData.library)).map((v) => {
            deckData.tags = deckData.tags.concat(v);
          });
        }

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

        setDeckTo(d);
        setDeckFrom(d);
      })
      .catch((error) => {
        if (error.message == 400) {
          setError('NO DECK WITH THIS ID');
        } else {
          setError('CONNECTION PROBLEM');
        }
        setDeckTo(undefined);
        setDeckFrom(undefined);
      });
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
    if (
      cryptCardBase &&
      libraryCardBase &&
      decks !== undefined &&
      deckid &&
      (deckFrom?.deckid !== deckid || !deckFrom)
    ) {
      if (decks[deckid]) {
        setDeckFrom(decks[deckid]);
      } else if (deckid.includes(':')) {
        if (preconDecks && preconDecks[deckid]) {
          setDeckFrom(preconDecks[deckid]);
        } else {
          setError('NO DECK WITH THIS ID');
        }
      } else {
        getDeck(deckid);
      }
    }
  }, [deckid, decks, preconDecks, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (deckFrom) setError(false);
  }, [deckFrom]);

  const parentId = deckFrom?.description.replace(
    `Review of ${process.env.ROOT_URL}decks/`,
    ''
  );
  const inDecks = decks ? Object.keys(decks).includes(parentId) : null;

  return (
    <div className="deck-container mx-auto">
      <div className="flex flex-row">
        <div className="xl:basis-1/12" />
        <div className="basis-full lg:basis-5/6 xl:basis-9/12">
          <div className="flex flex-row ">
            <div>
              {deckFrom && (
                <>
                  {isMobile ? (
                    <DeckChangeName deck={deckFrom} isAuthor={false} />
                  ) : (
                    <>
                      <div className="flex flex-row">
                        <div className="md:basis-8/12">
                          <DeckChangeName deck={deckFrom} />
                        </div>
                        <div className="md:basis-1/3">
                          <DeckChangeAuthor deck={deckFrom} />
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div>
                          <DeckChangeDescription
                            deck={deckFrom}
                            folded={foldedDescription}
                            setFolded={setFoldedDescription}
                          />
                        </div>
                        {foldedDescription && deckFrom?.tags.length > 0 && (
                          <div>
                            <DeckTags deck={deckFrom} bordered />
                          </div>
                        )}
                      </div>
                      {!foldedDescription && deckFrom?.tags.length > 0 && (
                        <div className="block ">
                          <DeckTags deck={deckFrom} bordered />
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          {error && (
            <div className="flex flex-row">
              <div>
                <div className="error-message flex items-center justify-center">
                  <b>{error}</b>
                </div>
              </div>
            </div>
          )}
          {deckFrom && (
            <div className="flex flex-row">
              <div className="md:basis-7/12">
                <ReviewCrypt
                  cardsFrom={deckFrom.crypt}
                  cardsTo={deckTo.crypt}
                  cardChange={cardChange}
                />
              </div>
              <div className="md:basis-5/12">
                <ReviewLibrary
                  cardsFrom={deckFrom.library}
                  cardsTo={deckTo.library}
                  cardChange={cardChange}
                />
              </div>
            </div>
          )}
        </div>
        {!isMobile && (
          <div className="hidden lg:flex lg:basis-1/6">
            <div className="top-[77px] z-20 bg-bgPrimary dark:bg-bgPrimaryDark">
              <ReviewButtons
                deck={deckFrom}
                urlDiff={urlDiff}
                parentId={inDecks ? parentId : null}
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
