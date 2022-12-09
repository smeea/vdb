import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import Spinner from 'assets/images/icons/three-dots.svg';
import Check2 from 'assets/images/icons/check2.svg';
import X from 'assets/images/icons/x.svg';
import {
  ErrorOverlay,
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
  TwdSearchFormMatchInventoryScaling,
  TwdSearchFormPlayer,
  Checkbox,
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
  const refError = useRef(null);

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
    const { name, value } = event.target ?? event;
    searchPdaForm[name] = value;
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

  const handleClearButton = () => {
    clearSearchForm('pda');
    setPdaResults(undefined);
    setError(false);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    cryptCardBase && libraryCardBase && processSearch();
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
    <form onSubmit={handleSubmitButton}>
      <div className="mx-0 flex flex-row justify-between pb-2">
        <TwdSearchFormButtons
          handleClearButton={handleClearButton}
          getNew={getNewPda}
          getRandom={getRandomPda}
          inPda
        />
      </div>
      {username && (
        <div className="px-1 py-2">
          <PdaSearchFormSrcSelector
            value={pdaFormState.src}
            onChange={handleChange}
          />
        </div>
      )}
      {inventoryMode && (
        <>
          <div className="ps-1 mx-0 flex flex-row items-center py-1">
            <div className="flex basis-1/2 text-blue mb-0 font-bold px-0">
              In Inventory by Crypt:
            </div>
            <div className="inline basis-1/2 px-0">
              <TwdSearchFormMatchInventory
                value={pdaFormState.matchInventory.crypt}
                target={'crypt'}
                onChange={handleChangeWithOpt}
              />
            </div>
          </div>
          <div className="ps-1 mx-0 flex flex-row items-center py-1">
            <div className="flex basis-1/2 text-blue mb-0 font-bold px-0">
              In Inventory by Library:
            </div>
            <div className="inline basis-1/2 px-0">
              <TwdSearchFormMatchInventory
                value={pdaFormState.matchInventory.library}
                target={'library'}
                onChange={handleChangeWithOpt}
              />
            </div>
          </div>
          <div className="ps-1 mx-0 flex flex-row items-center py-1">
            <div className="xs={{ span: 6, offset: 6 }} inline px-0">
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
          </div>
        </>
      )}
      <div className="ps-1 mx-0 flex flex-row items-center py-1">
        <div className="flex basis-2/12 px-0">
          <div className="text-blue px-0 font-bold">Year:</div>
        </div>
        <div className="inline basis-10/12 px-0">
          <TwdSearchFormDate
            value={pdaFormState.date}
            onChange={handleChangeWithOpt}
            inPda
          />
        </div>
      </div>
      <div className="ps-1 mx-0 flex flex-row items-center py-1">
        <div className="text-blue px-0 font-bold">Crypt Cards:</div>
      </div>
      <div className="ps-1 mx-0 flex flex-row items-center py-1">
        <div className="inline basis-full px-0">
          {cryptCardBase && (
            <TwdSearchFormCrypt
              value={pdaFormState.crypt}
              form={searchPdaForm.crypt}
            />
          )}
        </div>
      </div>
      <div className="pe-1 mx-0 flex flex-row justify-end pb-1">
        <Checkbox
          name="traits"
          value="star"
          label="With Star"
          checked={pdaFormState.traits.star}
          onChange={handleMultiChange}
        />
      </div>
      <div className="ps-1 mx-0 flex flex-row items-center py-1">
        <div className="text-blue px-0 font-bold">Library Cards:</div>
      </div>
      <div className="ps-1 mx-0 flex flex-row items-center py-1">
        <div className="inline basis-full px-0">
          {libraryCardBase && (
            <TwdSearchFormLibrary
              value={pdaFormState.library}
              form={searchPdaForm.library}
            />
          )}
        </div>
      </div>
      <div className="ps-1 mx-0 flex flex-row items-center py-1">
        <div className="flex basis-1/4 px-0">
          <div className="text-blue px-0 font-bold">Library Size:</div>
        </div>
        <div className="flex basis-9/12 justify-end px-0">
          <TwdSearchFormLibraryTotal
            value={pdaFormState.libraryTotal}
            onChange={handleMultiChange}
          />
        </div>
      </div>
      <div className="ps-1 mx-0 flex flex-row items-center py-1">
        <div className="flex basis-1/4 px-0">
          <div className="text-blue px-0 font-bold">Clan:</div>
        </div>
        <div className="inline basis-9/12 px-0">
          <TwdSearchFormClan
            value={pdaFormState.clan}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="pe-1 mx-0 flex flex-row justify-end pb-1">
        <Checkbox
          name="traits"
          value="monoclan"
          label="Mono Clan"
          checked={pdaFormState.traits.monoclan}
          onChange={handleMultiChange}
        />
      </div>
      <div className="ps-1 mx-0 flex flex-row items-center py-1">
        <div className="flex basis-1/4 px-0">
          <div className="text-blue px-0 font-bold">Sect:</div>
        </div>
        <div className="inline basis-9/12 px-0">
          <TwdSearchFormSect
            value={pdaFormState.sect}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="ps-1 mx-0 flex flex-row items-center py-1">
        <div className="flex basis-5/12 px-0">
          <div className="text-blue px-0 font-bold">Capacity Avg:</div>
        </div>
        <div className="flex basis-7/12 justify-end px-0">
          <TwdSearchFormCapacity
            value={pdaFormState.capacity}
            onChange={handleMultiChange}
          />
        </div>
      </div>
      <div className="ps-1 mx-0 flex flex-row items-center py-1">
        <div className="text-blue px-0 font-bold">Library Disciplines:</div>
      </div>
      <TwdSearchFormDisciplines
        value={pdaFormState.disciplines}
        onChange={handleMultiChange}
      />
      <div className="ps-1 mx-0 flex flex-row items-center py-1">
        <div className="pe-0 ps-1 inline basis-full">
          <TwdSearchFormCardtypes
            value={pdaFormState.cardtypes}
            onChange={handleChangeWithOpt}
          />
        </div>
      </div>
      <div className="ps-1 mx-0 flex flex-row items-center py-1">
        <div className="flex basis-1/4 px-0">
          <div className="text-blue px-0 font-bold">Author:</div>
        </div>
        <div className="inline basis-9/12 px-0">
          <TwdSearchFormPlayer
            state={pdaFormState.author}
            form={searchPdaForm}
            inPda
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
            onClick={handleSubmitButton}
            className="float-right-bottom float-search flex items-center justify-center"
          >
            {!spinnerState ? (
              <Check2 viewBox="0 0 16 16" className="pt-1" />
            ) : (
              <Spinner animation="border" variant="light" />
            )}
            {error && <ErrorOverlay placement="left">{error}</ErrorOverlay>}
          </div>
        </>
      )}
    </form>
  );
};

export default PdaSearchForm;
