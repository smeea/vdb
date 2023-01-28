import React, { useState } from 'react';
import EnvelopeFill from '@/assets/images/icons/envelope-fill.svg';
import {
  AccountEmailForm,
  AccountPasswordForm,
  ErrorOverlay,
} from '@/components';
import { useApp } from '@/context';
import { userServices } from '@/services';

const AccountChangeEmail = () => {
  const { setEmail } = useApp();
  const [formPassword, setFormPassword] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onError = (e) => {
    if (e.message == 401) {
      setPasswordError('WRONG PASSWORD');
    } else {
      setPasswordError('CONNECTION PROBLEM');
    }
  };

  const onSuccess = () => {
    setEmail(formEmail);
    setFormPassword('');
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  const changeEmail = () => {
    setPasswordError(false);
    userServices.changeEmail(formPassword, formEmail, onSuccess, onError);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    changeEmail();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-xl font-bold text-fgSecondary dark:text-fgSecondaryDark">
        <div className="flex min-w-[23px] justify-center">
          <EnvelopeFill />
        </div>
        <div className="flex">Change email</div>
      </div>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="relative flex w-full">
          <AccountEmailForm value={formEmail} setValue={setFormEmail} />
        </div>
        <div className="relative flex w-full">
          <AccountPasswordForm
            value={formPassword}
            setValue={setFormPassword}
            success={success}
          />
          {passwordError && (
            <ErrorOverlay placement="bottom">{passwordError}</ErrorOverlay>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountChangeEmail;
