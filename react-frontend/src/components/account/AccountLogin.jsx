import React, { useState, useRef } from 'react';
import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Spinner,
} from 'react-bootstrap';

import DoorOpenFill from 'assets/images/icons/door-open-fill.svg';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import Check2 from 'assets/images/icons/check2.svg';
import { OverlayTooltip, ErrorOverlay, ModalTooltip } from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

function AccountLogin(props) {
  const {
    setPublicName,
    setEmail,
    setUsername,
    isMobile,
    getDecks,
    getInventory,
  } = useApp();

  const [formUserName, setFormUserName] = useState('');
  const [formPassword, setFormPassword] = useState('');

  const [spinnerState, setSpinnerState] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [emptyUserName, setEmptyUserName] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const refUsername = useRef(null);
  const refPassword = useRef(null);

  const onError = (e) => {
    setSpinnerState(false);
    if (e.message == 401) {
      setPasswordError(true);
      setFormPassword('');
    } else {
      setConnectionError(true);
    }
  };

  const onSuccess = (data) => {
    setSpinnerState(false);
    setUsername(data.username);
    setPublicName(data.public_name);
    setEmail(data.email);
    getInventory();
    getDecks();
  };

  const loginUser = () => {
    if (spinnerState) return;

    setPasswordError(false);
    setConnectionError(false);
    setEmptyUserName(!formUserName);
    setEmptyPassword(!formPassword);

    if (formUserName && formPassword) {
      setSpinnerState(true);
      userServices.login(formUserName, formPassword, onSuccess, onError);
    }
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    loginUser();
  };

  const passwordTooltipText = (
    <>
      We do not have automatic password restoration yet.
      <br />
      Please{' '}
      <a
        href={`mailto:smeea@riseup.net?subject=VDB - Password reset&body=Account: ${
          formUserName || '<PUT YOUR ACCOUNT NAME HERE>'
        }`}
      >
        send me an email
      </a>{' '}
      with your account username and I will generate temporary password for you.
    </>
  );

  const loginTooltipText = (
    <>
      Login is required for Deck Building and Inventory.
      <br />
      Decks and Inventory are stored on the server and you can access them from
      any device.
    </>
  );

  return (
    <>
      <h6 className="d-flex align-items-center">
        <DoorOpenFill />
        <span className="ms-2">Login</span>
        {!isMobile ? (
          <OverlayTooltip text={loginTooltipText}>
            <span className="question-tooltip ms-1">[?]</span>
          </OverlayTooltip>
        ) : (
          <span
            onClick={() => setShowModal(true)}
            className="question-tooltip ms-1"
          >
            [?]
          </span>
        )}
      </h6>
      <Form className="mb-0" onSubmit={handleSubmitButton}>
        <InputGroup>
          <FormControl
            placeholder="Username"
            type="text"
            name="username"
            value={formUserName}
            onChange={(e) => setFormUserName(e.target.value)}
            autoFocus={true}
            ref={refUsername}
          />
          <FormControl
            placeholder="Password"
            type={hidePassword ? 'password' : 'text'}
            name="password"
            value={formPassword}
            onChange={(e) => setFormPassword(e.target.value)}
            ref={refPassword}
          />
          <Button
            tabIndex="-1"
            variant="primary"
            onClick={() => setHidePassword(!hidePassword)}
          >
            {hidePassword ? <EyeFill /> : <EyeSlashFill />}
          </Button>
          {!spinnerState ? (
            <Button variant="primary" type="submit">
              <Check2 />
            </Button>
          ) : (
            <Button variant="primary">
              <Spinner animation="border" size="sm" />
            </Button>
          )}
        </InputGroup>
        <ErrorOverlay
          show={emptyUserName}
          target={refUsername.current}
          placement="bottom"
        >
          ENTER USERNAME
        </ErrorOverlay>
        <ErrorOverlay
          show={passwordError}
          target={refPassword.current}
          placement="bottom"
        >
          WRONG PASSWORD
        </ErrorOverlay>
        <ErrorOverlay
          show={connectionError}
          target={refPassword.current}
          placement="bottom"
        >
          CONNECTION PROBLEM
        </ErrorOverlay>
        <ErrorOverlay
          show={emptyPassword}
          target={refPassword.current}
          placement="bottom"
        >
          ENTER PASSWORD
        </ErrorOverlay>
      </Form>
      {!isMobile ? (
        <div className="d-flex justify-content-center small ms-3 ps-4">
          <OverlayTooltip
            delay={{ show: 0, hide: 2000 }}
            placement="bottom"
            text={passwordTooltipText}
          >
            <a href="#">
              <i>Forgot password?</i>
            </a>
          </OverlayTooltip>
        </div>
      ) : (
        <div
          onClick={() => setShowModal(true)}
          className="d-flex justify-content-center small ms-3 ps-4"
        >
          <a href="#">
            <i>Forgot password?</i>
          </a>
        </div>
      )}
      {showModal && (
        <ModalTooltip
          text={passwordTooltipText}
          show={showModal}
          setShow={setShowModal}
        />
      )}
    </>
  );
}

export default AccountLogin;
