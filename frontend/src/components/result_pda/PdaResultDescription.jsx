import React from 'react';
import {
  PdaResultDescriptionText,
  TwdOpenDeckButton,
  DeckCloneButton,
  PdaFavoriteButton,
} from '@/components';
import { useApp } from '@/context';

const PdaResultDescription = ({ deck }) => {
  const { username, isDesktop } = useApp();

  return (
    <>
      {isDesktop ? (
        <div className="space-y-3">
          <div>
            <PdaResultDescriptionText deck={deck} />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <TwdOpenDeckButton deckid={deck['deckid']} />
            </div>
            {username && (
              <>
                <div className="w-full">
                  <DeckCloneButton deck={deck} noRedirect />
                </div>
                <div className="w-full">
                  <PdaFavoriteButton deck={deck} />
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex px-1 sm:px-0">
          <div className="basis-9/12">
            <PdaResultDescriptionText deck={deck} />
          </div>
          <div className="flex flex-col gap-1 basis-3/12">
            <TwdOpenDeckButton deckid={deck['deckid']} />
            {username && (
              <>
                <DeckCloneButton deck={deck} noRedirect />
                <PdaFavoriteButton deck={deck} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PdaResultDescription;
