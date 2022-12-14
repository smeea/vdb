import React, { useState } from 'react';
import Spinner from 'assets/images/icons/three-dots.svg';
import PersonPlusFill from 'assets/images/icons/person-plus-fill.svg';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import Check2 from 'assets/images/icons/check2.svg';
import {
  AccountEmailForm,
  AccountPasswordForm,
  AccountUsernameForm,
  Button,
  ErrorOverlay,
  Input,
} from 'components';
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

  const onError = (e) => {
    setSpinnerState(false);
    if (e.message == 409) {
      setUsernameError('USER ALREADY EXIST');
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

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser();
  };

  return (
    <>
      <div className="text-blue flex items-center text-xl font-bold">
        <div className="flex">
          <PersonPlusFill width="22" height="22" viewBox="0 1 16 16" />
        </div>
        Create account
      </div>
      <div>
        {isMobile ? (
          <>
            <AccountUsernameForm
              value={formUsername}
              setValue={setFormUsername}
            />
            <AccountEmailForm
              value={formEmail}
              setValue={setFormEmail}
              isMobile={isMobile}
            />
            <AccountPasswordForm
              value={formPassword}
              setValue={setFormPassword}
              spinnerState={spinnerState}
            />
          </>
        ) : (
          <form className="relative" onSubmit={handleSubmit}>
            <div className="flex">
              <AccountUsernameForm
                value={formUsername}
                setValue={setFormUsername}
              />
              <AccountPasswordForm
                value={formPassword}
                setValue={setFormPassword}
                spinnerState={spinnerState}
              />
            </div>
            <div className="flex">
              <AccountEmailForm
                value={formEmail}
                setValue={setFormEmail}
                isMobile={isMobile}
              />
            </div>
          </form>
        )}
        {usernameError && (
          <ErrorOverlay placement="bottom">{usernameError}</ErrorOverlay>
        )}
        {connectionError && (
          <ErrorOverlay placement="bottom">{connectionError}</ErrorOverlay>
        )}
      </div>
    </>
  );
};

export default AccountRegister;
