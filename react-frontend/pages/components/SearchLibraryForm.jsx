import React, { useState, useEffect, useRef } from 'react';
import { Spinner, Overlay } from 'react-bootstrap';
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

function SearchLibraryForm(props) {
  const [spinnerState, setSpinnerState] = useState(false);
  const [preresults, setPreresults] = useState(undefined);
  const showLimit = 200;

  const [showError, setShowError] = useState(false);
  const refError = useRef(null);

  const defaults = {
    type: 'any',
    discipline: 'any',
    blood: {
      blood: 'any',
      moreless: 'le',
    },
    pool: {
      pool: 'any',
      moreless: 'le',
    },
    clan: 'any',
    sect: 'any',
    title: 'any',
    traits: {
      intercept: false,
      stealth: false,
      bleed: false,
      strength: false,
      dodge: false,
      'optional maneuver': false,
      'additional strike': false,
      aggravated: false,
      prevent: false,
      'optional press': false,
      'combat ends': false,
      'bounce bleed': false,
      'black hand': false,
      seraph: false,
      anarch: false,
      infernal: false,
    },
    set: {
      set: 'any',
      'only in': false,
      'first print': false,
    },
    precon: {
      precon: 'any',
      'only in': false,
      'first print': false,
    },
    artist: 'any',
  };

  const [text, setText] = useState('');
  const handleTextChange = (event) => setText(event.target.value);

  const handleSelectChange = (event) => {
    const { name, value } = event;
    props.setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMultiChange = (event) => {
    const { name, value } = event.target;
    const newState = props.formState[name];
    newState[value] = !newState[value];
    props.setFormState((prevState) => ({
      ...prevState,
      [name]: newState,
    }));
  };

  const handleNestedChange = (event) => {
    const { name, value } = event;
    const newState = props.formState[name];
    newState[name] = value;
    props.setFormState((prevState) => ({
      ...prevState,
      [name]: newState,
    }));
  };

  const handleMorelessChange = (event) => {
    const { name, value } = event;
    const newState = props.formState[name];
    newState['moreless'] = value;
    props.setFormState((prevState) => ({
      ...prevState,
      [name]: newState,
    }));
  };

  const handleClearButton = () => {
    setText('');
    props.setFormState(defaults);
    props.setResults(undefined);
    setPreresults(undefined);
    setShowError(false);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    launchRequest();
  };

  const handleShowResults = () => {
    props.setResults(preresults);
  };

  const launchRequest = () => {
    const url = `${process.env.API_URL}search/library`;

    const state = { ...props.formState };
    state['text'] = text;

    const input = JSON.parse(JSON.stringify(state));

    const multiSelectForms = ['traits'];

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
          props.setShowSearch(false);
          const res = data.map((i) => {
            return props.cardBase[i];
          });
          if (!props.isMobile) {
            setPreresults(res);
          } else {
            props.setResults(res);
          }
          setSpinnerState(false);
        })
        .catch((error) => {
          props.setResults([]);
          setPreresults([]);
          setShowError(true);
          setSpinnerState(false);
        });
    } else {
      props.setResults(undefined);
      setPreresults(undefined);
    }
  };

  useEffect(() => {
    if (!props.isMobile) {
      if (
        JSON.stringify(props.formState) == JSON.stringify(defaults) &&
        props.results &&
        !text
      ) {
        props.setResults(undefined);
      } else if (!text || text.length > 2) {
        launchRequest();
      }
    }
  }, [props.formState, text]);

  useEffect(() => {
    if (!props.isMobile) {
      if (preresults && preresults.length < showLimit) {
        props.setResults(preresults);
      } else {
        props.setResults(undefined);
      }
    }
  }, [preresults]);

  return (
    <form onSubmit={handleSubmitButton}>
      <SearchFormTextAndButtons
        value={text}
        onChange={handleTextChange}
        handleShowResults={handleShowResults}
        handleClearButton={handleClearButton}
        isMobile={props.isMobile}
        preresults={preresults ? preresults.length : null}
        showLimit={showLimit}
        spinner={spinnerState}
      />
      {props.inventoryMode ||
        (props.isMobile && props.isInventory && (
          <div className="custom-control custom-checkbox">
            <input
              id="hideMissing"
              className="custom-control-input"
              type="checkbox"
              checked={props.hideMissing}
              onChange={() => props.setHideMissing(!props.hideMissing)}
            />
            <label htmlFor="hideMissing" className="custom-control-label">
              Hide Missing in Inventory
            </label>
          </div>
        ))}
      <SearchLibraryFormType
        value={props.formState.type}
        onChange={handleSelectChange}
      />
      <SearchLibraryFormDiscipline
        value={props.formState.discipline}
        onChange={handleSelectChange}
        isMobile={props.isMobile}
      />
      <SearchLibraryFormClan
        value={props.formState.clan}
        onChange={handleSelectChange}
        isMobile={props.isMobile}
      />
      <SearchLibraryFormSect
        value={props.formState.sect}
        onChange={handleSelectChange}
      />
      <SearchLibraryFormTitle
        value={props.formState.title}
        onChange={handleSelectChange}
      />
      <SearchLibraryFormBloodCost
        value={props.formState.blood}
        onChange={handleNestedChange}
        onMorelessChange={handleMorelessChange}
      />
      <SearchLibraryFormPoolCost
        value={props.formState.pool}
        onChange={handleNestedChange}
        onMorelessChange={handleMorelessChange}
      />
      <SearchLibraryFormTraits
        value={props.formState.traits}
        onChange={handleMultiChange}
      />
      <SearchFormSet
        value={props.formState.set}
        onChange={handleNestedChange}
        onChangeOptions={handleMultiChange}
      />
      <SearchFormPrecon
        value={props.formState.precon}
        onChange={handleNestedChange}
        onChangeOptions={handleMultiChange}
      />
      <SearchFormArtist
        value={props.formState.artist}
        onChange={handleSelectChange}
        target="library"
      />
      {props.isMobile && (
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
            <Overlay
              show={showError}
              target={refError.current}
              placement="left"
              transition={false}
            >
              {({ placement, arrowProps, show: _show, popper, ...props }) => (
                <div className="error-tooltip" {...props}>
                  <b>NO CARDS FOUND</b>
                </div>
              )}
            </Overlay>
          </div>
        </>
      )}
    </form>
  );
}

export default SearchLibraryForm;
