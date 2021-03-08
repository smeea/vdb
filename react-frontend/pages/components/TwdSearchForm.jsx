import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Spinner, Overlay } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';
import X from '../../assets/images/icons/x.svg';
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

function TwdSearchForm(props) {
  const [spinnerState, setSpinnerState] = useState(false);
  const showLimit = 25;

  const [showError, setShowError] = useState(false);
  const refError = useRef(null);

  const defaults = {
    player: '',
    location: '',
    players: {
      to: 'any',
      from: 'any',
    },
    date: {
      to: 'any',
      from: 'any',
    },
    disciplines: {},
    clan: 'any',
    capacity: {
      '1-4': false,
      '4-6': false,
      '6-8': false,
      '8-11': false,
    },
    cardtypes: {
      master: 'any',
      action: 'any',
      'political action': 'any',
      ally: 'any',
      equipment: 'any',
      retainer: 'any',
      'action modifier': 'any',
      reaction: 'any',
      combat: 'any',
      event: 'any',
    },
    traits: {
      star: false,
      monoclan: false,
    },
    crypt: {},
    library: {},
    libraryTotal: {
      '60-67': false,
      '68-75': false,
      '76-83': false,
      '84-90': false,
    },
  };

  const [eventText, setEventText] = useState('');
  const handleEventTextChange = (event) => setEventText(event.target.value);

  const handleSelectChange = (event) => {
    const { name, value } = event;
    props.setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCardtypeChange = (event) => {
    const { name, value } = event;
    const newState = props.formState.cardtypes;
    newState[name] = value;
    props.setFormState((prevState) => ({
      ...prevState,
      cardtypes: newState,
    }));
  };

  const handleDateChange = (event) => {
    const { name, value } = event;
    const newState = props.formState.date;
    newState[name] = value;
    props.setFormState((prevState) => ({
      ...prevState,
      date: newState,
    }));
  };

  const handlePlayersChange = (event) => {
    const { name, value } = event;
    const newState = props.formState.players;
    newState[name] = value;
    props.setFormState((prevState) => ({
      ...prevState,
      players: newState,
    }));
  };

  const handleMultiChange = (event) => {
    const { name, id, value } = event.target;
    const newState = props.formState[name];
    const i = value ? value : id;
    newState[i] = !newState[i];
    props.setFormState((prevState) => ({
      ...prevState,
      [name]: newState,
    }));
  };

  const handleClearButton = () => {
    setEventText('');
    props.setFormState(defaults);
    props.setResults(undefined);
    setShowError(false);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    launchRequest();
  };

  const launchRequest = () => {
    const url = `${process.env.API_URL}search/twd`;

    const state = { ...props.formState };
    state['event'] = eventText;

    const input = JSON.parse(JSON.stringify(state));

    const multiSelectForms = [
      'crypt',
      'library',
      'disciplines',
      'traits',
      'cardtypes',
      'date',
      'players',
      'capacity',
      'libraryTotal',
    ];

    multiSelectForms.map((i) => {
      Object.keys(input[i]).forEach(
        (k) => (input[i][k] == 0 || input[i][k] == 'any') && delete input[i][k]
      );
    });

    Object.keys(input).forEach(
      (k) =>
        (input[k] == 'any' ||
          !input[k] ||
          Object.keys(input[k]).length === 0) &&
        delete input[k]
    );

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
          props.setResults(data);
          setSpinnerState(false);
        })
        .catch((error) => {
          props.setResults([]);
          setShowError(true);
          setSpinnerState(false);
        });
    }
  };

  const getNewTwd = (q) => {
    setSpinnerState(true);
    setShowError(false);
    props.setFormState(defaults);

    const url = `${process.env.API_URL}twd/new/${q}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        props.setShowSearch(false);
        props.setResults(data);
        setSpinnerState(false);
      })
      .catch((error) => {
        props.setResults([]);
        setShowError(true);
        setSpinnerState(false);
      });
  };

  const getRandomTwd = (q) => {
    props.setFormState(defaults);
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
        props.setShowSearch(false);
        props.setResults(data);
        setSpinnerState(false);
      })
      .catch((error) => {
        props.setResults([]);
        setSpinnerState(false);
      });
  };

  useEffect(() => {
    if (!props.isMobile) {
      if (
        JSON.stringify(props.formState) == JSON.stringify(defaults) &&
        props.results
      ) {
        props.setResults(undefined);
      } else {
        launchRequest();
      }
    }
  }, [props.formState]);

  useEffect(() => {
    if (!props.isMobile) {
      if (eventText.length > 1) {
        launchRequest();
      }
    }
  }, [eventText]);

  return (
    <form onSubmit={handleSubmitButton}>
      <TwdSearchFormButtons
        handleClearButton={handleClearButton}
        isMobile={props.isMobile}
        showLimit={showLimit}
        getNewTwd={getNewTwd}
        getRandomTwd={getRandomTwd}
      />
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={2} className="d-flex px-0">
          <label className="h6 mb-0">Year:</label>
        </Col>
        <Col xs={2} className="d-flex px-1 justify-content-end">
          <label className="h6 mb-0">from</label>
        </Col>
        <Col xs={8} className="d-inline px-0">
          <TwdSearchFormDate
            date={props.formState.date}
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
            players={props.formState.players}
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
            state={props.formState.crypt}
            setState={props.setFormState}
            spinner={spinnerState}
            isMobile={props.isMobile}
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            cardBase={props.cryptCardBase}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={{ span: 9, offset: 3 }} className="d-inline px-0">
          <TwdSearchFormTraitStar
            value={props.formState.traits}
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
            state={props.formState.library}
            setState={props.setFormState}
            spinner={spinnerState}
            isMobile={props.isMobile}
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            cardBase={props.libraryCardBase}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Library Size:</label>
        </Col>
        <Col
          xs={9}
          className="d-flex justify-content-end px-0 checkbox-buttons"
        >
          <TwdSearchFormLibraryTotal
            value={props.formState.libraryTotal}
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
            value={props.formState.clan}
            onChange={handleSelectChange}
            isMobile={props.isMobile}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={{ span: 9, offset: 3 }} className="d-inline px-0">
          <TwdSearchFormTraitMonoclan
            value={props.formState.traits}
            onChange={handleMultiChange}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={5} className="d-flex px-0">
          <label className="h6 mb-0">Capacity Average:</label>
        </Col>
        <Col
          xs={7}
          className="d-flex justify-content-end px-0 checkbox-buttons"
        >
          <TwdSearchFormCapacity
            value={props.formState.capacity}
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
        disciplines={props.formState.disciplines}
        onChange={handleMultiChange}
      />
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={12} className="d-inline pr-0 pl-1">
          <TwdSearchFormCardtypes
            value={props.formState.cardtypes}
            onChange={handleCardtypeChange}
            isMobile={props.isMobile}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Event:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormEvent
            value={eventText}
            onChange={handleEventTextChange}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Location:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormLocation
            value={props.formState.location}
            setValue={props.setFormState}
          />
        </Col>
      </Row>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Winner:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <TwdSearchFormPlayer
            value={props.formState.player}
            setValue={props.setFormState}
          />
        </Col>
      </Row>
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
                  <b>NO DECKS FOUND</b>
                </div>
              )}
            </Overlay>
          </div>
        </>
      )}
    </form>
  );
}

export default TwdSearchForm;
