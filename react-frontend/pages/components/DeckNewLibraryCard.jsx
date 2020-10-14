import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';

import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';

function DeckNewLibraryCard(props) {
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (value) => setSelectedValue(value);

  const addNewCard = () => {
    if (selectedValue.Id) {
      props.deckCardAdd(selectedValue.Id);
      setSelectedValue('');
    } else {
      console.log('Error: submit with empty forms');
    }
  };

  const loadOptions = (inputValue) => {
    const url = `${process.env.API_URL}search/library`;
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

  useEffect(() => {
    if (selectedValue) addNewCard();
  }, [selectedValue]);

  return (
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
      onChange={handleChange}
    />
  );
}

export default DeckNewLibraryCard;
