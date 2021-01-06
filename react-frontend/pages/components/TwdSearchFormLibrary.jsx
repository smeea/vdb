import React from 'react';
import AsyncSelect from 'react-select/async';
import Hammer from '../../assets/images/icons/hammer.svg';
import TwdSearchFormQuantityButtons from './TwdSearchFormQuantityButtons.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';

function TwdSearchFormLibrary({
  state,
  setState,
  isMobile,
  showImage,
  setShowImage,
  libraryCards,
  setLibraryCards,
}) {

  const handleAdd = (event) => {
    setLibraryCards((prevState) => ({
      ...prevState,
      [event['Id']]: event,
    }));

    const newState = state;
    newState[event['Id']] = 1;
    setState((prevState) => ({
      ...prevState,
      library: newState,
    }));
  };

  const libraryCardsList = Object.keys(state)
    .filter((id) => state[id] > 0)
    .map((id, index) => {
      const card = libraryCards[id];
      return (
        <div key={index} className="d-flex align-items-center">
          <TwdSearchFormQuantityButtons
            state={state}
            setState={setState}
            id={id}
            q={state[id]}
            target="library"
          />
          <ResultLibraryName
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
    <>
      <AsyncSelect
        cacheOptions
        defaultOptions
        autoFocus={false}
        value={null}
        placeholder="Add Library Card"
        loadOptions={loadOptions}
        onChange={handleAdd}
        getOptionLabel={(card) => (
          <>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <ResultLibraryType cardtype={card['Type']} />
                <span className="pl-1">
                  {card['Banned'] ? (
                    <>
                      <strike>{card['Name']}</strike>
                      <span className="pl-1">
                        <Hammer />
                      </span>
                    </>
                  ) : (
                    <>{card['Name']}</>
                  )}
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
      {libraryCardsList}
    </>
  );
}

export default TwdSearchFormLibrary;
