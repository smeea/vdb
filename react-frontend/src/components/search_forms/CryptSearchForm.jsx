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
  CryptSearchFormDisciplines,
  CryptSearchFormVirtues,
  CryptSearchFormCapacity,
  CryptSearchFormClan,
  CryptSearchFormSect,
  CryptSearchFormVotes,
  CryptSearchFormTitles,
  CryptSearchFormGroup,
  CryptSearchFormTraits,
} from './crypt_search_components';
import defaults from 'components/forms_data/defaultsCryptForm.json';
import { sanitizeFormState } from 'utils';
import { useApp, useSearchForms, useSearchResults } from 'context';

const CryptSearchForm = (props) => {
  const {
    cryptCardBase,
    hideMissing,
    setHideMissing,
    setShowCryptSearch,
    inventoryCrypt,
    inventoryMode,
    isMobile,
  } = useApp();

  const { cryptFormState, setCryptFormState } = useSearchForms();
  const { setCryptResults } = useSearchResults();

  const [spinnerState, setSpinnerState] = useState(false);
  const [preresults, setPreresults] = useState(undefined);
  const showLimit = 300;

  const navigate = useNavigate();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));

  useEffect(() => {
    if (query) {
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
  }, []);

  const [error, setError] = useState(false);
  const refError = useRef(null);

  const handleTextChange = (event) => {
    const { name, value } = event.target;

    setCryptFormState((prevState) => {
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
    const newState = cryptFormState.text;
    if (['name', 'text'].includes(value)) {
      newState[name]['in'] = newState[name]['in'] === value ? false : value;
    } else {
      newState[name][value] = !newState[name][value];
    }

    setCryptFormState((prevState) => ({
      ...prevState,
      text: newState,
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
    const { name, value } = event.currentTarget;
    const newState = cryptFormState[name];
    if (['or-newer', 'or-older', 'not-newer', 'not-older'].includes(value)) {
      newState['age'] = newState['age'] === value ? false : value;
    } else if (['only', 'first', 'reprint'].includes(value)) {
      newState['print'] = newState['print'] === value ? false : value;
    } else {
      newState[value] = !newState[value];
    }
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
    setError(false);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    cryptCardBase && launchRequest();
  };

  const handleShowResults = () => {
    setCryptResults(preresults);
  };

  const launchRequest = () => {
    const url = `${process.env.API_URL}search/crypt`;
    const input = sanitizeFormState('crypt', cryptFormState);

    if (Object.entries(input).length === 0) {
      setError('EMPTY REQUEST');
      return;
    }

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

    setError(false);
    setSpinnerState(true);

    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then((data) => {
        setShowCryptSearch(false);
        setSpinnerState(false);
        const res = data.map((i) => {
          return cryptCardBase[i];
        });
        if (!isMobile) {
          if (hideMissing && inventoryMode) {
            setPreresults(() => res.filter((card) => inventoryCrypt[card.Id]));
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
        if (error.message == 400) {
          setCryptResults([]);
          setPreresults([]);
          setError('NO CARDS FOUND');
        } else {
          setCryptResults(null);
          setError('CONNECTION PROBLEM');
        }
      });
  };

  useEffect(() => {
    if (isMobile && query && cryptFormState && cryptCardBase) {
      launchRequest();
    }
  }, [cryptFormState, cryptCardBase]);

  useEffect(() => {
    if (!isMobile && cryptCardBase) {
      const input = sanitizeFormState('crypt', cryptFormState);
      if (Object.keys(input).length === 0) {
        if (query) {
          setCryptResults(undefined);
          setPreresults(undefined);
        }
      } else if (
        !cryptFormState.text[0].value ||
        cryptFormState.text[0].value.length > 2
      ) {
        launchRequest();
      }
    }
  }, [cryptFormState, hideMissing, inventoryMode, cryptCardBase]);

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
        onChangeOptions={handleTextCheckboxesChange}
        setFormState={setCryptFormState}
        handleShowResults={handleShowResults}
        handleClearButton={handleClearButton}
        preresults={preresults ? preresults.length : null}
        showLimit={showLimit}
        hideMissing={hideMissing}
        setHideMissing={setHideMissing}
      />
      <CryptSearchFormDisciplines
        value={cryptFormState.disciplines}
        onChange={handleDisciplinesChange}
      />
      <CryptSearchFormVirtues
        value={cryptFormState.disciplines}
        onChange={handleDisciplinesChange}
      />
      <CryptSearchFormCapacity
        value={cryptFormState.capacity}
        onChange={handleNestedChange}
        onMorelessChange={handleMorelessChange}
      />
      <CryptSearchFormClan
        value={{ name: 'clan', ...cryptFormState.clan }}
        onChange={handleMultiSelectChange}
        setFormState={setCryptFormState}
      />
      <CryptSearchFormSect
        value={{ name: 'sect', ...cryptFormState.sect }}
        onChange={handleMultiSelectChange}
        setFormState={setCryptFormState}
      />
      <CryptSearchFormVotes
        value={cryptFormState.votes}
        onChange={handleSelectChange}
      />
      <CryptSearchFormTitles
        value={cryptFormState.titles}
        onChange={handleMultiChange}
      />
      <CryptSearchFormGroup
        value={cryptFormState.group}
        onChange={handleMultiChange}
      />
      <CryptSearchFormTraits
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

export default CryptSearchForm;
