import React, { useState, useEffect } from 'react';
import Shuffle from '@/assets/images/icons/shuffle.svg';
import At from '@/assets/images/icons/at.svg';
import PinAngleFill from '@/assets/images/icons/pin-angle-fill.svg';
import ChatLeftQuoteFill from '@/assets/images/icons/chat-left-quote-fill.svg';
import BinocularsFill from '@/assets/images/icons/binoculars-fill.svg';
import {
  ButtonIconed,
  DeckBranchSelect,
  DeckSelectMy,
  DeckSelectPrecon,
  DeckSelectRecent,
  Radio,
  Button,
} from '@/components';
import { useApp, deckUpdate } from '@/context';

const DeckSelect = ({
  deck,
  deckid,
  decks,
  handleSelect,
  setShowDeckSelectAdv,
  showInfo,
  setShowInfo,
}) => {
  const {
    inventoryMode,
    isMobile,
    recentDecks,
    setShowFloatingButtons,
    username,
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
    } else if (decks?.[deckid]) {
      setSelectFrom('my');
    } else {
      setSelectFrom('precons');
    }
  }, [deckid, decks]);

  return (
    <div className="space-y-2">
      <div className="z-20 flex gap-1">
        <div className="w-full">
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
          <div className="min-w-[90px]">
            <DeckBranchSelect handleSelect={handleSelect} deck={deck} />
          </div>
        )}
        {inventoryMode && deck?.isAuthor && (
          <div className="flex">
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
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-4 sm:gap-6">
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
            <ButtonIconed
              title="Advanced Deck Select"
              variant="primary"
              onClick={() => {
                setShowFloatingButtons(false);
                setShowDeckSelectAdv(true);
              }}
              icon={
                <BinocularsFill width="16" height="22" viewBox="0 0 16 18" />
              }
            />
          )}
          {isMobile && deck && (
            <Button variant="primary" onClick={() => setShowInfo(!showInfo)}>
              <div className="flex ">
                <ChatLeftQuoteFill width="16" height="18" viewBox="0 0 16 18" />
              </div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeckSelect;
