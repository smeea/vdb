import React from 'react';
import Shuffle from 'assets/images/icons/shuffle.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';

const UsedDescription = ({ deck, t, q }) => {
  const isBranches = deck.master || (deck.branches && deck.branches.length > 0);

  return (
    <div className="flex items-center">
      <div className="opacity-40">
        {t == 's' ? (
          <Shuffle width="14" height="14" viewBox="0 0 16 16" />
        ) : (
          <PinAngleFill width="14" height="14" viewBox="0 0 16 16" />
        )}
      </div>
      <div className="font-bold">{q}</div>
      <div className="inline max-w-[175px] sm:max-w-[200px]">
        {` - ${deck.name}${isBranches ? ` [${deck.branchName}]` : ''} `}
      </div>
    </div>
  );
};

export default UsedDescription;
