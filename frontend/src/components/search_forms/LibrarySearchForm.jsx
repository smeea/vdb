import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useSnapshot } from 'valtio';
import {
  ButtonFloatClose,
  ButtonFloatSearch,
  LibrarySearchFormBloodCost,
  LibrarySearchFormCapacity,
  LibrarySearchFormClan,
  LibrarySearchFormDiscipline,
  LibrarySearchFormPoolCost,
  LibrarySearchFormSect,
  LibrarySearchFormTitle,
  LibrarySearchFormTraits,
  LibrarySearchFormType,
  SearchFormArtist,
  SearchFormPrecon,
  SearchFormSet,
  SearchFormTextAndButtons,
} from '@/components';
import {
  AGE,
  ARTIST,
  BLOOD,
  CAPACITY,
  CLAN,
  DISCIPLINE,
  EQ,
  FIRST,
  GE,
  HARD,
  ID,
  IN,
  LE,
  LIBRARY,
  NAME,
  NOT_NEWER,
  NOT_OLDER,
  ONLY,
  OR_NEWER,
  OR_OLDER,
  POOL,
  PRECON,
  PRINT,
  REPRINT,
  SECT,
  SET,
  SOFT,
  TEXT,
  TITLE,
  TRAITS,
  TYPE,
} from '@/constants';
import {
  clearSearchForm,
  inventoryStore,
  limitedStore,
  searchLibraryForm,
  setLibraryResults,
  useApp,
  usedStore,
} from '@/context';
import { filterLibrary, getIsPlaytest, sanitizeFormState } from '@/utils';

const LibrarySearchForm = () => {
  const {
    libraryCardBase,
    searchInventoryMode,
    searchMissingInventoryMode,
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
  const [error, setError] = useState(false);
  const [preresults, setPreresults] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = JSON.parse(searchParams.get('q'));
  const SHOW_LIMIT = 400;

  useEffect(() => {
    if (query) {
      Object.keys(query).forEach((i) => {
        searchLibraryForm[i] = query[i];
      });
    }
  }, []);

  useEffect(() => {
    if (isMobile && query && libraryFormState && libraryCardBase) {
      processSearch();
    }
  }, [libraryFormState, libraryCardBase]);

  useEffect(
    () => textInputsAndSearch(),
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
      if (preresults.length <= SHOW_LIMIT) {
        setLibraryResults(preresults);
      } else {
        setLibraryResults(undefined);
      }
    }
  }, [preresults]);

  const handleTextChange = useCallback(
    (formId, value) => {
      searchLibraryForm[TEXT][formId].value = value;
    },
    [searchLibraryForm],
  );

  const handleTextCheckboxesChange = useCallback(
    (event) => {
      const { name, value } = event.currentTarget;
      if ([NAME, TEXT].includes(value)) {
        searchLibraryForm[TEXT][name][IN] =
          searchLibraryForm[TEXT][name][IN] === value ? false : value;
      } else {
        searchLibraryForm[TEXT][name][value] = !searchLibraryForm[TEXT][name][value];
      }
    },
    [searchLibraryForm],
  );

  const handleSelectChange = useCallback(
    (event) => {
      const { name, value } = event;
      searchLibraryForm[name] = value;
    },
    [searchLibraryForm],
  );

  const handleMultiSelectChange = useCallback(
    (event, id) => {
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
    },
    [searchLibraryForm],
  );

  const handleMultiChange = useCallback(
    (event) => {
      const { name, value } = event.currentTarget;

      if ([OR_NEWER, OR_OLDER, NOT_NEWER, NOT_OLDER].includes(value)) {
        searchLibraryForm[name][AGE] = searchLibraryForm[name][AGE] === value ? false : value;
      } else if ([ONLY, FIRST, REPRINT].includes(value)) {
        searchLibraryForm[name][PRINT] = searchLibraryForm[name][PRINT] === value ? false : value;
      } else {
        searchLibraryForm[name][value] = !searchLibraryForm[name][value];
      }
    },
    [searchLibraryForm],
  );

  const handleClear = useCallback(() => {
    setSearchParams();
    clearSearchForm(LIBRARY);
    setLibraryResults(undefined);
    setPreresults(undefined);
    setError(false);
  }, [clearSearchForm]);

  const handleShowResults = () => {
    setLibraryResults(preresults);
  };

  const processSearch = () => {
    setError(false);
    const sanitizedForm = sanitizeFormState(LIBRARY, searchLibraryForm);

    if (Object.entries(sanitizedForm).length === 0) {
      setError('EMPTY REQUEST');
      return;
    }
    const filteredCards = filterLibrary(
      sanitizedForm,
      limitedMode ? limitedLibrary : libraryCardBase,
    ).filter((card) => playtestMode || !getIsPlaytest(card[ID]));

    if (isMobile && filteredCards.length === 0) {
      setError('NO CARDS FOUND');
      return;
    }

    setSearchParams({ q: JSON.stringify(sanitizedForm) });

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
  };

  const textInputsAndSearch = () => {
    if (!isMobile && libraryCardBase) {
      const input = sanitizeFormState(LIBRARY, searchLibraryForm);
      if (Object.keys(input).length === 0) {
        if (query) {
          setLibraryResults(undefined);
          setPreresults(undefined);
          setSearchParams();
        }
      } else if (!searchLibraryForm[TEXT][0].value || searchLibraryForm[TEXT][0].value.length > 2) {
        processSearch();
      }
    }
  };

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
        showLimit={SHOW_LIMIT}
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
