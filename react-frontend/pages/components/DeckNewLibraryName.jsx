import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';

function DeckNewLibraryName(props) {
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  const handleInputChange = value => {
    setValue(value);
  };

  const handleChange = value => {
    setSelectedValue(value);
  };

  const clearFormButton = () => {
    setSelectedValue('');
  };

  const addNewCard = () => {
    if (selectedValue.Id) {
      props.deckCardAdd(props.deckid, selectedValue.Id);
      setSelectedValue('');
    } else {
      console.log('Error: submit with empty forms');
    };
  };

  const loadOptions = (inputValue) => {
    const url = process.env. API_URL + 'search/library';
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
        .then(response => response.json());
    } else {
      return null;
    }
  };

  return (
    <>
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedValue}
        getOptionLabel={ card =>
          <>
            <div className='d-flex justify-content-between'>
              <div>
                <img className='type-image-results'
                     src={'/images/types/' + card['Type'].toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif'}
                />
                <span className='pl-1'>
                  { card['Name'] + (card['Banned'] ? ' [BANNED]' : '') }
                </span>
              </div>
              <div>
                { card['Discipline'] &&
                  <span className='pl-2'>
                    <img className='discipline-image-results'
                         src={'/images/disciplines/' + card['Discipline'].toLowerCase() + '.gif'}
                    />
                  </span>
                }
                { card['Blood Cost'] &&
                  <span className='pl-2'>
                    <img className='cost-image-results'
                         src={'/images/misc/blood' + card['Blood Cost'].toLowerCase() + '.png'}
                    />
                  </span>
                }
                { card['Pool Cost'] &&
                  <span className='pl-2'>
                    <img className='cost-image-results'
                         src={'/images/misc/pool' + card['Pool Cost'].toLowerCase() + '.png'}
                    />
                  </span>
                }
                { card['Clan'] &&
                  <span className='pl-2'>
                    <img className='clan-image-results'
                         src={'/images/clans/' + card['Clan'].toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif'}
                    />
                  </span>
                }
              </div>
            </div>
          </>
        }
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
      <Button variant='outline-primary' onClick={addNewCard}>
        Add
      </Button>
      <Button variant='outline-primary' onClick={clearFormButton}>
        Clear
      </Button>
    </>
  );
}

export default DeckNewLibraryName;
