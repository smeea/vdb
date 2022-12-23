import React, { useState } from 'react';
import EnvelopeFill from 'assets/images/icons/envelope-fill.svg';
import {
  AccountEmailForm,
  AccountPasswordForm,
  Tooltip,
  ErrorOverlay,
  Modal,
} from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

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

  const tooltipText = <>Email is for password recovery only.</>;

  return (
    <>
      <div className="flex items-center p-1 text-lg font-bold text-fgSecondary dark:text-fgSecondaryDark">
        <EnvelopeFill />
        <div className="px-2">Change email (optional)</div>
        {!isMobile ? (
          <Tooltip text={tooltipText}>
            <span className="text-fgThird dark:text-fgThirdDark ">[?]</span>
          </Tooltip>
        ) : (
          <span
            onClick={() => setShowModal(true)}
            className="text-fgThird dark:text-fgThirdDark "
          >
            [?]
          </span>
        )}
      </div>
      <form className="flex" onSubmit={handleSubmit}>
        {isMobile ? (
          <>
            <AccountEmailForm
              value={formEmail}
              setValue={setFormEmail}
              isMobile={isMobile}
            />
            <AccountPasswordForm
              value={formPassword}
              setValue={setFormPassword}
            />
          </>
        ) : (
          <>
            <AccountEmailForm
              value={formEmail}
              setValue={setFormEmail}
              isMobile={isMobile}
            />
            <AccountPasswordForm
              value={formPassword}
              setValue={setFormPassword}
              success={success}
            />
          </>
        )}
        {passwordError && (
          <ErrorOverlay placement="bottom">{passwordError}</ErrorOverlay>
        )}
      </form>
      {showModal && (
        <Modal handleClose={() => setShowModal(false)}>
          <div>{tooltipText}</div>
        </Modal>
      )}
    </>
  );
};

export default AccountChangeEmail;
