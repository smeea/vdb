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
    props.setshowAdd && props.setShowAdd(false);
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
      autoFocus={!props.inInventory}
      value={selectedValue}
      placeholder="Add Library Card"
      loadOptions={loadOptions}
      onChange={handleChange}
      getOptionLabel={(card) => (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {props.inInventory &&
               <div className="d-inline align-items-center in-deck mr-2">
                 {props.cards[card] && props.cards[card].q}
               </div>
              }
              <ResultLibraryType cardtype={props.cardBase[card]['Type']} />
              <span className="pl-1">
                {props.cardBase[card]['Banned'] ? (
                  <>
                    <strike>{props.cardBase[card]['Name']}</strike>
                    <span className="pl-1">
                      <Hammer />
                    </span>
                  </>
                ) : (
                  <>{props.cardBase[card]['Name']}</>
                )}
              </span>
            </div>
            <div>
              {props.cardBase[card]['Discipline'] && (
                <span className="px-1">
                  <ResultLibraryDisciplines
                    value={props.cardBase[card]['Discipline']}
                  />
                </span>
              )}
              {props.cardBase[card]['Clan'] && (
                <span className="px-1">
                  <ResultLibraryClan value={props.cardBase[card]['Clan']} />
                </span>
              )}
              {(props.cardBase[card]['Blood Cost'] ||
                props.cardBase[card]['Pool Cost']) && (
                <span className="px-1">
                  <ResultLibraryCost
                    valuePool={props.cardBase[card]['Pool Cost']}
                    valueBlood={props.cardBase[card]['Blood Cost']}
                  />
                </span>
              )}
            </div>
          </div>
        </>
      )}
    />
  );
}

export default DeckNewLibraryCard;
