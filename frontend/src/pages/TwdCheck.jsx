import React, { useState } from 'react';
import { TwdDeck, TwdEvent } from '@/components';
import { useApp } from '@/context';

const TwdCheck = () => {
  const { isWide } = useApp();

  const [eventId, setEventId] = useState(10043);

  return (
    <div className="search-container mx-auto">
      <div className="flex flex-row justify-center ">
        <div className={`xl:${isWide ? '8/12' : '9/12'} border `}>
          <TwdDeck eventId={eventId} setEventId={setEventId} />
        </div>
        <div className={`xl:${isWide ? '4/12' : '3/12'} border `}>
          <TwdEvent eventId={eventId} setEventId={setEventId} />
        </div>
      </div>
    </div>
  );
};

export default TwdCheck;
