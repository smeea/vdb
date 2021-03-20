import React, { useState, useEffect, useRef } from 'react';
import { Spinner, Overlay } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';
import X from '../../assets/images/icons/x.svg';
import SearchFormTextAndButtons from './SearchFormTextAndButtons.jsx';
import SearchCryptFormDisciplines from './SearchCryptFormDisciplines.jsx';
import SearchCryptFormVirtues from './SearchCryptFormVirtues.jsx';
import SearchCryptFormCapacity from './SearchCryptFormCapacity.jsx';
import SearchCryptFormClan from './SearchCryptFormClan.jsx';
import SearchCryptFormSect from './SearchCryptFormSect.jsx';
import SearchCryptFormVotes from './SearchCryptFormVotes.jsx';
import SearchCryptFormTitles from './SearchCryptFormTitles.jsx';
import SearchCryptFormGroup from './SearchCryptFormGroup.jsx';
import SearchCryptFormTraits from './SearchCryptFormTraits.jsx';
import SearchFormSet from './SearchFormSet.jsx';
import SearchFormPrecon from './SearchFormPrecon.jsx';
import SearchFormArtist from './SearchFormArtist.jsx';

function SearchCryptForm(props) {
  const [spinnerState, setSpinnerState] = useState(false);
  const [preresults, setPreresults] = useState(undefined);
  const showLimit = 200;

  const [showError, setShowError] = useState(false);
  const refError = useRef(null);

  const defaults = {
    disciplines: {
      Abombwe: 0,
      Animalism: 0,
      Auspex: 0,
      Celerity: 0,
      Chimerstry: 0,
      Daimoinon: 0,
      Dementation: 0,
      Dominate: 0,
      Fortitude: 0,
      Melpominee: 0,
      Mytherceria: 0,
      Necromancy: 0,
      Obeah: 0,
      Obfuscate: 0,
      Obtenebration: 0,
      Potence: 0,
      Presence: 0,
      Protean: 0,
      Quietus: 0,
      Sanguinus: 0,
      Serpentis: 0,
      Spiritus: 0,
      Temporis: 0,
      Thanatosis: 0,
      Thaumaturgy: 0,
      Valeren: 0,
      Vicissitude: 0,
      Visceratika: 0,
      Defense: 0,
      Innocence: 0,
      Judgment: 0,
      Martyrdom: 0,
      Redemption: 0,
      Vengeance: 0,
      Vision: 0,
    },
    capacity: {
      capacity: 'any',
      moreless: 'le',
    },
    clan: 'any',
    sect: 'any',
    votes: 'any',
    titles: {
      primogen: false,
      prince: false,
      justicar: false,
      innercircle: false,
      baron: false,
      '1 votes': false,
      '2 votes': false,
      bishop: false,
      archbishop: false,
      priscus: false,
      cardinal: false,
      regent: false,
      magaji: false,
    },
    group: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
    },
    traits: {
      '1 intercept': false,
      '1 stealth': false,
      '1 bleed': false,
      '2 bleed': false,
      '1 strength': false,
      '1 strength': false,
      'additional strike': false,
      'optional maneuver': false,
      'optional press': false,
      prevent: false,
      aggravated: false,
      'enter combat': false,
      'black hand': false,
      seraph: false,
      infernal: false,
      'red list': false,
      flight: false,
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

  const handleDisciplinesChange = (event) => {
    const { id, name } = event.target;
    const newState = props.formState.disciplines;
    const max = name == 'disciplines' ? 2 : 1;

    if (newState[id] < max) {
      newState[id] += 1;
    } else {
      newState[id] = 0;
    }
    props.setFormState((prevState) => ({
      ...prevState,
      disciplines: newState,
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
    const url = `${process.env.API_URL}search/crypt`;

    const state = { ...props.formState };
    state['text'] = text;

    const input = JSON.parse(JSON.stringify(state));

    const multiSelectForms = ['disciplines', 'titles', 'group', 'traits'];

    multiSelectForms.map((i) => {
      Object.keys(input[i]).forEach(
        (k) => input[i][k] == 0 && delete input[i][k]
      );
    });

    const multiSelectFormsWithMain = ['set', 'precon', 'capacity'];

    multiSelectFormsWithMain.map((i) => {
      if (input[i][i] == 'any') {
        delete input[i];
      }
    });

    Object.keys(input).forEach(
      (k) =>
        (input[k] == 'any' ||
          !input[k] ||
          Object.keys(input[k]).length === 0) &&
        delete input[k]
    );
    if (input['capacity'] == null) {
      delete input['capacitymoreless'];
    }

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
      <SearchCryptFormDisciplines
        value={props.formState.disciplines}
        onChange={handleDisciplinesChange}
      />
      <SearchCryptFormVirtues
        value={props.formState.disciplines}
        onChange={handleDisciplinesChange}
      />
      <SearchCryptFormCapacity
        value={props.formState.capacity}
        onChange={handleNestedChange}
        onMorelessChange={handleMorelessChange}
      />
      <SearchCryptFormClan
        value={props.formState.clan}
        onChange={handleSelectChange}
        isMobile={props.isMobile}
      />
      <SearchCryptFormSect
        value={props.formState.sect}
        onChange={handleSelectChange}
      />
      <SearchCryptFormVotes
        value={props.formState.votes}
        onChange={handleSelectChange}
      />
      <SearchCryptFormTitles
        value={props.formState.titles}
        onChange={handleMultiChange}
      />
      <SearchCryptFormGroup
        value={props.formState.group}
        onChange={handleMultiChange}
      />
      <SearchCryptFormTraits
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
        target="crypt"
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

export default SearchCryptForm;
