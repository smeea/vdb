import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import {
  ButtonFloatSearch,
  ButtonFloatClose,
  SearchFormTextAndButtons,
  SearchFormSet,
  SearchFormPrecon,
  SearchFormArtist,
  LibrarySearchFormType,
  LibrarySearchFormClan,
  LibrarySearchFormTitle,
  LibrarySearchFormSect,
  LibrarySearchFormDiscipline,
  LibrarySearchFormTraits,
  LibrarySearchFormBloodCost,
  LibrarySearchFormPoolCost,
  LibrarySearchFormCapacity,
} from '@/components';
import { sanitizeFormState } from '@/utils';
import { useFilters } from '@/hooks';
import {
  useApp,
  setLibraryResults,
  searchLibraryForm,
  clearSearchForm,
  inventoryStore,
  usedStore,
  limitedStore,
} from '@/context';
import {
  GE,
  LE,
  EQ,
  OR_NEWER,
  OR_OLDER,
  NOT_NEWER,
  NOT_OLDER,
  ONLY,
  PRINT,
  REPRINT,
  FIRST,
  LIBRARY,
  SOFT,
  HARD,
  TEXT,
  BLOOD,
  POOL,
  AGE,
} from '@/constants';

const LibrarySearchForm = () => {
  const {
    libraryCardBase,
    searchInventoryMode,
    searchMissingInventoryMode,
    setShowLibrarySearch,
    showFloatingButtons,
    inventoryMode,
    isMobile,
    playtestMode,
    limitedMode,
  } = useApp();
  const inventoryLibrary = useSnapshot(inventoryStore)[LIBRARY];
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const limitedLibrary = useSnapshot(limitedStore)[LIBRARY];
  const libraryFormState = useSnapshot(searchLibraryForm);
  const { filterLibrary } = useFilters(limitedMode ? limitedLibrary : libraryCardBase);
  const [error, setError] = useState(false);
  const [preresults, setPreresults] = useState();
  const showLimit = 300;
  const navigate = useNavigate();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));

  useEffect(() => {
    if (query) {
      Object.keys(query).forEach((i) => {
        if (typeof query[i] === 'object') {
          Object.keys(query[i]).forEach((j) => {
            searchLibraryForm[i][j] = query[i][j];
          });
        } else {
          searchLibraryForm[i] = query[i];
        }
      });
    }
  }, []);

  const handleTextChange = (formId, value) => {
    searchLibraryForm[TEXT][formId].value = value;
  };

  const handleTextCheckboxesChange = (event) => {
    const { name, value } = event.currentTarget;
    if ([NAME, TEXT].includes(value)) {
      searchLibraryForm[TEXT][name]['in'] =
        searchLibraryForm[TEXT][name]['in'] === value ? false : value;
    } else {
      searchLibraryForm[TEXT][name][value] = !searchLibraryForm[TEXT][name][value];
    }
  };

  const handleSelectChange = (event) => {
    const { name, value } = event;
    searchLibraryForm[name] = value;
  };

  const handleMultiSelectChange = (event, id) => {
    const i = id[NAME];
    const { name, value } = event;

    if ([BLOOD, POOL, CAPACITY].includes(name)) {
      if ([LE, GE, EQ].includes(value)) {
        searchLibraryForm[name].moreless = value;
      } else {
        searchLibraryForm[name][name] = value;
      }
    } else {
      searchLibraryForm[name].value[i] = value;
    }
  };

  const handleMultiChange = (event) => {
    const { name, value } = event.target;

    if ([OR_NEWER, OR_OLDER, NOT_NEWER, NOT_OLDER].includes(value)) {
      searchLibraryForm[name][AGE] = searchLibraryForm[name][AGE] === value ? false : value;
    } else if ([ONLY, FIRST, REPRINT].includes(value)) {
      searchLibraryForm[name][PRINT] = searchLibraryForm[name][PRINT] === value ? false : value;
    } else {
      searchLibraryForm[name][value] = !searchLibraryForm[name][value];
    }
  };

  const handleClear = () => {
    clearSearchForm(LIBRARY);
    setLibraryResults(undefined);
    setPreresults(undefined);
    setError(false);
  };

  const handleShowResults = () => {
    setLibraryResults(preresults);
  };

  const processSearch = () => {
    setError(false);
    const sanitizedForm = sanitizeFormState(LIBRARY, libraryFormState);

    if (Object.entries(sanitizedForm).length === 0) {
      setError('EMPTY REQUEST');
      return;
    }
    navigate(`/library?q=${encodeURIComponent(JSON.stringify(sanitizedForm))}`);

    const filteredCards = filterLibrary(sanitizedForm).filter(
      (card) => playtestMode || card[ID] < 110000,
    );

    const setResults = isMobile ? setLibraryResults : setPreresults;
    if (searchInventoryMode && inventoryMode) {
      setResults(
        filteredCards.filter((card) => {
          return (
            inventoryLibrary[card[ID]] || usedLibrary[SOFT][card[ID]] || usedLibrary[HARD][card[ID]]
          );
        }),
      );
    } else if (searchMissingInventoryMode && inventoryMode) {
      setResults(filteredCards.filter((card) => !inventoryLibrary[card[ID]]?.q));
    } else {
      setResults(filteredCards);
    }
    if (isMobile) {
      if (filteredCards.length == 0) {
        navigate('/library');
        setError('NO CARDS FOUND');
      } else {
        setShowLibrarySearch(false);
      }
    }
  };

  useEffect(() => {
    if (isMobile && query && libraryFormState && libraryCardBase) {
      processSearch();
    }
  }, [libraryFormState, libraryCardBase]);

  const testInputsAndSearch = () => {
    if (!isMobile && libraryCardBase) {
      const input = sanitizeFormState(LIBRARY, libraryFormState);
      if (Object.keys(input).length === 0) {
        if (query) {
          setLibraryResults(undefined);
          setPreresults(undefined);
          navigate('/library');
        }
      } else if (!libraryFormState[TEXT][0].value || libraryFormState[TEXT][0].value.length > 2) {
        processSearch();
      }
    }
  };

  useEffect(
    () => testInputsAndSearch(),
    [
      libraryFormState,
      searchInventoryMode,
      searchMissingInventoryMode,
      inventoryMode,
      limitedMode,
      playtestMode,
      libraryCardBase,
    ],
  );

  useEffect(() => {
    if (!isMobile && preresults) {
      if (preresults.length <= showLimit) {
        setLibraryResults(preresults);
      } else {
        setLibraryResults(undefined);
      }
    }
  }, [preresults]);

  return (
    <div className="flex flex-col gap-2">
      <SearchFormTextAndButtons
        value={libraryFormState[TEXT]}
        onChange={handleTextChange}
        onChangeOptions={handleTextCheckboxesChange}
        searchForm={searchLibraryForm}
        handleShowResults={handleShowResults}
        handleClear={handleClear}
        preresults={preresults?.length}
        showLimit={showLimit}
      />
      <LibrarySearchFormType
        value={libraryFormState[TYPE]}
        onChange={handleMultiSelectChange}
        searchForm={searchLibraryForm}
      />
      <LibrarySearchFormDiscipline
        value={libraryFormState[DISCIPLINE]}
        onChange={handleMultiSelectChange}
        searchForm={searchLibraryForm}
      />
      <LibrarySearchFormClan
        value={libraryFormState[CLAN]}
        onChange={handleMultiSelectChange}
        searchForm={searchLibraryForm}
      />
      <LibrarySearchFormSect
        value={libraryFormState[SECT]}
        onChange={handleMultiSelectChange}
        searchForm={searchLibraryForm}
      />
      <LibrarySearchFormTitle
        value={libraryFormState[TITLE]}
        onChange={handleMultiSelectChange}
        searchForm={searchLibraryForm}
      />
      <LibrarySearchFormBloodCost
        value={libraryFormState[BLOOD]}
        onChange={handleMultiSelectChange}
      />
      <LibrarySearchFormPoolCost
        value={libraryFormState[POOL]}
        onChange={handleMultiSelectChange}
      />
      <LibrarySearchFormCapacity
        value={libraryFormState[CAPACITY]}
        onChange={handleMultiSelectChange}
      />
      <LibrarySearchFormTraits value={libraryFormState[TRAITS]} onChange={handleMultiChange} />
      <SearchFormSet
        value={libraryFormState[SET]}
        onChange={handleMultiSelectChange}
        onChangeOptions={handleMultiChange}
        searchForm={searchLibraryForm}
      />
      <SearchFormPrecon
        value={libraryFormState[PRECON]}
        onChange={handleMultiSelectChange}
        onChangeOptions={handleMultiChange}
        searchForm={searchLibraryForm}
      />
      <SearchFormArtist
        value={libraryFormState[ARTIST]}
        onChange={handleSelectChange}
        target={LIBRARY}
      />
      {isMobile && showFloatingButtons && (
        <>
          <ButtonFloatClose handleClose={handleClear} position="middle" />
          <ButtonFloatSearch handleSearch={processSearch} error={error} />
        </>
      )}
    </div>
  );
};

export default LibrarySearchForm;
