import React, { useState, useRef } from 'react';
import {
  Stack,
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

const AccountRegister = (props) => {
  const { setUsername, setEmail } = useApp();

  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formConfirmPassword, setFormConfirmPassword] = useState('');
  const [spinnerState, setSpinnerState] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const refUsername = useRef(null);
  const refPassword = useRef(null);
  const refConfirmPassword = useRef(null);

  const onError = (e) => {
    setSpinnerState(false);
    if (e.message == 409) {
      setUsernameError(true);
    } else {
      setConnectionError(true);
    }
  };

  const onSuccess = (data) => {
    setSpinnerState(false);
    setUsername(data.username);
    setEmail(data.email);
  };

  const registerUser = () => {
    if (spinnerState) return;

    setUsernameError(false);
    setConnectionError(false);
    setConfirmError(formConfirmPassword !== formPassword);
    setEmptyUsername(!formUsername);
    setEmptyPassword(!formPassword);

    if (formUsername && formPassword && formPassword === formConfirmPassword) {
      setSpinnerState(true);
      userServices.register(
        formUsername,
        formPassword,
        formEmail,
        onSuccess,
        onError
      );
    }
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    registerUser();
  };

  return (
    <div>
      <h6 className="d-flex align-items-center p-1">
        <PersonPlusFill />
        <span className="ms-2">Create account</span>
      </h6>
      <Form className="mb-2" onSubmit={handleSubmitButton}>
        <Stack gap={2}>
          <FormControl
            placeholder="New Username"
            type="text"
            name="username"
            value={formUsername}
            onChange={(e) => setFormUsername(e.target.value)}
            ref={refUsername}
          />
          <FormControl
            placeholder="Email (Optional, only for password reset)"
            type="text"
            name="email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
          />
          <InputGroup>
            <FormControl
              placeholder="Password"
              type={hidePassword ? 'password' : 'text'}
              name="password"
              value={formPassword}
              onChange={(e) => setFormPassword(e.target.value)}
              ref={refPassword}
            />
            <FormControl
              placeholder="Confirm password"
              type={hidePassword ? 'password' : 'text'}
              name="confirmPassword"
              value={formConfirmPassword}
              onChange={(e) => setFormConfirmPassword(e.target.value)}
              ref={refConfirmPassword}
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
          </InputGroup>
        </Stack>
        <ErrorOverlay
          show={emptyUsername}
          target={refUsername.current}
          placement="bottom"
        >
          ENTER USERNAME
        </ErrorOverlay>
        <ErrorOverlay
          show={usernameError}
          target={refUsername.current}
          placement="bottom"
        >
          USER ALREADY EXIST
        </ErrorOverlay>
        <ErrorOverlay
          show={emptyPassword}
          target={refPassword.current}
          placement="bottom"
        >
          ENTER PASSWORD
        </ErrorOverlay>
        <ErrorOverlay
          show={confirmError}
          target={refConfirmPassword.current}
          placement="bottom"
        >
          PASSWORDS DOES NOT MATCH
        </ErrorOverlay>
        <ErrorOverlay
          show={connectionError}
          target={refPassword.current}
          placement="bottom"
        >
          CONNECTION PROBLEM
        </ErrorOverlay>
      </Form>
    </div>
  );
};

export default AccountRegister;
