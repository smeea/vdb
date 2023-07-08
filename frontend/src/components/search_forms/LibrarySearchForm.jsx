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
import { useDebounce, useFilters } from '@/hooks';
import {
  useApp,
  setLibraryResults,
  searchLibraryForm,
  clearSearchForm,
  inventoryStore,
  limitedStore,
} from '@/context';

const LibrarySearchForm = () => {
  const {
    libraryCardBase,
    hideMissing,
    setHideMissing,
    setShowLibrarySearch,
    inventoryMode,
    isMobile,
    playtest,
    limitedMode,
  } = useApp();
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const limitedLibrary = useSnapshot(limitedStore).library;
  const libraryFormState = useSnapshot(searchLibraryForm);
  const { filterLibrary } = useFilters(
    limitedMode ? limitedLibrary : libraryCardBase,
  );
  const [error, setError] = useState(false);
  const [preresults, setPreresults] = useState();
  const showLimit = 250;
  const navigate = useNavigate();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));

  useEffect(() => {
    if (query) {
      Object.keys(query).map((i) => {
        if (typeof query[i] === 'object') {
          Object.keys(query[i]).map((j) => {
            searchLibraryForm[i][j] = query[i][j];
          });
        } else {
          searchLibraryForm[i] = query[i];
        }
      });
    }
  }, []);

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    searchLibraryForm.text[name].value = value;
    // TODO idk why multiforms dont work without this:
    if (libraryFormState.text[name].value) null;
  };

  const handleTextCheckboxesChange = (event) => {
    const { name, value } = event.currentTarget;
    if (['name', 'text'].includes(value)) {
      searchLibraryForm.text[name]['in'] =
        searchLibraryForm.text[name]['in'] === value ? false : value;
    } else {
      searchLibraryForm.text[name][value] =
        !searchLibraryForm.text[name][value];
    }
  };

  const handleSelectChange = (event) => {
    const { name, value } = event;
    searchLibraryForm[name] = value;
  };

  const handleMultiSelectChange = (event, id) => {
    const i = id.name;
    const { name, value } = event;

    if (['blood', 'pool', 'capacity'].includes(name)) {
      if (['le', 'ge', 'eq'].includes(value)) {
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

    if (['or-newer', 'or-older', 'not-newer', 'not-older'].includes(value)) {
      searchLibraryForm[name]['age'] =
        searchLibraryForm[name]['age'] === value ? false : value;
    } else if (['only', 'first', 'reprint'].includes(value)) {
      searchLibraryForm[name]['print'] =
        searchLibraryForm[name]['print'] === value ? false : value;
    } else {
      searchLibraryForm[name][value] = !searchLibraryForm[name][value];
    }
  };

  const handleClear = () => {
    clearSearchForm('library');
    setLibraryResults(undefined);
    setPreresults(undefined);
    setError(false);
  };

  const handleShowResults = () => {
    setLibraryResults(preresults);
  };

  const processSearch = () => {
    setError(false);
    const sanitizedForm = sanitizeFormState('library', libraryFormState);

    if (Object.entries(sanitizedForm).length === 0) {
      setError('EMPTY REQUEST');
      return;
    }
    navigate(`/library?q=${encodeURIComponent(JSON.stringify(sanitizedForm))}`);

    const filteredCards = filterLibrary(sanitizedForm).filter(
      (card) => playtest || card.Id < 110000,
    );

    if (!isMobile) {
      if (hideMissing && inventoryMode) {
        setPreresults(() =>
          filteredCards.filter((card) => inventoryLibrary[card.Id]),
        );
      } else {
        setPreresults(filteredCards);
      }
    } else {
      if (hideMissing && inventoryMode) {
        setLibraryResults(
          filteredCards.filter((card) => inventoryLibrary[card.Id]),
        );
      } else {
        setLibraryResults(filteredCards);
      }
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
      const input = sanitizeFormState('library', libraryFormState);
      if (Object.keys(input).length === 0) {
        if (query) {
          setLibraryResults(undefined);
          setPreresults(undefined);
          navigate('/library');
        }
      } else if (
        !libraryFormState.text[0].value ||
        libraryFormState.text[0].value.length > 2
      ) {
        processSearch();
      }
    }
  };

  useEffect(
    () => testInputsAndSearch(),
    [
      libraryFormState.artist,
      libraryFormState.blood,
      libraryFormState.capacity,
      libraryFormState.clan,
      libraryFormState.discipline,
      libraryFormState.pool,
      libraryFormState.precon,
      libraryFormState.sect,
      libraryFormState.set,
      libraryFormState.title,
      libraryFormState.traits,
      libraryFormState.type,
      hideMissing,
      inventoryMode,
      libraryCardBase,
      limitedMode,
    ],
  );

  useDebounce(() => testInputsAndSearch(), 400, [
    libraryFormState.text,
    hideMissing,
    inventoryMode,
    libraryCardBase,
  ]);

  useEffect(() => {
    if (!isMobile && preresults) {
      if (preresults.length < showLimit) {
        setLibraryResults(preresults);
      } else {
        setLibraryResults(undefined);
      }
    }
  }, [preresults]);

  return (
    <div className="space-y-2">
      <SearchFormTextAndButtons
        value={libraryFormState.text}
        onChange={handleTextChange}
        onChangeOptions={handleTextCheckboxesChange}
        searchForm={searchLibraryForm}
        handleShowResults={handleShowResults}
        handleClear={handleClear}
        preresults={preresults ? preresults.length : null}
        showLimit={showLimit}
        hideMissing={hideMissing}
        setHideMissing={setHideMissing}
      />
      <LibrarySearchFormType
        value={libraryFormState.type}
        onChange={handleMultiSelectChange}
        searchForm={searchLibraryForm}
      />
      <LibrarySearchFormDiscipline
        value={libraryFormState.discipline}
        onChange={handleMultiSelectChange}
        searchForm={searchLibraryForm}
      />
      <LibrarySearchFormClan
        value={libraryFormState.clan}
        onChange={handleMultiSelectChange}
        searchForm={searchLibraryForm}
      />
      <LibrarySearchFormSect
        value={libraryFormState.sect}
        onChange={handleMultiSelectChange}
        searchForm={searchLibraryForm}
      />
      <LibrarySearchFormTitle
        value={libraryFormState.title}
        onChange={handleMultiSelectChange}
        searchForm={searchLibraryForm}
      />
      <LibrarySearchFormBloodCost
        value={libraryFormState.blood}
        onChange={handleMultiSelectChange}
      />
      <LibrarySearchFormPoolCost
        value={libraryFormState.pool}
        onChange={handleMultiSelectChange}
      />
      <LibrarySearchFormCapacity
        value={libraryFormState.capacity}
        onChange={handleMultiSelectChange}
      />
      <LibrarySearchFormTraits
        value={libraryFormState.traits}
        onChange={handleMultiChange}
      />
      <SearchFormSet
        value={libraryFormState.set}
        onChange={handleMultiSelectChange}
        onChangeOptions={handleMultiChange}
        searchForm={searchLibraryForm}
      />
      <SearchFormPrecon
        value={libraryFormState.precon}
        onChange={handleMultiSelectChange}
        onChangeOptions={handleMultiChange}
        searchForm={searchLibraryForm}
      />
      <SearchFormArtist
        value={libraryFormState.artist}
        onChange={handleSelectChange}
        target="library"
      />
      {isMobile && (
        <>
          <ButtonFloatClose handleClose={handleClear} position="middle" />
          <ButtonFloatSearch handleSearch={processSearch} error={error} />
        </>
      )}
    </div>
  );
};

export default LibrarySearchForm;
