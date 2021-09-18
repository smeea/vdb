import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Col, Spinner } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';
import X from '../../assets/images/icons/x.svg';
import ErrorOverlay from './ErrorOverlay.jsx';
import TwdSearchFormButtons from './TwdSearchFormButtons.jsx';
import TwdSearchFormPlayer from './TwdSearchFormPlayer.jsx';
import TwdSearchFormPlayers from './TwdSearchFormPlayers.jsx';
import TwdSearchFormLocation from './TwdSearchFormLocation.jsx';
import TwdSearchFormEvent from './TwdSearchFormEvent.jsx';
import TwdSearchFormDate from './TwdSearchFormDate.jsx';
import TwdSearchFormClan from './TwdSearchFormClan.jsx';
import TwdSearchFormCardtypes from './TwdSearchFormCardtypes.jsx';
import TwdSearchFormCapacity from './TwdSearchFormCapacity.jsx';
import TwdSearchFormTraitStar from './TwdSearchFormTraitStar.jsx';
import TwdSearchFormTraitMonoclan from './TwdSearchFormTraitMonoclan.jsx';
import TwdSearchFormDisciplines from './TwdSearchFormDisciplines.jsx';
import TwdSearchFormCrypt from './TwdSearchFormCrypt.jsx';
import TwdSearchFormLibrary from './TwdSearchFormLibrary.jsx';
import TwdSearchFormLibraryTotal from './TwdSearchFormLibraryTotal.jsx';
import TwdSearchFormMatchInventory from './TwdSearchFormMatchInventory.jsx';
import TwdSearchFormMatchInventoryScaling from './TwdSearchFormMatchInventoryScaling.jsx';
import defaults from './forms_data/defaultsTwdForm.json';
import sanitizeFormState from './sanitizeFormState.js';
import AppContext from '../../context/AppContext.js';

function TwdSearchForm(props) {
  const {
    setShowTwdSearch,
    setTwdResults,
    twdResults,
    twdFormState,
    setTwdFormState,
    cryptCardBase,
    libraryCardBase,
    inventoryMode,
    isMobile,
  } = useContext(AppContext);

  const [spinnerState, setSpinnerState] = useState(false);
  const showLimit = 25;
  const history = useHistory();
  const query = JSON.parse(new URLSearchParams(useLocation().search).get('q'));

  useEffect(() => {
    if (cryptCardBase && libraryCardBase && query) {
      setTwdFormState((prevState) => {
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
    if (isMobile && query && twdFormState) {
      launchRequest();
    }
  }, [twdFormState]);

  const [showError, setShowError] = useState(false);
  const refError = useRef(null);

  const handleEventChange = (event) => {
    const value = event.target.value;
    setTwdFormState((prevState) => ({
      ...prevState,
      event: value,
    }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event;
    setTwdFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCardtypeChange = (event) => {
    const { name, value } = event;
    const newState = twdFormState.cardtypes;
    newState[name] = value;
    setTwdFormState((prevState) => ({
      ...prevState,
      cardtypes: newState,
    }));
  };

  const handleDateChange = (event) => {
    const { name, value } = event;
    const newState = twdFormState.date;
    newState[name] = value;
    setTwdFormState((prevState) => ({
      ...prevState,
      date: newState,
    }));
  };

  const handlePlayersChange = (event) => {
    const { name, value } = event;
    const newState = twdFormState.players;
    newState[name] = value;
    setTwdFormState((prevState) => ({
      ...prevState,
      players: newState,
    }));
  };

  const handleMatchInventoryChange = (event) => {
    const { name, value } = event;
    const newState = twdFormState.matchInventory;
    newState[name] = value;
    setTwdFormState((prevState) => ({
      ...prevState,
      matchInventory: newState,
    }));
  };

  const handleMatchInventoryScalingChange = () => {
    const newState = twdFormState.matchInventory;
    newState.scaling = !twdFormState.matchInventory.scaling;
    setTwdFormState((prevState) => ({
      ...prevState,
      matchInventory: newState,
    }));
  };

  const handleMultiChange = (event) => {
    const { name, id, value } = event.target;
    const newState = twdFormState[name];
    const i = value ? value : id;
    newState[i] = !newState[i];
    setTwdFormState((prevState) => ({
      ...prevState,
      [name]: newState,
    }));
  };

  const handleClearButton = () => {
    setTwdFormState(JSON.parse(JSON.stringify(defaults)));
    setTwdResults(undefined);
    setShowError(false);
    history.push('/twd');
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    launchRequest();
  };

  const launchRequest = () => {
    const url = `${process.env.API_URL}search/twd`;
    const input = sanitizeFormState('twd', twdFormState);

    if (Object.keys(input).length !== 0) {
      if (
        history.location.search !=
        `?q=${encodeURIComponent(JSON.stringify(input))}`
      ) {
        history.push(`/twd?q=${encodeURIComponent(JSON.stringify(input))}`);
      }

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
          setShowTwdSearch(false);
          setTwdResults(data);
          setSpinnerState(false);
        })
        .catch((error) => {
          setTwdResults([]);
          setShowError(true);
          setSpinnerState(false);
        });
    }
  };

  const getNewTwd = (q) => {
    setSpinnerState(true);
    setShowError(false);
    setTwdFormState(JSON.parse(JSON.stringify(defaults)));

    const url = `${process.env.API_URL}twd/new/${q}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setShowTwdSearch(false);
        setTwdResults(data);
        setSpinnerState(false);
      })
      .catch((error) => {
        setTwdResults([]);
        setShowError(true);
        setSpinnerState(false);
      });
  };

  const getRandomTwd = (q) => {
    setTwdFormState(JSON.parse(JSON.stringify(defaults)));
    setShowError(false);
    setSpinnerState(true);

    const url = `${process.env.API_URL}twd/random/${q}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setShowTwdSearch(false);
        setTwdResults(data);
        setSpinnerState(false);
      })
      .catch((error) => {
        setTwdResults([]);
        setSpinnerState(false);
      });
  };

  useEffect(() => {
    if (!isMobile) {
      if (
        JSON.stringify(twdFormState) == JSON.stringify(defaults) &&
        twdResults
      ) {
        setTwdResults(undefined);
      } else if (!twdFormState.event || twdFormState.event.length > 2) {
        launchRequest();
      }
    }
  }, [twdFormState]);

  return (
    <form onSubmit={handleSubmitButton}>
      <TwdSearchFormButtons
        handleClearButton={handleClearButton}
        showLimit={showLimit}
        getNewTwd={getNewTwd}
        getRandomTwd={getRandomTwd}
      />
      {inventoryMode && (
        <>
          <Row className="py-1 pl-1 mx-0 align-items-center">
            <Col xs={6} className="d-flex px-0">
              <label className="h6 mb-0">In Inventory by Crypt:</label>
            </Col>
            <Col xs={6} className="d-inline px-0">
              <TwdSearchFormMatchInventory
                value={twdFormState.matchInventory.crypt}
                name={'crypt'}
                onChange={handleMatchInventoryChange}
              />
            </Col>
          </Row>
          <Row className="py-1 pl-1 mx-0 align-items-center">
            <Col xs={6} className="d-flex px-0">
              <label className="h6 mb-0">In Inventory by Library:</label>
            </Col>
            <Col xs={6} className="d-inline px-0">
              <TwdSearchFormMatchInventory
                value={twdFormState.matchInventory.library}
                name={'library'}
                onChange={handleMatchInventoryChange}
              />
            </Col>
          </Row>
          <Row className="py-1 pl-1 mx-0 align-items-center">
            <Col xs={{ span: 6, offset: 6 }} className="d-inline px-0">
              <TwdSearchFormMatchInventoryScaling
                value={twdFormState.matchInventory.scaling}
                onChange={handleMatchInventoryScalingChange}
              />
            </Col>
          </Row>
        </>
      )}
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={2} className="d-flex px-0">
          <label className="h6 mb-0">Year:</label>
        </Col>
        <Col xs={2} className="d-flex px-1 justify-content-end">
          <label className="h6 mb-0">from</label>
        </Col>
        <Col xs={8} className="d-inline px-0">
          <TwdSearchFormDate
            date={twdFormState.date}
            onChange={handleDateChange}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={2} className="d-flex px-0">
          <label className="h6 mb-0">Players:</label>
        </Col>
        <Col xs={2} className="d-flex px-1 justify-content-end">
          <label className="h6 mb-0">min</label>
        </Col>
        <Col xs={8} className="d-inline px-0">
          <TwdSearchFormPlayers
            players={twdFormState.players}
            onChange={handlePlayersChange}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={4} className="d-flex px-0">
          <label className="h6 mb-0">Crypt Cards:</label>
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={12} className="d-inline px-0">
          <TwdSearchFormCrypt
            state={twdFormState.crypt}
            setState={setTwdFormState}
            spinner={spinnerState}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={{ span: 9, offset: 3 }} className="d-inline px-0">
          <TwdSearchFormTraitStar
            value={twdFormState.traits}
            onChange={handleMultiChange}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={4} className="d-flex px-0">
          <label className="h6 mb-0">Library Cards:</label>
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={12} className="d-inline px-0">
          <TwdSearchFormLibrary
            state={twdFormState.library}
            setState={setTwdFormState}
            spinner={spinnerState}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Library Size:</label>
        </Col>
        <Col xs={9} className="d-flex justify-content-end px-0 z-index-0">
          <TwdSearchFormLibraryTotal
            value={twdFormState.libraryTotal}
            onChange={handleMultiChange}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Clan:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormClan
            value={twdFormState.clan}
            onChange={handleSelectChange}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={{ span: 9, offset: 3 }} className="d-inline px-0">
          <TwdSearchFormTraitMonoclan
            value={twdFormState.traits}
            onChange={handleMultiChange}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={5} className="d-flex px-0">
          <label className="h6 mb-0">Capacity Average:</label>
        </Col>
        <Col xs={7} className="d-flex justify-content-end px-0 z-index-0">
          <TwdSearchFormCapacity
            value={twdFormState.capacity}
            onChange={handleMultiChange}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={5} className="d-flex px-0">
          <label className="h6 mb-0">Library Disciplines:</label>
        </Col>
      </Row>
      <TwdSearchFormDisciplines
        disciplines={twdFormState.disciplines}
        onChange={handleMultiChange}
      />
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={12} className="d-inline pr-0 pl-1">
          <TwdSearchFormCardtypes
            value={twdFormState.cardtypes}
            onChange={handleCardtypeChange}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Event:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormEvent
            value={twdFormState.event}
            onChange={handleEventChange}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Location:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormLocation
            value={twdFormState.location}
            setValue={setTwdFormState}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Winner:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormPlayer
            value={twdFormState.player}
            setValue={setTwdFormState}
          />
        </Col>
      </Row>
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
              NO DECKS FOUND
            </ErrorOverlay>
          </div>
        </>
      )}
    </form>
  );
}

export default TwdSearchForm;
