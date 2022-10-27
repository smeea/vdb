import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
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
import { sanitizeFormState } from 'utils';
import { useFilters } from 'hooks';
import {
  useApp,
  setCryptResults,
  searchCryptForm,
  clearSearchForm,
} from 'context';

const CryptSearchForm = () => {
  const {
    cryptCardBase,
    hideMissing,
    setHideMissing,
    setShowCryptSearch,
    inventoryCrypt,
    inventoryMode,
    isMobile,
    playtest,
  } = useApp();

  const cryptForm = useSnapshot(searchCryptForm);
  const setCryptFormState = () => {};
  const { filterCrypt } = useFilters(cryptCardBase);

  const [spinnerState, setSpinnerState] = useState(false);
  const [preresults, setPreresults] = useState(undefined);
  const showLimit = 300;

  const navigate = useNavigate();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));

  useEffect(() => {
    if (query) {
      Object.keys(query).map((i) => {
        if (typeof query[i] === 'object') {
          Object.keys(query[i]).map((j) => {
            searchCryptForm[i][j] = query[i][j];
          });
        } else {
          searchCryptForm[i] = query[i];
        }
      });
    }
  }, []);

  const [error, setError] = useState(false);
  const refError = useRef(null);

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    searchCryptForm.text[name].value = value;
  };

  const handleTextCheckboxesChange = (event) => {
    const { name, value } = event.currentTarget;
    if (['name', 'text'].includes(value)) {
      searchCryptForm.text[name]['in'] =
        searchCryptForm.text[name]['in'] === value ? false : value;
    } else {
      searchCryptForm.text[name][value] = !searchCryptForm.text[name][value];
    }
  };

  const handleSelectChange = (event) => {
    const { name, value } = event;
    searchCryptForm[name] = value;
  };

  const handleMultiSelectChange = (event, id) => {
    const i = id.name;
    const { name, value } = event;

    if (['capacity'].includes(name)) {
      if (['le', 'ge', 'eq'].includes(value)) {
        searchCryptForm[name].value[i]['moreless'] = value;
      } else {
        searchCryptForm[name].value[i][name] = value;
      }
    } else {
      searchCryptForm[name].value[i] = value;
    }
  };

  const handleMultiChange = (event) => {
    const { name, value } = event.currentTarget;

    if (['or-newer', 'or-older', 'not-newer', 'not-older'].includes(value)) {
      searchCryptForm[name]['age'] =
        searchCryptForm[name]['age'] === value ? false : value;
    } else if (['only', 'first', 'reprint'].includes(value)) {
      searchCryptForm[name]['print'] =
        searchCryptForm[name]['print'] === value ? false : value;
    } else {
      searchCryptForm[name][value] = !searchCryptForm[name][value];
    }
  };

  const handleDisciplinesChange = (event) => {
    const { id, name } = event.target;
    const max = name == 'disciplines' ? 2 : 1;

    if (cryptForm.disciplines[id] < max) {
      searchCryptForm.disciplines[id] += 1;
    } else {
      searchCryptForm.disciplines[id] = 0;
    }
  };

  const handleClearButton = () => {
    clearSearchForm('crypt');
    setCryptResults(undefined);
    setPreresults(undefined);
    setError(false);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    processSearch();
  };

  const handleShowResults = () => {
    setCryptResults(preresults);
  };

  const processSearch = () => {
    const sanitizeForm = sanitizeFormState('crypt', cryptForm);
    setError(false);

    if (Object.entries(sanitizeForm).length === 0) {
      setError('EMPTY REQUEST');
      return;
    }

    navigate(`/crypt?q=${encodeURIComponent(JSON.stringify(sanitizeForm))}`);

    setSpinnerState(true);

    const filteredCards = filterCrypt(sanitizeForm).filter(
      (card) => playtest || card.Id < 210000
    );

    setSpinnerState(false);

    if (!isMobile) {
      if (hideMissing && inventoryMode) {
        setPreresults(() =>
          filteredCards.filter((card) => inventoryCrypt[card.Id])
        );
      } else {
        setPreresults(filteredCards);
      }
    } else {
      if (hideMissing && inventoryMode) {
        setCryptResults(
          filteredCards.filter((card) => inventoryCrypt[card.Id])
        );
      } else {
        setCryptResults(filteredCards);
      }
      if (filteredCards.length == 0) {
        navigate('/crypt');
        setError('NO CARDS FOUND');
      } else {
        setShowCryptSearch(false);
      }
    }
  };

  useEffect(() => {
    if (isMobile && query && cryptForm && cryptCardBase) {
      processSearch();
    }
  }, [cryptForm, cryptCardBase]);

  useEffect(() => {
    if (!isMobile && cryptCardBase) {
      const input = sanitizeFormState('crypt', cryptForm);
      if (Object.keys(input).length === 0) {
        if (query) {
          setCryptResults(undefined);
          setPreresults(undefined);
          navigate('/crypt');
        }
      } else if (
        !cryptForm.text[0].value ||
        cryptForm.text[0].value.length > 2
      ) {
        processSearch();
      }
    }
  }, [cryptForm, hideMissing, inventoryMode, cryptCardBase]);

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
        value={cryptForm.text}
        onChange={handleTextChange}
        onChangeOptions={handleTextCheckboxesChange}
        searchForm={searchCryptForm}
        handleShowResults={handleShowResults}
        handleClearButton={handleClearButton}
        preresults={preresults ? preresults.length : null}
        showLimit={showLimit}
        hideMissing={hideMissing}
        setHideMissing={setHideMissing}
      />
      <CryptSearchFormDisciplines
        value={cryptForm.disciplines}
        onChange={handleDisciplinesChange}
      />
      <CryptSearchFormVirtues
        value={cryptForm.disciplines}
        onChange={handleDisciplinesChange}
      />
      <CryptSearchFormCapacity
        value={cryptForm.capacity}
        onChange={handleMultiSelectChange}
        searchForm={searchCryptForm}
      />
      <CryptSearchFormClan
        value={cryptForm.clan}
        onChange={handleMultiSelectChange}
        searchForm={searchCryptForm}
      />
      <CryptSearchFormSect
        value={cryptForm.sect}
        onChange={handleMultiSelectChange}
        searchForm={searchCryptForm}
      />
      <CryptSearchFormVotes
        value={cryptForm.votes}
        onChange={handleSelectChange}
      />
      <CryptSearchFormTitles
        value={cryptForm.titles}
        onChange={handleMultiChange}
      />
      <CryptSearchFormGroup
        value={cryptForm.group}
        onChange={handleMultiChange}
      />
      <CryptSearchFormTraits
        value={cryptForm.traits}
        onChange={handleMultiChange}
      />
      <SearchFormSet
        value={cryptForm.set}
        onChange={handleMultiSelectChange}
        onChangeOptions={handleMultiChange}
        searchForm={searchCryptForm}
      />
      <SearchFormPrecon
        value={cryptForm.precon}
        onChange={handleMultiSelectChange}
        onChangeOptions={handleMultiChange}
        searchForm={searchCryptForm}
      />
      <SearchFormArtist
        value={cryptForm.artist}
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
