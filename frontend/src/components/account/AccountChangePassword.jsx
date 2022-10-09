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
    confirmPassword: '',
  });

  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyNewPassword, setEmptyNewPassword] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const refOldPassword = useRef(null);
  const refNewPassword = useRef(null);
  const refConfirmPassword = useRef(null);
  const [spinnerState, setSpinnerState] = useState(false);

  const [hidePassword, setHidePassword] = useState(true);
  const [buttonState, setButtonState] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onError = (e) => {
    if (e.message == 401) {
      setPasswordError(true);
      setSpinnerState(false);
      setState((prevState) => ({
        ...prevState,
        password: '',
      }));
    } else {
      setSpinnerState(false);
      setConnectionError(true);
    }
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
      confirmPassword: '',
    });
  };

  const changePassword = () => {
    if (spinnerState) return;

    setPasswordError(false);
    setConnectionError(false);
    setEmptyPassword(!state.password);
    setEmptyNewPassword(!state.newPassword);
    setPasswordConfirmError(
      state.confirmPassword != state.newPassword || !state.confirmPassword
    );

    if (state.password && state.newPassword == state.confirmPassword) {
      setSpinnerState(true);

      userServices.changePassword(
        state.password,
        state.newPassword,
        onSuccess,
        onError
      );
    }
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    changePassword();
  };

  const OldNewPasswordForm = (
    <>
      <FormControl
        className={isMobile ? 'mb-1' : ''}
        placeholder="Old password"
        type={hidePassword ? 'password' : 'text'}
        name="password"
        value={state.password}
        onChange={handleChange}
        ref={refOldPassword}
      />
      <FormControl
        className={isMobile ? 'mb-1' : ''}
        placeholder="New password"
        type={hidePassword ? 'password' : 'text'}
        name="newPassword"
        value={state.newPassword}
        onChange={handleChange}
        ref={refNewPassword}
      />
    </>
  );

  const ConfirmFormButton = (
    <>
      <FormControl
        placeholder="Confirm password"
        type={hidePassword ? 'password' : 'text'}
        name="confirmPassword"
        value={state.confirmPassword}
        onChange={handleChange}
        ref={refConfirmPassword}
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
        <LockFill />
        <span className="ms-2">Change password</span>
      </h6>
      <Form className="my-1" onSubmit={handleSubmitButton}>
        {isMobile ? (
          <>
            {OldNewPasswordForm}
            <InputGroup>{ConfirmFormButton}</InputGroup>
          </>
        ) : (
          <InputGroup>
            {OldNewPasswordForm}
            {ConfirmFormButton}
          </InputGroup>
        )}
        <ErrorOverlay
          show={emptyPassword}
          target={refOldPassword.current}
          placement="bottom"
        >
          ENTER OLD PASSWORD
        </ErrorOverlay>
        <ErrorOverlay
          show={passwordError}
          target={refOldPassword.current}
          placement="bottom"
        >
          WRONG OLD PASSWORD
        </ErrorOverlay>
        <ErrorOverlay
          show={emptyNewPassword}
          target={refNewPassword.current}
          placement="bottom"
        >
          ENTER NEW PASSWORD
        </ErrorOverlay>
        <ErrorOverlay
          show={passwordConfirmError}
          target={refConfirmPassword.current}
          placement="bottom"
        >
          NEW PASSWORDS DOES NOT MATCH
        </ErrorOverlay>
        <ErrorOverlay
          show={connectionError}
          target={refOldPassword.current}
          placement="bottom"
        ></ErrorOverlay>
      </Form>
    </div>
  );
};

export default AccountChangePassword;
