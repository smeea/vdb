import React, { useState, useEffect, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import {
  useNavigate,
  useLocation,
  useParams,
  useLoaderData,
  defer,
} from 'react-router-dom';
import Shuffle from 'assets/images/icons/shuffle.svg';
import At from 'assets/images/icons/at.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import ChatLeftQuoteFill from 'assets/images/icons/chat-left-quote-fill.svg';
import List from 'assets/images/icons/list.svg';
import BinocularsFill from 'assets/images/icons/binoculars-fill.svg';
import {
  AccountLogin,
  AccountRegister,
  DeckSelectMy,
  DeckSelectRecent,
  DeckSelectPrecon,
  DeckSelectAdvModal,
  DeckQrModal,
  DeckTags,
  DeckDraw,
  DeckButtons,
  DeckBranchSelect,
  DeckCrypt,
  DeckLibrary,
  DeckRecommendation,
  DeckChangeName,
  DeckChangeBranchName,
  DeckChangeAuthor,
  DeckChangeDescription,
  DeckImport,
  Seating,
  Modal,
  Button,
  Radio,
} from 'components';
import { deckStore, useApp, setDeck, deckUpdate } from 'context';
import { useDeck, useDeckMissing, useTags } from 'hooks';

const Decks = () => {
  const {
    addRecentDeck,
    inventoryMode,
    isMobile,
    playtest,
    preconDecks,
    recentDecks,
    setShowFloatingButtons,
    setShowMenuButtons,
    showFloatingButtons,
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
  const [selectFrom, setSelectFrom] = useState('precons');
  const [showDeckSelectAdv, setShowDeckSelectAdv] = useState(false);
  const [showDraw, setShowDraw] = useState(false);
  const [showSeating, setShowSeating] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const getDeck = async () => {
    const deckData = await loaderData.deck;

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
    setDeck(d);
  };

  const toggleInventoryState = (id) => {
    if (!deck.inventoryType) {
      deckUpdate(id, 'inventoryType', 's');
    } else if (deck.inventoryType === 's') {
      deckUpdate(id, 'inventoryType', 'h');
    } else if (deck.inventoryType === 'h') {
      deckUpdate(id, 'inventoryType', '');
    }
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
    if (cryptCardBase && libraryCardBase && decks !== undefined) {
      if (deckid) {
        if (!deck || deck.deckid != deckid) {
          if (decks[deckid]) {
            setDeck(decks[deckid]);
          } else if (deckid.includes(':')) {
            const deckidFixed = deckid.replace('_', ' ');
            if (preconDecks && preconDecks[deckidFixed]) {
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
    if (deckid?.includes(':')) {
      setSelectFrom('precons');
    } else if (decks && decks[deckid]) {
      setSelectFrom('my');
    } else {
      setSelectFrom('recent');
    }
  }, [deckid, decks]);

  useEffect(() => {
    if (deck) {
      setError(false);
      if (!deckid) navigate(`/decks/${deck.deckid}`);
    }
  }, [deck]);

  return (
    <div className="deck-container px-md-2 px-xl-4 py-md-3 mx-auto px-0">
      <div className="mx-0 flex flex-row">
        <div className="xl:basis-1/12"></div>
        <div className="px-md-2 px-xl-3 basis-full lg:basis-5/6 xl:basis-9/12">
          <div className="px-md-0 pt-md-0 flex flex-row px-1 py-1 pb-0">
            <div className="px-md-2 px-0 md:basis-5/12">
              <div
                className={
                  inventoryMode || !isMobile ? 'flex' : 'flex justify-between'
                }
              >
                <div
                  className={
                    deck?.isBranches && selectFrom == 'my' ? 'w-75' : 'w-100'
                  }
                >
                  {selectFrom == 'my' && decks ? (
                    <DeckSelectMy
                      handleSelect={handleSelect}
                      deckid={deck?.deckid}
                    />
                  ) : selectFrom == 'recent' ? (
                    <DeckSelectRecent
                      handleSelect={handleSelect}
                      deckid={deck?.deckid}
                    />
                  ) : (
                    <DeckSelectPrecon
                      handleSelect={handleSelect}
                      deckid={deck?.deckid}
                    />
                  )}
                </div>
                {selectFrom == 'my' && decks && deck?.isBranches && (
                  <div className="ps-1 w-25">
                    <DeckBranchSelect handleSelect={handleSelect} deck={deck} />
                  </div>
                )}
                <div className="flex">
                  {inventoryMode && deck?.isAuthor && (
                    <div className="ps-1 flex">
                      <Button
                        title={`Inventory Type: ${
                          !deck?.inventoryType
                            ? 'VIRTUAL\nDo not use Inventory'
                            : deck?.inventoryType === 's'
                            ? 'FLEXIBLE\nLet cards to be reused with other Flexible Decks'
                            : 'FIXED\nUse unique copies of cards from Inventory'
                        }`}
                        variant="primary"
                        onClick={() => toggleInventoryState(deck?.deckid)}
                      >
                        <div className="flex items-center">
                          {!deck?.inventoryType && <At />}
                          {deck?.inventoryType === 's' && <Shuffle />}
                          {deck?.inventoryType === 'h' && <PinAngleFill />}
                        </div>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex space-x-8">
                  {username && decks && Object.keys(decks).length > 0 && (
                    <>
                      <Radio
                        checked={selectFrom == 'my'}
                        onChange={(e) => setSelectFrom(e.target.id)}
                        value={isMobile ? 'My' : 'My Decks'}
                        id="my"
                      />
                    </>
                  )}
                  <Radio
                    checked={selectFrom == 'precons'}
                    onChange={(e) => setSelectFrom(e.target.id)}
                    value="Precons"
                    id="precons"
                  />
                  {recentDecks.length > 0 && (
                    <Radio
                      checked={selectFrom == 'recent'}
                      onChange={(e) => setSelectFrom(e.target.id)}
                      value="Recent"
                      id="recent"
                    />
                  )}
                </div>
                <div className="flex flex-row space-x-1">
                  {decks && (
                    <Button
                      title="Advanced Deck Select"
                      variant="primary"
                      onClick={() => {
                        setShowFloatingButtons(false);
                        setShowDeckSelectAdv(true);
                      }}
                    >
                      <div className="flex">
                        <BinocularsFill
                          width="16"
                          height="22"
                          viewBox="0 0 16 18"
                        />
                      </div>
                    </Button>
                  )}
                  {isMobile && deck && (
                    <Button
                      variant="primary"
                      onClick={() => setShowInfo(!showInfo)}
                    >
                      <div className="flex pt-1">
                        <ChatLeftQuoteFill
                          width="16"
                          height="18"
                          viewBox="0 0 16 18"
                        />
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="px-md-2 px-0 md:basis-7/12">
              {deck && (showInfo || !isMobile) && (
                <>
                  <div className="pb-sm-2 mx-0 flex flex-row">
                    <div
                      className={`${
                        deck.isBranches ? 'md:basis-6/12' : 'md:basis-8/12'
                      } ps-md-0 pe-md-1 px-0`}
                    >
                      <DeckChangeName deck={deck} />
                    </div>
                    {deck.isBranches && (
                      <div
                        className={`md:basis-2/12 ${
                          isMobile ? 'px-0 pt-0.5' : 'px-1'
                        }`}
                      >
                        <DeckChangeBranchName deck={deck} />
                      </div>
                    )}
                    <div
                      className={`px-0 md:basis-1/3 ${
                        isMobile ? 'pt-0.5' : 'ps-md-1 pe-md-0 pt-md-0 pt-2'
                      }`}
                    >
                      <DeckChangeAuthor deck={deck} />
                    </div>
                  </div>
                  <div className="mx-0 flex flex-row">
                    <div className={isMobile ? 'px-0 pt-0.5' : 'px-0'}>
                      <DeckChangeDescription
                        deck={deck}
                        folded={isMobile ? false : foldedDescription}
                        setFolded={setFoldedDescription}
                      />
                    </div>
                    {foldedDescription &&
                      !isMobile &&
                      (deck.tags?.length > 0 ||
                        deck.isAuthor ||
                        !deck.isPublic) && (
                        <div
                          className={`ps-2 pe-0 ${isMobile ? 'pt-0.5' : ''}`}
                        >
                          <DeckTags
                            deck={deck}
                            allTagsOptions={allTagsOptions}
                            bordered
                          />
                        </div>
                      )}
                  </div>
                  {(!foldedDescription || isMobile) &&
                    (deck.tags?.length > 0 ||
                      deck.isAuthor ||
                      !deck.isPublic) && (
                      <div className={isMobile ? 'px-0 py-1' : 'block pt-2'}>
                        <DeckTags
                          deck={deck}
                          allTagsOptions={allTagsOptions}
                          bordered
                        />
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
          {error && (
            <div className="px-lg-2 flex flex-row px-0 py-4">
              <div className="error-message flex items-center justify-center p-2 font-bold">
                {error}
              </div>
            </div>
          )}
          {deck && (
            <div className="pt-md-2 flex flex-row">
              {playtest ||
              !(
                Object.keys(deck.crypt).some((cardid) => cardid > 210000) ||
                Object.keys(deck.library).some((cardid) => cardid > 110000)
              ) ? (
                <>
                  <div className="px-md-2 ps-xl-2 pe-xl-3 pt-md-0 px-0 pt-3 md:basis-7/12">
                    <DeckCrypt deck={deck} />
                  </div>
                  <div className="px-md-2 ps-xl-3 pe-xl-2 pt-md-0 px-0 pt-3 md:basis-5/12">
                    <DeckLibrary deck={deck} />
                  </div>
                </>
              ) : (
                <div className="px-lg-2 px-0 py-4">
                  <div className="error-message flex items-center justify-center p-2">
                    <b>CONTAIN PLAYTEST CARDS</b>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {!isMobile && (
          <div className="hide-on-lt992px ps-md-1 pe-md-0 px-xl-3 lg:basis-1/6">
            <div className="sticky-buttons">
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
        )}
      </div>
      {!username && !deckid && !hash && (
        <div className="mx-0 flex h-[70vh] flex-row items-center justify-center pt-4">
          <div className="basis-full px-3 md:basis-8/12 lg:basis-7/12 xl:basis-1/2">
            <div className="flex justify-center">
              <div className="text-blue font-bold">
                Login required to create decks
              </div>
            </div>
            <div className="flex justify-center">
              <div className="text-blue text-lg text-xs font-bold">
                (Browse preconstructed decks without login)
              </div>
            </div>
            <div className="py-4">
              <AccountLogin />
            </div>
            <div className="py-4">
              <AccountRegister />
            </div>
          </div>
        </div>
      )}

      {username && decks && Object.keys(decks).length === 0 && !deck && (
        <div className="vh-70 flex flex-row items-center justify-center p-3">
          <div className="basis-full md:basis-8/12 lg:basis-7/12 xl:basis-1/2">
            <div className="text-blue py-2 text-center font-bold">
              You do not have any decks in your collection yet
            </div>
            <div className="text-blue py-2 text-center font-bold">
              Start by creating new one, import from Lackey / Amaranth / Text or
              browse official preconstructed decks
            </div>
            <div className="flex justify-center pt-3">
              <DeckImport isOnlyNew={true} />
            </div>
          </div>
        </div>
      )}

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
          handleClose={() => {
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
          centered={true}
          size="sm"
        >
          <div>
            <DeckButtons
              deck={deck}
              setShowInfo={setShowInfo}
              setShowDraw={setShowDraw}
              setShowSeating={setShowSeating}
              setShowRecommendation={setShowRecommendation}
              setQrUrl={setQrUrl}
              missingCrypt={missingCrypt}
              missingLibrary={missingLibrary}
              handleClose={() => {
                setShowMenuButtons(false);
                setShowFloatingButtons(true);
              }}
            />
          </div>
        </Modal>
      )}
      {showDeckSelectAdv && (
        <DeckSelectAdvModal
          handleClose={() => {
            setShowDeckSelectAdv(false);
            setShowFloatingButtons(true);
          }}
          show={showDeckSelectAdv}
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

  const url = `${process.env.API_URL}deck/${params.deckid}`;
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  };

  const response = fetch(url, options).then((response) => {
    if (!response.ok) return { error: response.status };
    return response.json();
  });

  return defer({ deck: response });
};
