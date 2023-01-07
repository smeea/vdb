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
  const [success, setSuccess] = useState(false);

  const onError = (e) => {
    if (e.message == 401) {
      setPasswordError('WRONG OLD PASSWORD');
    } else {
      setPasswordError('CONNECTION PROBLEM');
    }
  };

  const onSuccess = () => {
    setFormPassword('');
    setFormNewPassword('');
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  const changePassword = () => {
    setPasswordError(false);
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
    <div className="space-y-2">
      <div className="flex items-center text-xl font-bold text-fgSecondary dark:text-fgSecondaryDark space-x-2">
        <div className="flex justify-center min-w-[23px]">
          <LockFill />
        </div>
        <div className="flex">Change password</div>
      </div>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="flex w-full relative">
          <AccountPasswordForm
            value={formPassword}
            setValue={setFormPassword}
            isOld
          />
        </div>
        <div className="flex w-full relative">
          <AccountPasswordForm
            value={formNewPassword}
            setValue={setFormNewPassword}
            success={success}
            isNew
          />
          {passwordError && (
            <ErrorOverlay placement="bottom">{passwordError}</ErrorOverlay>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountChangePassword;
