import React, { useState } from 'react';
import EyeFill from '@/assets/images/icons/eye-fill.svg?react';
import EyeSlashFill from '@/assets/images/icons/eye-slash-fill.svg?react';
import {
  FlexGapped,
  Spinner,
  Input,
  Modal,
  Button,
  ErrorOverlay,
} from '@/components';
import { useApp } from '@/context';
import { userServices } from '@/services';

const AccountDeleteConfirmation = ({ setShow }) => {
  const { setUsername, isMobile } = useApp();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  const handleChange = (event) => setPassword(event.target.value);

  const onError = (e) => {
    setIsLoading(false);
    if (e.message == 401) {
      setPasswordError(true);
      setPassword('');
    } else {
      setConnectionError(true);
    }
  };

  const onSuccess = () => {
    setIsLoading(false);
    setShow(false);
    setUsername(undefined);
  };

  const deleteAccount = () => {
    if (isLoading) return;

    setPasswordError(false);
    setConnectionError(false);

    if (password) {
      setIsLoading(true);
      userServices.deleteAccount(password, onSuccess, onError);
    }
  };

  const handleSubmit = (event) => {
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
        <FlexGapped className="flex-col">
          This will also delete all your decks and they will not be available
          via URL anymore.
          <div className="flex justify-end space-x-2">
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <div className="relative flex w-full">
                  <Input
                    placeholder="Enter password"
                    type={hidePassword ? 'password' : 'text'}
                    name="password"
                    value={password}
                    onChange={handleChange}
                    roundedStyle="rounded rounded-r-none"
                    autoFocus
                    required
                  />
                  {passwordError && (
                    <ErrorOverlay placement="bottom">
                      WRONG PASSWORD
                    </ErrorOverlay>
                  )}
                  {connectionError && (
                    <ErrorOverlay placement="bottom">
                      CONNECTION PROBME
                    </ErrorOverlay>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    className="rounded-l-none"
                    tabIndex="-1"
                    variant="primary"
                    onClick={() => setHidePassword(!hidePassword)}
                  >
                    {hidePassword ? <EyeFill /> : <EyeSlashFill />}
                  </Button>
                  <Button
                    className="min-w-[72px]"
                    variant="danger"
                    type="submit"
                  >
                    {isLoading ? <Spinner /> : 'Delete'}
                  </Button>
                </div>
              </div>
            </form>
            <Button variant="primary" onClick={() => setShow(false)}>
              Cancel
            </Button>
          </div>
        </FlexGapped>
      </Modal>
    </>
  );
};

export default AccountDeleteConfirmation;
