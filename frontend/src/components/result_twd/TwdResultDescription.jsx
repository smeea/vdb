import React from 'react';
import {
  TwdResultDescriptionPlayers,
  TwdResultDescriptionText,
  TwdOpenDeckButton,
  DeckCloneButton,
} from '@/components';
import { useApp } from '@/context';
import { PLAYERS, DECKID } from '@/constants';

const TwdResultDescription = ({ deck }) => {
  const { username } = useApp();

  return (
    <div className="flex justify-between lg:flex-col lg:gap-2">
      <div>
        <div className="py-1.5 max-lg:hidden">
          <TwdResultDescriptionPlayers players={deck[PLAYERS]} />
        </div>
        <TwdResultDescriptionText deck={deck} />
      </div>
      <div className="flex gap-2 max-lg:flex-col max-lg:p-1">
        <div className="lg:hidden">
          <TwdResultDescriptionPlayers players={deck[PLAYERS]} />
        </div>
        <div className="flex justify-between gap-1 max-lg:flex-col lg:basis-full">
          <div className="basis-full">
            <TwdOpenDeckButton deckid={deck[DECKID]} />
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
