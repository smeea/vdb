import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Spinner } from 'react-bootstrap';
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
import ErrorOverlay from './ErrorOverlay.jsx';
import defaults from './forms_data/defaultsCryptForm.json';
import sanitizeFormState from './sanitizeFormState.js';
import AppContext from '../../context/AppContext.js';

function SearchCryptForm(props) {
  const {
    setShowCryptSearch,
    cryptResults,
    setCryptResults,
    cryptFormState,
    setCryptFormState,
    cryptCardBase,
    inventoryMode,
    hideMissing,
    setHideMissing,
    isMobile,
    inventoryCrypt,
  } = useContext(AppContext);

  const [spinnerState, setSpinnerState] = useState(false);
  const [preresults, setPreresults] = useState(undefined);
  const showLimit = 300;

  const navigate = useNavigate();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));

  useEffect(() => {
    if (cryptCardBase && query) {
      setCryptFormState((prevState) => {
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
  }, [cryptCardBase]);

  const [showError, setShowError] = useState(false);
  const refError = useRef(null);

  const handleTextChange = (event) => {
    const value = event.target.value;
    setCryptFormState((prevState) => ({
      ...prevState,
      text: value,
    }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event;
    setCryptFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (event, id) => {
    const i = id.name;
    const { name, value } = event;

    setCryptFormState((prevState) => {
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
    const newState = cryptFormState[name];
    newState[value] = !newState[value];
    setCryptFormState((prevState) => ({
      ...prevState,
      [name]: newState,
    }));
  };

  const handleNestedChange = (event) => {
    const { name, value } = event;
    const newState = cryptFormState[name];
    newState[name] = value;
    setCryptFormState((prevState) => ({
      ...prevState,
      [name]: newState,
    }));
  };

  const handleMorelessChange = (event) => {
    const { name, value } = event;
    const newState = cryptFormState[name];
    newState['moreless'] = value;
    setCryptFormState((prevState) => ({
      ...prevState,
      [name]: newState,
    }));
  };

  const handleDisciplinesChange = (event) => {
    const { id, name } = event.target;
    const newState = cryptFormState.disciplines;
    const max = name == 'disciplines' ? 2 : 1;

    if (newState[id] < max) {
      newState[id] += 1;
    } else {
      newState[id] = 0;
    }
    setCryptFormState((prevState) => ({
      ...prevState,
      disciplines: newState,
    }));
  };

  const handleClearButton = () => {
    if (!isMobile) navigate('/crypt');
    setCryptFormState(JSON.parse(JSON.stringify(defaults)));
    setCryptResults(undefined);
    setPreresults(undefined);
    setShowError(false);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    launchRequest();
  };

  const handleShowResults = () => {
    setCryptResults(preresults);
  };

  const launchRequest = () => {
    const url = `${process.env.API_URL}search/crypt`;
    const input = sanitizeFormState('crypt', cryptFormState);

    if (Object.keys(input).length !== 0) {
      navigate(`/crypt?q=${encodeURIComponent(JSON.stringify(input))}`);

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
          setShowCryptSearch(false);
          setSpinnerState(false);
          const res = data.map((i) => {
            return cryptCardBase[i];
          });
          if (!isMobile) {
            if (hideMissing) {
              setPreresults(() =>
                res.filter((card) => inventoryCrypt[card.Id])
              );
            } else {
              setPreresults(res);
            }
          } else {
            setCryptResults(res);
          }
        })
        .catch((error) => {
          setSpinnerState(false);
          if (isMobile) navigate('/crypt');
          setCryptResults([]);
          setPreresults([]);
          setShowError(true);
        });
    } else {
      setCryptResults(undefined);
      setPreresults(undefined);
    }
  };

  useEffect(() => {
    if (isMobile && query && cryptFormState) {
      launchRequest();
    }
  }, [cryptFormState]);

  useEffect(() => {
    if (!isMobile) {
      if (
        JSON.stringify(cryptFormState) == JSON.stringify(defaults) &&
        cryptResults
      ) {
        setCryptResults(undefined);
      } else if (!cryptFormState.text || cryptFormState.text.length > 2) {
        launchRequest();
      }
    }
  }, [cryptFormState, hideMissing]);

  useEffect(() => {
    if (!isMobile && preresults) {
      if (preresults.length < showLimit) {
        setCryptResults(preresults);
      } else {
        setCryptResults(undefined);
      }
    }
  }, [preresults]);

  return (
    <Form onSubmit={handleSubmitButton}>
      <SearchFormTextAndButtons
        value={cryptFormState.text}
        onChange={handleTextChange}
        handleShowResults={handleShowResults}
        handleClearButton={handleClearButton}
        preresults={preresults ? preresults.length : null}
        showLimit={showLimit}
      />
      {inventoryMode && (
        <div className={isMobile ? 'pt-1 ps-1' : 'ps-2'}>
          <Form.Check
            type="checkbox"
            id="hideMissing"
            label="Search in Inventory"
            onChange={() => setHideMissing(!hideMissing)}
          />
        </div>
      )}
      <SearchCryptFormDisciplines
        value={cryptFormState.disciplines}
        onChange={handleDisciplinesChange}
      />
      <SearchCryptFormVirtues
        value={cryptFormState.disciplines}
        onChange={handleDisciplinesChange}
      />
      <SearchCryptFormCapacity
        value={cryptFormState.capacity}
        onChange={handleNestedChange}
        onMorelessChange={handleMorelessChange}
      />
      <SearchCryptFormClan
        value={{ name: 'clan', ...cryptFormState.clan }}
        onChange={handleMultiSelectChange}
        setFormState={setCryptFormState}
      />
      <SearchCryptFormSect
        value={{ name: 'sect', ...cryptFormState.sect }}
        onChange={handleMultiSelectChange}
        setFormState={setCryptFormState}
      />
      <SearchCryptFormVotes
        value={cryptFormState.votes}
        onChange={handleSelectChange}
      />
      <SearchCryptFormTitles
        value={cryptFormState.titles}
        onChange={handleMultiChange}
      />
      <SearchCryptFormGroup
        value={cryptFormState.group}
        onChange={handleMultiChange}
      />
      <SearchCryptFormTraits
        value={cryptFormState.traits}
        onChange={handleMultiChange}
      />
      <SearchFormSet
        value={{ name: 'set', ...cryptFormState.set }}
        onChange={handleMultiSelectChange}
        onChangeOptions={handleMultiChange}
        setFormState={setCryptFormState}
      />
      <SearchFormPrecon
        value={{ name: 'precon', ...cryptFormState.precon }}
        onChange={handleMultiSelectChange}
        onChangeOptions={handleMultiChange}
        setFormState={setCryptFormState}
      />
      <SearchFormArtist
        value={cryptFormState.artist}
        onChange={handleSelectChange}
        target="crypt"
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
              show={showError}
              target={refError.current}
              placement="left"
            >
              NO CARDS FOUND
            </ErrorOverlay>
          </div>
        </>
      )}
    </Form>
  );
}

export default SearchCryptForm;
