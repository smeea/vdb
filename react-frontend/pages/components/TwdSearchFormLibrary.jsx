import React, { useState } from 'react';
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

function TwdSearchFormLibrary(props) {
  const [modalCard, setModalCard] = useState(undefined);

  const handleAdd = (event) => {
    const newState = props.state;
    newState[event] = 1;
    props.setState((prevState) => ({
      ...prevState,
      library: newState,
    }));
  };

  const libraryCardsList = Object.keys(props.state)
    .filter((id) => props.state[id] > 0)
    .map((id, index) => {
      return (
        <div key={index} className="d-flex align-items-center">
          <TwdSearchFormQuantityButtons
            state={props.state}
            setState={props.setState}
            id={id}
            q={props.state[id]}
            target="library"
          />
          {!props.isMobile ? (
            <OverlayTrigger
              placement="left"
              overlay={
                <CardPopover
                  card={props.cardBase[id]}
                  showImage={props.showImage}
                />
              }
            >
              <div
                className="pt-1"
                onClick={() => setModalCard(props.cardBase[id])}
              >
                <ResultLibraryName card={props.cardBase[id]} />
              </div>
            </OverlayTrigger>
          ) : (
            <div
              className="pt-1"
              onClick={() => setModalCard(props.cardBase[id])}
            >
              <ResultLibraryName card={props.cardBase[id]} />
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
        cacheOptions
        defaultOptions
        autoFocus={false}
        value={null}
        placeholder="Add Library Card"
        loadOptions={loadOptions}
        onChange={handleAdd}
        /* className="select-dropdown" */
        getOptionLabel={(card) => (
          <>
            <div className="d-flex align-items-center justify-content-between">
              <div>
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
      {libraryCardsList}
      {modalCard && (
        <ResultLibraryModal
          show={modalCard ? true : false}
          card={modalCard}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => setModalCard(false)}
          isMobile={props.isMobile}
        />
      )}
    </>
  );
}

export default TwdSearchFormLibrary;
