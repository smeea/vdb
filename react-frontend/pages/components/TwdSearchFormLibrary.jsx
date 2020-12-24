import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import Hammer from '../../assets/images/icons/hammer.svg';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';

function TwdSearchFormLibrary({ value, setValue, isMobile, showImage, setShowImage }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [libraryCards, setLibraryCards] = useState([])

  const handleChange = (val) => {
    if (libraryCards.indexOf(val) < 0) {
      setLibraryCards((prevState, index) => ([
        ...prevState,
        val
      ]));
      setSelectedValue('')
    }
  }

  const libraryCardsList = libraryCards.map((card, index) => {
    return(
      <div key={index} className="d-flex align-items-center">
        <ResultLibraryName
          showImage={showImage}
          setShowImage={setShowImage}
          isMobile={isMobile}
          placement="left"
          card={card}
        />
        <div className="px-1">
          <Button
            variant="outline-secondary"
            onClick={() => setLibraryCards(libraryCards.filter(value => value != card))}
          >
            X
          </Button>
        </div>
      </div>
    )
  })

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
    const newState = {};
    libraryCards.map((i, index) => {
      newState[i.Id] = true;
    })
    setValue((prevState) => ({
      ...prevState,
      library: newState,
    }));
  }, [libraryCards]);

  return (
    <>
      <AsyncSelect
        cacheOptions
        defaultOptions
        autoFocus={false}
        value={selectedValue}
        placeholder="Add Library Card"
        loadOptions={loadOptions}
        onChange={handleChange}
        getOptionLabel={(card) => (
          <>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <ResultLibraryType cardtype={card['Type']} />
                <span className="pl-1">
                  {card['Name']} {card['Banned'] && <Hammer />}
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
