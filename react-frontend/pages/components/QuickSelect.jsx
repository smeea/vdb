import React, { useEffect, useState, useRef, useContext } from 'react';
import AsyncSelect from 'react-select/async';
import Hammer from '../../assets/images/icons/hammer.svg';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import AppContext from '../../context/AppContext.js';

function QuickSelect(props) {
  const { cryptCardBase, libraryCardBase, isMobile } = useContext(AppContext);

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
      props.setCard(cryptCardBase[selectedValue]);
      props.history.push(`/cards/${selectedValue}`);
    } else if (selectedValue > 100000) {
      props.setCard(libraryCardBase[selectedValue]);
      props.history.push(`/cards/${selectedValue}`);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (isMobile && props.history.location.pathname == '/cards')
      ref.current.focus();
  }, []);

  return (
    <AsyncSelect
      classNamePrefix="react-select"
      cacheOptions
      autoFocus={!isMobile}
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
                    value={cryptCardBase[cardid]['Capacity']}
                  />
                  <span className="px-2">
                    {cryptCardBase[cardid]['Banned'] ? (
                      <>
                        <strike>{cryptCardBase[cardid]['Name']}</strike>
                        {cryptCardBase[cardid]['Adv'] && (
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
                        {cryptCardBase[cardid]['Name']}
                        {cryptCardBase[cardid]['Adv'] && (
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
                  <ResultCryptClan value={cryptCardBase[cardid]['Clan']} />
                </div>
                <div className="d-flex flex-nowrap">
                  <ResultCryptDisciplines
                    value={cryptCardBase[cardid]['Disciplines']}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <ResultLibraryType
                    cardtype={libraryCardBase[cardid]['Type']}
                  />
                  <span className="pl-1">
                    {libraryCardBase[cardid]['Banned'] ? (
                      <>
                        <strike>{libraryCardBase[cardid]['Name']}</strike>
                        <span className="pl-1">
                          <Hammer />
                        </span>
                      </>
                    ) : (
                      <>{libraryCardBase[cardid]['Name']}</>
                    )}
                  </span>
                </div>
                <div>
                  {libraryCardBase[cardid]['Discipline'] && (
                    <span className="px-1">
                      <ResultLibraryDisciplines
                        value={libraryCardBase[cardid]['Discipline']}
                      />
                    </span>
                  )}
                  {libraryCardBase[cardid]['Clan'] && (
                    <span className="px-1">
                      <ResultLibraryClan
                        value={libraryCardBase[cardid]['Clan']}
                      />
                    </span>
                  )}
                  {(libraryCardBase[cardid]['Blood Cost'] ||
                    libraryCardBase[cardid]['Pool Cost']) && (
                    <span className="px-1">
                      <ResultLibraryCost
                        valuePool={libraryCardBase[cardid]['Pool Cost']}
                        valueBlood={libraryCardBase[cardid]['Blood Cost']}
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
