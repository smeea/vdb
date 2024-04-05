import React, { useState } from 'react';
import DoorOpenFill from '@/assets/images/icons/door-open-fill.svg?react';
import {
  AccountPasswordForm,
  AccountUsernameForm,
  ErrorOverlay,
  ConditionalTooltipOrModal,
} from '@/components';
import { useApp } from '@/context';
import { userServices } from '@/services';

const LoginTooltipText = () => {
  return (
    <div className="flex flex-col gap-1">
      <div>Account is required for Deck Building and Inventory.</div>
      <div>
        Decks and Inventory are stored on the server and you can access them
        from any device.
      </div>
    </div>
  );
};

const PasswordTooltipText = () => {
  return (
    <div className="flex flex-col gap-1">
      <div>There is no automatic password restoration yet.</div>
      <div>
        Please{' '}
        <a href="mailto:smeea@riseup.net?subject=VDB - Password reset&body=Account: <PUT YOUR ACCOUNT NAME HERE>">
          send me an email
        </a>{' '}
        with your username and I will generate temporary password.
      </div>
      <div>
        Usually I do it within a day, but sometimes it takes a bit more.
      </div>
    </div>
  );
};

const AccountLogin = () => {
  const { isMobile, initializeUserData } = useApp();
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onError = (e) => {
    setIsLoading(false);
    if (e.message == 401) {
      setPasswordError('WRONG PASSWORD');
    } else if (e.message == 400) {
      setUsernameError('USER DOES NOT EXIST');
    } else {
      setPasswordError('CONNECTION PROBLEM');
    }
  };

  const onSuccess = (data) => {
    setIsLoading(false);
    initializeUserData(data);
  };

  const loginUser = () => {
    if (isLoading) return;
    setUsernameError(false);
    setPasswordError(false);

    if (formUsername && formPassword) {
      setIsLoading(true);
      userServices.login(formUsername, formPassword, onSuccess, onError);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-xl font-bold text-fgSecondary dark:text-fgSecondaryDark">
        <div className="flex min-w-[23px] justify-center">
          <DoorOpenFill width="20" height="20" viewBox="0 0 16 16" />
        </div>
        <div className="flex">Login</div>
        <ConditionalTooltipOrModal
          title="Why to have account"
          isModal={isMobile}
          overlay={<LoginTooltipText />}
        >
          <div className="text-fgThird dark:text-fgThirdDark">[?]</div>
        </ConditionalTooltipOrModal>
      </div>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="relative flex w-full">
          <AccountUsernameForm
            value={formUsername}
            setValue={setFormUsername}
            autoFocus
          />
          {usernameError && (
            <ErrorOverlay placement="bottom">{usernameError}</ErrorOverlay>
          )}
        </div>
        <div className="relative flex w-full">
          <AccountPasswordForm
            value={formPassword}
            setValue={setFormPassword}
            isLoading={isLoading}
          />
          {passwordError && (
            <ErrorOverlay placement="bottom">{passwordError}</ErrorOverlay>
          )}
        </div>
        <div className="flex">
          <ConditionalTooltipOrModal
            isModal={isMobile}
            placement="bottom"
            overlay={<PasswordTooltipText />}
            title="Password reset"
          >
            <div className="text-sm italic text-fgSecondary hover:underline dark:text-fgSecondaryDark">
              Forgot password
            </div>
          </ConditionalTooltipOrModal>
        </div>
      </form>
    </div>
  );
};

export default AccountLogin;
