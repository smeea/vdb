import React from 'react';
import { Stack } from 'react-bootstrap';
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
      <Stack direction="horizontal" gap={1}>
        <TwdRandomButton getRandom={getRandom} />
        <TwdNewDecksButton getNew={getNew} />
      </Stack>
      <Stack direction="horizontal" gap={1}>
        {!inPda && <TwdMoreButton noText={!isWide} />}
        {!isMobile && <TwdClearButton handleClick={handleClearButton} />}
      </Stack>
    </>
  );
};

export default TwdSearchFormButtons;
