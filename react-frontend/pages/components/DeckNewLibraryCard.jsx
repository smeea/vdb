import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';

import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';

function DeckNewLibraryCard(props) {
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
    const url = process.env.API_URL + 'search/library';
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
          Add Library
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
                  <ResultLibraryType cardtype={card['Type']} />
                  <span className="pl-1">
                    {card['Name'] + (card['Banned'] ? ' [BANNED]' : '')}
                  </span>
                </div>
                <div>
                  {card['Discipline'] && (
                    <span className="pl-2">
                      <ResultLibraryDisciplines value={card['Discipline']} />
                    </span>
                  )}
                  {card['Clan'] && (
                    <span className="pl-2">
                      <ResultLibraryClan value={card['Clan']} />
                    </span>
                  )}
                  {(card['Blood Cost'] || card['Pool Cost']) && (
                    <span className="pl-2">
                      <ResultLibraryCost
                        valuePool={card['Pool Cost']}
                        valueBlood={card['Blood Cost']}
                      />
                    </span>
                  )}
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

export default DeckNewLibraryCard;
