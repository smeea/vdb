import React, { useState, useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import Hammer from '../../assets/images/icons/hammer.svg';
import CardPopover from './CardPopover.jsx';
import TwdSearchFormQuantityButtons from './TwdSearchFormQuantityButtons.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';
import AppContext from '../../context/AppContext.js';

function TwdSearchFormCrypt(props) {
  const { cryptCardBase, isMobile } = useContext(AppContext);
  const [modalCard, setModalCard] = useState(undefined);

  const handleAdd = (event) => {
    const newState = props.state;
    newState[event] = 1;
    props.setState((prevState) => ({
      ...prevState,
      crypt: newState,
    }));
  };

  const cryptCardsList = Object.keys(props.state)
    .filter((id) => props.state[id] >= 0)
    .map((id) => {
      return (
        <div key={id} className="d-flex align-items-center">
          <TwdSearchFormQuantityButtons
            state={props.state}
            setState={props.setState}
            id={id}
            q={props.state[id]}
            target="crypt"
          />
          {!isMobile ? (
            <OverlayTrigger
              placement="left"
              overlay={<CardPopover card={cryptCardBase[id]} />}
            >
              <div
                className="pt-1"
                onClick={() => setModalCard(cryptCardBase[id])}
              >
                <ResultCryptName card={cryptCardBase[id]} />
              </div>
            </OverlayTrigger>
          ) : (
            <div
              className="pt-1"
              onClick={() => setModalCard(cryptCardBase[id])}
            >
              <ResultCryptName card={cryptCardBase[id]} />
            </div>
          )}
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
        classNamePrefix="react-select"
        cacheOptions
        autoFocus={false}
        value={null}
        placeholder="Add Crypt Card"
        loadOptions={loadOptions}
        onChange={handleAdd}
        getOptionLabel={(card) => (
          <>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <ResultCryptCapacity value={cryptCardBase[card]['Capacity']} />
                <div className="px-2">
                  {cryptCardBase[card]['Banned'] ? (
                    <>
                      <strike>{cryptCardBase[card]['Name']}</strike>
                      {cryptCardBase[card]['Adv'][0] && (
                        <div className="d-inline ps-1">
                          <img
                            className="advanced-image-results"
                            src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                            title="Advanced"
                          />
                        </div>
                      )}
                      <div className="d-inline ps-1">
                        <Hammer />
                      </div>
                    </>
                  ) : (
                    <>
                      {cryptCardBase[card]['Name']}
                      {cryptCardBase[card]['Adv'][0] && (
                        <div className="d-inline ps-1">
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
                <div className="pe-3">
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
      {cryptCardsList}
      {modalCard && (
        <ResultCryptModal
          show={modalCard ? true : false}
          card={modalCard}
          handleClose={() => setModalCard(false)}
        />
      )}
    </>
  );
}

export default TwdSearchFormCrypt;
