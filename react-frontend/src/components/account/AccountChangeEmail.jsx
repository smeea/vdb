import React, { useState, useEffect, useRef } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Spinner,
} from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import EnvelopeFill from 'assets/images/icons/envelope-fill.svg';
import { OverlayTooltip, ErrorOverlay, ModalTooltip } from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

function AccountChangeEmail(props) {
  const { email, setEmail, isMobile } = useApp();

  const [state, setState] = useState({
    password: '',
    email: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [buttonState, setButtonState] = useState(false);

  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);
  const refEmail = useRef(null);
  const refPassword = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onError = (e) => {
    setSpinnerState(false);
    if (e.message == 401) {
      setPasswordError(true);
      setState((prevState) => ({
        ...prevState,
        password: '',
      }));
    } else {
      setConnectionError(true);
    }
  };

  const onSuccess = (data) => {
    setSpinnerState(false);
    setEmail(state.email);
    setButtonState(true);
    setTimeout(() => {
      setButtonState(false);
    }, 1000);
    setState((prevState) => ({
      ...prevState,
      password: '',
    }));
  };

  const changeEmail = () => {
    if (spinnerState) return;

    setPasswordError(false);
    setConnectionError(false);
    setEmptyEmail(!state.email);
    setEmptyPassword(!state.password);
    setSpinnerState(false);

    if (state.email && state.password) {
      setSpinnerState(true);

      userServices.changeEmail(state.password, state.email, onSuccess, onError);
    }
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    changeEmail();
  };

  useEffect(() => {
    if (email) {
      setState((prevState) => ({
        ...prevState,
        email: email,
      }));
    }
  }, [email]);

  const tooltipText = <>Email is for password recovery only.</>;

  return (
    <div>
      <h6 className="d-flex align-items-center p-1">
        <EnvelopeFill />
        <span className="ms-2">Change email (optional)</span>
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
            placeholder="New email"
            type="text"
            name="email"
            value={state.email}
            onChange={handleChange}
            ref={refEmail}
          />
          <FormControl
            placeholder="Password"
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            ref={refPassword}
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
          show={emptyEmail}
          target={refEmail.current}
          placement="bottom"
        >
          ENTER EMAIL
        </ErrorOverlay>
        <ErrorOverlay
          show={emptyPassword}
          target={refPassword.current}
          placement="bottom"
        >
          ENTER PASSWORD
        </ErrorOverlay>
        <ErrorOverlay
          show={passwordError}
          target={refPassword.current}
          placement="bottom"
        >
          WRONG PASSWORD
        </ErrorOverlay>
        <ErrorOverlay
          show={connectionError}
          target={refPassword.current}
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
    </div>
  );
}

export default AccountChangeEmail;
