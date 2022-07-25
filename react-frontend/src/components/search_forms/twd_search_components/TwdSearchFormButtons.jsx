import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Button } from 'react-bootstrap';
import LightningFill from 'assets/images/icons/lightning-fill.svg';
import Dice3 from 'assets/images/icons/dice-3-fill.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import ClockHistory from 'assets/images/icons/clock-history.svg';
import X from 'assets/images/icons/x.svg';
import { useApp } from 'context';
import { ButtonIconed } from 'components';

const TwdSearchFormButtons = ({ getRandom, getNew, handleClearButton }) => {
  const { isMobile } = useApp();
  const navigate = useNavigate();

  return (
    <Stack direction="vertical" gap={1}>
      <div className={`d-flex justify-content-${isMobile ? 'end' : 'between'}`}>
        <Stack direction="horizontal" gap={1}>
          <ButtonIconed
            variant="primary"
            onClick={() => getRandom(20)}
            title="Get 20 random TWD"
            icon={<Dice3 />}
            text="Random"
          />
          <ButtonIconed
            variant="primary"
            onClick={() => getNew(50)}
            title="Get 50 newest TWD"
            icon={<LightningFill />}
            text="New"
          />
        </Stack>
        {!isMobile && (
          <Button
            title="Clear Forms & Results"
            variant="primary"
            onClick={handleClearButton}
          >
            <div className="d-flex align-items-center">
              <X />
            </div>
          </Button>
        )}
      </div>
      <div className={`d-flex justify-content-${isMobile ? 'end' : 'between'}`}>
        <Stack direction="horizontal" gap={1}>
          <ButtonIconed
            variant="primary"
            onClick={() => navigate('/twd/hall_of_fame')}
            title="Most Winning Players"
            icon={<TrophyFill />}
            text="Hall of Fame"
          />
          <ButtonIconed
            variant="primary"
            onClick={() => navigate('/twd/cards_history')}
            title="History of Card Appearance in TWD"
            icon={<ClockHistory />}
            text="Cards History"
          />
        </Stack>
      </div>
    </Stack>
  );
};

export default TwdSearchFormButtons;
