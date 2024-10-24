import React from 'react';
import { twMerge } from 'tailwind-merge';
import {
  DeckTags,
  DeckChangeName,
  DeckChangeBranchName,
  DeckChangeAuthor,
  DeckChangeDescription,
  PlaytestReportForm,
} from '@/components';
import { useApp } from '@/context';

const DeckDetails = ({ deck, allTagsOptions, folded, setFolded }) => {
  const { isPlaytester, isMobile } = useApp();
  const playtestPrecon = deck.deckid.includes('PLAYTEST:') && deck.deckid.replace('PLAYTEST:', '');

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-2 max-sm:flex-col">
        <div className={twMerge('basis-full', deck.isBranches ? 'sm:basis-6/12' : 'sm:basis-8/12')}>
          <DeckChangeName deck={deck} />
        </div>
        <div
          className={twMerge(
            'flex basis-full gap-2 max-sm:flex-col',
            deck.isBranches ? 'sm:basis-6/12' : 'sm:basis-4/12',
          )}
        >
          {deck.isBranches && (
            <div className="basis-full sm:basis-4/12">
              <DeckChangeBranchName deck={deck} />
            </div>
          )}
          <div className="basis-full">
            <DeckChangeAuthor deck={deck} />
          </div>
        </div>
      </div>
      <div className={twMerge('flex gap-2', (!folded || isMobile) && 'flex-col')}>
        {isPlaytester && playtestPrecon ? (
          <div className="basis-full">
            <PlaytestReportForm id={playtestPrecon} isPrecon />
          </div>
        ) : (
          <>
            <div className="basis-full sm:basis-6/12">
              <DeckChangeDescription deck={deck} folded={folded} setFolded={setFolded} />
            </div>
            {(deck.tags?.length > 0 || deck.isAuthor || !deck.isPublic) && (
              <div className="basis-full sm:z-20 sm:basis-6/12">
                <DeckTags deck={deck} allTagsOptions={allTagsOptions} isBordered />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DeckDetails;
