import React from 'react';
import { FlexGapped, DiffCrypt, DiffLibrary } from '@/components';

const DeckPublicDiff = ({ deckFrom, deckTo }) => {
  return (
    <FlexGapped className="max-sm:flex-col">
      <div className="md:basis-7/12">
        <DiffCrypt cardsFrom={deckFrom.crypt} cardsTo={deckTo.crypt} />
      </div>
      <div className="md:basis-5/12">
        <DiffLibrary cardsFrom={deckFrom.library} cardsTo={deckTo.library} />
      </div>
    </FlexGapped>
  );
};

export default DeckPublicDiff;
