import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import Spinner from 'assets/images/icons/three-dots.svg';
import Check2 from 'assets/images/icons/check2.svg';
import X from 'assets/images/icons/x.svg';
import {
  PdaSearchFormSrcSelector,
  TwdSearchFormButtons,
  TwdSearchFormCapacity,
  TwdSearchFormCardtypes,
  TwdSearchFormClan,
  TwdSearchFormSect,
  TwdSearchFormCrypt,
  TwdSearchFormDate,
  TwdSearchFormDisciplines,
  TwdSearchFormLibrary,
  TwdSearchFormLibraryTotal,
  TwdSearchFormMatchInventory,
  TwdSearchFormPlayer,
  Checkbox,
  ButtonFloat,
  ErrorOverlay,
} from 'components';
import { sanitizeFormState } from 'utils';
import { useApp, setPdaResults, searchPdaForm, clearSearchForm } from 'context';

const PdaSearchForm = ({ error, setError }) => {
  const { username, cryptCardBase, libraryCardBase, inventoryMode, isMobile } =
    useApp();
  const pdaFormState = useSnapshot(searchPdaForm);
  const [spinnerState, setSpinnerState] = useState(false);
  const navigate = useNavigate();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));

  useEffect(() => {
    if (query) {
      Object.keys(query).map((i) => {
        if (typeof query[i] === 'object') {
          Object.keys(query[i]).map((j) => {
            searchPdaForm[i][j] = query[i][j];
          });
        } else {
          searchPdaForm[i] = query[i];
        }
      });
    }
  }, []);

  useEffect(() => {
    if (isMobile && query && pdaFormState && cryptCardBase && libraryCardBase) {
      processSearch();
    }
  }, [pdaFormState, cryptCardBase, libraryCardBase]);

  const handleChange = (event) => {
    const { name, value, id } = event.target ?? event;
    const i = id ?? value;

    searchPdaForm[name] = i;
  };

  const handleChangeWithOpt = (event, id) => {
    const i = id.name;
    const { name, value } = event;
    searchPdaForm[i][name] = value;
  };

  const handleMultiChange = (event) => {
    const { name, id, value } = event.target;
    const i = value ?? id;
    searchPdaForm[name][i] = !pdaFormState[name][i];
  };

  const handleMatchInventoryScalingChange = (e) => {
    if (e.target.checked) {
      searchPdaForm.matchInventory.scaling = e.target.name;
    } else {
      searchPdaForm.matchInventory.scaling = false;
    }
  };

  const handleClear = () => {
    clearSearchForm('pda');
    setPdaResults(undefined);
    setError(false);
  };

  const handleError = (error) => {
    setPdaResults(null);

    if (error.message == 400) {
      setError('NO DECKS FOUND');
    } else {
      setError('CONNECTION PROBLEM');
    }

    if (isMobile) {
      setSpinnerState(false);
      navigate('/pda');
    }
  };

  const processSearch = () => {
    setError(false);
    const sanitizedForm = sanitizeFormState('pda', pdaFormState);

    if (Object.entries(sanitizedForm).length === 0) {
      setError('EMPTY REQUEST');
      return;
    }

    navigate(`/pda?q=${encodeURIComponent(JSON.stringify(sanitizedForm))}`);

    const url = `${process.env.API_URL}search/pda`;
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
        setPdaResults(data);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const getNewPda = (q) => {
    setSpinnerState(true);
    setError(false);
    clearSearchForm('pda');

    const url = `${process.env.API_URL}pda/new/${q}`;
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
        setPdaResults(data);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const getRandomPda = (q) => {
    setSpinnerState(true);
    setError(false);
    clearSearchForm('pda');

    const url = `${process.env.API_URL}pda/random/${q}`;
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
        setPdaResults(data);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  useEffect(() => {
    if (!isMobile && cryptCardBase && libraryCardBase) {
      const sanitizedForm = sanitizeFormState('pda', pdaFormState);
      if (Object.keys(sanitizedForm).length === 0) {
        if (query) {
          setPdaResults(undefined);
          navigate('/pda');
        }
      } else processSearch();
    }
  }, [pdaFormState, cryptCardBase, libraryCardBase]);

  return (
    <div className="space-y-2">
      <TwdSearchFormButtons
        handleClear={handleClear}
        getNew={getNewPda}
        getRandom={getRandomPda}
        inPda
      />
      {username && (
        <PdaSearchFormSrcSelector
          value={pdaFormState.src}
          onChange={handleChange}
        />
      )}
      {inventoryMode && (
        <>
          <TwdSearchFormMatchInventory
            value={pdaFormState.matchInventory.crypt}
            target={'crypt'}
            onChange={handleChangeWithOpt}
          />
          <TwdSearchFormMatchInventory
            value={pdaFormState.matchInventory.library}
            target={'library'}
            onChange={handleChangeWithOpt}
          />
          <div className="flex">
            <Checkbox
              name="60"
              label="Scale to 60 cards"
              value={pdaFormState.matchInventory.scaling}
              onChange={handleMatchInventoryScalingChange}
            />
            <Checkbox
              name="75"
              label="Scale to 75 cards"
              value={pdaFormState.matchInventory.scaling}
              onChange={handleMatchInventoryScalingChange}
            />
          </div>
        </>
      )}
      <TwdSearchFormDate
        value={pdaFormState.date}
        onChange={handleChangeWithOpt}
        inPda
      />
      {cryptCardBase && (
        <TwdSearchFormCrypt
          value={pdaFormState.crypt}
          form={searchPdaForm.crypt}
        />
      )}
      <div className="flex justify-end">
        <Checkbox
          name="traits"
          value="star"
          label="With Star"
          checked={pdaFormState.traits.star}
          onChange={handleMultiChange}
        />
      </div>
      {libraryCardBase && (
        <TwdSearchFormLibrary
          value={pdaFormState.library}
          form={searchPdaForm.library}
        />
      )}
      <TwdSearchFormLibraryTotal
        value={pdaFormState.libraryTotal}
        onChange={handleMultiChange}
      />
      <TwdSearchFormClan value={pdaFormState.clan} onChange={handleChange} />
      <div className="flex justify-end">
        <Checkbox
          name="traits"
          value="monoclan"
          label="Mono Clan"
          checked={pdaFormState.traits.monoclan}
          onChange={handleMultiChange}
        />
      </div>
      <TwdSearchFormSect value={pdaFormState.sect} onChange={handleChange} />
      <TwdSearchFormCapacity
        value={pdaFormState.capacity}
        onChange={handleMultiChange}
      />
      <TwdSearchFormDisciplines
        value={pdaFormState.disciplines}
        onChange={handleMultiChange}
      />
      <TwdSearchFormCardtypes
        value={pdaFormState.cardtypes}
        onChange={handleChangeWithOpt}
      />
      <TwdSearchFormPlayer
        state={pdaFormState.author}
        form={searchPdaForm}
        inPda
      />
      {isMobile && (
        <>
          <ButtonFloat
            onClick={handleClear}
            variant="danger"
            position="middle"
          >
            <X width="40" height="40" viewBox="0 0 16 16" />
          </ButtonFloat>
          <ButtonFloat
            onClick={processSearch}
            variant="success"
          >
            {!spinnerState ? (
              <Check2 viewBox="0 0 16 16" />
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

export default PdaSearchForm;
