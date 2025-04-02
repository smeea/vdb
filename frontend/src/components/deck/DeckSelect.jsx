import { RadioGroup } from '@headlessui/react';
import { useEffect, useState } from 'react';
import At from '@icons/at.svg?react';
import BinocularsFill from '@icons/binoculars-fill.svg?react';
import ChatLeftQuoteFill from '@icons/chat-left-quote-fill.svg?react';
import PinAngleFill from '@icons/pin-angle-fill.svg?react';
import Shuffle from '@icons/shuffle.svg?react';
import {
  Button,
  ButtonIconed,
  DeckBranchSelect,
  DeckSelectMy,
  DeckSelectPrecon,
  DeckSelectRecent,
  Radio,
} from '@/components';
import {
  DECKID,
  H,
  INVENTORY_TYPE,
  IS_AUTHOR,
  IS_BRANCHES,
  MY,
  PRECONS,
  RECENT,
  S,
} from '@/constants';
import { deckToggleInventoryState, useApp } from '@/context';
import { getIsEditable } from '@/utils';

const DeckSelect = ({
  deck,
  deckid,
  decks,
  handleSelect,
  setShowInfo,
  setShowSelect,
  showInfo,
}) => {
  const { inventoryMode, isMobile, recentDecks, setShowFloatingButtons, username } = useApp();
  const [selectFrom, setSelectFrom] = useState(MY);
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
          {selectFrom === MY && decks ? (
            <DeckSelectMy handleSelect={handleSelect} deckid={deck?.[DECKID]} />
          ) : selectFrom === RECENT ? (
            <DeckSelectRecent handleSelect={handleSelect} deckid={deck?.[DECKID]} />
          ) : (
            <DeckSelectPrecon handleSelect={handleSelect} deckid={deck?.[DECKID]} />
          )}
        </div>
        {selectFrom === MY && decks && deck?.[IS_BRANCHES] && (
          <div className="min-w-[90px]">
            <DeckBranchSelect handleSelect={handleSelect} deck={deck} />
          </div>
        )}
        {inventoryMode && deck?.[IS_AUTHOR] && (
          <div className="flex">
            <ButtonIconed
              title={`Inventory Type: ${
                !deck?.[INVENTORY_TYPE]
                  ? 'VIRTUAL\nDo not use Inventory'
                  : deck?.[INVENTORY_TYPE] === S
                    ? 'FLEXIBLE\nLet cards to be reused with other Flexible Decks'
                    : 'FIXED\nUse unique copies of cards from Inventory'
              }`}
              disabled={!isEditable}
              onClick={() => deckToggleInventoryState(deck?.[DECKID])}
              icon={
                deck?.[INVENTORY_TYPE] === S ? (
                  <Shuffle width="17" height="17" viewBox="0 0 16 16" />
                ) : deck?.[INVENTORY_TYPE] === H ? (
                  <PinAngleFill width="17" height="17" viewBox="0 0 16 16" />
                ) : (
                  <At width="17" height="17" viewBox="0 0 16 16" />
                )
              }
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2">
        <RadioGroup
          value={selectFrom}
          onChange={setSelectFrom}
          aria-label="Server size"
          className="flex gap-4 sm:gap-6"
        >
          {username && decks && Object.keys(decks).length > 0 && (
            <Radio label={isMobile ? 'My' : 'My Decks'} value={MY} />
          )}
          <Radio label="Precons" value={PRECONS} />
          {recentDecks.length > 0 && <Radio label="Recent" value={RECENT} />}
        </RadioGroup>
        <div className="flex gap-1">
          {decks && (
            <ButtonIconed
              title="Advanced Deck Select"
              onClick={() => {
                setShowFloatingButtons(false);
                setShowSelect(true);
              }}
              icon={<BinocularsFill width="18" height="18" viewBox="0 0 16 16" />}
            />
          )}
          {deck && (
            <Button className="sm:hidden" onClick={() => setShowInfo(!showInfo)}>
              <div className="flex">
                <ChatLeftQuoteFill width="18" height="18" viewBox="0 0 16 16" />
              </div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeckSelect;
