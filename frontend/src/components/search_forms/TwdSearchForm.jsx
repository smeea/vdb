import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { Form, Row, Col, Spinner } from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import X from 'assets/images/icons/x.svg';
import { ErrorOverlay } from 'components';
import {
  TwdSearchFormButtons,
  TwdSearchFormPlayer,
  TwdSearchFormPlayers,
  TwdSearchFormLocation,
  TwdSearchFormEvent,
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
} from './twd_search_components';
import { sanitizeFormState } from 'utils';
import { useApp, setTwdResults, searchTwdForm, clearSearchForm } from 'context';

const TwdSearchForm = () => {
  const { cryptCardBase, libraryCardBase, inventoryMode, isMobile } = useApp();
  const twdFormState = useSnapshot(searchTwdForm);
  const [spinnerState, setSpinnerState] = useState(false);
  const navigate = useNavigate();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));

  useEffect(() => {
    if (query) {
      Object.keys(query).map((i) => {
        if (typeof query[i] === 'object') {
          Object.keys(query[i]).map((j) => {
            searchTwdForm[i][j] = query[i][j];
          });
        } else {
          searchTwdForm[i] = query[i];
        }
      });
    }
  }, []);

  useEffect(() => {
    if (isMobile && query && twdFormState && cryptCardBase && libraryCardBase) {
      launchRequest();
    }
  }, [twdFormState, cryptCardBase, libraryCardBase]);

  const [error, setError] = useState(false);
  const refError = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    searchTwdForm[name] = value;
  };

  const handleEventChange = (event) => {
    searchTwdForm.event = event.target.value;
  };

  const handleChangeWithOpt = (event, id) => {
    const i = id.name;
    const { name, value } = event;
    searchTwdForm[i][name] = value;
  };

  const handleMultiChange = (event) => {
    const { name, id, value } = event.target;
    const i = value ?? id;

    searchTwdForm[name][i] = !twdFormState[name][i];
  };

  const handleMatchInventoryScalingChange = (e) => {
    if (e.target.checked) {
      searchTwdForm.matchInventory.scaling = e.target.name;
    } else {
      searchTwdForm.matchInventory.scaling = false;
    }
  };

  const handleClearButton = () => {
    clearSearchForm('twd');
    setTwdResults(undefined);
    setError(false);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    cryptCardBase && libraryCardBase && launchRequest();
  };

  const launchRequest = () => {
    // TODO compare with crypt
    const url = `${process.env.API_URL}search/twd`;
    const input = sanitizeFormState('twd', twdFormState);

    if (Object.entries(input).length === 0) {
      setError('EMPTY REQUEST');
      return;
    }

    navigate(`/twd?q=${encodeURIComponent(JSON.stringify(input))}`);

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
        setSpinnerState(false);
        setTwdResults(data);
      })
      .catch((error) => {
        setSpinnerState(false);

        if (error.message == 400) {
          setTwdResults([]);
          setError('NO DECKS FOUND');
        } else {
          setTwdResults(null);
          setError('CONNECTION PROBLEM');
        }
      });
  };

  const getNewTwd = (q) => {
    setSpinnerState(true);
    setError(false);
    clearSearchForm('twd');

    const url = `${process.env.API_URL}twd/new/${q}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then((data) => {
        setSpinnerState(false);
        setTwdResults(data);
      })
      .catch((error) => {
        setSpinnerState(false);

        if (error.message == 400) {
          setTwdResults([]);
          setError('NO DECKS FOUND');
        } else {
          setTwdResults(null);
          setError('CONNECTION PROBLEM');
        }
      });
  };

  const getRandomTwd = (q) => {
    setSpinnerState(true);
    setError(false);
    clearSearchForm('twd');

    const url = `${process.env.API_URL}twd/random/${q}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setSpinnerState(false);
        setTwdResults(data);
      })
      .catch((error) => {
        setSpinnerState(false);

        if (error.message == 400) {
          setTwdResults([]);
          setError('NO DECKS FOUND');
        } else {
          setTwdResults(null);
          setError('CONNECTION PROBLEM');
        }
      });
  };

  useEffect(() => {
    if (!isMobile && cryptCardBase && libraryCardBase) {
      const input = sanitizeFormState('twd', twdFormState);
      if (Object.keys(input).length === 0) {
        if (query) {
          setTwdResults(undefined);
          navigate('/twd');
        }
      } else if (!twdFormState.event || twdFormState.event.length > 2) {
        launchRequest();
      }
    }
  }, [twdFormState, cryptCardBase, libraryCardBase]);

  return (
    <Form onSubmit={handleSubmitButton}>
      <Row className="pb-2 mx-0">
        <TwdSearchFormButtons
          handleClearButton={handleClearButton}
          getNew={getNewTwd}
          getRandom={getRandomTwd}
        />
      </Row>
      {inventoryMode && (
        <>
          <Row className="py-1 ps-1 mx-0 align-items-center">
            <Col xs={6} className="d-flex px-0">
              <label className="bold blue mb-0">In Inventory by Crypt:</label>
            </Col>
            <Col xs={6} className="d-inline px-0">
              <TwdSearchFormMatchInventory
                value={twdFormState.matchInventory.crypt}
                target={'crypt'}
                onChange={handleChangeWithOpt}
              />
            </Col>
          </Row>
          <Row className="py-1 ps-1 mx-0 align-items-center">
            <Col xs={6} className="d-flex px-0">
              <label className="bold blue mb-0">In Inventory by Library:</label>
            </Col>
            <Col xs={6} className="d-inline px-0">
              <TwdSearchFormMatchInventory
                value={twdFormState.matchInventory.library}
                target={'library'}
                onChange={handleChangeWithOpt}
              />
            </Col>
          </Row>
          <Row className="py-1 ps-1 mx-0 align-items-center">
            <Col xs={{ span: 6, offset: 6 }} className="d-inline px-0">
              <TwdSearchFormMatchInventoryScaling
                target="60"
                value={twdFormState.matchInventory.scaling}
                onChange={handleMatchInventoryScalingChange}
              />
              <TwdSearchFormMatchInventoryScaling
                target="75"
                value={twdFormState.matchInventory.scaling}
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
            value={twdFormState.date}
            onChange={handleChangeWithOpt}
          />
        </Col>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={2} className="d-flex px-0">
          <div className="bold blue px-0">Players:</div>
        </Col>
        <Col xs={10} className="d-inline px-0">
          <TwdSearchFormPlayers
            value={twdFormState.players}
            onChange={handleChangeWithOpt}
          />
        </Col>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <div className="bold blue px-0">Crypt Cards:</div>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={12} className="d-inline px-0">
          {cryptCardBase && (
            <TwdSearchFormCrypt
              value={twdFormState.crypt}
              form={searchTwdForm.crypt}
            />
          )}
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
            checked={twdFormState.traits.star}
            onChange={handleMultiChange}
          />
        </div>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <div className="bold blue px-0">Library Cards:</div>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={12} className="d-inline px-0">
          {libraryCardBase && (
            <TwdSearchFormLibrary
              value={twdFormState.crypt}
              form={searchTwdForm.crypt}
            />
          )}
        </Col>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <div className="bold blue px-0">Library Size:</div>
        </Col>
        <Col xs={9} className="d-flex justify-content-end px-0">
          <TwdSearchFormLibraryTotal
            value={twdFormState.libraryTotal}
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
            value={twdFormState.clan}
            onChange={handleChange}
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
            checked={twdFormState.traits.monoclan}
            onChange={handleMultiChange}
          />
        </div>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={5} className="d-flex px-0">
          <div className="bold blue px-0">Capacity Average:</div>
        </Col>
        <Col xs={7} className="d-flex justify-content-end px-0">
          <TwdSearchFormCapacity
            value={twdFormState.capacity}
            onChange={handleMultiChange}
          />
        </Col>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <div className="bold blue px-0">Library Disciplines:</div>
      </Row>
      <TwdSearchFormDisciplines
        disciplines={twdFormState.disciplines}
        onChange={handleMultiChange}
      />
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={12} className="d-inline pe-0 ps-1">
          <TwdSearchFormCardtypes
            value={twdFormState.cardtypes}
            onChange={handleChangeWithOpt}
          />
        </Col>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <div className="bold blue px-0">Event:</div>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormEvent
            value={twdFormState.event}
            onChange={handleEventChange}
          />
        </Col>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <div className="bold blue px-0">Location:</div>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormLocation
            value={twdFormState.location}
            form={searchTwdForm}
          />
        </Col>
      </Row>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <div className="bold blue px-0">Winner:</div>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormPlayer
            value={twdFormState.author}
            form={searchTwdForm}
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

export default TwdSearchForm;
