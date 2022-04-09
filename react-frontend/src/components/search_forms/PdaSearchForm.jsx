import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Row, Col, Spinner } from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import X from 'assets/images/icons/x.svg';
import { ErrorOverlay } from 'components';
import {
  TwdSearchFormDate,
  TwdSearchFormClan,
  TwdSearchFormCardtypes,
  TwdSearchFormCapacity,
  TwdSearchFormDisciplines,
  TwdSearchFormCrypt,
  TwdSearchFormLibrary,
  TwdSearchFormLibraryTotal,
  TwdSearchFormMatchInventory,
  TwdSearchFormMatchInventoryScaling,
  TwdSearchFormPlayer,
  TwdSearchFormButtons,
} from './twd_search_components';
import { PdaSearchFormSrcSelector } from './pda_search_components';

import defaults from 'components/forms_data/defaultsPdaForm.json';
import { sanitizeFormState } from 'utils';
import { useApp, useSearchForms, useSearchResults } from 'context';

function PdaSearchForm(props) {
  const {
    username,
    cryptCardBase,
    libraryCardBase,
    setShowPdaSearch,
    inventoryMode,
    isMobile,
  } = useApp();

  const { pdaFormState, setPdaFormState } = useSearchForms();
  const { pdaResults, setPdaResults } = useSearchResults();

  const [spinnerState, setSpinnerState] = useState(false);
  const showLimit = 25;
  const navigate = useNavigate();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));

  useEffect(() => {
    if (cryptCardBase && libraryCardBase && query) {
      setPdaFormState((prevState) => {
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
  }, [cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (isMobile && query && pdaFormState) {
      launchRequest();
    }
  }, [pdaFormState]);

  const [showError, setShowError] = useState(false);
  const refError = useRef(null);

  const handleSelectChange = (event) => {
    const { name, value } = event;
    setPdaFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, id } = event.target;
    setPdaFormState((prevState) => ({
      ...prevState,
      [name]: id,
    }));
  };

  const handleCardtypeChange = (event) => {
    const { name, value } = event;
    const newState = pdaFormState.cardtypes;
    newState[name] = value;
    setPdaFormState((prevState) => ({
      ...prevState,
      cardtypes: newState,
    }));
  };

  const handleDateChange = (event) => {
    const { name, value } = event;
    const newState = pdaFormState.date;
    newState[name] = value;
    setPdaFormState((prevState) => ({
      ...prevState,
      date: newState,
    }));
  };

  const handleMatchInventoryChange = (event) => {
    const { name, value } = event;
    const newState = pdaFormState.matchInventory;
    newState[name] = value;
    setPdaFormState((prevState) => ({
      ...prevState,
      matchInventory: newState,
    }));
  };

  const handleMatchInventoryScalingChange = (e) => {
    const newState = pdaFormState.matchInventory;
    if (e.target.checked) {
      newState.scaling = e.target.name;
    } else {
      newState.scaling = false;
    }
    setPdaFormState((prevState) => ({
      ...prevState,
      matchInventory: newState,
    }));
  };

  const handleMultiChange = (event) => {
    const { name, id, value } = event.target;
    const newState = pdaFormState[name];
    const i = value ? value : id;
    newState[i] = !newState[i];
    setPdaFormState((prevState) => ({
      ...prevState,
      [name]: newState,
    }));
  };

  const handleClearButton = () => {
    setPdaFormState(JSON.parse(JSON.stringify(defaults)));
    setPdaResults(undefined);
    setShowError(false);
    navigate('/pda');
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    launchRequest();
  };

  const launchRequest = () => {
    const url = `${process.env.API_URL}search/pda`;
    const input = sanitizeFormState('pda', pdaFormState);

    if (Object.entries(input).length === 0) {
      setShowError('EMPTY REQUEST');
      return;
    }

    navigate(`/pda?q=${encodeURIComponent(JSON.stringify(input))}`);

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
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then((data) => {
        setSpinnerState(false);
        setShowPdaSearch(false);
        setPdaResults(data);
      })
      .catch((error) => {
        setSpinnerState(false);
        setPdaResults([]);
        if (
          error.message == 'NetworkError when attempting to fetch resource.'
        ) {
          setShowError('CONNECTION PROBLEM');
        } else {
          setShowError(true);
        }
      });
  };

  const getNewPda = (q) => {
    setSpinnerState(true);
    setShowError(false);
    setPdaFormState(JSON.parse(JSON.stringify(defaults)));
    navigate('/pda');

    const url = `${process.env.API_URL}pda/new/${q}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setSpinnerState(false);
        setShowPdaSearch(false);
        setPdaResults(data);
      })
      .catch((error) => {
        setSpinnerState(false);
        setPdaResults([]);
        setShowError(true);
      });
  };

  const getRandomPda = (q) => {
    setSpinnerState(true);
    setShowError(false);
    setPdaFormState(JSON.parse(JSON.stringify(defaults)));
    navigate('/pda');

    const url = `${process.env.API_URL}pda/random/${q}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setSpinnerState(false);
        setShowPdaSearch(false);
        setPdaResults(data);
      })
      .catch((error) => {
        setSpinnerState(false);
        if (pdaResults) {
          setPdaResults([]);
        }
      });
  };

  useEffect(() => {
    if (!isMobile) {
      const input = sanitizeFormState('pda', pdaFormState);
      if (Object.keys(input).length === 0) {
        if (query) {
          navigate('/pda');
          setPdaResults(undefined);
        }
      } else launchRequest();
    }
  }, [pdaFormState]);

  return (
    <Form onSubmit={handleSubmitButton}>
      <TwdSearchFormButtons
        handleClearButton={handleClearButton}
        showLimit={showLimit}
        getNew={getNewPda}
        getRandom={getRandomPda}
      />
      {username && (
        <div className="px-1 py-2">
          <PdaSearchFormSrcSelector
            value={pdaFormState.src}
            onChange={handleCheckboxChange}
          />
        </div>
      )}
      {inventoryMode && (
        <>
          <Row className="py-1 ps-1 mx-0 align-items-center">
            <Col xs={6} className="d-flex px-0">
              <label className="h6 mb-0">In Inventory by Crypt:</label>
            </Col>
            <Col xs={6} className="d-inline px-0">
              <TwdSearchFormMatchInventory
                value={pdaFormState.matchInventory.crypt}
                name={'crypt'}
                onChange={handleMatchInventoryChange}
              />
            </Col>
          </Row>
          <Row className="py-1 ps-1 mx-0 align-items-center">
            <Col xs={6} className="d-flex px-0">
              <label className="h6 mb-0">In Inventory by Library:</label>
            </Col>
            <Col xs={6} className="d-inline px-0">
              <TwdSearchFormMatchInventory
                value={pdaFormState.matchInventory.library}
                name={'library'}
                onChange={handleMatchInventoryChange}
              />
            </Col>
          </Row>
          <Row className="py-1 ps-1 mx-0 align-items-center">
            <Col xs={{ span: 6, offset: 6 }} className="d-inline px-0">
              <TwdSearchFormMatchInventoryScaling
                target="60"
                value={pdaFormState.matchInventory.scaling}
                onChange={handleMatchInventoryScalingChange}
              />
              <TwdSearchFormMatchInventoryScaling
                target="75"
                value={pdaFormState.matchInventory.scaling}
                onChange={handleMatchInventoryScalingChange}
              />
            </Col>
          </Row>
        </>
      )}
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={2} className="d-flex px-0">
          <div className="bold blue px-0">Year:</div>
        </Col>
        <Col xs={10} className="d-inline px-0">
          <TwdSearchFormDate
            date={pdaFormState.date}
            onChange={handleDateChange}
            inPda
          />
        </Col>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <div className="bold blue px-0">Crypt Cards:</div>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={12} className="d-inline px-0">
          <TwdSearchFormCrypt
            state={pdaFormState.crypt}
            setState={setPdaFormState}
            spinner={spinnerState}
          />
        </Col>
      </Row>
      <Row className="pb-1 pe-1 mx-0">
        <div className="d-flex justify-content-end">
          <Form.Check
            name="traits"
            value="star"
            type="checkbox"
            id="traits-star"
            label="With Star"
            onChange={(e) => handleMultiChange(e)}
          />
        </div>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <div className="bold blue px-0">Library Cards:</div>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={12} className="d-inline px-0">
          <TwdSearchFormLibrary
            state={pdaFormState.library}
            setState={setPdaFormState}
            spinner={spinnerState}
          />
        </Col>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <div className="bold blue px-0">Library Size:</div>
        </Col>
        <Col xs={9} className="d-flex justify-content-end px-0">
          <TwdSearchFormLibraryTotal
            value={pdaFormState.libraryTotal}
            onChange={handleMultiChange}
          />
        </Col>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <div className="bold blue px-0">Clan:</div>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormClan
            value={pdaFormState.clan}
            onChange={handleSelectChange}
          />
        </Col>
      </Row>
      <Row className="pb-1 pe-1 mx-0">
        <div className="d-flex justify-content-end">
          <Form.Check
            name="traits"
            value="monoclan"
            type="checkbox"
            id="traits-monoclan"
            label="Mono Clan"
            onChange={(e) => handleMultiChange(e)}
          />
        </div>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={5} className="d-flex px-0">
          <div className="bold blue px-0">Capacity Average:</div>
        </Col>
        <Col xs={7} className="d-flex justify-content-end px-0">
          <TwdSearchFormCapacity
            value={pdaFormState.capacity}
            onChange={handleMultiChange}
          />
        </Col>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <div className="bold blue px-0">Library Disciplines:</div>
      </Row>
      <TwdSearchFormDisciplines
        disciplines={pdaFormState.disciplines}
        onChange={handleMultiChange}
      />
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={12} className="d-inline pe-0 ps-1">
          <TwdSearchFormCardtypes
            value={pdaFormState.cardtypes}
            onChange={handleCardtypeChange}
          />
        </Col>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <div className="bold blue px-0">Author:</div>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormPlayer
            value={pdaFormState.author}
            setValue={setPdaFormState}
            inPda
          />
        </Col>
      </Row>
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
              {showError === true ? 'NO DECKS FOUND' : showError}
            </ErrorOverlay>
          </div>
        </>
      )}
    </Form>
  );
}

export default PdaSearchForm;
