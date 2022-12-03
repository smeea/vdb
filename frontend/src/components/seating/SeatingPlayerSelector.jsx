import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import Dice3 from 'assets/images/icons/dice-3-fill.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';

const SeatingPlayerSelector = ({ setPlayer, i, player }) => {
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
    <InputGroup>
      <FormControl
        placeholder="Disabled"
        type="text"
        value={player.state ? (player.random ? 'RANDOM' : player.name) : ''}
        onChange={handleChange}
      />
      <Button
        variant={player.random && player.state ? 'primary' : 'secondary'}
        onClick={handleClick}
      >
        <Dice3 />
      </Button>
      <div className="flex items-center ps-3" onClick={toggle}>
        {player.state ? (
          <ToggleOn width="30" height="30" viewBox="0 0 16 16" />
        ) : (
          <ToggleOff width="30" height="30" viewBox="0 0 16 16" />
        )}
      </div>
    </InputGroup>
  );
};

export default SeatingPlayerSelector;
