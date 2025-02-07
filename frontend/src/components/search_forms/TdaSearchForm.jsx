import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useSnapshot } from 'valtio';
import {
  ButtonClose,
  ButtonFloatClose,
  ButtonFloatSearch,
  Checkbox,
  CryptSearchFormClan,
  CryptSearchFormSect,
  TdaSearchFormRank,
  TwdSearchFormCapacity,
  TwdSearchFormCardtypes,
  TwdSearchFormCrypt,
  TwdSearchFormDisciplines,
  TwdSearchFormLibrary,
  TwdSearchFormLibraryTotal,
  TwdSearchFormTags,
} from '@/components';
import {
  CAPACITY,
  CARDTYPES,
  CLAN,
  CRYPT,
  DECKS,
  DISCIPLINES,
  LIBRARY,
  LIBRARY_TOTAL,
  MONOCLAN,
  NAME,
  RANK,
  SECT,
  STAR,
  TAGS,
  TDA,
  TRAITS,
} from '@/constants';
import { clearTdaForm, searchTdaForm, setTdaResults, tdaStore, useApp } from '@/context';
import { filterDecks, sanitizeFormState } from '@/utils';

const TdaSearchForm = () => {
  const { cryptCardBase, libraryCardBase, isMobile } = useApp();
  const tdaFormState = useSnapshot(searchTdaForm);
  const decks = useSnapshot(tdaStore)[DECKS];
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = JSON.parse(searchParams.get('q'));

  useEffect(() => {
    if (query) {
      Object.keys(query).forEach((i) => {
        searchTdaForm[i] = query[i];
      });
    }
  }, []);

  useEffect(() => {
    if (!isMobile && cryptCardBase && libraryCardBase) {
      const sanitizedForm = sanitizeFormState(TDA, tdaFormState);
      if (Object.keys(sanitizedForm).length === 0) {
        if (query) setSearchParams();
        setTdaResults();
        setError(false);
      } else {
        processSearch();
      }
    } else if (isMobile && query && tdaFormState && cryptCardBase && libraryCardBase) {
      processSearch();
    }
  }, [tdaFormState, cryptCardBase, libraryCardBase]);

  const handleMultiSelectChange = useCallback(
    (event, id) => {
      const i = id[NAME];
      const { name, value } = event;
      searchTdaForm[name].value[i] = value;
    },
    [searchTdaForm],
  );

  const handleChangeWithOpt = useCallback(
    (event, id) => {
      const i = id[NAME];
      const { name, value } = event;

      searchTdaForm[i][name] = value;
    },
    [searchTdaForm],
  );

  const handleDisciplinesChange = useCallback(
    (name) => {
      searchTdaForm[DISCIPLINES][name] = !searchTdaForm[DISCIPLINES][name];
    },
    [searchTdaForm],
  );

  const handleMultiChange = useCallback(
    (event) => {
      const { name, value } = event.currentTarget;
      searchTdaForm[name][value] = !searchTdaForm[name][value];
    },
    [searchTdaForm],
  );

  const handleTagsChange = useCallback(
    (name, target, value) => {
      searchTdaForm[name][target] = value;
    },
    [searchTdaForm],
  );

  const handleClear = useCallback(() => {
    clearTdaForm();
    setTdaResults();
    setError(false);
  }, [clearTdaForm]);

  const processSearch = () => {
    setError(false);
    const sanitizedForm = sanitizeFormState(TDA, searchTdaForm);

    if (Object.entries(sanitizedForm).length === 0) {
      setError('EMPTY REQUEST');
      return;
    }

    const filteredDecks = filterDecks(decks, sanitizedForm);

    if (isMobile && filteredDecks.length == 0) {
      setError('NO DECKS FOUND');
      return;
    }

    setSearchParams({ q: JSON.stringify(sanitizedForm) });
    setTdaResults(filteredDecks);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <TdaSearchFormRank value={tdaFormState[RANK]} onChange={handleChangeWithOpt} />
        <ButtonClose title="Clear Forms & Results" handleClick={handleClear} />
      </div>
      {cryptCardBase && (
        <TwdSearchFormCrypt value={tdaFormState[CRYPT]} form={searchTdaForm[CRYPT]} />
      )}
      <div className="flex justify-end">
        <Checkbox
          name={TRAITS}
          value={STAR}
          label="With Star"
          checked={tdaFormState[TRAITS][STAR]}
          onChange={handleMultiChange}
        />
      </div>
      {libraryCardBase && (
        <TwdSearchFormLibrary value={tdaFormState[LIBRARY]} form={searchTdaForm[LIBRARY]} />
      )}
      <TwdSearchFormLibraryTotal value={tdaFormState[LIBRARY_TOTAL]} onChange={handleMultiChange} />
      <CryptSearchFormClan
        value={tdaFormState[CLAN]}
        onChange={handleMultiSelectChange}
        searchForm={searchTdaForm}
      />
      <div className="flex justify-end">
        <Checkbox
          name={TRAITS}
          value={MONOCLAN}
          label="Mono Clan"
          checked={tdaFormState[TRAITS][MONOCLAN]}
          onChange={handleMultiChange}
        />
      </div>
      <CryptSearchFormSect
        value={tdaFormState[SECT]}
        onChange={handleMultiSelectChange}
        searchForm={searchTdaForm}
      />
      <TwdSearchFormCapacity value={tdaFormState[CAPACITY]} onChange={handleMultiChange} />
      <TwdSearchFormDisciplines
        value={tdaFormState[DISCIPLINES]}
        onChange={handleDisciplinesChange}
      />
      <TwdSearchFormCardtypes value={tdaFormState[CARDTYPES]} onChange={handleChangeWithOpt} />
      <TwdSearchFormTags value={tdaFormState[TAGS]} onChange={handleTagsChange} />
      {isMobile && (
        <>
          <ButtonFloatClose handleClose={handleClear} position="middle" />
          <ButtonFloatSearch handleSearch={processSearch} error={error} />
        </>
      )}
    </div>
  );
};

export default TdaSearchForm;
