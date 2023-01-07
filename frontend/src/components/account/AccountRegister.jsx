import React, { useState } from 'react';
import PersonPlusFill from 'assets/images/icons/person-plus-fill.svg';
import {
  AccountEmailForm,
  AccountPasswordForm,
  AccountUsernameForm,
  ErrorOverlay,
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
    <div className="space-y-2">
      <div className="flex items-center text-xl font-bold text-fgSecondary dark:text-fgSecondaryDark space-x-2">
        <div className="flex justify-center min-w-[23px]">
          <PersonPlusFill width="22" height="22" viewBox="0 0 16 16" />
        </div>
        <div className="flex">Create account</div>
      </div>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="flex w-full relative">
          <AccountUsernameForm
            value={formUsername}
            setValue={setFormUsername}
          />
          {usernameError && (
            <ErrorOverlay placement="bottom">{usernameError}</ErrorOverlay>
          )}
        </div>
        <div className="flex w-full relative">
          <AccountEmailForm value={formEmail} setValue={setFormEmail} />
        </div>
        <div className="flex w-full relative">
          <AccountPasswordForm
            value={formPassword}
            setValue={setFormPassword}
            spinnerState={spinnerState}
          />
          {connectionError && (
            <ErrorOverlay placement="bottom">{connectionError}</ErrorOverlay>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountRegister;
