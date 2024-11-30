import React, { useState } from 'react';
import Check2 from '@icons/check2.svg?react';
import { Input, Button } from '@/components';

const SeatingRandomDeckAddForm = ({ addDeck }) => {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name) {
      addDeck(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <Input
        placeholder="Add Random Deck"
        value={name}
        onChange={handleChange}
        roundedStyle="rounded rounded-r-none"
      />
      <Button type="submit" className="rounded-l-none">
        <Check2 />
      </Button>
    </form>
  );
};

export default SeatingRandomDeckAddForm;
