import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import {
  ButtonFloatSearch,
  ButtonFloatClose,
  Checkbox,
  PdaSearchFormSrcSelector,
  TwdSearchFormButtons,
  TwdSearchFormCapacity,
  TwdSearchFormCardtypes,
  CryptSearchFormClan,
  CryptSearchFormSect,
  TwdSearchFormCrypt,
  TwdSearchFormDate,
  TwdSearchFormDisciplines,
  TwdSearchFormLibrary,
  TwdSearchFormLibraryTotal,
  TwdSearchFormMatchInventory,
  TwdSearchFormPlayer,
} from '@/components';
import { sanitizeFormState } from '@/utils';
import { useApp, setPdaResults, searchPdaForm, clearSearchForm } from '@/context';
import { archiveServices } from '@/services';
import { PDA, CRYPT, LIBRARY } from '@/constants';

const PdaSearchForm = ({ error, setError }) => {
  const { username, cryptCardBase, libraryCardBase, showFloatingButtons, inventoryMode, isMobile } =
    useApp();
  const pdaFormState = useSnapshot(searchPdaForm);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));

  useEffect(() => {
    if (query) {
      Object.keys(query).forEach((i) => {
        if (typeof query[i] === 'object') {
          Object.keys(query[i]).forEach((j) => {
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

  const handleMultiSelectChange = (event, id) => {
    const i = id[NAME];
    const { name, value } = event;
    searchPdaForm[name].value[i] = value;
  };

  const handleChange = (event) => {
    const { name, value, id } = event.target ?? event;
    const i = id ?? value;
    searchPdaForm[name] = i;
  };

  const handleChangeWithOpt = (event, id) => {
    const i = id[NAME];
    const { name, value } = event;
    searchPdaForm[i][name] = value;
  };

  const handleDisciplinesChange = (name) => {
    searchPdaForm[DISCIPLINES][name] = !pdaFormState[DISCIPLINES][name];
  };

  const handleMultiChange = (event) => {
    const { name, value } = event.target;
    searchPdaForm[name][value] = !pdaFormState[name][value];
  };

  const handleMatchInventoryScalingChange = (e) => {
    if (e.target.checked) {
      searchPdaForm[MATCH_INVENTORY][SCALING] = e.target[NAME];
    } else {
      searchPdaForm[MATCH_INVENTORY][SCALING] = false;
    }
  };

  const handleClear = () => {
    clearSearchForm(PDA);
    setPdaResults(undefined);
    setError(false);
  };

  const handleError = (e) => {
    switch (e.response.status) {
      case 400:
        setError('NO DECKS FOUND');
        break;
      default:
        setError('CONNECTION PROBLEM');
    }

    setPdaResults(null);
    if (isMobile) {
      setIsLoading(false);
      navigate('/pda');
    }
  };

  const processSearch = () => {
    setError(false);
    const sanitizedForm = sanitizeFormState(PDA, pdaFormState);
    if (Object.entries(sanitizedForm).length === 0) {
      setError('EMPTY REQUEST');
      return;
    }
    navigate(`/pda?q=${encodeURIComponent(JSON.stringify(sanitizedForm))}`);

    setIsLoading(true);
    archiveServices
      .search(sanitizedForm, true)
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));
  };

  const getNewPda = (q) => {
    setError(false);
    clearSearchForm(PDA);

    setIsLoading(true);
    archiveServices
      .getNewDecks(q, true)
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));
  };

  const getRandomPda = (q) => {
    setError(false);
    clearSearchForm(PDA);

    setIsLoading(true);
    archiveServices
      .getRandomDecks(q, true)
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!isMobile && cryptCardBase && libraryCardBase) {
      const sanitizedForm = sanitizeFormState(PDA, pdaFormState);
      if (Object.keys(sanitizedForm).length === 0) {
        if (query) {
          setPdaResults(undefined);
          navigate('/pda');
        }
      } else processSearch();
    }
  }, [pdaFormState, cryptCardBase, libraryCardBase]);

  return (
    <div className="flex flex-col gap-2">
      <TwdSearchFormButtons
        handleClear={handleClear}
        getNew={getNewPda}
        getRandom={getRandomPda}
        inPda
      />
      {username && <PdaSearchFormSrcSelector value={pdaFormState[SRC]} onChange={handleChange} />}
      {inventoryMode && (
        <>
          <TwdSearchFormMatchInventory
            value={pdaFormState[MATCH_INVENTORY][CRYPT]}
            target={CRYPT}
            onChange={handleChangeWithOpt}
          />
          <TwdSearchFormMatchInventory
            value={pdaFormState[MATCH_INVENTORY][LIBRARY]}
            target={LIBRARY}
            onChange={handleChangeWithOpt}
          />
          <div className="flex justify-end gap-6">
            <Checkbox
              name="60"
              label="Scale to 60 cards"
              checked={pdaFormState[MATCH_INVENTORY][SCALING] == 60}
              value={pdaFormState[MATCH_INVENTORY][SCALING]}
              onChange={handleMatchInventoryScalingChange}
            />
            <Checkbox
              name="75"
              label="Scale to 75 cards"
              checked={pdaFormState[MATCH_INVENTORY][SCALING] == 75}
              value={pdaFormState[MATCH_INVENTORY][SCALING]}
              onChange={handleMatchInventoryScalingChange}
            />
          </div>
        </>
      )}
      <TwdSearchFormDate value={pdaFormState[DATE]} onChange={handleChangeWithOpt} inPda />
      {cryptCardBase && (
        <TwdSearchFormCrypt value={pdaFormState[CRYPT]} form={searchPdaForm[CRYPT]} />
      )}
      <div className="flex justify-end">
        <Checkbox
          name={TRAITS}
          value={STAR}
          label="With Star"
          checked={pdaFormState[TRAITS][STAR]}
          onChange={handleMultiChange}
        />
      </div>
      {libraryCardBase && (
        <TwdSearchFormLibrary value={pdaFormState[LIBRARY]} form={searchPdaForm[LIBRARY]} />
      )}
      <TwdSearchFormLibraryTotal value={pdaFormState[LIBRARY_TOTAL]} onChange={handleMultiChange} />
      <CryptSearchFormClan
        value={pdaFormState[CLAN]}
        onChange={handleMultiSelectChange}
        searchForm={searchPdaForm}
      />
      <div className="flex justify-end">
        <Checkbox
          name={TRAITS}
          value={MONOCLAN}
          label="Mono Clan"
          checked={pdaFormState[TRAITS][MONOCLAN]}
          onChange={handleMultiChange}
        />
      </div>
      <CryptSearchFormSect
        value={pdaFormState[SECT]}
        onChange={handleMultiSelectChange}
        searchForm={searchPdaForm}
      />
      <TwdSearchFormCapacity value={pdaFormState[CAPACITY]} onChange={handleMultiChange} />
      <TwdSearchFormDisciplines
        value={pdaFormState[DISCIPLINES]}
        onChange={handleDisciplinesChange}
      />
      <TwdSearchFormCardtypes value={pdaFormState[CARDTYPES]} onChange={handleChangeWithOpt} />
      <TwdSearchFormPlayer value={pdaFormState[AUTHOR]} form={searchPdaForm} inPda />
      {isMobile && showFloatingButtons && (
        <>
          <ButtonFloatClose handleClose={handleClear} position="middle" />
          <ButtonFloatSearch handleSearch={processSearch} error={error} isLoading={isLoading} />
        </>
      )}
    </div>
  );
};

export default PdaSearchForm;
