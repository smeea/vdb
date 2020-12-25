import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import Hammer from '../../assets/images/icons/hammer.svg';
import TwdSearchFormQuantityButtons from './TwdSearchFormQuantityButtons.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';

function TwdSearchFormCrypt({
  state,
  setState,
  isMobile,
  showImage,
  setShowImage,
}) {
  const [cryptCards, setCryptCards] = useState({});

  const handleAdd = (event) => {
    setCryptCards((prevState) => ({
      ...prevState,
      [event['Id']]: event,
    }));

    const newState = state;
    newState[event['Id']] = 1;
    setState((prevState) => ({
      ...prevState,
      crypt: newState,
    }));
  };

  const cryptCardsList = Object.keys(state)
    .filter((id) => state[id] > 0)
    .map((id, index) => {
      const card = cryptCards[id];
      return (
        <div key={index} className="d-flex align-items-center">
          <TwdSearchFormQuantityButtons
            state={state}
            setState={setState}
            id={id}
            q={state[id]}
            target="crypt"
          />
          <ResultCryptName
            isMobile={isMobile}
            showImage={showImage}
            setShowImage={setShowImage}
            placement="left"
            card={card}
          />
        </div>
      );
    });

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
    <>
      <AsyncSelect
        cacheOptions
        defaultOptions
        autoFocus={false}
        value={null}
        placeholder="Add Crypt Card"
        loadOptions={loadOptions}
        onChange={handleAdd}
        getOptionLabel={(card) => {
          return (
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <ResultCryptCapacity value={card['Capacity']} />
                <span className="px-2">
                  {card['Name']}
                  {card['Banned'] && <Hammer />}
                  {card['Adv'] && (
                    <span className="pl-1">
                      <img
                        className="advanced-image-results"
                        src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                        title="Advanced"
                      />
                    </span>
                  )}
                </span>
                <ResultCryptClan value={card['Clan']} />
              </div>
              <div className="d-flex flex-nowrap">
                <ResultCryptDisciplines value={card['Disciplines']} />
              </div>
            </div>
          );
        }}
      />
      {cryptCardsList}
    </>
  );
}

export default TwdSearchFormCrypt;
