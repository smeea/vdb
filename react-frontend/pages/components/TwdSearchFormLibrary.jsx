import React, { useState, useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import Hammer from '../../assets/images/icons/hammer.svg';
import CardPopover from './CardPopover.jsx';
import TwdSearchFormQuantityButtons from './TwdSearchFormQuantityButtons.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';
import AppContext from '../../context/AppContext.js';

function TwdSearchFormLibrary(props) {
  const { libraryCardBase, isMobile } = useContext(AppContext);

  const [modalCard, setModalCard] = useState(undefined);

  const handleAdd = (event) => {
    const newState = props.state;
    newState[event] = {
      q: 1,
      m: 'gt',
    };
    props.setState((prevState) => ({
      ...prevState,
      library: newState,
    }));
  };

  const libraryCardsList = Object.keys(props.state)
    .filter((id) => props.state[id].q >= 0)
    .map((id) => {
      return (
        <div key={id} className="d-flex align-items-center pt-1">
          <TwdSearchFormQuantityButtons
            state={props.state}
            setState={props.setState}
            id={id}
            q={props.state[id].q}
            target="library"
          />
          {!isMobile ? (
            <OverlayTrigger
              placement="left"
              overlay={<CardPopover card={libraryCardBase[id]} />}
            >
              <div onClick={() => setModalCard(libraryCardBase[id])}>
                <ResultLibraryName card={libraryCardBase[id]} />
              </div>
            </OverlayTrigger>
          ) : (
            <div onClick={() => setModalCard(libraryCardBase[id])}>
              <ResultLibraryName card={libraryCardBase[id]} />
            </div>
          )}
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
        classNamePrefix="react-select"
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
                <ResultLibraryType cardtype={libraryCardBase[card]['Type']} />
                <span className="ps-1">
                  {libraryCardBase[card]['Banned'] ? (
                    <>
                      <strike>{libraryCardBase[card]['Name']}</strike>
                      <span className="ps-1">
                        <Hammer />
                      </span>
                    </>
                  ) : (
                    <>{libraryCardBase[card]['Name']}</>
                  )}
                </span>
              </div>
              <div>
                {libraryCardBase[card]['Discipline'] && (
                  <span className="px-1">
                    <ResultLibraryDisciplines
                      value={libraryCardBase[card]['Discipline']}
                    />
                  </span>
                )}
                {libraryCardBase[card]['Clan'] && (
                  <span className="px-1">
                    <ResultLibraryClan value={libraryCardBase[card]['Clan']} />
                  </span>
                )}
                {(libraryCardBase[card]['Blood Cost'] ||
                  libraryCardBase[card]['Pool Cost']) && (
                  <span className="px-1">
                    <ResultLibraryCost
                      valuePool={libraryCardBase[card]['Pool Cost']}
                      valueBlood={libraryCardBase[card]['Blood Cost']}
                    />
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      />
      {libraryCardsList}
      {modalCard && (
        <ResultLibraryModal
          show={modalCard ? true : false}
          card={modalCard}
          handleClose={() => setModalCard(false)}
        />
      )}
    </>
  );
}

export default TwdSearchFormLibrary;
