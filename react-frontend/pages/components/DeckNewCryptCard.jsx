import React, { useEffect, useState, useContext } from 'react';
import AsyncSelect from 'react-select/async';
import Hammer from '../../assets/images/icons/hammer.svg';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import AppContext from '../../context/AppContext.js';

function DeckNewCryptCard(props) {
  const { cryptCardBase } = useContext(AppContext);
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (value) => setSelectedValue(value);

  const addNewCard = () => {
    if (!props.cards[selectedValue]) props.cardAdd(selectedValue);
    if (props.inInventory) props.setNewId(selectedValue);
    setSelectedValue('');
    props.setShowAdd && props.setShowAdd(false);
  };

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

  useEffect(() => {
    if (selectedValue) addNewCard();
  }, [selectedValue]);

  return (
    <AsyncSelect
      classNamePrefix="react-select"
      cacheOptions
      autoFocus={!props.inInventory}
      value={selectedValue}
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
                    props.cards[card] ? 'border-black' : null
                  }`}
                >
                  {props.cards[card] && props.cards[card].q}
                </div>
              )}
              <ResultCryptCapacity value={cryptCardBase[card]['Capacity']} />
              <div className="px-2">
                {cryptCardBase[card]['Banned'] ? (
                  <>
                    <strike>{cryptCardBase[card]['Name']}</strike>
                    {cryptCardBase[card]['Adv'] && (
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
                    {cryptCardBase[card]['Adv'] && (
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

export default DeckNewCryptCard;
