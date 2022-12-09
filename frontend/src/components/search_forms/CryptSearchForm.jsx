import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
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
  inventoryStore,
} from 'context';

const CryptSearchForm = () => {
  const {
    cryptCardBase,
    hideMissing,
    setHideMissing,
    setShowCryptSearch,
    inventoryMode,
    isMobile,
    playtest,
  } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const cryptFormState = useSnapshot(searchCryptForm);

  const { filterCrypt } = useFilters(cryptCardBase);

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
    // TODO idk why multiforms dont work without touching cryptFormState.text[name].value;
    if (cryptFormState.text[name].value) null;
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
        searchCryptForm[name].value[i].moreless = value;
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
    const max = name === 'disciplines' ? 2 : 1;

    if (cryptFormState.disciplines[id] < max) {
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
    setError(false);
    const sanitizedForm = sanitizeFormState('crypt', cryptFormState);

    if (Object.entries(sanitizedForm).length === 0) {
      setError('EMPTY REQUEST');
      return;
    }
    navigate(`/crypt?q=${encodeURIComponent(JSON.stringify(sanitizedForm))}`);

    const filteredCards = filterCrypt(sanitizedForm).filter(
      (card) => playtest || card.Id < 210000
    );

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
    if (isMobile && query && cryptFormState && cryptCardBase) {
      processSearch();
    }
  }, [cryptFormState, cryptCardBase]);

  useEffect(() => {
    if (!isMobile && cryptCardBase) {
      const input = sanitizeFormState('crypt', cryptFormState);
      if (Object.keys(input).length === 0) {
        if (query) {
          setCryptResults(undefined);
          setPreresults(undefined);
          navigate('/crypt');
        }
      } else if (
        !cryptFormState.text[0].value ||
        cryptFormState.text[0].value.length > 2
      ) {
        processSearch();
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
    <form onSubmit={handleSubmitButton}>
      <SearchFormTextAndButtons
        value={cryptFormState.text}
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
        value={cryptFormState.disciplines}
        onChange={handleDisciplinesChange}
      />
      <CryptSearchFormVirtues
        value={cryptFormState.disciplines}
        onChange={handleDisciplinesChange}
      />
      <CryptSearchFormCapacity
        value={cryptFormState.capacity}
        onChange={handleMultiSelectChange}
        searchForm={searchCryptForm}
      />
      <CryptSearchFormClan
        value={cryptFormState.clan}
        onChange={handleMultiSelectChange}
        searchForm={searchCryptForm}
      />
      <CryptSearchFormSect
        value={cryptFormState.sect}
        onChange={handleMultiSelectChange}
        searchForm={searchCryptForm}
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
        value={cryptFormState.set}
        onChange={handleMultiSelectChange}
        onChangeOptions={handleMultiChange}
        searchForm={searchCryptForm}
      />
      <SearchFormPrecon
        value={cryptFormState.precon}
        onChange={handleMultiSelectChange}
        onChangeOptions={handleMultiChange}
        searchForm={searchCryptForm}
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
            className="float-right-middle float-clear flex items-center justify-center"
          >
            <X viewBox="0 0 16 16" />
          </div>
          <div
            ref={refError}
            onClick={handleSubmitButton}
            className="float-right-bottom float-search flex items-center justify-center"
          >
            <Check2 viewBox="0 0 16 16" className="pt-1" />
            {error && <ErrorOverlay placement="left">{error}</ErrorOverlay>}
          </div>
        </>
      )}
    </form>
  );
};

export default CryptSearchForm;
