import React, { useState } from 'react';
import Spinner from 'assets/images/icons/three-dots.svg';
import Check2 from 'assets/images/icons/check2.svg';
import LockFill from 'assets/images/icons/lock-fill.svg';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import { AccountPasswordForm, Input, Button, ErrorOverlay } from 'components';
import { userServices } from 'services';
import { useApp } from 'context';

const AccountChangePassword = () => {
  const { isMobile } = useApp();

  const [formPassword, setFormPassword] = useState('');
  const [formNewPassword, setFormNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [buttonState, setButtonState] = useState(false);

  const onError = (e) => {
    if (e.message == 401) {
      setPasswordError('WRONG OLD PASSWORD');
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
    setFormPassword('');
    setFormNewPassword('');
  };

  const changePassword = () => {
    setPasswordError(false);
    setSpinnerState(true);

    userServices.changePassword(
      formPassword,
      formNewPassword,
      onSuccess,
      onError
    );
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    changePassword();
  };

  return (
    <div>
      <div className="text-blue flex items-center text-lg font-bold p-1">
        <LockFill />
        <div className="px-2">Change password</div>
      </div>
      <form className="flex" onSubmit={handleSubmitButton}>
        {isMobile ? (
          <>
            <AccountPasswordForm
              value={formPassword}
              setValue={setFormPassword}
              isOld
            />
            <AccountPasswordForm
              value={formNewPassword}
              setValue={setFormNewPassword}
              spinnerState={spinnerState}
              isNew
            />
          </>
        ) : (
          <>
            <AccountPasswordForm
              value={formPassword}
              setValue={setFormPassword}
              isOld
            />
            <AccountPasswordForm
              value={formNewPassword}
              setValue={setFormNewPassword}
              spinnerState={spinnerState}
              isNew
            />
          </>
        )}
        {passwordError && (
          <ErrorOverlay placement="bottom">{passwordError}</ErrorOverlay>
        )}
      </form>
    </div>
  );
};

export default AccountChangePassword;
