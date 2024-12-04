import React from 'react';
import { useSnapshot } from 'valtio';
import EyeSlashFill from '@icons/eye-slash-fill.svg?react';
import {
  DeckSelectMy,
  DeckBranchSelect,
  DeckCrypt,
  DeckLibrary,
  DeckFreezeButton,
  ButtonIconed,
  ErrorMessage,
  FlexGapped,
} from '@/components';
import { getRestrictions } from '@/utils';
import { setDeck, deckStore, useApp } from '@/context';
import { DECKID, MASTER, BRANCHES, IS_PUBLIC, IS_AUTHOR } from '@/constants';

const DeckSelectorAndDisplay = () => {
  const { playtestMode, isDesktop, addMode, toggleAddMode } = useApp();
  const { deck, decks } = useSnapshot(deckStore);
  const isBranches = deck ? deck[MASTER] || (deck[BRANCHES] && deck[BRANCHES].length > 0) : null;
  const { hasPlaytest } = getRestrictions(deck);

  const handleSelect = (e) => {
    setDeck(decks[e.value]);
  };

  return (
    <FlexGapped className="flex-col">
      <div className="sticky z-10 flex gap-1 bg-bgPrimary dark:bg-bgPrimaryDark sm:top-10">
        {addMode && (
          <>
            <div className="w-full">
              <DeckSelectMy handleSelect={handleSelect} deckid={deck?.[DECKID] ?? null} />
            </div>
            {isBranches && (
              <div className="min-w-[90px]">
                <DeckBranchSelect handleSelect={handleSelect} deck={deck} />
              </div>
            )}
            {deck?.[IS_AUTHOR] && !deck?.[IS_PUBLIC] && <DeckFreezeButton deck={deck} />}
          </>
        )}
        {isDesktop && (
          <ButtonIconed
            title="Hide Deck Panel"
            onClick={toggleAddMode}
            icon={addMode ? <EyeSlashFill /> : null}
            text={addMode ? null : <div className="whitespace-nowrap">Show Deck</div>}
          />
        )}
      </div>
      {deck && addMode && (
        <>
          {playtestMode || hasPlaytest ? (
            <>
              <DeckCrypt deck={deck} inSearch />
              <DeckLibrary deck={deck} inSearch />
            </>
          ) : (
            <div className="flex">
              <ErrorMessage>CONTAINS PLAYTEST CARDS</ErrorMessage>
            </div>
          )}
        </>
      )}
    </FlexGapped>
  );
};

export default DeckSelectorAndDisplay;
