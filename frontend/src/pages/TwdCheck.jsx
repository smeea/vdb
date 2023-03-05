import React, { useState } from 'react';
import { TwdDeck, TwdEvent } from '@/components';

const TwdCheck = () => {
  const [deckData, setDeckData] = useState();

  return (
    <div className="search-container mx-auto">
      <div className="flex justify-center ">
        <div className="xl:basis-8/12 2xl-basis-9/12 border">
          <TwdDeck deckData={deckData} setDeckData={setDeckData} />
        </div>
        <div className="xl:basis-4/12 2xl:basis-3/12 border">
          {deckData && <TwdEvent deckData={deckData} />}
        </div>
      </div>
    </div>
  );
};

export default TwdCheck;
