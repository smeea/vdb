import React, { useState } from 'react';
import EnvelopeFill from 'assets/images/icons/envelope-fill.svg';
import {
  AccountEmailForm,
  AccountPasswordForm,
  ConditionalTooltip,
  ErrorOverlay,
  Modal,
} from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

const TooltipText = () => {
  return <div>Email is for password recovery only.</div>;
};

const AccountChangeEmail = () => {
  const { setEmail, isMobile } = useApp();
  const [formPassword, setFormPassword] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
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
      <div className="flex items-center text-xl font-bold text-fgSecondary dark:text-fgSecondaryDark space-x-2">
        <div className="flex justify-center min-w-[23px]">
          <EnvelopeFill />
        </div>
        <div className="flex">Change email (optional)</div>
        <ConditionalTooltip disabled={isMobile} overlay={<TooltipText />}>
          <div
            className="text-fgThird dark:text-fgThirdDark"
            onClick={() => isMobile && setShowModal(true)}
          >
            [?]
          </div>
        </ConditionalTooltip>
      </div>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="flex w-full relative">
          <AccountEmailForm value={formEmail} setValue={setFormEmail} />
        </div>
        <div className="flex w-full relative">
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
      {showModal && (
        <Modal
          title="Why email"
          handleClose={() => setShowModal(false)}
          centered
        >
          <TooltipText />
        </Modal>
      )}
    </div>
  );
};

export default AccountChangeEmail;
