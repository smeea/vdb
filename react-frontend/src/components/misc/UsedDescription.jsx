import React from 'react';
import Shuffle from 'assets/images/icons/shuffle.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import { useApp } from 'context';

const UsedDescription = ({ deck, t, q }) => {
  const { isMobile } = useApp();

  const isBranches = deck.master || (deck.branches && deck.branches.length > 0);

  return (
    <div className="d-flex align-items-center">
      <div className="opacity-035">
        {t == 's' ? (
          <Shuffle width="14" height="14" viewBox="0 0 16 16" />
        ) : (
          <PinAngleFill width="14" height="14" viewBox="0 0 16 16" />
        )}
      </div>
      <div className="px-1">
        <b>{q}</b>
      </div>
      <div
        className={
          isMobile ? 'd-inline trimmed mw-275' : 'd-inline trimmed mw-200'
        }
      >
        {` - ${deck.name}${isBranches ? ` [${deck.branchName}]` : ''} `}
      </div>
    </div>
  );
};

export default UsedDescription;
