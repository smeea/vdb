import React, { useState, useRef } from 'react';
import Spinner from 'assets/images/icons/three-dots.svg';
import PersonPlusFill from 'assets/images/icons/person-plus-fill.svg';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import Check2 from 'assets/images/icons/check2.svg';
import { Button, ErrorOverlay } from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

const AccountRegister = () => {
  const { isMobile, setUsername, setEmail } = useApp();

  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [spinnerState, setSpinnerState] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const refUsername = useRef(null);
  const refPassword = useRef(null);

  const onError = (e) => {
    setSpinnerState(false);
    if (e.message == 409) {
      setUsernameError('USER ALREADY EXIST');
      refUsername.current.focus();
    } else {
      setConnectionError('CONNECTION ERROR');
    }
  };

  const onSuccess = (data) => {
    setSpinnerState(false);
    setUsername(data.username);
    setEmail(data.email);
  };

  const registerUser = () => {
    setConnectionError(false);
    setSpinnerState(true);
    userServices.register(
      formUsername,
      formPassword,
      formEmail,
      onSuccess,
      onError
    );
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    registerUser();
  };

  const UsernameForm = (
    <input
      placeholder="New Username"
      type="text"
      name="username"
      value={formUsername}
      required={true}
      onChange={(e) => setFormUsername(e.target.value)}
      ref={refUsername}
    />
  );

  const EmailForm = (
    <input
      className="mt-2"
      placeholder={`Email (Optional${
        isMobile ? '' : ', only for password reset'
      })`}
      type="email"
      name="email"
      value={formEmail}
      onChange={(e) => setFormEmail(e.target.value)}
    />
  );

  const PasswordForm = (
    <>
      <input
        placeholder="Password"
        type={hidePassword ? 'password' : 'text'}
        name="password"
        autoComplete="new-password"
        id="new-password"
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
          <PersonPlusFill width="22" height="22" viewBox="0 1 16 16" />
        </div>
        Create account
      </div>
      <form className="mb-2" onSubmit={handleSubmitButton}>
        {isMobile ? (
          <>
            {UsernameForm}
            {EmailForm}
            <form className="mt-2">{PasswordForm}</form>
          </>
        ) : (
          <>
            <div className="input-group">
              {UsernameForm}
              {PasswordForm}
            </div>
            {EmailForm}
          </>
        )}
        <ErrorOverlay
          show={usernameError}
          target={refUsername.current}
          placement="bottom"
        >
          {usernameError}
        </ErrorOverlay>
        <ErrorOverlay
          show={connectionError}
          target={refPassword.current}
          placement="bottom"
        >
          {connectionError}
        </ErrorOverlay>
      </form>
    </>
  );
};

export default AccountRegister;
