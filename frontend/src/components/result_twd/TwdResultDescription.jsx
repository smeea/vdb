import React from 'react';
import {
  TwdResultDescriptionPlayers,
  TwdResultDescriptionText,
  TwdOpenDeckButton,
  DeckCloneButton,
} from '@/components';
import { useApp } from '@/context';

const TwdResultDescription = ({ deck }) => {
  const { username, isDesktop } = useApp();

  return (
    <>
      {isDesktop ? (
        <div className="space-y-3">
          <div>
            <TwdResultDescriptionPlayers players={deck.players} />
            <TwdResultDescriptionText deck={deck} />
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <TwdOpenDeckButton deckid={deck['deckid']} />
            </div>
            {username && (
              <div className="w-full">
                <DeckCloneButton deck={deck} noRedirect />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex px-1 sm:px-0">
          <div className="basis-9/12">
            <TwdResultDescriptionText deck={deck} />
          </div>
          <div className="basis-3/12">
            <div className="flex flex-col gap-2">
              <TwdResultDescriptionPlayers players={deck.players} />
              <div className="flex flex-col gap-1">
                <TwdOpenDeckButton deckid={deck['deckid']} />
                {username && <DeckCloneButton deck={deck} src="twd" inTwd />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TwdResultDescription;
