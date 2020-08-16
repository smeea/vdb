import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';

function DeckNewCryptName(props) {
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  const handleInputChange = value => {
    setValue(value);
  };

  const handleChange = value => {
    setSelectedValue(value);
  };

  const clearFormButton = event => {
    setSelectedValue('');
  };

  const createNewCard = event => {
    if (selectedValue.Id) {
      props.deckCardAdd(props.deckid, selectedValue.Id);
      setSelectedValue('');
    } else {
      console.log('Error: submit with empty forms');
    };
  };

  const loadOptions = (inputValue) => {
    const url = 'http://127.0.0.1:5001/api/search/crypt';
    const input = {name: inputValue};
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    };

    if (inputValue.length > 2) {
      return fetch(url, options)
        .then(result => result.json());
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedValue}
        getOptionLabel={e => e.Name}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
      <Button variant='outline-primary' onClick={createNewCard}>
        Add
      </Button>
      <Button variant='outline-primary' onClick={clearFormButton}>
        Clear
      </Button>
    </React.Fragment>
  );
}

export default DeckNewCryptName;
