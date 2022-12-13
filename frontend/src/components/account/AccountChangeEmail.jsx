import React, { useState } from 'react';
import Spinner from 'assets/images/icons/three-dots.svg';
import Check2 from 'assets/images/icons/check2.svg';
import EnvelopeFill from 'assets/images/icons/envelope-fill.svg';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import {
  AccountEmailForm,
  AccountPasswordForm,
  Input,
  Button,
  Tooltip,
  ErrorOverlay,
  Modal,
} from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

const AccountChangeEmail = () => {
  const { email, setEmail, isMobile } = useApp();
  const [formPassword, setFormPassword] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const onError = (e) => {
    setSpinnerState(false);
    if (e.message == 401) {
      setPasswordError('WRONG PASSWORD');
    } else {
      setPasswordError('CONNECTION PROBLEM');
    }
  };

  const onSuccess = () => {
    setSpinnerState(false);
    setEmail(formEmail);
    setPassword('');
    setButtonState(true);
    setTimeout(() => {
      setButtonState(false);
    }, 1000);
  };

  const changeEmail = () => {
    setPasswordError(false);
    setSpinnerState(true);
    userServices.changeEmail(formPassword, formEmail, onSuccess, onError);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    changeEmail();
  };

  const tooltipText = <>Email is for password recovery only.</>;

  return (
    <>
      <div className="text-blue flex items-center p-1 text-lg font-bold">
        <EnvelopeFill />
        <div className="px-2">Change email (optional)</div>
        {!isMobile ? (
          <Tooltip text={tooltipText}>
            <span className="question-tooltip ">[?]</span>
          </Tooltip>
        ) : (
          <span
            onClick={() => setShowModal(true)}
            className="question-tooltip "
          >
            [?]
          </span>
        )}
      </div>
      <form className="flex" onSubmit={handleSubmitButton}>
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
              spinnerState={spinnerState}
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
              spinnerState={spinnerState}
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
