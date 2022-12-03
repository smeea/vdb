import React, { useState, useRef } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Spinner,
} from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import LockFill from 'assets/images/icons/lock-fill.svg';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import { ErrorOverlay } from 'components';
import { userServices } from 'services';
import { useApp } from 'context';

const AccountChangePassword = () => {
  const { isMobile } = useApp();

  const [state, setState] = useState({
    password: '',
    newPassword: '',
  });

  const [passwordError, setPasswordError] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [buttonState, setButtonState] = useState(false);

  const refOldPassword = useRef();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onError = (e) => {
    if (e.message == 401) {
      setPasswordError('WRONG OLD PASSWORD');
      refOldPassword.current.focus();
    } else {
      setPasswordError('CONNECTION PROBLEM');
    }
    setSpinnerState(false);
  };

  const onSuccess = () => {
    setButtonState(true);
    setSpinnerState(false);
    setTimeout(() => {
      setButtonState(false);
    }, 1000);
    setState({
      password: '',
      newPassword: '',
    });
  };

  const changePassword = () => {
    setPasswordError(false);
    setSpinnerState(true);

    userServices.changePassword(
      state.password,
      state.newPassword,
      onSuccess,
      onError
    );
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    changePassword();
  };

  const OldPasswordForm = (
    <>
      <FormControl
        className={isMobile ? 'mb-2' : ''}
        placeholder="Old password"
        type={hidePassword ? 'password' : 'text'}
        name="password"
        required={true}
        value={state.password}
        onChange={handleChange}
        ref={refOldPassword}
      />
    </>
  );

  const NewPasswordForm = (
    <>
      <FormControl
        placeholder="New password"
        type={hidePassword ? 'password' : 'text'}
        name="newPassword"
        autoComplete="new-password"
        id="new-password"
        required={true}
        value={state.newPassword}
        onChange={handleChange}
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
      <h6 className="flex items-center p-1">
        <LockFill />
        <span className="ms-2">Change password</span>
      </h6>
      <Form className="my-1" onSubmit={handleSubmitButton}>
        {isMobile ? (
          <>
            {OldPasswordForm}
            <InputGroup>{NewPasswordForm}</InputGroup>
          </>
        ) : (
          <InputGroup>
            {OldPasswordForm}
            {NewPasswordForm}
          </InputGroup>
        )}
        <ErrorOverlay
          show={passwordError}
          target={refOldPassword.current}
          placement="bottom"
        >
          {passwordError}
        </ErrorOverlay>
      </Form>
    </div>
  );
};

export default AccountChangePassword;
