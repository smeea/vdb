import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';
import EyeFill from '@icons/eye-fill.svg?react';
import EyeSlashFill from '@icons/eye-slash-fill.svg?react';
import Check2 from '@icons/check2.svg?react';
import { Spinner, Input, Button } from '@/components';
import { PASSWORD, NEW_PASSWORD } from '@/constants';

const AccountPasswordForm = ({ defaultValue, success, isOld, isNew }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const { pending } = useFormStatus();

  return (
    <>
      <Input
        roundedStyle={`rounded ${isOld ? '' : 'rounded-r-none'}`}
        placeholder={isNew ? 'New Password' : 'Password'}
        type={hidePassword ? 'password' : 'text'}
        autoComplete={isNew ? NEW_PASSWORD : PASSWORD}
        name={isNew ? NEW_PASSWORD : PASSWORD}
        defaultValue={defaultValue}
        required={true}
      />
      {!isOld && (
        <>
          <Button
            roundedStyle="rounded-none"
            borderStyle="border-r border-y"
            tabIndex="-1"
            onClick={() => setHidePassword(!hidePassword)}
          >
            {hidePassword ? <EyeFill /> : <EyeSlashFill />}
          </Button>
          <Button
            disabled={pending}
            roundedStyle="rounded-r"
            borderStyle="border-r border-y"
            variant={success ? 'success' : 'primary'}
            type="submit"
          >
            {pending ? <Spinner /> : <Check2 />}
          </Button>
        </>
      )}
    </>
  );
};

export default AccountPasswordForm;
