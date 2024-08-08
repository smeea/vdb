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
import { PDA, CRYPT, LIBRARY } from '@/utils/constants';

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
    const i = id.name;
    const { name, value } = event;
    searchPdaForm[name].value[i] = value;
  };

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

  const handleDisciplinesChange = (name) => {
    searchPdaForm.disciplines[name] = !pdaFormState.disciplines[name];
  };

  const handleMultiChange = (event) => {
    const { name, value } = event.target;
    searchPdaForm[name][value] = !pdaFormState[name][value];
  };

  const handleMatchInventoryScalingChange = (e) => {
    if (e.target.checked) {
      searchPdaForm.matchInventory.scaling = e.target.name;
    } else {
      searchPdaForm.matchInventory.scaling = false;
    }
  };

  const handleClear = () => {
    clearSearchForm(PDA);
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
    <div className="space-y-2">
      <TwdSearchFormButtons
        handleClear={handleClear}
        getNew={getNewPda}
        getRandom={getRandomPda}
        inPda
      />
      {username && <PdaSearchFormSrcSelector value={pdaFormState.src} onChange={handleChange} />}
      {inventoryMode && (
        <>
          <TwdSearchFormMatchInventory
            value={pdaFormState.matchInventory.crypt}
            target={CRYPT}
            onChange={handleChangeWithOpt}
          />
          <TwdSearchFormMatchInventory
            value={pdaFormState.matchInventory.library}
            target={LIBRARY}
            onChange={handleChangeWithOpt}
          />
          <div className="flex justify-end space-x-6">
            <Checkbox
              name="60"
              label="Scale to 60 cards"
              checked={pdaFormState.matchInventory.scaling == 60}
              value={pdaFormState.matchInventory.scaling}
              onChange={handleMatchInventoryScalingChange}
            />
            <Checkbox
              name="75"
              label="Scale to 75 cards"
              checked={pdaFormState.matchInventory.scaling == 75}
              value={pdaFormState.matchInventory.scaling}
              onChange={handleMatchInventoryScalingChange}
            />
          </div>
        </>
      )}
      <TwdSearchFormDate value={pdaFormState.date} onChange={handleChangeWithOpt} inPda />
      {cryptCardBase && (
        <TwdSearchFormCrypt value={pdaFormState.crypt} form={searchPdaForm.crypt} />
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
        <TwdSearchFormLibrary value={pdaFormState.library} form={searchPdaForm.library} />
      )}
      <TwdSearchFormLibraryTotal value={pdaFormState.libraryTotal} onChange={handleMultiChange} />
      <CryptSearchFormClan
        value={pdaFormState.clan}
        onChange={handleMultiSelectChange}
        searchForm={searchPdaForm}
      />
      <div className="flex justify-end">
        <Checkbox
          name="traits"
          value="monoclan"
          label="Mono Clan"
          checked={pdaFormState.traits.monoclan}
          onChange={handleMultiChange}
        />
      </div>
      <CryptSearchFormSect
        value={pdaFormState.sect}
        onChange={handleMultiSelectChange}
        searchForm={searchPdaForm}
      />
      <TwdSearchFormCapacity value={pdaFormState.capacity} onChange={handleMultiChange} />
      <TwdSearchFormDisciplines
        value={pdaFormState.disciplines}
        onChange={handleDisciplinesChange}
      />
      <TwdSearchFormCardtypes value={pdaFormState.cardtypes} onChange={handleChangeWithOpt} />
      <TwdSearchFormPlayer value={pdaFormState.author} form={searchPdaForm} inPda />
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
