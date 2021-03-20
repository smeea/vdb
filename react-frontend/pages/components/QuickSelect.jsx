import React, { useEffect, useState, useRef } from 'react';
import AsyncSelect from 'react-select/async';
import Hammer from '../../assets/images/icons/hammer.svg';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';

function QuickSelect(props) {
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (value) => setSelectedValue(value);
  const ref = useRef(null);

  const loadOptions = (inputValue) => {
    const url = `${process.env.API_URL}search/quick`;
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
    if (selectedValue > 200000) {
      props.setCard(props.cryptCardBase[selectedValue]);
      props.history.push(`/cards/${selectedValue}`);
    } else if (selectedValue > 100000) {
      props.setCard(props.libraryCardBase[selectedValue]);
      props.history.push(`/cards/${selectedValue}`);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (props.isMobile && props.history.location.pathname == '/cards')
      ref.current.focus();
  }, []);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      autoFocus={props.isMobile ? false : true}
      value={selectedValue}
      placeholder="Card Name"
      loadOptions={loadOptions}
      onChange={handleChange}
      ref={ref}
      getOptionLabel={(cardid) => (
        <>
          {cardid > 200000 ? (
            <>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <ResultCryptCapacity
                    value={props.cryptCardBase[cardid]['Capacity']}
                  />
                  <span className="px-2">
                    {props.cryptCardBase[cardid]['Banned'] ? (
                      <>
                        <strike>{props.cryptCardBase[cardid]['Name']}</strike>
                        {props.cryptCardBase[cardid]['Adv'] && (
                          <span className="pl-1">
                            <img
                              className="advanced-image-results"
                              src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                              title="Advanced"
                            />
                          </span>
                        )}
                        <span className="pl-1">
                          <Hammer />
                        </span>
                      </>
                    ) : (
                      <>
                        {props.cryptCardBase[cardid]['Name']}
                        {props.cryptCardBase[cardid]['Adv'] && (
                          <span className="pl-1">
                            <img
                              className="advanced-image-results"
                              src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                              title="Advanced"
                            />
                          </span>
                        )}
                      </>
                    )}
                  </span>
                  <ResultCryptClan
                    value={props.cryptCardBase[cardid]['Clan']}
                  />
                </div>
                <div className="d-flex flex-nowrap">
                  <ResultCryptDisciplines
                    value={props.cryptCardBase[cardid]['Disciplines']}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <ResultLibraryType
                    cardtype={props.libraryCardBase[cardid]['Type']}
                  />
                  <span className="pl-1">
                    {props.libraryCardBase[cardid]['Banned'] ? (
                      <>
                        <strike>{props.libraryCardBase[cardid]['Name']}</strike>
                        <span className="pl-1">
                          <Hammer />
                        </span>
                      </>
                    ) : (
                      <>{props.libraryCardBase[cardid]['Name']}</>
                    )}
                  </span>
                </div>
                <div>
                  {props.libraryCardBase[cardid]['Discipline'] && (
                    <span className="px-1">
                      <ResultLibraryDisciplines
                        value={props.libraryCardBase[cardid]['Discipline']}
                      />
                    </span>
                  )}
                  {props.libraryCardBase[cardid]['Clan'] && (
                    <span className="px-1">
                      <ResultLibraryClan
                        value={props.libraryCardBase[cardid]['Clan']}
                      />
                    </span>
                  )}
                  {(props.libraryCardBase[cardid]['Blood Cost'] ||
                    props.libraryCardBase[cardid]['Pool Cost']) && (
                    <span className="px-1">
                      <ResultLibraryCost
                        valuePool={props.libraryCardBase[cardid]['Pool Cost']}
                        valueBlood={props.libraryCardBase[cardid]['Blood Cost']}
                      />
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    />
  );
}

export default QuickSelect;
