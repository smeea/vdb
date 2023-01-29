import React from 'react';
import Dice3 from '@/assets/images/icons/dice-3-fill.svg';
import ToggleOn from '@/assets/images/icons/toggle-on.svg';
import ToggleOff from '@/assets/images/icons/toggle-off.svg';
import X from '@/assets/images/icons/x.svg';
import { Input, Button } from '@/components';

const SeatingPlayerSelector = ({ setPlayer, delPlayer, i, player }) => {
  const handleChange = (event) => {
    if (event.target.value) {
      setPlayer(i, {
        name: event.target.value,
        state: true,
      });
    } else {
      setPlayer(i, {
        name: '',
        state: false,
      });
    }
  };

  const toggle = () => {
    if (player.name) {
      setPlayer(i, {
        name: player.name,
        random: player.random,
        state: !player.state,
      });
    } else {
      setPlayer(i, {
        name: `Player ${i + 1}`,
        random: player.random,
        state: true,
      });
    }
  };

  const handleClick = () => {
    setPlayer(i, {
      name: player.name,
      random: !player.random,
      state: !player.state && !player.random ? true : player.state,
    });
  };

  return (
    <div className="flex justify-between space-x-2">
      <div className="flex w-full">
        <Input
          placeholder="Disabled"
          value={player.state ? (player.random ? 'RANDOM' : player.name) : ''}
          onChange={handleChange}
          className="w-full rounded-r-none"
        />
        <Button
          variant={player.random && player.state ? 'primary' : 'secondary'}
          onClick={handleClick}
          className="rounded-l-none"
        >
          <Dice3 />
        </Button>
      </div>
      <div className="flex items-center" onClick={toggle}>
        {player.state ? (
          <ToggleOn width="30" height="30" viewBox="0 0 16 16" />
        ) : (
          <ToggleOff width="30" height="30" viewBox="0 0 16 16" />
        )}
      </div>
      <div
        className="flex items-center cursor-pointer p-0.5 text-fgRed dark:text-fgRedDark"
        onClick={() => delPlayer(i)}
      >
        <X width="22" height="22" viewBox="0 0 16 16" />
      </div>
    </div>
  );
};

export default SeatingPlayerSelector;
