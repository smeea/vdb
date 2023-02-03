import React, { useState } from 'react';
import LockFill from '@/assets/images/icons/lock-fill.svg';
import { AccountPasswordForm, ErrorOverlay } from '@/components';
import { userServices } from '@/services';

const AccountChangePassword = () => {
  const [formPassword, setFormPassword] = useState('');
  const [formNewPassword, setFormNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onError = (e) => {
    setIsLoading(false);
    if (e.message == 401) {
      setPasswordError('WRONG OLD PASSWORD');
    } else {
      setPasswordError('CONNECTION PROBLEM');
    }
  };

  const onSuccess = () => {
    setIsLoading(false);
    setFormPassword('');
    setFormNewPassword('');
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  const changePassword = () => {
    if (isLoading) return;
    setPasswordError(false);

    if (formPassword && formNewPassword) {
      setIsLoading(true);
      userServices.changePassword(
        formPassword,
        formNewPassword,
        onSuccess,
        onError
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    changePassword();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-xl font-bold text-fgSecondary dark:text-fgSecondaryDark">
        <div className="flex min-w-[23px] justify-center">
          <LockFill width="20" height="20" viewBox="0 0 16 16" />
        </div>
        <div className="flex">Change password</div>
      </div>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="relative flex w-full">
          <AccountPasswordForm
            value={formPassword}
            setValue={setFormPassword}
            isOld
          />
        </div>
        <div className="relative flex w-full">
          <AccountPasswordForm
            value={formNewPassword}
            setValue={setFormNewPassword}
            success={success}
            isLoading={isLoading}
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
