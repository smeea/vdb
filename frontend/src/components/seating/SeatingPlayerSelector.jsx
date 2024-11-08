import React from 'react';
import Dice3 from '@/assets/images/icons/dice-3-fill.svg?react';
import X from '@/assets/images/icons/x.svg?react';
import { Toggle, Input, Button } from '@/components';
import { NAME, STATE, RANDOM } from '@/constants';

const SeatingPlayerSelector = ({ setPlayer, delPlayer, i, player }) => {
  const handleChange = (event) => {
    if (event.target.value) {
      setPlayer(i, {
        [NAME]: event.target.value,
        [STATE]: true,
      });
    } else {
      setPlayer(i, {
        [NAME]: '',
        [STATE]: false,
      });
    }
  };

  const toggle = () => {
    if (player[NAME]) {
      setPlayer(i, {
        [NAME]: player[NAME],
        [RANDOM]: player[RANDOM],
        [STATE]: !player[STATE],
      });
    } else {
      setPlayer(i, {
        [NAME]: `Player ${i + 1}`,
        [RANDOM]: player[RANDOM],
        [STATE]: true,
      });
    }
  };

  const handleClick = () => {
    setPlayer(i, {
      [NAME]: player[NAME],
      [RANDOM]: !player[RANDOM],
      [STATE]: !player[STATE] && !player[RANDOM] ? true : player[STATE],
    });
  };

  return (
    <div className="flex justify-between gap-2">
      <div className="flex w-full">
        <Input
          placeholder="Disabled"
          value={player[STATE] ? (player[RANDOM] ? 'RANDOM' : player[NAME]) : ''}
          onChange={handleChange}
          roundedStyle="rounded rounded-r-none"
        />
        <Button
          variant={player[RANDOM] && player[STATE] ? 'primary' : 'secondary'}
          onClick={handleClick}
          className="rounded-l-none"
        >
          <Dice3 />
        </Button>
      </div>
      <Toggle isOn={player[STATE]} handleClick={toggle} size="lg" />
      <div
        className="flex cursor-pointer items-center p-0.5 text-fgRed dark:text-fgRedDark"
        onClick={() => delPlayer(i)}
      >
        <X width="22" height="22" viewBox="0 0 16 16" />
      </div>
    </div>
  );
};

export default SeatingPlayerSelector;
