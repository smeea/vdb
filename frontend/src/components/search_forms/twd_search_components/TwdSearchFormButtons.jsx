import React from 'react';
import { useApp } from 'context';
import {
  TwdClearButton,
  TwdMoreButton,
  TwdNewDecksButton,
  TwdRandomButton,
} from 'components';

const TwdSearchFormButtons = ({
  getRandom,
  getNew,
  handleClearButton,
  inPda,
}) => {
  const { isMobile, isWide } = useApp();

  return (
    <>
      <div className="flex flex-row space-x-1">
        <TwdRandomButton getRandom={getRandom} />
        <TwdNewDecksButton getNew={getNew} />
      </div>
      <div className="flex flex-row space-x-1">
        {!inPda && <TwdMoreButton noText={!isWide} />}
        {!isMobile && <TwdClearButton handleClick={handleClearButton} />}
      </div>
    </>
  );
};

export default TwdSearchFormButtons;
