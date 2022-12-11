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
  Button,
  DeckBranchSelect,
  DeckButtons,
  DeckChangeAuthor,
  DeckChangeBranchName,
  DeckChangeDescription,
  DeckChangeName,
  DeckCrypt,
  DeckDetails,
  DeckDraw,
  DeckImport,
  DeckLibrary,
  DeckQrModal,
  DeckRecommendation,
  DeckSelectAdvModal,
  DeckSelectMy,
  DeckSelectPrecon,
  DeckSelectRecent,
  DeckTags,
  Modal,
  Radio,
  Seating,
} from 'components';
import { deckStore, useApp, setDeck, deckUpdate } from 'context';
import { useDeck, useDeckMissing, useTags } from 'hooks';

const DeckSelect = ({ deck, deckid, decks, handleSelect }) => {
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

  const toggleInventoryState = (id) => {
    if (!deck.inventoryType) {
      deckUpdate(id, 'inventoryType', 's');
    } else if (deck.inventoryType === 's') {
      deckUpdate(id, 'inventoryType', 'h');
    } else if (deck.inventoryType === 'h') {
      deckUpdate(id, 'inventoryType', '');
    }
  };

  const [selectFrom, setSelectFrom] = useState('precons');

  useEffect(() => {
    if (deckid?.includes(':')) {
      setSelectFrom('precons');
    } else if (decks && decks[deckid]) {
      setSelectFrom('my');
    } else {
      setSelectFrom('recent');
    }
  }, [deckid, decks]);

  return (
    <>
      <div
        className={inventoryMode || !isMobile ? 'flex' : 'flex justify-between'}
      >
        <div
          className={deck?.isBranches && selectFrom == 'my' ? 'w-75' : 'w-100'}
        >
          {selectFrom == 'my' && decks ? (
            <DeckSelectMy handleSelect={handleSelect} deckid={deck?.deckid} />
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
          <div className="pl-1 w-25">
            <DeckBranchSelect handleSelect={handleSelect} deck={deck} />
          </div>
        )}
        <div className="flex">
          {inventoryMode && deck?.isAuthor && (
            <div className="pl-1 flex">
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
                <BinocularsFill width="16" height="22" viewBox="0 0 16 18" />
              </div>
            </Button>
          )}
          {isMobile && deck && (
            <Button variant="primary" onClick={() => setShowInfo(!showInfo)}>
              <div className="flex pt-1">
                <ChatLeftQuoteFill width="16" height="18" viewBox="0 0 16 18" />
              </div>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default DeckSelect;
