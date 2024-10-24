import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import {
  ButtonClose,
  ButtonFloatSearch,
  ButtonFloatClose,
  Checkbox,
  TwdSearchFormCapacity,
  TwdSearchFormCardtypes,
  CryptSearchFormClan,
  CryptSearchFormSect,
  TwdSearchFormCrypt,
  TwdSearchFormDisciplines,
  TwdSearchFormLibrary,
  TwdSearchFormLibraryTotal,
  AnalyzeSearchFormRank,
} from '@/components';
import { useFiltersDecks } from '@/hooks';
import { sanitizeFormState } from '@/utils';
import {
  useApp,
  setAnalyzeResults,
  searchAnalyzeForm,
  clearAnalyzeForm,
  analyzeStore,
} from '@/context';
import { DECKS, ANALYZE } from '@/utils/constants';

const AnalyzeSearchForm = () => {
  const { cryptCardBase, libraryCardBase, isMobile } = useApp();
  const analyzeFormState = useSnapshot(searchAnalyzeForm);
  const decks = useSnapshot(analyzeStore)[DECKS];
  const { filterDecks } = useFiltersDecks(decks);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));

  useEffect(() => {
    if (query) {
      Object.keys(query).forEach((i) => {
        if (typeof query[i] === 'object') {
          Object.keys(query[i]).forEach((j) => {
            searchAnalyzeForm[i][j] = query[i][j];
          });
        } else {
          searchAnalyzeForm[i] = query[i];
        }
      });
    }
  }, []);

  useEffect(() => {
    if (isMobile && query && analyzeFormState && cryptCardBase && libraryCardBase) {
      processSearch();
    }
  }, [analyzeFormState, cryptCardBase, libraryCardBase]);

  const handleMultiSelectChange = (event, id) => {
    const i = id.name;
    const { name, value } = event;
    searchAnalyzeForm[name].value[i] = value;
  };

  const handleChangeWithOpt = (event, id) => {
    const i = id.name;
    const { name, value } = event;

    searchAnalyzeForm[i][name] = value;
  };

  const handleDisciplinesChange = (name) => {
    searchAnalyzeForm.disciplines[name] = !analyzeFormState.disciplines[name];
  };

  const handleMultiChange = (event) => {
    const { name, value } = event.target;
    searchAnalyzeForm[name][value] = !analyzeFormState[name][value];
  };

  const handleClear = () => {
    clearAnalyzeForm();
    setAnalyzeResults();
    setError(false);
  };

  const processSearch = () => {
    setError(false);
    const sanitizedForm = sanitizeFormState(ANALYZE, analyzeFormState);

    if (Object.entries(sanitizedForm).length === 0) {
      setError('EMPTY REQUEST');
      return;
    }

    navigate(`/tournament_analyze?q=${encodeURIComponent(JSON.stringify(sanitizedForm))}`);

    const filteredDecks = filterDecks(sanitizedForm);
    setAnalyzeResults(filteredDecks);
  };

  useEffect(() => {
    if (!isMobile && cryptCardBase && libraryCardBase) {
      const sanitizedForm = sanitizeFormState(ANALYZE, analyzeFormState);
      if (Object.keys(sanitizedForm).length === 0) {
        if (query) {
          setAnalyzeResults();
          navigate('/tournament_analyze');
        }
      } else processSearch();
    }
  }, [analyzeFormState, cryptCardBase, libraryCardBase]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <AnalyzeSearchFormRank value={analyzeFormState.rank} onChange={handleChangeWithOpt} />
        <ButtonClose title="Clear Forms & Results" handleClick={handleClear} />
      </div>
      {cryptCardBase && (
        <TwdSearchFormCrypt value={analyzeFormState.crypt} form={searchAnalyzeForm.crypt} />
      )}
      <div className="flex justify-end">
        <Checkbox
          name="traits"
          value="star"
          label="With Star"
          checked={analyzeFormState.traits.star}
          onChange={handleMultiChange}
        />
      </div>
      {libraryCardBase && (
        <TwdSearchFormLibrary value={analyzeFormState.library} form={searchAnalyzeForm.library} />
      )}
      <TwdSearchFormLibraryTotal
        value={analyzeFormState.libraryTotal}
        onChange={handleMultiChange}
      />
      <CryptSearchFormClan
        value={analyzeFormState.clan}
        onChange={handleMultiSelectChange}
        searchForm={searchAnalyzeForm}
      />
      <div className="flex justify-end">
        <Checkbox
          name="traits"
          value="monoclan"
          label="Mono Clan"
          checked={analyzeFormState.traits.monoclan}
          onChange={handleMultiChange}
        />
      </div>
      <CryptSearchFormSect
        value={analyzeFormState.sect}
        onChange={handleMultiSelectChange}
        searchForm={searchAnalyzeForm}
      />
      <TwdSearchFormCapacity value={analyzeFormState.capacity} onChange={handleMultiChange} />
      <TwdSearchFormDisciplines
        value={analyzeFormState.disciplines}
        onChange={handleDisciplinesChange}
      />
      <TwdSearchFormCardtypes value={analyzeFormState.cardtypes} onChange={handleChangeWithOpt} />
      {isMobile && (
        <>
          <ButtonFloatClose handleClose={handleClear} position="middle" />
          <ButtonFloatSearch handleSearch={processSearch} error={error} />
        </>
      )}
    </div>
  );
};

export default AnalyzeSearchForm;
