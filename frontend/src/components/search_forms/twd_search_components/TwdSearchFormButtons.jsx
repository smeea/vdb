import React from 'react';
import { useApp } from 'context';
import {
  TwdClearButton,
  TwdMoreButton,
  TwdNewDecksButton,
  TwdRandomButton,
} from 'components';

const TwdSearchFormButtons = ({ getRandom, getNew, handleClear, inPda }) => {
  const { isMobile, isWide } = useApp();

  return (
    <div className="flex justify-between">
      <div className="flex space-x-1">
        <TwdRandomButton getRandom={getRandom} />
        <TwdNewDecksButton getNew={getNew} />
      </div>
      <div className="flex space-x-1">
        {!inPda && <TwdMoreButton noText={!isWide} />}
        {!isMobile && <TwdClearButton handleClick={handleClear} />}
      </div>
    </div>
  );
};

export default TwdSearchFormButtons;
