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
    const i = value ? value : id;
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
      <div className="flex flex-row justify-between pb-2 mx-0">
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
          <div className="flex flex-row py-1 ps-1 mx-0 items-center">
            <div className="basis-1/2 flex px-0">
              <label className="font-bold text-blue mb-0">
                In Inventory by Crypt:
              </label>
            </div>
            <div className="basis-1/2 inline px-0">
              <TwdSearchFormMatchInventory
                value={pdaFormState.matchInventory.crypt}
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
                value={pdaFormState.matchInventory.library}
                target={'library'}
                onChange={handleChangeWithOpt}
              />
            </div>
          </div>
          <div className="flex flex-row py-1 ps-1 mx-0 items-center">
            <div className="xs={{ span: 6, offset: 6 }} inline px-0">
              <TwdSearchFormMatchInventoryScaling
                target="60"
                value={pdaFormState.matchInventory.scaling}
                onChange={handleMatchInventoryScalingChange}
              />
              <TwdSearchFormMatchInventoryScaling
                target="75"
                value={pdaFormState.matchInventory.scaling}
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
            value={pdaFormState.date}
            onChange={handleChangeWithOpt}
            inPda
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
              value={pdaFormState.crypt}
              form={searchPdaForm.crypt}
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
          checked={pdaFormState.traits.star}
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
              value={pdaFormState.library}
              form={searchPdaForm.library}
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
            value={pdaFormState.libraryTotal}
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
            value={pdaFormState.clan}
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
          checked={pdaFormState.traits.monoclan}
          onChange={handleMultiChange}
        />
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-1/4 flex px-0">
          <div className="font-bold text-blue px-0">Sect:</div>
        </div>
        <div className="basis-9/12 inline px-0">
          <TwdSearchFormSect
            value={pdaFormState.sect}
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
            value={pdaFormState.capacity}
            onChange={handleMultiChange}
          />
        </div>
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="font-bold text-blue px-0">Library Disciplines:</div>
      </div>
      <TwdSearchFormDisciplines
        value={pdaFormState.disciplines}
        onChange={handleMultiChange}
      />
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-full inline pe-0 ps-1">
          <TwdSearchFormCardtypes
            value={pdaFormState.cardtypes}
            onChange={handleChangeWithOpt}
          />
        </div>
      </div>
      <div className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-1/4 flex px-0">
          <div className="font-bold text-blue px-0">Author:</div>
        </div>
        <div className="basis-9/12 inline px-0">
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

export default PdaSearchForm;
