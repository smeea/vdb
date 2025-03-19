import Dice3 from '@icons/dice-3-fill.svg?react';
import X from '@icons/x.svg?react';
import { Button, Input, Toggle } from '@/components';
import { NAME, RANDOM, STATE } from '@/constants';

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
          roundedStyle="rounded-sm rounded-r-none"
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
        className="text-fgRed dark:text-fgRedDark flex cursor-pointer items-center p-0.5"
        onClick={() => delPlayer(i)}
      >
        <X width="22" height="22" viewBox="0 0 16 16" />
      </div>
    </div>
  );
};

export default SeatingPlayerSelector;
