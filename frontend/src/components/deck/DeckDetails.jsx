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
    <div className="space-y-2">
      <div className="flex space-x-2">
        <div
          className={`${deck.isBranches ? 'md:basis-6/12' : 'md:basis-8/12'}`}
        >
          <DeckChangeName deck={deck} />
        </div>
        {deck.isBranches && (
          <div className="md:basis-2/12">
            <DeckChangeBranchName deck={deck} />
          </div>
        )}
        <div className="md:basis-4/12">
          <DeckChangeAuthor deck={deck} />
        </div>
      </div>
      {folded && !isMobile && (
        <div className="flex space-x-2">
          <div className="md:basis-6/12">
            <DeckChangeDescription
              deck={deck}
              folded={isMobile ? false : folded}
              setFolded={setFolded}
            />
          </div>
          {(deck.tags?.length > 0 || deck.isAuthor || !deck.isPublic) && (
            <div className="md:basis-6/12">
              <DeckTags
                deck={deck}
                allTagsOptions={allTagsOptions}
                isBordered
              />
            </div>
          )}
        </div>
      )}
      {(!folded || isMobile) &&
        (deck.tags?.length > 0 || deck.isAuthor || !deck.isPublic) && (
          <>
            <div className={isMobile ? '' : ''}>
              <DeckChangeDescription
                deck={deck}
                folded={isMobile ? false : folded}
                setFolded={setFolded}
              />
            </div>
            <div className={isMobile ? '' : ''}>
              <DeckTags
                deck={deck}
                allTagsOptions={allTagsOptions}
                isBordered
              />
            </div>
          </>
        )}
    </div>
  );
};

export default DeckDetails;
