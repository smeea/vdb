import React, { useState } from 'react';
import EnvelopeFill from '@/assets/images/icons/envelope-fill.svg?react';
import { AccountEmailForm, AccountPasswordForm, ErrorOverlay } from '@/components';
import { useApp } from '@/context';
import { userServices } from '@/services';

const AccountChangeEmail = () => {
  const { setEmail } = useApp();
  const [formPassword, setFormPassword] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onError = (e) => {
    setIsLoading(false);
    if (e.status == 401) {
      setPasswordError('WRONG PASSWORD');
    } else {
      setPasswordError('CONNECTION PROBLEM');
    }
  };

  const onSuccess = () => {
    setIsLoading(false);
    setEmail(formEmail);
    setFormPassword('');
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  const changeEmail = () => {
    if (isLoading) return;
    setPasswordError(false);

    if (formPassword) {
      setIsLoading(true);
      userServices.changeEmail(formPassword, formEmail, onSuccess, onError);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    changeEmail();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-lg font-bold text-fgSecondary dark:text-fgSecondaryDark">
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
            isLoading={isLoading}
            success={success}
          />
          {passwordError && <ErrorOverlay placement="bottom">{passwordError}</ErrorOverlay>}
        </div>
      </form>
    </div>
  );
};

export default AccountChangeEmail;
