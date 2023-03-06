import React, { useState } from 'react';
import { TwdDeck, TwdEvent } from '@/components';

const TwdCheck = () => {
  const [deckData, setDeckData] = useState();

  return (
    <div className="deck-container mx-auto">
      <div className="flex w-9/12 justify-center text-lg font-bold text-fgSecondary dark:text-fgSecondaryDark">
        Check TWD {deckData?.id ? ` - Event #${deckData.id}` : ''}
      </div>
      <div className="flex justify-center gap-2">
        <div className="basis-full md:basis-7/12">
          <TwdDeck deckData={deckData} setDeckData={setDeckData} />
        </div>
        <div className="basis-full md:basis-5/12">
          {deckData?.id && <TwdEvent deckData={deckData} />}
        </div>
      </div>
    </div>
  );
};

export default TwdCheck;
