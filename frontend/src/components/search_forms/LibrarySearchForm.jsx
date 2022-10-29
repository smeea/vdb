import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { Form } from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import X from 'assets/images/icons/x.svg';
import { ErrorOverlay } from 'components';
import {
  SearchFormTextAndButtons,
  SearchFormSet,
  SearchFormPrecon,
  SearchFormArtist,
} from './shared_search_components';
import {
  LibrarySearchFormType,
  LibrarySearchFormClan,
  LibrarySearchFormTitle,
  LibrarySearchFormSect,
  LibrarySearchFormDiscipline,
  LibrarySearchFormTraits,
  LibrarySearchFormBloodCost,
  LibrarySearchFormPoolCost,
  LibrarySearchFormCapacity,
} from './library_search_components';
import { sanitizeFormState } from 'utils';
import { useFilters } from 'hooks';
import {
  useApp,
  setLibraryResults,
  searchLibraryForm,
  clearSearchForm,
} from 'context';

const LibrarySearchForm = () => {
  const {
    libraryCardBase,
    hideMissing,
    setHideMissing,
    setShowLibrarySearch,
    inventoryLibrary,
    inventoryMode,
    isMobile,
    playtest,
  } = useApp();

  const libraryFormState = useSnapshot(searchLibraryForm);
  const { filterLibrary } = useFilters(libraryCardBase);

  const [preresults, setPreresults] = useState(undefined);
  const showLimit = 300;

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

  const [error, setError] = useState(false);
  const refError = useRef(null);

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    searchLibraryForm.text[name].value = value;
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

  const handleClearButton = () => {
    clearSearchForm('library');
    setLibraryResults(undefined);
    setPreresults(undefined);
    setError(false);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    processSearch();
  };

  const handleShowResults = () => {
    setLibraryResults(preresults);
  };

  const processSearch = () => {
    const sanitizeForm = sanitizeFormState('library', libraryFormState);
    setError(false);

    if (Object.entries(sanitizeForm).length === 0) {
      setError('EMPTY REQUEST');
      return;
    }

    navigate(`/library?q=${encodeURIComponent(JSON.stringify(sanitizeForm))}`);

    const filteredCards = filterLibrary(sanitizeForm).filter(
      (card) => playtest || card.Id < 110000
    );

    if (!isMobile) {
      if (hideMissing && inventoryMode) {
        setPreresults(() =>
          filteredCards.filter((card) => inventoryLibrary[card.Id])
        );
      } else {
        setPreresults(filteredCards);
      }
    } else {
      if (hideMissing && inventoryMode) {
        setLibraryResults(
          filteredCards.filter((card) => inventoryLibrary[card.Id])
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

  useEffect(() => {
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
  }, [libraryFormState, hideMissing, inventoryMode, libraryCardBase]);

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
    <Form onSubmit={handleSubmitButton}>
      <SearchFormTextAndButtons
        value={libraryFormState.text}
        onChange={handleTextChange}
        onChangeOptions={handleTextCheckboxesChange}
        searchForm={searchLibraryForm}
        handleShowResults={handleShowResults}
        handleClearButton={handleClearButton}
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
          <div
            onClick={handleClearButton}
            className="d-flex float-right-middle float-clear align-items-center justify-content-center"
          >
            <X viewBox="0 0 16 16" />
          </div>
          <div
            ref={refError}
            onClick={handleSubmitButton}
            className="d-flex float-right-bottom float-search align-items-center justify-content-center"
          >
            <Check2 viewBox="0 0 16 16" className="pt-1" />
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
    </Form>
  );
};

export default LibrarySearchForm;
