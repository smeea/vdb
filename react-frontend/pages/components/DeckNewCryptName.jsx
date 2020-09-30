import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';

import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';

function DeckNewCryptName(props) {
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  const handleInputChange = (value) => {
    setValue(value);
  };

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const addNewCard = () => {
    if (selectedValue.Id) {
      props.deckCardAdd(selectedValue.Id);
      setSelectedValue('');
    } else {
      console.log('Error: submit with empty forms');
    }
  };

  const loadOptions = (inputValue) => {
    const url = process.env.API_URL + 'search/crypt';
    const input = { name: inputValue };
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
      return fetch(url, options).then((response) => response.json());
    } else {
      return null;
    }
  };

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          Add Crypt
        </span>
      </div>
      <div className="flex-grow-1">
        <AsyncSelect
          cacheOptions
          defaultOptions
          value={selectedValue}
          getOptionLabel={(card) => (
            <>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <ResultCryptCapacity value={card['Capacity']} />
                  <span className="px-2">
                    {card['Name'] +
                      (card['Adv'] ? ' [ADV]' : '') +
                      (card['Banned'] ? ' [BANNED]' : '')}
                  </span>
                  <ResultCryptClan value={card['Clan']} />
                </div>
                <div className="d-flex flex-nowrap">
                  <ResultCryptDisciplines value={card['Disciplines']} />
                </div>
              </div>
            </>
          )}
          loadOptions={loadOptions}
          onInputChange={handleInputChange}
          onChange={handleChange}
        />
      </div>
      <Button variant="outline-secondary" onClick={addNewCard}>
        Add
      </Button>
    </div>
  );
}

export default DeckNewCryptName;
