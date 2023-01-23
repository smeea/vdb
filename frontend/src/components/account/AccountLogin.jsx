import React, { useState } from 'react';
import DoorOpenFill from 'assets/images/icons/door-open-fill.svg';
import {
  AccountPasswordForm,
  AccountUsernameForm,
  ErrorOverlay,
  Modal,
  ConditionalTooltip,
} from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

const LoginTooltipText = () => {
  return (
    <>
      <div>Account is required for Deck Building and Inventory.</div>
      <div>
        Decks and Inventory are stored on the server and you can access them
        from any device.
      </div>
    </>
  );
};

const PasswordTooltipText = () => {
  return (
    <>
      There is no automatic password restoration yet.
      <br />
      Please{' '}
      <a href="mailto:smeea@riseup.net?subject=VDB - Password reset&body=Account: <PUT YOUR ACCOUNT NAME HERE>">
        send me an email
      </a>{' '}
      with your username and I will generate temporary password.
      <br />
      Usually I do it within a day, but sometimes it takes a bit more.
    </>
  );
};

const AccountLogin = () => {
  const { isMobile, initializeUserData } = useApp();

  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');

  const [spinnerState, setSpinnerState] = useState(false);
  const [showLoginTooltip, setShowLoginTooltip] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onError = (e) => {
    setSpinnerState(false);
    if (e.message == 401) {
      setPasswordError('WRONG PASSWORD');
    } else if (e.message == 400) {
      setUsernameError('USER DOES NOT EXIST');
    } else {
      setPasswordError('CONNECTION PROBLEM');
    }
  };

  const onSuccess = (data) => {
    setSpinnerState(false);
    initializeUserData(data);
  };

  const loginUser = () => {
    if (spinnerState) return;
    setUsernameError(false);
    setPasswordError(false);

    if (formUsername && formPassword) {
      setSpinnerState(true);
      userServices.login(formUsername, formPassword, onSuccess, onError);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center text-xl font-bold text-fgSecondary dark:text-fgSecondaryDark space-x-2">
        <div className="flex justify-center min-w-[23px]">
          <DoorOpenFill width="20" height="20" viewBox="0 0 16 16" />
        </div>
        <div className="flex">Login</div>
        <ConditionalTooltip disabled={isMobile} overlay={<LoginTooltipText />}>
          <div
            className="text-fgThird dark:text-fgThirdDark"
            onClick={() => isMobile && setShowLoginTooltip(true)}
          >
            [?]
          </div>
        </ConditionalTooltip>
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
          <AccountPasswordForm
            value={formPassword}
            setValue={setFormPassword}
            spinnerState={spinnerState}
          />
          {passwordError && (
            <ErrorOverlay placement="bottom">{passwordError}</ErrorOverlay>
          )}
        </div>
        <div className="flex">
          <ConditionalTooltip
            disabled={isMobile}
            placement="bottom"
            overlay={<PasswordTooltipText />}
          >
            <div
              className="text-fgSecondary dark:text-fgSecondaryDark hover:underline text-xs"
              onClick={() => isMobile && setShowPasswordTooltip(true)}
            >
              <i>Forgot password?</i>
            </div>
          </ConditionalTooltip>
        </div>
      </form>
      {showPasswordTooltip && (
        <Modal
          title="Password reset"
          centered
          handleClose={() => setShowPasswordTooltip(false)}
        >
          <PasswordTooltipText />
        </Modal>
      )}
      {showLoginTooltip && (
        <Modal
          title="Why to have account"
          centered
          handleClose={() => setShowLoginTooltip(false)}
        >
          <LoginTooltipText />
        </Modal>
      )}
    </div>
  );
};

export default AccountLogin;
