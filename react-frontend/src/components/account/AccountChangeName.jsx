import React, { useState, useEffect, useRef } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Spinner,
} from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import PenFill from 'assets/images/icons/pen-fill.svg';
import { OverlayTooltip, ErrorOverlay, ModalTooltip } from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

function AccountChangeName(props) {
  const { publicName, setPublicName, isMobile } = useApp();

  const [emptyName, setEmptyName] = useState(false);
  const [state, setState] = useState('');
  const refName = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const onError = (e) => {
    if (e.message != 401) {
      setConnectionError(true);
    }
    setSpinnerState(false);
  };

  const onSuccess = (data) => {
    setSpinnerState(false);
    setButtonState(true);
    setPublicName(state);
    setTimeout(() => {
      setButtonState(false);
    }, 1000);
  };

  const changeName = () => {
    if (spinnerState) return;

    setEmptyName(!state);
    setConnectionError(false);

    if (state) {
      setSpinnerState(true);

      userServices.changeName(state, onSuccess, onError);
    }
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    changeName();
  };

  useEffect(() => {
    if (publicName) {
      setState(publicName);
    }
  }, [publicName]);

  const tooltipText = (
    <>
      Public name is default author name for new decks.
      <br />
      Author name is per-deck and can be changed anytime for each deck.
      <br />
      Public names are not unique.
      <br />
      Changing public name will not change author name of your existing decks.
      <br />
      Public name is *not* your account username which cannot be changed.
    </>
  );

  return (
    <>
      <h6 className="d-flex align-items-center px-1">
        <PenFill />
        <span className="ms-2">Change public name</span>
        {!isMobile ? (
          <OverlayTooltip text={tooltipText}>
            <span className="question-tooltip ms-1">[?]</span>
          </OverlayTooltip>
        ) : (
          <span
            onClick={() => setShowModal(true)}
            className="question-tooltip ms-1"
          >
            [?]
          </span>
        )}
      </h6>
      <Form className="my-1" onSubmit={handleSubmitButton}>
        <InputGroup>
          <FormControl
            placeholder="Public name"
            type="text"
            name="publicName"
            value={state}
            onChange={handleChange}
            ref={refName}
          />
          {!buttonState ? (
            !spinnerState ? (
              <Button variant="primary" type="submit">
                <Check2 />
              </Button>
            ) : (
              <Button variant="primary">
                <Spinner animation="border" size="sm" />
              </Button>
            )
          ) : (
            <Button variant="success" type="submit">
              <Check2 />
            </Button>
          )}
        </InputGroup>
        <ErrorOverlay
          show={emptyName}
          target={refName.current}
          placement="bottom"
        >
          ENTER PUBLIC NAME
        </ErrorOverlay>
        <ErrorOverlay
          show={connectionError}
          target={refName.current}
          placement="bottom"
        ></ErrorOverlay>
      </Form>
      {showModal && (
        <ModalTooltip
          text={tooltipText}
          show={showModal}
          setShow={setShowModal}
        />
      )}
    </>
  );
}

export default AccountChangeName;
