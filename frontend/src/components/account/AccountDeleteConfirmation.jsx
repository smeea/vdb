import React, { useState, useActionState } from 'react';
import EyeFill from '@icons/eye-fill.svg?react';
import EyeSlashFill from '@icons/eye-slash-fill.svg?react';
import { FlexGapped, Spinner, Input, Modal, Button, ErrorOverlay } from '@/components';
import { useApp } from '@/context';
import { userServices } from '@/services';
import { PASSWORD } from '@/constants';

const AccountDeleteConfirmation = ({ setShow }) => {
  const { setUsername, isMobile } = useApp();
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(false);

  const deleteAccount = async (prevState, formData) => {
    const result = await userServices.deleteAccount(formData.get(PASSWORD));

    switch (result.error) {
      case 401:
        setError('WRONG PASSWORD');
        break;
      case 500:
        setError('CONNECTION PROBLEM');
        break;
      default:
        setUsername(undefined);
    }

    return { [PASSWORD]: formData.get(PASSWORD) };
  };

  const [data, action, pending] = useActionState(deleteAccount);

  return (
    <>
      <Modal handleClose={() => setShow(false)} centered={isMobile} title="Delete Account">
        <FlexGapped className="flex-col">
          This will also delete all your decks and they will not be available via URL anymore.
          <div className="flex justify-end gap-2">
            <form action={action}>
              <div className="flex">
                <div className="relative flex w-full">
                  <Input
                    placeholder="Enter password"
                    type={hidePassword ? 'password' : 'text'}
                    name={PASSWORD}
                    defaultValue={data?.[PASSWORD]}
                    roundedStyle="rounded rounded-r-none"
                    autoFocus
                    required
                  />
                  {error && <ErrorOverlay placement="bottom">{error}</ErrorOverlay>}
                </div>
                <div className="flex gap-2">
                  <Button
                    className="rounded-l-none"
                    tabIndex="-1"
                    onClick={() => setHidePassword(!hidePassword)}
                  >
                    {hidePassword ? <EyeFill /> : <EyeSlashFill />}
                  </Button>
                  <Button className="min-w-[72px]" variant="danger" type="submit">
                    {pending ? <Spinner /> : 'Delete'}
                  </Button>
                </div>
              </div>
            </form>
            <Button onClick={() => setShow(false)}>Cancel</Button>
          </div>
        </FlexGapped>
      </Modal>
    </>
  );
};

export default AccountDeleteConfirmation;
