import React, { useState } from 'react';
import LockFill from 'assets/images/icons/lock-fill.svg';
import { AccountPasswordForm, ErrorOverlay } from 'components';
import { userServices } from 'services';
import { useApp } from 'context';

const AccountChangePassword = () => {
  const { isMobile } = useApp();

  const [formPassword, setFormPassword] = useState('');
  const [formNewPassword, setFormNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);
  // const [buttonState, setButtonState] = useState(false);

  const onError = (e) => {
    if (e.message == 401) {
      setPasswordError('WRONG OLD PASSWORD');
    } else {
      setPasswordError('CONNECTION PROBLEM');
    }
    setSpinnerState(false);
  };

  const onSuccess = () => {
    setSpinnerState(false);
    // setButtonState(true);
    // setTimeout(() => {
    //   setButtonState(false);
    // }, 1000);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    changePassword();
  };

  return (
    <div>
      <div className="text-blue flex items-center p-1 text-lg font-bold">
        <LockFill />
        <div className="px-2">Change password</div>
      </div>
      <form className="flex" onSubmit={handleSubmit}>
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
