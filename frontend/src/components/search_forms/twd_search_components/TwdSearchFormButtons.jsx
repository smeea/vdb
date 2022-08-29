import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { useApp } from 'context';
import { TwdMoreButton, TwdNewDecksButton, TwdRandomButton } from '.';

const TwdSearchFormButtons = ({
  getRandom,
  getNew,
  handleClearButton,
  inPda,
}) => {
  const { isMobile } = useApp();

  return (
    <div className="d-flex px-0 justify-content-between">
      <Stack direction="horizontal" gap={1}>
        <TwdRandomButton getRandom={getRandom} />
        <TwdNewDecksButton getNew={getNew} />
      </Stack>
      <Stack direction="horizontal" gap={1}>
        {!inPda && <TwdMoreButton />}
        {!isMobile && (
          <Button
            className="h-100"
            title="Clear Forms & Results"
            variant="primary"
            onClick={handleClearButton}
          >
            <div className="d-flex align-items-center">
              <X />
            </div>
          </Button>
        )}
      </Stack>
    </div>
  );
};

export default TwdSearchFormButtons;
