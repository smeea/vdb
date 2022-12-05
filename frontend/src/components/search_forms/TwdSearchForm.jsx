import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import Spinner from 'assets/images/icons/three-dots.svg';
import Check2 from 'assets/images/icons/check2.svg';
import X from 'assets/images/icons/x.svg';
import { ErrorOverlay } from 'components';
import {
  TwdSearchFormButtons,
  TwdSearchFormPlayer,
  TwdSearchFormPlayers,
  TwdSearchFormLocation,
  TwdSearchFormEvent,
  TwdSearchFormDate,
  TwdSearchFormClan,
  TwdSearchFormSect,
  TwdSearchFormCardtypes,
  TwdSearchFormCapacity,
  TwdSearchFormDisciplines,
  TwdSearchFormCrypt,
  TwdSearchFormLibrary,
  TwdSearchFormLibraryTotal,
  TwdSearchFormMatchInventory,
  TwdSearchFormMatchInventoryScaling,
} from './twd_search_components';
import { sanitizeFormState } from 'utils';
import { useApp, setTwdResults, searchTwdForm, clearSearchForm } from 'context';

const TwdSearchForm = ({ error, setError }) => {
  const { cryptCardBase, libraryCardBase, inventoryMode, isMobile } = useApp();
  const twdFormState = useSnapshot(searchTwdForm);
  const [spinnerState, setSpinnerState] = useState(false);
  const navigate = useNavigate();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));
  const refError = useRef(null);

  useEffect(() => {
    if (query) {
      Object.keys(query).map((i) => {
        if (typeof query[i] === 'object') {
          Object.keys(query[i]).map((j) => {
            searchTwdForm[i][j] = query[i][j];
          });
        } else {
          searchTwdForm[i] = query[i];
        }
      });
    }
  }, []);

  useEffect(() => {
    if (isMobile && query && twdFormState && cryptCardBase && libraryCardBase) {
      processSearch();
    }
  }, [twdFormState, cryptCardBase, libraryCardBase]);

  const handleEventChange = (event) => {
    searchTwdForm.event = event.target.value;
  };

  const handleChange = (event) => {
    const { name, value } = event;
    searchTwdForm[name] = value;
  };

  const handleChangeWithOpt = (event, id) => {
    const i = id.name;
    const { name, value } = event;
    searchTwdForm[i][name] = value;
  };

  const handleMultiChange = (event) => {
    const { name, id, value } = event.target;
    const i = value ? value : id;

    searchTwdForm[name][i] = !twdFormState[name][i];
  };

  const handleMatchInventoryScalingChange = (e) => {
    if (e.target.checked) {
      searchTwdForm.matchInventory.scaling = e.target.name;
    } else {
      searchTwdForm.matchInventory.scaling = false;
    }
  };

  const handleClearButton = () => {
    clearSearchForm('twd');
    setTwdResults(undefined);
    setError(false);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    cryptCardBase && libraryCardBase && processSearch();
  };

  const handleError = (error) => {
    setTwdResults(null);

    if (error.message == 400) {
      setError('NO DECKS FOUND');
    } else {
      setError('CONNECTION PROBLEM');
    }

    if (isMobile) {
      setSpinnerState(false);
      navigate('/twd');
    }
  };

  const processSearch = () => {
    setError(false);
    const sanitizedForm = sanitizeFormState('twd', twdFormState);

    if (Object.entries(sanitizedForm).length === 0) {
      setError('EMPTY REQUEST');
      return;
    }

    navigate(`/twd?q=${encodeURIComponent(JSON.stringify(sanitizedForm))}`);

    const url = `${process.env.API_URL}search/twd`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedForm),
    };

    setSpinnerState(true);
    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then((data) => {
        setSpinnerState(false);
        setTwdResults(data);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const getNewTwd = (q) => {
    setSpinnerState(true);
    setError(false);
    clearSearchForm('twd');

    const url = `${process.env.API_URL}twd/new/${q}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then((data) => {
        setSpinnerState(false);
        setTwdResults(data);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const getRandomTwd = (q) => {
    setSpinnerState(true);
    setError(false);
    clearSearchForm('twd');

    const url = `${process.env.API_URL}twd/random/${q}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then((data) => {
        setSpinnerState(false);
        setTwdResults(data);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  useEffect(() => {
    if (!isMobile && cryptCardBase && libraryCardBase) {
      const sanitizedForm = sanitizeFormState('twd', twdFormState);
      if (Object.keys(sanitizedForm).length === 0) {
        if (query) {
          setTwdResults(undefined);
          navigate('/twd');
        }
      } else if (!twdFormState.event || twdFormState.event.length > 2) {
        processSearch();
      }
    }
  }, [twdFormState, cryptCardBase, libraryCardBase]);

  return (
    <form onSubmit={handleSubmitButton}>
      <div className="flex flex-row justify-between pb-2 mx-0">
        <TwdSearchFormButtons
          handleClearButton={handleClearButton}
          getNew={getNewTwd}
          getRandom={getRandomTwd}
        />
      </div>
      {inventoryMode && (
        <>
          <div className="flex flex-row py-1 ps-1 mx-0 items-center">
            <div className="basis-1/2 flex px-0">
              <label className="font-bold text-blue mb-0">
                In Inventory by Crypt:
              </label>
            </div>
            <div className="basis-1/2 inline px-0">
              <TwdSearchFormMatchInventory
                value={twdFormState.matchInventory.crypt}
                target={'crypt'}
                onChange={handleChangeWithOpt}
              />
            </div>
          </div>
          <div className="flex flex-row py-1 ps-1 mx-0 items-center">
            <div className="basis-1/2 flex px-0">
              <label className="font-bold text-blue mb-0">
                In Inventory by Library:
              </label>
            </div>
            <div className="basis-1/2 inline px-0">
              <TwdSearchFormMatchInventory
                value={twdFormState.matchInventory.library}
                target={'library'}
                onChange={handleChangeWithOpt}
              />
            </div>
          </div>
          <div className="flex flex-row py-1 ps-1 mx-0 items-center">
            <div className="xs={{ span: 6, offset: 6 }} inline px-0">
              <TwdSearchFormMatchInventoryScaling
                target="60"
                value={twdFormState.matchInventory.scaling}
                onChange={handleMatchInventoryScalingChange}
              />
              <TwdSearchFormMatchInventoryScaling
                target="75"
                value={twdFormState.matchInventory.scaling}
                onChange={handleMatchInventoryScalingChange}
              />
            </div>
          </div>
        </>
      )}
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-2/12 flex px-0">
          <div className="font-bold text-blue px-0">Year:</div>
        </div>
        <div className="basis-10/12 inline px-0">
          <TwdSearchFormDate
            value={twdFormState.date}
            onChange={handleChangeWithOpt}
          />
        </div>
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-2/12 flex px-0">
          <div className="font-bold text-blue px-0">Players:</div>
        </div>
        <div className="basis-10/12 inline px-0">
          <TwdSearchFormPlayers
            value={twdFormState.players}
            onChange={handleChangeWithOpt}
          />
        </div>
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="font-bold text-blue px-0">Crypt Cards:</div>
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-full inline px-0">
          {cryptCardBase && (
            <TwdSearchFormCrypt
              value={twdFormState.crypt}
              form={searchTwdForm.crypt}
            />
          )}
        </div>
      </div>
      <div className="flex flex-row justify-end pb-1 pe-1 mx-0">
        <input
          name="traits"
          value="star"
          type="checkbox"
          id="traits-star"
          label="With Star"
          checked={twdFormState.traits.star}
          onChange={handleMultiChange}
        />
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="font-bold text-blue px-0">Library Cards:</div>
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-full inline px-0">
          {libraryCardBase && (
            <TwdSearchFormLibrary
              value={twdFormState.library}
              form={searchTwdForm.library}
            />
          )}
        </div>
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-1/4 flex px-0">
          <div className="font-bold text-blue px-0">Library Size:</div>
        </div>
        <div className="basis-9/12 flex justify-end px-0">
          <TwdSearchFormLibraryTotal
            value={twdFormState.libraryTotal}
            onChange={handleMultiChange}
          />
        </div>
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-1/4 flex px-0">
          <div className="font-bold text-blue px-0">Clan:</div>
        </div>
        <div className="basis-9/12 inline px-0">
          <TwdSearchFormClan
            value={twdFormState.clan}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-row justify-end pb-1 pe-1 mx-0">
        <input
          name="traits"
          value="monoclan"
          type="checkbox"
          id="traits-monoclan"
          label="Mono Clan"
          checked={twdFormState.traits.monoclan}
          onChange={handleMultiChange}
        />
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-1/4 flex px-0">
          <div className="font-bold text-blue px-0">Sect:</div>
        </div>
        <div className="basis-9/12 inline px-0">
          <TwdSearchFormSect
            value={twdFormState.sect}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-5/12 flex px-0">
          <div className="font-bold text-blue px-0">Capacity Avg:</div>
        </div>
        <div className="basis-7/12 flex justify-end px-0">
          <TwdSearchFormCapacity
            value={twdFormState.capacity}
            onChange={handleMultiChange}
          />
        </div>
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="font-bold text-blue px-0">Library Disciplines:</div>
      </div>
      <TwdSearchFormDisciplines
        value={twdFormState.disciplines}
        onChange={handleMultiChange}
      />
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-full inline pe-0 ps-1">
          <TwdSearchFormCardtypes
            value={twdFormState.cardtypes}
            onChange={handleChangeWithOpt}
          />
        </div>
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-1/4 flex px-0">
          <div className="font-bold text-blue px-0">Event:</div>
        </div>
        <div className="basis-9/12 inline px-0">
          <TwdSearchFormEvent
            value={twdFormState.event}
            onChange={handleEventChange}
          />
        </div>
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-1/4 flex px-0">
          <div className="font-bold text-blue px-0">Location:</div>
        </div>
        <div className="basis-9/12 inline px-0">
          <TwdSearchFormLocation
            value={twdFormState.location}
            form={searchTwdForm}
          />
        </div>
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-1/4 flex px-0">
          <div className="font-bold text-blue px-0">Winner:</div>
        </div>
        <div className="basis-9/12 inline px-0">
          <TwdSearchFormPlayer
            value={twdFormState.author}
            form={searchTwdForm}
          />
        </div>
      </div>
      {isMobile && (
        <>
          <div
            onClick={handleClearButton}
            className="flex float-right-middle float-clear items-center justify-center"
          >
            <X viewBox="0 0 16 16" />
          </div>
          <div
            ref={refError}
            onClick={handleSubmitButton}
            className="flex float-right-bottom float-search items-center justify-center"
          >
            {!spinnerState ? (
              <Check2 viewBox="0 0 16 16" className="pt-1" />
            ) : (
              <Spinner animation="border" variant="light" />
            )}
            <ErrorOverlay
              show={error}
              target={refError.current}
              placement="left"
            >
              {error}
            </ErrorOverlay>
          </div>
        </>
      )}
    </form>
  );
};

export default TwdSearchForm;
