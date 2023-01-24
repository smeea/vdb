import React from 'react';
import { DiffCrypt, DiffLibrary } from '@/components';

const DeckPublicDiff = ({ deckFrom, deckTo }) => {
  return (
    <div className="flex flex-row">
      <div className="md:basis-7/12 ">
        <DiffCrypt
          isEditable={false}
          cardsFrom={deckFrom.crypt}
          cardsTo={deckTo.crypt}
        />
      </div>
      <div className="md:basis-5/12 ">
        <DiffLibrary
          isEditable={false}
          cardsFrom={deckFrom.library}
          cardsTo={deckTo.library}
        />
      </div>
    </div>
  );
};

export default DeckPublicDiff;
