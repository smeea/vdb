import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Spinner } from 'react-bootstrap';
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
import defaults from 'components/forms_data/defaultsLibraryForm.json';
import { sanitizeFormState } from 'utils';
import { useFilters } from 'hooks';
import { useApp, useSearchForms, useSearchResults } from 'context';

const LibrarySearchForm = (props) => {
  const {
    libraryCardBase,
    hideMissing,
    setHideMissing,
    setShowLibrarySearch,
    inventoryLibrary,
    inventoryMode,
    isMobile,
  } = useApp();

  const { filterLibrary } = useFilters(libraryCardBase);

  const { libraryFormState, setLibraryFormState } = useSearchForms();
  const { setLibraryResults } = useSearchResults();

  const [spinnerState, setSpinnerState] = useState(false);
  const [preresults, setPreresults] = useState(undefined);
  const showLimit = 300;

  const navigate = useNavigate();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));

  useEffect(() => {
    if (query) {
      setLibraryFormState((prevState) => {
        const state = { ...prevState };
        Object.keys(query).map((i) => {
          if (typeof query[i] === 'object') {
            Object.keys(query[i]).map((j) => {
              state[i][j] = query[i][j];
            });
          } else {
            state[i] = query[i];
          }
        });
        return state;
      });
    }
  }, []);

  const [error, setError] = useState(false);
  const refError = useRef(null);

  const handleTextChange = (event) => {
    const { name, value } = event.target;

    setLibraryFormState((prevState) => {
      const v = prevState.text;
      v[name].value = value;

      return {
        ...prevState,
        text: v,
      };
    });
  };

  const handleTextCheckboxesChange = (event) => {
    const { name, value } = event.currentTarget;
    const newState = libraryFormState.text;
    if (['name', 'text'].includes(value)) {
      newState[name]['in'] = newState[name]['in'] === value ? false : value;
    } else {
      newState[name][value] = !newState[name][value];
    }

    setLibraryFormState((prevState) => ({
      ...prevState,
      text: newState,
    }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event;
    setLibraryFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (event, id) => {
    const i = id.name;
    const { name, value } = event;

    setLibraryFormState((prevState) => {
      const v = prevState[name].value;
      v[i] = value;
      return {
        ...prevState,
        [name]: {
          ...prevState[name],
          value: v,
        },
      };
    });
  };

  const handleMultiChange = (event) => {
    const { name, value } = event.target;
    const newState = libraryFormState[name];
    if (['or-newer', 'or-older', 'not-newer', 'not-older'].includes(value)) {
      newState['age'] = newState['age'] === value ? false : value;
    } else if (['only', 'first', 'reprint'].includes(value)) {
      newState['print'] = newState['print'] === value ? false : value;
    } else {
      newState[value] = !newState[value];
    }
    setLibraryFormState((prevState) => ({
      ...prevState,
      [name]: newState,
    }));
  };

  const handleNestedChange = (event) => {
    const { name, value } = event;
    const newState = libraryFormState[name];
    newState[name] = value;
    setLibraryFormState((prevState) => ({
      ...prevState,
      [name]: newState,
    }));
  };

  const handleMorelessChange = (event) => {
    const { name, value } = event;
    const newState = libraryFormState[name];
    newState['moreless'] = value;
    setLibraryFormState((prevState) => ({
      ...prevState,
      [name]: newState,
    }));
  };

  const handleClearButton = () => {
    if (!isMobile) navigate('/library');
    setLibraryFormState(JSON.parse(JSON.stringify(defaults)));
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

    setSpinnerState(true);

    const filteredCards = filterLibrary(sanitizeForm);

    setSpinnerState(false);

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
        setFormState={setLibraryFormState}
        handleShowResults={handleShowResults}
        handleClearButton={handleClearButton}
        preresults={preresults ? preresults.length : null}
        showLimit={showLimit}
        hideMissing={hideMissing}
        setHideMissing={setHideMissing}
      />
      <LibrarySearchFormType
        value={{ name: 'type', ...libraryFormState.type }}
        onChange={handleMultiSelectChange}
        setFormState={setLibraryFormState}
      />

      <LibrarySearchFormDiscipline
        value={{ name: 'discipline', ...libraryFormState.discipline }}
        onChange={handleMultiSelectChange}
        setFormState={setLibraryFormState}
      />
      <LibrarySearchFormClan
        value={{ name: 'clan', ...libraryFormState.clan }}
        onChange={handleMultiSelectChange}
        setFormState={setLibraryFormState}
      />
      <LibrarySearchFormSect
        value={{ name: 'sect', ...libraryFormState.sect }}
        onChange={handleMultiSelectChange}
        setFormState={setLibraryFormState}
      />
      <LibrarySearchFormTitle
        value={{ name: 'title', ...libraryFormState.title }}
        onChange={handleMultiSelectChange}
        setFormState={setLibraryFormState}
      />
      <LibrarySearchFormBloodCost
        value={libraryFormState.blood}
        onChange={handleNestedChange}
        onMorelessChange={handleMorelessChange}
      />
      <LibrarySearchFormPoolCost
        value={libraryFormState.pool}
        onChange={handleNestedChange}
        onMorelessChange={handleMorelessChange}
      />
      <LibrarySearchFormCapacity
        value={libraryFormState.capacity}
        onChange={handleNestedChange}
        onMorelessChange={handleMorelessChange}
      />
      <LibrarySearchFormTraits
        value={libraryFormState.traits}
        onChange={handleMultiChange}
      />
      <SearchFormSet
        value={{ name: 'set', ...libraryFormState.set }}
        onChange={handleMultiSelectChange}
        onChangeOptions={handleMultiChange}
        setFormState={setLibraryFormState}
      />
      <SearchFormPrecon
        value={{ name: 'precon', ...libraryFormState.precon }}
        onChange={handleMultiSelectChange}
        onChangeOptions={handleMultiChange}
        setFormState={setLibraryFormState}
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
    </Form>
  );
};

export default LibrarySearchForm;
