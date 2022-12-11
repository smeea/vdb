import React, { useState, useRef } from 'react';
import Spinner from 'assets/images/icons/three-dots.svg';
import Check2 from 'assets/images/icons/check2.svg';
import EnvelopeFill from 'assets/images/icons/envelope-fill.svg';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import { Input, Button, Tooltip, ErrorOverlay, Modal } from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

const AccountChangeEmail = () => {
  const { email, setEmail, isMobile } = useApp();

  const [state, setState] = useState({
    password: '',
    email: email || '',
  });

  const [showModal, setShowModal] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  // const refPassword = useRef();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onError = (e) => {
    setSpinnerState(false);
    if (e.message == 401) {
      setPasswordError('WRONG PASSWORD');
      // refPassword.current.focus();
    } else {
      setPasswordError('CONNECTION PROBLEM');
    }
  };

  const onSuccess = () => {
    setSpinnerState(false);
    setEmail(state.email);
    setButtonState(true);
    setTimeout(() => {
      setButtonState(false);
    }, 1000);
    setState((prevState) => ({
      ...prevState,
      password: '',
    }));
  };

  const changeEmail = () => {
    setPasswordError(false);
    setSpinnerState(true);
    userServices.changeEmail(state.password, state.email, onSuccess, onError);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    changeEmail();
  };

  const tooltipText = <>Email is for password recovery only.</>;

  const EmailForm = (
    <Input
      className={`w-full ${isMobile ? '' : 'rounded-none'}`}
      placeholder="New email"
      type="email"
      name="email"
      value={state.email}
      onChange={handleChange}
    />
  );

  const PasswordFormButton = (
    <>
      <Input
        className={`w-full ${isMobile ? '' : 'rounded-none'}`}
        placeholder="Password"
        type={hidePassword ? 'password' : 'text'}
        name="password"
        value={state.password}
        required={true}
        onChange={handleChange}
        /* ref={refPassword} */
      />
      <Button
        className="rounded-none"
        tabIndex="-1"
        variant="primary"
        onClick={() => setHidePassword(!hidePassword)}
      >
        {hidePassword ? <EyeFill /> : <EyeSlashFill />}
      </Button>
      <Button
        className="rounded-l-none"
        variant={buttonState ? 'success' : 'primary'}
        type="submit"
      >
        {!spinnerState ? <Check2 /> : <Spinner />}
      </Button>
    </>
  );

  return (
    <>
      <div className="text-blue flex items-center text-lg font-bold">
        <EnvelopeFill />
        <span>Change email (optional)</span>
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
            {EmailForm}
            <div className="input-group">{PasswordFormButton}</div>
          </>
        ) : (
          <>
            {EmailForm}
            {PasswordFormButton}
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
