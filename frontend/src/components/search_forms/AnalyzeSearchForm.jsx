import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import {
  ButtonFloatSearch,
  ButtonFloatClose,
  Checkbox,
  TwdSearchFormCapacity,
  TwdSearchFormCardtypes,
  TwdSearchFormClan,
  TwdSearchFormCrypt,
  TwdSearchFormDisciplines,
  TwdSearchFormLibrary,
  TwdSearchFormLibraryTotal,
  AnalyzeSearchFormRank,
  TwdSearchFormSect,
} from '@/components';
import { sanitizeFormState } from '@/utils';
import {
  useApp,
  setAnalyzeResults,
  searchAnalyzeForm,
  clearAnalyzeForm,
  analyzeStore,
} from '@/context';

const AnalyzeSearchForm = ({ error, setError }) => {
  const { cryptCardBase, libraryCardBase, isMobile } = useApp();
  const analyzeFormState = useSnapshot(searchAnalyzeForm);
  const decks = useSnapshot(analyzeStore).all;
  // const results = useSnapshot(analyzeStore).results;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));

  useEffect(() => {
    if (query) {
      Object.keys(query).map((i) => {
        if (typeof query[i] === 'object') {
          Object.keys(query[i]).map((j) => {
            searchAnalyzeForm[i][j] = query[i][j];
          });
        } else {
          searchAnalyzeForm[i] = query[i];
        }
      });
    }
  }, []);

  useEffect(() => {
    if (
      isMobile &&
      query &&
      analyzeFormState &&
      cryptCardBase &&
      libraryCardBase
    ) {
      processSearch();
    }
  }, [analyzeFormState, cryptCardBase, libraryCardBase]);

  const handleChange = (event) => {
    const { name, value } = event;
    searchAnalyzeForm[name] = value;
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
    setAnalyzeResults(decks);
    setError(false);
  };

  // const handleError = (error) => {
  //   setAnalyzeResults(null);

  //   if (error.message == 400) {
  //     setError('NO DECKS FOUND');
  //   } else {
  //     setError('CONNECTION PROBLEM');
  //   }

  //   if (isMobile) {
  //     setIsLoading(false);
  //     navigate('/tournament_analyze');
  //   }
  // };

  const processSearch = () => {
    setError(false);
    const sanitizedForm = sanitizeFormState('analyze', analyzeFormState);

    if (Object.entries(sanitizedForm).length === 0) {
      setError('EMPTY REQUEST');
      return;
    }

    navigate(
      `/tournament_analyze?q=${encodeURIComponent(
        JSON.stringify(sanitizedForm)
      )}`
    );

    setIsLoading(true);
    // TODO add search
    setAnalyzeResults(decks);
    // fetch(url, options)
    //   .then((response) => {
    //     if (!response.ok) throw Error(response.status);
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setIsLoading(false);
    //     setAnalyzeResults(data);
    //   })
    //   .catch((error) => {
    //     handleError(error);
    //   });
  };

  useEffect(() => {
    if (!isMobile && cryptCardBase && libraryCardBase) {
      const sanitizedForm = sanitizeFormState('analyze', analyzeFormState);
      if (Object.keys(sanitizedForm).length === 0) {
        if (query) {
          setAnalyzeResults(decks);
          navigate('/tournament_analyze');
        }
      } else processSearch();
    }
  }, [analyzeFormState, cryptCardBase, libraryCardBase]);

  return (
    <div className="space-y-2">
      <AnalyzeSearchFormRank
        value={analyzeFormState.rank}
        onChange={handleChangeWithOpt}
      />
      {cryptCardBase && (
        <TwdSearchFormCrypt
          value={analyzeFormState.crypt}
          form={searchAnalyzeForm.crypt}
        />
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
        <TwdSearchFormLibrary
          value={analyzeFormState.library}
          form={searchAnalyzeForm.library}
        />
      )}
      <TwdSearchFormLibraryTotal
        value={analyzeFormState.libraryTotal}
        onChange={handleMultiChange}
      />
      <TwdSearchFormClan
        value={analyzeFormState.clan}
        onChange={handleChange}
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
      <TwdSearchFormSect
        value={analyzeFormState.sect}
        onChange={handleChange}
      />
      <TwdSearchFormCapacity
        value={analyzeFormState.capacity}
        onChange={handleMultiChange}
      />
      <TwdSearchFormDisciplines
        value={analyzeFormState.disciplines}
        onChange={handleDisciplinesChange}
      />
      <TwdSearchFormCardtypes
        value={analyzeFormState.cardtypes}
        onChange={handleChangeWithOpt}
      />
      {isMobile && (
        <>
          <ButtonFloatClose handleClose={handleClear} position="middle" />
          <ButtonFloatSearch
            handleSearch={processSearch}
            error={error}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};

export default AnalyzeSearchForm;
