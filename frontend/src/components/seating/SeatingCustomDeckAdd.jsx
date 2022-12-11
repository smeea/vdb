import React, { useState } from 'react';
import Check2 from 'assets/images/icons/check2.svg';
import { Button } from 'components';

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
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          placeholder="Add Random Deck"
          type="text"
          value={name}
          onChange={handleChange}
        />
        <Button variant="primary" type="submit">
          <Check2 />
        </Button>
      </div>
    </form>
  );
};

export default SeatingRandomDeckAddForm;
