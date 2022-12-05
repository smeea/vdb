import React, { useState, useRef } from 'react';
import Spinner from 'assets/images/icons/three-dots.svg';
import DoorOpenFill from 'assets/images/icons/door-open-fill.svg';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import Check2 from 'assets/images/icons/check2.svg';
import { Tooltip, ErrorOverlay, Modal, Button } from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

const AccountLogin = () => {
  const { isMobile, initializeUserData } = useApp();

  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');

  const [spinnerState, setSpinnerState] = useState(false);
  const [showLoginTooltip, setShowLoginTooltip] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);

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
    <input
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
      <input
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
    <>
      <div className="flex text-blue font-bold text-xl items-center px-1 py-2">
        <div className="flex pe-2">
          <DoorOpenFill width="20" height="20" viewBox="0 0 16 16" />
        </div>
        Login
        {!isMobile ? (
          <Tooltip text={loginTooltipText}>
            <span className="question-tooltip ms-2">[?]</span>
          </Tooltip>
        ) : (
          <span
            onClick={() => setShowLoginTooltip(true)}
            className="question-tooltip ms-2"
          >
            [?]
          </span>
        )}
      </div>
      <form className="mb-0" onSubmit={handleSubmitButton}>
        {isMobile ? (
          <>
            {UsernameForm}
            <form className="mt-2">{PasswordForm}</form>
          </>
        ) : (
          <div className="input-group">
            {UsernameForm}
            {PasswordForm}
          </div>
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
      </form>
      {!isMobile ? (
        <div className="flex justify-start text-xs ps-2 pt-1">
          <Tooltip
            delay={{ show: 0, hide: 2000 }}
            placement="bottom"
            text={passwordTooltipText}
          >
            <a href="#">
              <i>Forgot password?</i>
            </a>
          </Tooltip>
        </div>
      ) : (
        <div
          onClick={() => setShowPasswordTooltip(true)}
          className="flex justify-start text-xs ps-2 pt-1"
        >
          <a href="#">
            <i>Forgot password?</i>
          </a>
        </div>
      )}
      {showPasswordTooltip && (
        <Modal handleClose={() => setShowPasswordTooltip(false)}>
          <div>{passwordTooltipText}</div>
        </Modal>
      )}
      {showLoginTooltip && (
        <Modal handleClose={() => setShowLoginTooltip(false)}>
          <div>{loginTooltipText}</div>
        </Modal>
      )}
    </>
  );
};

export default AccountLogin;
