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
import { S, H, MY, RECENT, PRECONS, INVENTORY_TYPE } from '@/constants';

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
  const isEditable = getIsEditable(deck);

  useEffect(() => {
    if (deckid?.includes(':') || !deckid) {
      setSelectFrom(PRECONS);
    } else if (decks?.[deckid]) {
      setSelectFrom(MY);
    } else {
      setSelectFrom(RECENT);
    }
  }, [deckid, decks]);

  return (
    <div className="flex flex-col gap-2">
      <div className="z-20 flex gap-1">
        <div className="w-full">
          {selectFrom == MY && decks ? (
            <DeckSelectMy handleSelect={handleSelect} deckid={deck?.[DECKID]} />
          ) : selectFrom == RECENT ? (
            <DeckSelectRecent handleSelect={handleSelect} deckid={deck?.[DECKID]} />
          ) : (
            <DeckSelectPrecon handleSelect={handleSelect} deckid={deck?.[DECKID]} />
          )}
        </div>
        {selectFrom == MY && decks && deck?.isBranches && (
          <div className="min-w-[90px]">
            <DeckBranchSelect handleSelect={handleSelect} deck={deck} />
          </div>
        )}
        {inventoryMode && deck[IS_AUTHOR] && (
          <div className="flex">
            <Button
              title={`Inventory Type: ${
                !deck?.[INVENTORY_TYPE]
                  ? 'VIRTUAL\nDo not use Inventory'
                  : deck?.[INVENTORY_TYPE] === S
                    ? 'FLEXIBLE\nLet cards to be reused with other Flexible Decks'
                    : 'FIXED\nUse unique copies of cards from Inventory'
              }`}
              disabled={!isEditable}
              onClick={() => deckToggleInventoryState(deck?.[DECKID])}
            >
              <div className="flex items-center">
                {!deck?.[INVENTORY_TYPE] && <At />}
                {deck?.[INVENTORY_TYPE] === S && <Shuffle />}
                {deck?.[INVENTORY_TYPE] === H && <PinAngleFill />}
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
                checked={selectFrom == MY}
                onChange={(e) => setSelectFrom(e.target[ID])}
                value={isMobile ? 'My' : 'My Decks'}
                id={MY}
              />
            </>
          )}
          <Radio
            checked={selectFrom == PRECONS}
            onChange={(e) => setSelectFrom(e.target[ID])}
            value="Precons"
            id={PRECONS}
          />
          {recentDecks.length > 0 && (
            <Radio
              checked={selectFrom == RECENT}
              onChange={(e) => setSelectFrom(e.target[ID])}
              value="Recent"
              id={RECENT}
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
