import React from 'react';
import {
  TwdResultDescriptionPlayers,
  TwdResultDescriptionText,
  TwdOpenDeckButton,
  DeckCloneButton,
} from '@/components';
import { useApp } from '@/context';

const TwdResultDescription = ({ deck }) => {
  const { username } = useApp();

  return (
    <div className="flex justify-between lg:flex-col lg:gap-2">
      <div>
        <div className="max-lg:hidden py-1.5">
          <TwdResultDescriptionPlayers players={deck.players} />
        </div>
        <TwdResultDescriptionText deck={deck} />
      </div>
      <div className="flex max-lg:p-1 max-lg:flex-col gap-2">
        <div className="lg:hidden">
          <TwdResultDescriptionPlayers players={deck.players} />
        </div>
        <div className="flex justify-between lg:basis-full max-lg:flex-col gap-1">
          <div className="basis-full">
            <TwdOpenDeckButton deckid={deck.deckid} />
          </div>
          {username && (
            <div className="basis-full">
              <DeckCloneButton deck={deck} inTwdPda />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwdResultDescription;
