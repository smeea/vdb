import React, { useState, useEffect } from 'react';
import Shuffle from '@/assets/images/icons/shuffle.svg?react';
import At from '@/assets/images/icons/at.svg?react';
import PinAngleFill from '@/assets/images/icons/pin-angle-fill.svg?react';
import ChatLeftQuoteFill from '@/assets/images/icons/chat-left-quote-fill.svg?react';
import BinocularsFill from '@/assets/images/icons/binoculars-fill.svg?react';
import {
  ButtonIconed,
  DeckBranchSelect,
  DeckSelectMy,
  DeckSelectPrecon,
  DeckSelectRecent,
  Radio,
  Button,
} from '@/components';
import { useApp, deckToggleInventoryState } from '@/context';

const DeckSelect = ({
  deck,
  deckid,
  decks,
  handleSelect,
  setShowDeckSelectAdv,
  showInfo,
  setShowInfo,
}) => {
  const { inventoryMode, isMobile, recentDecks, setShowFloatingButtons, username } = useApp();

  const [selectFrom, setSelectFrom] = useState();

  useEffect(() => {
    if (deckid?.includes(':') || !deckid) {
      setSelectFrom('precons');
    } else if (decks?.[deckid]) {
      setSelectFrom('my');
    } else {
      setSelectFrom('recent');
    }
  }, [deckid, decks]);

  const { isPublic, isAuthor, isFrozen, isNonEditable } = deck || {};
  const isEditable = isAuthor && !isPublic && !isFrozen && !isNonEditable;

  return (
    <div className="flex flex-col gap-2">
      <div className="z-20 flex gap-1">
        <div className="w-full">
          {selectFrom == 'my' && decks ? (
            <DeckSelectMy handleSelect={handleSelect} deckid={deck?.deckid} />
          ) : selectFrom == 'recent' ? (
            <DeckSelectRecent handleSelect={handleSelect} deckid={deck?.deckid} />
          ) : (
            <DeckSelectPrecon handleSelect={handleSelect} deckid={deck?.deckid} />
          )}
        </div>
        {selectFrom == 'my' && decks && deck?.isBranches && (
          <div className="min-w-[90px]">
            <DeckBranchSelect handleSelect={handleSelect} deck={deck} />
          </div>
        )}
        {inventoryMode && isAuthor && (
          <div className="flex">
            <Button
              title={`Inventory Type: ${
                !deck?.inventoryType
                  ? 'VIRTUAL\nDo not use Inventory'
                  : deck?.inventoryType === 's'
                    ? 'FLEXIBLE\nLet cards to be reused with other Flexible Decks'
                    : 'FIXED\nUse unique copies of cards from Inventory'
              }`}
              disabled={!isEditable}
              onClick={() => deckToggleInventoryState(deck?.deckid)}
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
        <div className="flex gap-1">
          {decks && (
            <ButtonIconed
              title="Advanced Deck Select"
              onClick={() => {
                setShowFloatingButtons(false);
                setShowDeckSelectAdv(true);
              }}
              icon={<BinocularsFill width="16" height="22" viewBox="0 0 16 18" />}
            />
          )}
          {isMobile && deck && (
            <Button onClick={() => setShowInfo(!showInfo)}>
              <div className="flex">
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
