import React, { useState, useRef } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Spinner,
} from 'react-bootstrap';
import PersonPlusFill from 'assets/images/icons/person-plus-fill.svg';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import Check2 from 'assets/images/icons/check2.svg';
import { ErrorOverlay } from 'components';
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
    <FormControl
      className={isMobile ? 'mb-1' : ''}
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
    <FormControl
      className={isMobile ? 'mb-1' : 'mt-1'}
      placeholder="Email (Optional, only for password reset)"
      type="email"
      name="email"
      value={formEmail}
      onChange={(e) => setFormEmail(e.target.value)}
    />
  );

  const PasswordForm = (
    <>
      <FormControl
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
    <div>
      <h6 className="d-flex align-items-center p-1">
        <PersonPlusFill />
        <span className="ms-2">Create account</span>
      </h6>
      <Form className="mb-2" onSubmit={handleSubmitButton}>
        {isMobile ? (
          <>
            {UsernameForm}
            {EmailForm}
            <InputGroup>{PasswordForm}</InputGroup>
          </>
        ) : (
          <>
            <InputGroup>
              {UsernameForm}
              {PasswordForm}
            </InputGroup>
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
      </Form>
    </div>
  );
};

export default AccountRegister;
