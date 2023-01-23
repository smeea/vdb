import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import Spinner from 'assets/images/icons/three-dots.svg';
import Check2 from 'assets/images/icons/check2.svg';
import X from 'assets/images/icons/x.svg';
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
  ButtonFloat,
  Checkbox,
  ErrorOverlay,
} from 'components';
import { sanitizeFormState } from 'utils';
import { useApp, setTwdResults, searchTwdForm, clearSearchForm } from 'context';

const TwdSearchForm = ({ error, setError }) => {
  const { cryptCardBase, libraryCardBase, inventoryMode, isMobile } = useApp();
  const twdFormState = useSnapshot(searchTwdForm);
  const [spinnerState, setSpinnerState] = useState(false);
  const navigate = useNavigate();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));

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

  const handleClear = () => {
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
    <div className="space-y-2">
      <TwdSearchFormButtons
        handleClear={handleClear}
        getNew={getNewTwd}
        getRandom={getRandomTwd}
      />
      {inventoryMode && (
        <>
          <TwdSearchFormMatchInventory
            value={twdFormState.matchInventory.crypt}
            target={'crypt'}
            onChange={handleChangeWithOpt}
          />
          <TwdSearchFormMatchInventory
            value={twdFormState.matchInventory.library}
            target={'library'}
            onChange={handleChangeWithOpt}
          />
          <div className="flex justify-end">
            <div>
              <Checkbox
                name="60"
                label="Scale to 60 cards"
                checked={twdFormState.matchInventory.scaling == 60}
                value={twdFormState.matchInventory.scaling}
                onChange={handleMatchInventoryScalingChange}
              />
              <Checkbox
                name="75"
                label="Scale to 75 cards"
                checked={twdFormState.matchInventory.scaling == 75}
                value={twdFormState.matchInventory.scaling}
                onChange={handleMatchInventoryScalingChange}
              />
            </div>
          </div>
        </>
      )}
      <TwdSearchFormDate
        value={twdFormState.date}
        onChange={handleChangeWithOpt}
      />
      <TwdSearchFormPlayers
        value={twdFormState.players}
        onChange={handleChangeWithOpt}
      />
      {cryptCardBase && (
        <TwdSearchFormCrypt
          value={twdFormState.crypt}
          form={searchTwdForm.crypt}
        />
      )}
      <div className="flex justify-end">
        <Checkbox
          name="traits"
          value="star"
          label="With Star"
          checked={twdFormState.traits.star}
          onChange={handleMultiChange}
        />
      </div>
      {libraryCardBase && (
        <TwdSearchFormLibrary
          value={twdFormState.library}
          form={searchTwdForm.library}
        />
      )}
      <TwdSearchFormLibraryTotal
        value={twdFormState.libraryTotal}
        onChange={handleMultiChange}
      />
      <TwdSearchFormClan value={twdFormState.clan} onChange={handleChange} />
      <div className="flex justify-end">
        <Checkbox
          name="traits"
          value="monoclan"
          label="Mono Clan"
          checked={twdFormState.traits.monoclan}
          onChange={handleMultiChange}
        />
      </div>
      <TwdSearchFormSect value={twdFormState.sect} onChange={handleChange} />
      <TwdSearchFormCapacity
        value={twdFormState.capacity}
        onChange={handleMultiChange}
      />
      <TwdSearchFormDisciplines
        value={twdFormState.disciplines}
        onChange={handleMultiChange}
      />
      <TwdSearchFormCardtypes
        value={twdFormState.cardtypes}
        onChange={handleChangeWithOpt}
      />
      <TwdSearchFormEvent
        value={twdFormState.event}
        onChange={handleEventChange}
      />
      <TwdSearchFormLocation
        value={twdFormState.location}
        form={searchTwdForm}
      />
      <TwdSearchFormPlayer value={twdFormState.author} form={searchTwdForm} />
      {isMobile && (
        <>
          <ButtonFloat onClick={handleClear} variant="danger" position="middle">
            <X width="40" height="40" viewBox="0 0 16 16" />
          </ButtonFloat>
          <ButtonFloat onClick={processSearch} variant="success">
            {!spinnerState ? (
              <Check2 width="35" height="35" viewBox="0 0 16 16" />
            ) : (
              <Spinner width="35" height="35" viewBox="0 0 16 16" />
            )}
            {error && <ErrorOverlay placement="left">{error}</ErrorOverlay>}
          </ButtonFloat>
        </>
      )}
    </div>
  );
};

export default TwdSearchForm;
