import React from 'react';
import { DiffCrypt, DiffLibrary } from '@/components';

const DeckPublicDiff = ({ deckFrom, deckTo }) => {
  return (
    <div className="flex flex-row gap-3 sm:gap-5">
      <div className="md:basis-7/12">
        <DiffCrypt cardsFrom={deckFrom.crypt} cardsTo={deckTo.crypt} />
      </div>
      <div className="md:basis-5/12">
        <DiffLibrary cardsFrom={deckFrom.library} cardsTo={deckTo.library} />
      </div>
    </div>
  );
};

export default DeckPublicDiff;
