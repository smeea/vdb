import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import Spinner from 'assets/images/icons/three-dots.svg';
import Check2 from 'assets/images/icons/check2.svg';
import X from 'assets/images/icons/x.svg';
import { Input, Checkbox, ErrorOverlay } from 'components';
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
    const i = value ?? id;
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
    <>
      <div className="flex flex-row justify-between ">
        <TwdSearchFormButtons
          handleClearButton={handleClearButton}
          getNew={getNewTwd}
          getRandom={getRandomTwd}
        />
      </div>
      {inventoryMode && (
        <>
          <div className="flex flex-row items-center">
            <div className="text-blue flex basis-1/2  font-bold">
              In Inventory by Crypt:
            </div>
            <div className="inline basis-1/2">
              <TwdSearchFormMatchInventory
                value={twdFormState.matchInventory.crypt}
                target={'crypt'}
                onChange={handleChangeWithOpt}
              />
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div className="text-blue flex basis-1/2  font-bold">
              In Inventory by Library:
            </div>
            <div className="inline basis-1/2">
              <TwdSearchFormMatchInventory
                value={twdFormState.matchInventory.library}
                target={'library'}
                onChange={handleChangeWithOpt}
              />
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div className="xs={{ span: 6, offset: 6 }} inline">
              <Checkbox
                name="60"
                label="Scale to 60 cards"
                value={twdFormState.matchInventory.scaling}
                onChange={handleMatchInventoryScalingChange}
              />
              <Checkbox
                name="75"
                label="Scale to 75 cards"
                value={twdFormState.matchInventory.scaling}
                onChange={handleMatchInventoryScalingChange}
              />
            </div>
          </div>
        </>
      )}
      <div className="flex flex-row items-center">
        <div className="flex basis-2/12">
          <div className="text-blue font-bold">Year:</div>
        </div>
        <div className="inline basis-10/12">
          <TwdSearchFormDate
            value={twdFormState.date}
            onChange={handleChangeWithOpt}
          />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex basis-2/12">
          <div className="text-blue font-bold">Players:</div>
        </div>
        <div className="inline basis-10/12">
          <TwdSearchFormPlayers
            value={twdFormState.players}
            onChange={handleChangeWithOpt}
          />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="text-blue font-bold">Crypt Cards:</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="inline basis-full">
          {cryptCardBase && (
            <TwdSearchFormCrypt
              value={twdFormState.crypt}
              form={searchTwdForm.crypt}
            />
          )}
        </div>
      </div>
      <div className="flex flex-row justify-end ">
        <Checkbox
          name="traits"
          value="star"
          label="With Star"
          checked={twdFormState.traits.star}
          onChange={handleMultiChange}
        />
      </div>
      <div className="flex flex-row items-center">
        <div className="text-blue font-bold">Library Cards:</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="inline basis-full">
          {libraryCardBase && (
            <TwdSearchFormLibrary
              value={twdFormState.library}
              form={searchTwdForm.library}
            />
          )}
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex basis-1/4">
          <div className="text-blue font-bold">Library Size:</div>
        </div>
        <div className="flex basis-9/12 justify-end">
          <TwdSearchFormLibraryTotal
            value={twdFormState.libraryTotal}
            onChange={handleMultiChange}
          />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex basis-1/4">
          <div className="text-blue font-bold">Clan:</div>
        </div>
        <div className="inline basis-9/12">
          <TwdSearchFormClan
            value={twdFormState.clan}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-row justify-end ">
        <Checkbox
          name="traits"
          value="monoclan"
          label="Mono Clan"
          checked={twdFormState.traits.monoclan}
          onChange={handleMultiChange}
        />
      </div>
      <div className="flex flex-row items-center">
        <div className="flex basis-1/4">
          <div className="text-blue font-bold">Sect:</div>
        </div>
        <div className="inline basis-9/12">
          <TwdSearchFormSect
            value={twdFormState.sect}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex basis-5/12">
          <div className="text-blue font-bold">Capacity Avg:</div>
        </div>
        <div className="flex basis-7/12 justify-end">
          <TwdSearchFormCapacity
            value={twdFormState.capacity}
            onChange={handleMultiChange}
          />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="text-blue font-bold">Library Disciplines:</div>
      </div>
      <TwdSearchFormDisciplines
        value={twdFormState.disciplines}
        onChange={handleMultiChange}
      />
      <div className="flex flex-row items-center">
        <div className="inline basis-full">
          <TwdSearchFormCardtypes
            value={twdFormState.cardtypes}
            onChange={handleChangeWithOpt}
          />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex basis-1/4">
          <div className="text-blue font-bold">Event:</div>
        </div>
        <div className="inline basis-9/12">
          <Input
            placeholder="Event Name"
            value={twdFormState.event}
            onChange={handleEventChange}
          />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex basis-1/4">
          <div className="text-blue font-bold">Location:</div>
        </div>
        <div className="inline basis-9/12">
          <TwdSearchFormLocation
            value={twdFormState.location}
            form={searchTwdForm}
          />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex basis-1/4">
          <div className="text-blue font-bold">Winner:</div>
        </div>
        <div className="inline basis-9/12">
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
            className="float-right-middle float-clear flex items-center justify-center"
          >
            <X viewBox="0 0 16 16" />
          </div>
          <div
            ref={refError}
            onClick={processSearch}
            className="float-right-bottom float-search flex items-center justify-center"
          >
            {!spinnerState ? (
              <Check2 viewBox="0 0 16 16" />
            ) : (
              <Spinner animation="border" variant="light" />
            )}
            {error && <ErrorOverlay placement="left">{error}</ErrorOverlay>}
          </div>
        </>
      )}
    </>
  );
};

export default TwdSearchForm;
