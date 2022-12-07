import React, { useState, useRef } from 'react';
import Spinner from 'assets/images/icons/three-dots.svg';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import { Modal, Button, ErrorOverlay } from 'components';
import { useApp } from 'context';
import { userServices } from 'services';

const AccountDeleteConfirmation = ({ setShow }) => {
  const { setUsername, isMobile } = useApp();

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [spinnerState, setSpinnerState] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const refPassword = useRef(null);

  const handleChange = (event) => setPassword(event.target.value);

  const onError = (e) => {
    setSpinnerState(false);
    if (e.message == 401) {
      setPasswordError(true);
      setPassword('');
    } else {
      setConnectionError(true);
    }
  };

  const onSuccess = () => {
    setSpinnerState(false);
    setShow(false);
    setUsername(undefined);
  };

  const deleteAccount = () => {
    if (spinnerState) return;

    setPasswordError(false);
    setEmptyPassword(!password);
    setConnectionError(false);

    if (password) {
      setSpinnerState(true);
      userServices.deleteAccount(password, onSuccess, onError);
    }
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    deleteAccount();
  };

  return (
    <>
      <Modal
        handleClose={() => setShow(false)}
        centered={isMobile}
        title="Delete Account"
      >
        <div>
          <div className="pt-2">
            <div className="font-bold text-blue">THIS CANNOT BE UNDONE!</div>
          </div>
          This will also delete all your decks and they will not be available
          via URL anymore.
        </div>
        <div>
          <form className="my-2" onSubmit={handleSubmitButton}>
            <div className="input-group">
              <input
                placeholder="Enter password"
                type={hidePassword ? 'password' : 'text'}
                name="password"
                value={password}
                onChange={handleChange}
                autoFocus={true}
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
                <Button variant="danger" type="submit">
                  Delete
                </Button>
              ) : (
                <Button variant="primary">
                  <Spinner animation="border" size="sm" />
                </Button>
              )}
              <Button variant="primary" onClick={() => setShow(false)}>
                Cancel
              </Button>
            </div>
            {emptyPassword && (
              <ErrorOverlay placement="bottom">ENTER PASSWORD</ErrorOverlay>
            )}
            {passwordError && (
              <ErrorOverlay placement="bottom">WRONG PASSWORD</ErrorOverlay>
            )}
            {connectionError && (
              <ErrorOverlay placement="bottom">CONNECTION PROBME</ErrorOverlay>
            )}
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AccountDeleteConfirmation;
