import React, { useState, useRef } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Spinner,
} from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import EnvelopeFill from 'assets/images/icons/envelope-fill.svg';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import { OverlayTooltip, ErrorOverlay, ModalTooltip } from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

const AccountChangeEmail = () => {
  const { email, setEmail, isMobile } = useApp();

  const [state, setState] = useState({
    password: '',
    email: email,
  });

  const [showModal, setShowModal] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const refEmail = useRef();
  const refPassword = useRef();

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
      setPasswordError('WRONG PASSWORD');
      refPassword.current.focus();
    } else {
      setPasswordError('CONNECTION PROBLEM');
    }
  };

  const onSuccess = () => {
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
    setPasswordError(false);
    setSpinnerState(true);
    userServices.changeEmail(state.password, state.email, onSuccess, onError);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    changeEmail();
  };

  const tooltipText = <>Email is for password recovery only.</>;

  const EmailForm = (
    <FormControl
      className={isMobile ? 'mb-1' : ''}
      placeholder="New email"
      type="email"
      name="email"
      value={state.email}
      onChange={handleChange}
      ref={refEmail}
    />
  );

  const PasswordFormButton = (
    <>
      <FormControl
        placeholder="Password"
        type={hidePassword ? 'password' : 'text'}
        name="password"
        value={state.password}
        required={true}
        onChange={handleChange}
        ref={refPassword}
      />
      <Button
        tabIndex="-1"
        variant="primary"
        onClick={() => setHidePassword(!hidePassword)}
      >
        {hidePassword ? <EyeFill /> : <EyeSlashFill />}
      </Button>
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
    </>
  );

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
        {isMobile ? (
          <>
            {EmailForm}
            <InputGroup>{PasswordFormButton}</InputGroup>
          </>
        ) : (
          <InputGroup>
            {EmailForm}
            {PasswordFormButton}
          </InputGroup>
        )}
        <ErrorOverlay
          show={passwordError}
          target={refPassword.current}
          placement="bottom"
        >
          {passwordError}
        </ErrorOverlay>
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
};

export default AccountChangeEmail;
