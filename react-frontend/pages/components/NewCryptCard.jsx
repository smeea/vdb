import React, { useContext } from 'react';
import AsyncSelect from 'react-select/async';
import Hammer from '../../assets/images/icons/hammer.svg';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import AppContext from '../../context/AppContext.js';

function NewCryptCard(props) {
  const { inventoryCrypt, cryptCardBase } = useContext(AppContext);

  const handleChange = (value) => props.setSelectedValue(value);

  const loadOptions = (inputValue) => {
    const url = `${process.env.API_URL}search/crypt`;
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
      placeholder="Add Crypt Card"
      loadOptions={loadOptions}
      onChange={handleChange}
      getOptionLabel={(card) => (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {props.inInventory && (
                <div
                  className={`d-inline in-inventory mr-2 ${
                    inventoryCrypt[card] ? 'border-black' : null
                  }`}
                >
                  {inventoryCrypt[card] && inventoryCrypt[card].q}
                </div>
              )}
              <ResultCryptCapacity value={cryptCardBase[card]['Capacity']} />
              <div className="px-2">
                {cryptCardBase[card]['Banned'] ? (
                  <>
                    <strike>{cryptCardBase[card]['Name']}</strike>
                    {cryptCardBase[card]['Adv'][0] && (
                      <div className="d-inline pl-1">
                        <img
                          className="advanced-image-results"
                          src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                          title="Advanced"
                        />
                      </div>
                    )}
                    <div className="d-inline pl-1">
                      <Hammer />
                    </div>
                  </>
                ) : (
                  <>
                    {cryptCardBase[card]['Name']}
                    {cryptCardBase[card]['Adv'][0] && (
                      <div className="d-inline pl-1">
                        <img
                          className="advanced-image-results"
                          src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                          title="Advanced"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="pr-3">
                <ResultCryptClan value={cryptCardBase[card]['Clan']} />
              </div>
            </div>
            <div className="d-flex flex-nowrap">
              <ResultCryptDisciplines
                value={cryptCardBase[card]['Disciplines']}
              />
            </div>
          </div>
        </>
      )}
    />
  );
}

export default NewCryptCard;
