import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';

function TwdSearchFormLibrary({ state, setFormState}) {
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (value) => setSelectedValue(value);

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
    if (selectedValue) {
      const newState = state;
      newState[selectedValue.Id] = !state[selectedValue.Id]
      setFormState((prevState) => ({
        ...prevState,
        library: newState,
      }));
    };
    setSelectedValue('')
  }, [selectedValue]);

  const libraryCards = Object.keys(state).map((card, index) => {
    return(
      <div key={index}>
        {card}
      </div>
    )
  });

  return (
    <>
      <AsyncSelect
        cacheOptions
        defaultOptions
        autoFocus={true}
        value={selectedValue}
        placeholder="Library Card"
        loadOptions={loadOptions}
        onChange={handleChange}
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
                <span className="px-1">
                  <ResultLibraryDisciplines value={card['Discipline']} />
                </span>
              )}
              {card['Clan'] && (
                <span className="px-1">
                  <ResultLibraryClan value={card['Clan']} />
                </span>
              )}
              {(card['Blood Cost'] || card['Pool Cost']) && (
                <span className="px-1">
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
      />
      {libraryCards}
    </>
  );
}

export default TwdSearchFormLibrary;
