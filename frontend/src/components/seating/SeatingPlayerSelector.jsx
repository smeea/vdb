import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import Dice3 from 'assets/images/icons/dice-3-fill.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';

const SeatingPlayerSelector = ({ setDeck, i, deck }) => {
  const handleChange = (event) => {
    if (event.target.value) {
      setDeck(i, {
        name: event.target.value,
        state: true,
      });
    } else {
      setDeck(i, {
        name: '',
        state: false,
      });
    }
  };

  const toggle = () => {
    if (deck.name) {
      setDeck(i, {
        name: deck.name,
        random: deck.random,
        state: !deck.state,
      });
    } else {
      setDeck(i, {
        name: `Player ${i + 1}`,
        random: deck.random,
        state: true,
      });
    }
  };

  const handleClick = () => {
    setDeck(i, {
      name: deck.name,
      random: !deck.random,
      state: !deck.state && !deck.random ? true : deck.state,
    });
  };

  return (
    <InputGroup>
      <FormControl
        placeholder="Disabled"
        type="text"
        value={deck.state ? (deck.random ? 'RANDOM' : deck.name) : ''}
        onChange={handleChange}
      />
      <Button
        variant={deck.random && deck.state ? 'primary' : 'secondary'}
        onClick={handleClick}
      >
        <Dice3 />
      </Button>
      <div className="d-flex align-items-center ps-3" onClick={toggle}>
        {deck.state ? (
          <ToggleOn width="30" height="30" viewBox="0 0 16 16" />
        ) : (
          <ToggleOff width="30" height="30" viewBox="0 0 16 16" />
        )}
      </div>
    </InputGroup>
  );
};

export default SeatingPlayerSelector;
