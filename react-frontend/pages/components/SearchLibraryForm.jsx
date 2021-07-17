import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';
import X from '../../assets/images/icons/x.svg';
import SearchFormTextAndButtons from './SearchFormTextAndButtons.jsx';
import SearchLibraryFormType from './SearchLibraryFormType.jsx';
import SearchLibraryFormClan from './SearchLibraryFormClan.jsx';
import SearchLibraryFormTitle from './SearchLibraryFormTitle.jsx';
import SearchLibraryFormSect from './SearchLibraryFormSect.jsx';
import SearchLibraryFormDiscipline from './SearchLibraryFormDiscipline.jsx';
import SearchLibraryFormTraits from './SearchLibraryFormTraits.jsx';
import SearchLibraryFormBloodCost from './SearchLibraryFormBloodCost.jsx';
import SearchLibraryFormPoolCost from './SearchLibraryFormPoolCost.jsx';
import SearchFormSet from './SearchFormSet.jsx';
import SearchFormPrecon from './SearchFormPrecon.jsx';
import SearchFormArtist from './SearchFormArtist.jsx';
import ErrorOverlay from './ErrorOverlay.jsx';
import defaults from './forms_data/defaultsLibraryForm.json';
import AppContext from '../../context/AppContext.js';

function SearchLibraryForm(props) {
  const {
    isInventory,
    inventoryMode,
    setShowLibrarySearch,
    setLibraryResults,
    libraryFormState,
    setLibraryFormState,
    libraryCardBase,
    hideMissing,
    setHideMissing,
    isMobile,
  } = useContext(AppContext);
  const [spinnerState, setSpinnerState] = useState(false);
  const [preresults, setPreresults] = useState(undefined);
  const showLimit = 300;

  const history = useHistory();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));

  useEffect(() => {
    if (libraryCardBase && query) {
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
  }, [libraryCardBase]);

  const [showError, setShowError] = useState(false);
  const refError = useRef(null);

  const handleTextChange = (event) => {
    const value = event.target.value;
    setLibraryFormState((prevState) => ({
      ...prevState,
      text: value,
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
      const v = prevState[name];
      v[i] = value;
      return {
        ...prevState,
        [name]: v,
      };
    });
  };

  const handleMultiChange = (event) => {
    const { name, value } = event.target;
    const newState = libraryFormState[name];
    newState[value] = !newState[value];
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
    setLibraryFormState(JSON.parse(JSON.stringify(defaults)));
    setLibraryResults(undefined);
    setPreresults(undefined);
    setShowError(false);
    history.push('/library');
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    launchRequest();
  };

  const handleShowResults = () => {
    setLibraryResults(preresults);
  };

  const launchRequest = () => {
    const url = `${process.env.API_URL}search/library`;
    const input = JSON.parse(JSON.stringify(libraryFormState));

    const multiSelectForms = ['traits', 'set', 'precon'];

    multiSelectForms.map((i) => {
      Object.keys(input[i]).forEach(
        (k) => input[i][k] == 0 && delete input[i][k]
      );
    });

    Object.keys(input).forEach(
      (k) =>
        (input[k] == 'any' ||
          !input[k] ||
          Object.keys(input[k]).length === 0) &&
        delete input[k]
    );

    const multiSelectFormsWithMain = ['set', 'precon', 'blood', 'pool'];

    multiSelectFormsWithMain.map((i) => {
      if (input[i][i] == 'any') {
        delete input[i];
      }
    });

    if (Object.keys(input).length !== 0) {
      history.push(`/library?q=${encodeURIComponent(JSON.stringify(input))}`);

      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      };

      setShowError(false);
      setSpinnerState(true);

      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          setShowLibrarySearch(false);
          const res = data.map((i) => {
            return libraryCardBase[i];
          });
          if (!isMobile) {
            setPreresults(res);
          } else {
            setLibraryResults(res);
          }
          setSpinnerState(false);
        })
        .catch((error) => {
          setLibraryResults([]);
          setPreresults([]);
          setShowError(true);
          setSpinnerState(false);
        });
    } else {
      setLibraryResults(undefined);
      setPreresults(undefined);
    }
  };

  useEffect(() => {
    if (!isMobile) {
      if (
        JSON.stringify(libraryFormState) == JSON.stringify(defaults) &&
        props.results
      ) {
        setLibraryResults(undefined);
      } else if (!libraryFormState.text || libraryFormState.text.length > 2) {
        launchRequest();
      }
    }
  }, [libraryFormState]);

  useEffect(() => {
    if (!isMobile && preresults) {
      if (preresults && preresults.length < showLimit) {
        setLibraryResults(preresults);
      } else {
        setLibraryResults(undefined);
      }
    }
  }, [preresults]);

  return (
    <form onSubmit={handleSubmitButton}>
      <SearchFormTextAndButtons
        value={libraryFormState.text}
        onChange={handleTextChange}
        handleShowResults={handleShowResults}
        handleClearButton={handleClearButton}
        preresults={preresults ? preresults.length : null}
        showLimit={showLimit}
        spinner={spinnerState}
      />
      {(inventoryMode || (isMobile && isInventory)) && (
        <div className="custom-control custom-checkbox">
          <input
            id="hideMissing"
            className="custom-control-input"
            type="checkbox"
            checked={hideMissing}
            onChange={() => setHideMissing(!hideMissing)}
          />
          <label htmlFor="hideMissing" className="custom-control-label">
            Search in Inventory
          </label>
        </div>
      )}
      <SearchLibraryFormType
        value={libraryFormState.type}
        onChange={handleMultiSelectChange}
        setFormState={setLibraryFormState}
      />
      <SearchLibraryFormDiscipline
        value={libraryFormState.discipline}
        onChange={handleMultiSelectChange}
        setFormState={setLibraryFormState}
      />
      <SearchLibraryFormClan
        value={libraryFormState.clan}
        onChange={handleMultiSelectChange}
        setFormState={setLibraryFormState}
      />
      <SearchLibraryFormSect
        value={libraryFormState.sect}
        onChange={handleMultiSelectChange}
        setFormState={setLibraryFormState}
      />
      <SearchLibraryFormTitle
        value={libraryFormState.title}
        onChange={handleMultiSelectChange}
        setFormState={setLibraryFormState}
      />
      <SearchLibraryFormBloodCost
        value={libraryFormState.blood}
        onChange={handleNestedChange}
        onMorelessChange={handleMorelessChange}
      />
      <SearchLibraryFormPoolCost
        value={libraryFormState.pool}
        onChange={handleNestedChange}
        onMorelessChange={handleMorelessChange}
      />
      <SearchLibraryFormTraits
        value={libraryFormState.traits}
        onChange={handleMultiChange}
      />
      <SearchFormSet
        value={libraryFormState.set}
        onChange={handleNestedChange}
        onChangeOptions={handleMultiChange}
      />
      <SearchFormPrecon
        value={libraryFormState.precon}
        onChange={handleNestedChange}
        onChangeOptions={handleMultiChange}
      />
      <SearchFormArtist
        value={libraryFormState.artist}
        onChange={handleSelectChange}
        target="library"
      />
      {isMobile && (
        <>
          <div onClick={handleClearButton} className="float-right-middle clear">
            <div className="pt-1 float-clear">
              <X viewBox="0 0 16 16" />
            </div>
          </div>
          <div
            ref={refError}
            onClick={handleSubmitButton}
            className="float-right-bottom search"
          >
            <div className="pt-2 float-search">
              {!spinnerState ? (
                <Check2 viewBox="0 0 16 16" />
              ) : (
                <Spinner animation="border" variant="light" />
              )}
            </div>
            <ErrorOverlay
              show={showError}
              target={refError.current}
              placement="left"
            >
              NO CARDS FOUND
            </ErrorOverlay>
          </div>
        </>
      )}
    </form>
  );
}

export default SearchLibraryForm;
