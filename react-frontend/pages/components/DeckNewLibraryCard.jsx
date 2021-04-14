import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import Hammer from '../../assets/images/icons/hammer.svg';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';

function DeckNewLibraryCard(props) {
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (value) => setSelectedValue(value);

  const addNewCard = () => {
    if (!props.cards[selectedValue]) props.cardAdd(selectedValue);
    if (props.inInventory) props.setNewId(selectedValue);
    setSelectedValue('');
    props.setShowAdd && props.setShowAdd(false);
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
      classNamePrefix="react-select"
      cacheOptions
      autoFocus={!props.inInventory}
      value={selectedValue}
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
                    props.cards[card] ? 'border-black' : null
                  }`}
                >
                  {props.cards[card] && props.cards[card].q}
                </div>
              )}
              <ResultLibraryType cardtype={props.cardBase[card]['Type']} />
              <div className="pl-1">
                {props.cardBase[card]['Banned'] ? (
                  <>
                    <strike>{props.cardBase[card]['Name']}</strike>
                    <div className="d-inline pl-1">
                      <Hammer />
                    </div>
                  </>
                ) : (
                  <>{props.cardBase[card]['Name']}</>
                )}
              </div>
            </div>
            <div>
              {props.cardBase[card]['Discipline'] && (
                <div className="d-inline px-3">
                  <ResultLibraryDisciplines
                    value={props.cardBase[card]['Discipline']}
                  />
                </div>
              )}
              {props.cardBase[card]['Clan'] && (
                <div className="d-inline px-3">
                  <ResultLibraryClan value={props.cardBase[card]['Clan']} />
                </div>
              )}
              {(props.cardBase[card]['Blood Cost'] ||
                props.cardBase[card]['Pool Cost']) && (
                <div className="d-inline">
                  <ResultLibraryCost
                    valuePool={props.cardBase[card]['Pool Cost']}
                    valueBlood={props.cardBase[card]['Blood Cost']}
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

export default DeckNewLibraryCard;
