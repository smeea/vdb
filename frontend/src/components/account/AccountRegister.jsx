import React, { useState } from 'react';
import PersonPlusFill from '@/assets/images/icons/person-plus-fill.svg?react';
import {
  AccountEmailForm,
  AccountPasswordForm,
  AccountUsernameForm,
  ErrorOverlay,
} from '@/components';
import { useApp } from '@/context';
import { userServices } from '@/services';

const AccountRegister = () => {
  const { setUsername, setEmail } = useApp();
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  const onError = (e) => {
    setIsLoading(false);
    if (e.status == 409) {
      setUsernameError('USER ALREADY EXIST');
    } else {
      setConnectionError('CONNECTION ERROR');
    }
  };

  const onSuccess = (data) => {
    setIsLoading(false);
    setUsername(data.username);
    setEmail(data.email);
  };

  const registerUser = () => {
    setConnectionError(false);
    setIsLoading(true);
    userServices.register(formUsername, formPassword, formEmail, onSuccess, onError);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-xl font-bold text-fgSecondary dark:text-fgSecondaryDark">
        <div className="flex min-w-[23px] justify-center">
          <PersonPlusFill width="22" height="22" viewBox="0 0 16 16" />
        </div>
        <div className="flex">Create account</div>
      </div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="relative flex w-full">
          <AccountUsernameForm value={formUsername} setValue={setFormUsername} />
          {usernameError && <ErrorOverlay placement="bottom">{usernameError}</ErrorOverlay>}
        </div>
        <div className="relative flex w-full">
          <AccountEmailForm value={formEmail} setValue={setFormEmail} />
        </div>
        <div className="relative flex w-full">
          <AccountPasswordForm
            value={formPassword}
            setValue={setFormPassword}
            isLoading={isLoading}
          />
          {connectionError && <ErrorOverlay placement="bottom">{connectionError}</ErrorOverlay>}
        </div>
      </form>
    </div>
  );
};

export default AccountRegister;
