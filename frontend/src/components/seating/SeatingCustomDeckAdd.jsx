import React, { useState } from 'react';
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import { Button } from 'components'

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
    <Form className="mb-0" onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          placeholder="Add Random Deck"
          type="text"
          value={name}
          onChange={handleChange}
        />
        <Button variant="primary" type="submit">
          <Check2 />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SeatingRandomDeckAddForm;
