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
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div
          className={`basis-full ${
            deck.isBranches ? 'sm:basis-6/12' : 'sm:basis-8/12'
          }`}
        >
          <DeckChangeName deck={deck} />
        </div>
        {deck.isBranches && (
          <div className="basis-full sm:basis-2/12">
            <DeckChangeBranchName deck={deck} />
          </div>
        )}
        <div className="basis-full sm:basis-4/12">
          <DeckChangeAuthor deck={deck} />
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
