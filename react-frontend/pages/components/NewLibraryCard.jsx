import React, { useContext } from 'react';
import AsyncSelect from 'react-select/async';
import Hammer from '../../assets/images/icons/hammer.svg';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import AppContext from '../../context/AppContext.js';

function NewLibraryCard(props) {
  const { inventoryLibrary, libraryCardBase } = useContext(AppContext);

  const handleChange = (value) => props.setSelectedValue(value);

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

  return (
    <AsyncSelect
      classNamePrefix="react-select"
      cacheOptions
      autoFocus={!props.inInventory}
      value={props.selectedValue}
      placeholder="Add Library Card"
      loadOptions={loadOptions}
      onChange={handleChange}
      getOptionLabel={(card) => (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {props.inInventory && (
                <div
                  className={`d-inline in-inventory mr-2 ${
                    inventoryLibrary[card] ? 'border-black' : null
                  }`}
                >
                  {inventoryLibrary[card] && inventoryLibrary[card].q}
                </div>
              )}
              <ResultLibraryType cardtype={libraryCardBase[card]['Type']} />
              <div className="pl-1">
                {libraryCardBase[card]['Banned'] ? (
                  <>
                    <strike>{libraryCardBase[card]['Name']}</strike>
                    <div className="d-inline pl-1">
                      <Hammer />
                    </div>
                  </>
                ) : (
                  <>{libraryCardBase[card]['Name']}</>
                )}
              </div>
            </div>
            <div>
              {libraryCardBase[card]['Discipline'] && (
                <div className="d-inline px-3">
                  <ResultLibraryDisciplines
                    value={libraryCardBase[card]['Discipline']}
                  />
                </div>
              )}
              {libraryCardBase[card]['Clan'] && (
                <div className="d-inline px-3">
                  <ResultLibraryClan value={libraryCardBase[card]['Clan']} />
                </div>
              )}
              {(libraryCardBase[card]['Blood Cost'] ||
                libraryCardBase[card]['Pool Cost']) && (
                <div className="d-inline">
                  <ResultLibraryCost
                    valuePool={libraryCardBase[card]['Pool Cost']}
                    valueBlood={libraryCardBase[card]['Blood Cost']}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    />
  );
}

export default NewLibraryCard;
