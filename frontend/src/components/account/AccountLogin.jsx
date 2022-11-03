import React, { useState, useRef } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Spinner,
} from 'react-bootstrap';

import DoorOpenFill from 'assets/images/icons/door-open-fill.svg';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import Check2 from 'assets/images/icons/check2.svg';
import { OverlayTooltip, ErrorOverlay, ModalTooltip } from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

const AccountLogin = () => {
  const { isMobile, initializeUserData } = useApp();

  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');

  const [spinnerState, setSpinnerState] = useState(false);
  const [showModalTooltip, setShowModalTooltip] = useState(false);
  const [showModalPassword, setShowModalPassword] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const refUsername = useRef();
  const refPassword = useRef();

  const onError = (e) => {
    setSpinnerState(false);
    if (e.message == 401) {
      setPasswordError('WRONG PASSWORD');
      refPassword.current.focus();
    } else if (e.message == 400) {
      setUsernameError('USER DOES NOT EXIST');
      refUsername.current.focus();
    } else {
      setPasswordError('CONNECTION PROBLEM');
    }
  };

  const onSuccess = (data) => {
    setSpinnerState(false);
    initializeUserData(data);
  };

  const loginUser = () => {
    if (spinnerState) return;
    setUsernameError(false);
    setPasswordError(false);

    if (formUsername && formPassword) {
      setSpinnerState(true);
      userServices.login(formUsername, formPassword, onSuccess, onError);
    }
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    loginUser();
  };

  const passwordTooltipText = (
    <>
      There is no automatic password restoration yet.
      <br />
      Please{' '}
      <a
        href={`mailto:smeea@riseup.net?subject=VDB - Password reset&body=Account: ${
          formUsername || '<PUT YOUR ACCOUNT NAME HERE>'
        }`}
      >
        send me an email
      </a>{' '}
      with your username and I will generate temporary password.
      <br />
      Usually I do it within a day, but sometimes it takes a bit more.
    </>
  );

  const loginTooltipText = (
    <>
      Login is required for Deck Building and Inventory.
      <br />
      Decks and Inventory are stored on the server and you can access them from
      any device.
    </>
  );

  const UsernameForm = (
    <FormControl
      placeholder="New Username"
      type="text"
      name="username"
      value={formUsername}
      required={true}
      onChange={(e) => setFormUsername(e.target.value)}
      autoFocus={true}
      ref={refUsername}
    />
  );

  const PasswordForm = (
    <>
      <FormControl
        placeholder="Password"
        type={hidePassword ? 'password' : 'text'}
        name="password"
        autoComplete="current-password"
        id="current-password"
        value={formPassword}
        required={true}
        onChange={(e) => setFormPassword(e.target.value)}
        ref={refPassword}
      />
      <Button
        tabIndex="-1"
        variant="primary"
        onClick={() => setHidePassword(!hidePassword)}
      >
        {hidePassword ? <EyeFill /> : <EyeSlashFill />}
      </Button>
      {!spinnerState ? (
        <Button variant="primary" type="submit">
          <Check2 />
        </Button>
      ) : (
        <Button variant="primary">
          <Spinner animation="border" size="sm" />
        </Button>
      )}
    </>
  );

  return (
    <div>
      <h5 className="d-flex align-items-center p-1">
        <div className="d-flex pe-2">
          <DoorOpenFill width="20" height="20" viewBox="0 0 16 16" />
        </div>
        Login
        {!isMobile ? (
          <OverlayTooltip text={loginTooltipText}>
            <span className="question-tooltip ms-2">[?]</span>
          </OverlayTooltip>
        ) : (
          <span
            onClick={() => setShowModalTooltip(true)}
            className="question-tooltip ms-2"
          >
            [?]
          </span>
        )}
      </h5>
      <Form className="mb-0" onSubmit={handleSubmitButton}>
        {isMobile ? (
          <>
            {UsernameForm}
            <InputGroup className="mt-2">{PasswordForm}</InputGroup>
          </>
        ) : (
          <InputGroup>
            {UsernameForm}
            {PasswordForm}
          </InputGroup>
        )}
        <ErrorOverlay
          show={usernameError}
          target={refUsername.current}
          placement="bottom"
        >
          {usernameError}
        </ErrorOverlay>
        <ErrorOverlay
          show={passwordError}
          target={refPassword.current}
          placement="bottom"
        >
          {passwordError}
        </ErrorOverlay>
      </Form>
      {!isMobile ? (
        <div className="d-flex justify-content-start small ps-2 pt-1">
          <OverlayTooltip
            delay={{ show: 0, hide: 2000 }}
            placement="bottom"
            text={passwordTooltipText}
          >
            <a href="#">
              <i>Forgot password?</i>
            </a>
          </OverlayTooltip>
        </div>
      ) : (
        <div
          onClick={() => setShowModalPassword(true)}
          className="d-flex justify-content-start small ps-2 pt-1"
        >
          <a href="#">
            <i>Forgot password?</i>
          </a>
        </div>
      )}
      {showModalPassword && (
        <ModalTooltip
          text={passwordTooltipText}
          show={showModalPassword}
          setShow={setShowModalPassword}
        />
      )}
      {showModalTooltip && (
        <ModalTooltip
          text={loginTooltipText}
          show={showModalTooltip}
          setShow={setShowModalTooltip}
        />
      )}
    </div>
  );
};

export default AccountLogin;
