import React, { useState } from 'react';
import DoorOpenFill from 'assets/images/icons/door-open-fill.svg';
import {
  AccountPasswordForm,
  AccountUsernameForm,
  ErrorOverlay,
  Modal,
  Tooltip,
} from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

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

  const passwordTooltipText = (
    <>
      There is no automatic password restoration yet.
      <br />
      Please{' '}
      <a
        href={`mailto:smeea@riseup.net?subject=VDB - Password reset&body=Account: ${
          formUsername || '<PUT YOUR ACCOUNT NAME HERE>'
        }`}
      >
        send me an email
      </a>{' '}
      with your username and I will generate temporary password.
      <br />
      Usually I do it within a day, but sometimes it takes a bit more.
    </>
  );

  const loginTooltipText = (
    <>
      Login is required for Deck Building and Inventory.
      <br />
      Decks and Inventory are stored on the server and you can access them from
      any device.
    </>
  );

  return (
    <>
      <div className="text-blue flex items-center text-xl font-bold">
        <div className="flex">
          <DoorOpenFill width="20" height="20" viewBox="0 0 16 16" />
        </div>
        Login
        {!isMobile ? (
          <Tooltip text={loginTooltipText}>
            <span className="question-tooltip ">[?]</span>
          </Tooltip>
        ) : (
          <span
            onClick={() => setShowLoginTooltip(true)}
            className="question-tooltip "
          >
            [?]
          </span>
        )}
      </div>
      <form className="relative" onSubmit={handleSubmit}>
        {isMobile ? (
          <>
            <AccountUsernameForm
              value={formUsername}
              setValue={setFormUsername}
            />
            <AccountPasswordForm
              value={formPassword}
              setValue={setFormPassword}
              spinnerState={spinnerState}
            />
          </>
        ) : (
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
        )}
        {usernameError && (
          <ErrorOverlay placement="bottom">{usernameError}</ErrorOverlay>
        )}
        {passwordError && (
          <ErrorOverlay placement="bottom">{passwordError}</ErrorOverlay>
        )}
      </form>
      {!isMobile ? (
        <div className="flex justify-start text-xs">
          <Tooltip
            delay={{ show: 0, hide: 2000 }}
            placement="bottom"
            text={passwordTooltipText}
          >
            <a href="#">
              <i>Forgot password?</i>
            </a>
          </Tooltip>
        </div>
      ) : (
        <div
          onClick={() => setShowPasswordTooltip(true)}
          className="flex justify-start text-xs"
        >
          <a href="#">
            <i>Forgot password?</i>
          </a>
        </div>
      )}
      {showPasswordTooltip && (
        <Modal handleClose={() => setShowPasswordTooltip(false)}>
          <div>{passwordTooltipText}</div>
        </Modal>
      )}
      {showLoginTooltip && (
        <Modal handleClose={() => setShowLoginTooltip(false)}>
          <div>{loginTooltipText}</div>
        </Modal>
      )}
    </>
  );
};

export default AccountLogin;
