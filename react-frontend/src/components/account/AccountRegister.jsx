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

function AccountRegister(props) {
  const { setUsername } = useApp();

  const [formUserName, setFormUserName] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [spinnerState, setSpinnerState] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [emptyUsername, setEmptyUserName] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const refUsername = useRef(null);
  const refPassword = useRef(null);

  const onError = (e) => {
    setSpinnerState(false);
    if (e.message == 409) {
      setUsernameError(true);
      setFormPassword('');
    } else {
      setConnectionError(true);
    }
  };

  const onSuccess = (data) => {
    setSpinnerState(false);
    setUsername(formUserName);
  };

  const registerUser = () => {
    if (spinnerState) return;

    setUsernameError(false);
    setConnectionError(false);
    setEmptyUserName(!formUserName);
    setEmptyPassword(!formPassword);

    if (formUserName && formPassword) {
      setSpinnerState(true);
      userServices.register(formUserName, formPassword, onSuccess, onError);
    }
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    registerUser();
  };

  return (
    <>
      <h6 className="d-flex align-items-center">
        <PersonPlusFill />
        <span className="ms-2">Create account</span>
      </h6>
      <Form className="mb-2" onSubmit={handleSubmitButton}>
        <InputGroup>
          <FormControl
            placeholder="New Username"
            type="text"
            name="username"
            value={formUserName}
            onChange={(e) => setFormUserName(e.target.value)}
            ref={refUsername}
          />
          <FormControl
            placeholder="Password"
            type={hidePassword ? 'password' : 'text'}
            name="password"
            value={formPassword}
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
        </InputGroup>
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
          show={connectionError}
          target={refPassword.current}
          placement="bottom"
        >
          CONNECTION PROBLEM
        </ErrorOverlay>
      </Form>
    </>
  );
}

export default AccountRegister;
