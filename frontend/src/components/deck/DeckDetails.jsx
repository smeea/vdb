import React from 'react';
import {
  DeckTags,
  DeckChangeName,
  DeckChangeBranchName,
  DeckChangeAuthor,
  DeckChangeDescription,
} from '@/components';
import { useApp } from '@/context';

const DeckDetails = ({ deck, allTagsOptions, folded, setFolded }) => {
  const { isMobile } = useApp();

  return (
    <div className="flex basis-full flex-col gap-2">
      <div className="flex gap-2 max-sm:flex-col">
        <div
          className={`basis-full ${
            deck.isBranches ? 'sm:basis-6/12' : 'sm:basis-8/12'
          }`}
        >
          <DeckChangeName deck={deck} />
        </div>
        <div
          className={`flex basis-full max-sm:flex-col ${
            deck.isBranches ? 'sm:basis-6/12' : 'sm:basis-4/12'
          } gap-2`}
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
      <div
        className={`flex ${
          !folded || isMobile ? 'flex-col' : 'flex-row'
        } gap-2`}
      >
        <div className="basis-full sm:basis-6/12">
          <DeckChangeDescription
            deck={deck}
            folded={isMobile ? false : folded}
            setFolded={setFolded}
          />
        </div>
        {(deck.tags?.length > 0 || deck.isAuthor || !deck.isPublic) && (
          <div className="basis-full sm:basis-6/12">
            <DeckTags deck={deck} allTagsOptions={allTagsOptions} isBordered />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckDetails;
