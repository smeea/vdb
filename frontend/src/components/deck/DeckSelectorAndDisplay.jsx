import React from 'react';
import { useSnapshot } from 'valtio';
import EyeFill from '@/assets/images/icons/eye-fill.svg?react';
import EyeSlashFill from '@/assets/images/icons/eye-slash-fill.svg?react';
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
import { setDeck, deckStore, useApp } from '@/context';

const DeckSelectorAndDisplay = () => {
  const { playtestMode, isDesktop, addMode, toggleAddMode } = useApp();
  const { deck, decks } = useSnapshot(deckStore);

  const isBranches = deck ? deck.master || (deck.branches && deck.branches.length > 0) : null;

  const handleSelect = (e) => {
    setDeck(decks[e.value]);
  };

  return (
    <FlexGapped className="flex-col">
      <div className="sticky z-10 flex space-x-1 bg-bgPrimary dark:bg-bgPrimaryDark sm:top-10">
        {addMode && (
          <>
            <div className="w-full">
              <DeckSelectMy handleSelect={handleSelect} deckid={deck?.deckid ?? null} />
            </div>
            {isBranches && (
              <div className="min-w-[90px]">
                <DeckBranchSelect handleSelect={handleSelect} deck={deck} />
              </div>
            )}
            {deck?.isAuthor && !deck?.isPublic && <DeckFreezeButton deck={deck} />}
          </>
        )}
        {isDesktop && (
          <ButtonIconed
            title="Hide Deck Panel"
            variant="primary"
            onClick={toggleAddMode}
            icon={addMode ? <EyeSlashFill /> : <EyeFill />}
            text={addMode ? null : 'Show Deck'}
          />
        )}
      </div>
      {deck && addMode && (
        <>
          {playtestMode ||
          !(
            Object.keys(deck.crypt).some((cardid) => cardid > 210000) ||
            Object.keys(deck.library).some((cardid) => cardid > 110000)
          ) ? (
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
