import { useSnapshot } from 'valtio';
import EyeSlashFill from '@icons/eye-slash-fill.svg?react';
import {
  ButtonIconed,
  DeckBranchSelect,
  DeckCrypt,
  DeckFreezeButton,
  DeckLibrary,
  DeckSelectMy,
  ErrorMessage,
  FlexGapped,
} from '@/components';
import { BRANCHES, DECKID, DECKS, IS_AUTHOR, IS_PUBLIC, MASTER } from '@/constants';
import { deckStore, setDeck, useApp } from '@/context';
import { getRestrictions } from '@/utils';

const DeckSelectorAndDisplay = () => {
  const { playtestMode, isDesktop, addMode, toggleAddMode } = useApp();
  const { deck } = useSnapshot(deckStore);
  const isBranches = deck ? deck[MASTER] || (deck[BRANCHES] && deck[BRANCHES].length > 0) : null;
  const { hasPlaytest } = getRestrictions(deck);

  const handleSelect = (e) => {
    setDeck(deckStore[DECKS][e.value]);
  };

  return (
    <FlexGapped className="flex-col">
      <div className="bg-bgPrimary dark:bg-bgPrimaryDark sticky z-10 flex gap-1 sm:top-10">
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
          {playtestMode || !hasPlaytest ? (
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
