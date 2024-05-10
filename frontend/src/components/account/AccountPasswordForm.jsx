import React, { useState } from 'react';
import EyeFill from '@/assets/images/icons/eye-fill.svg?react';
import EyeSlashFill from '@/assets/images/icons/eye-slash-fill.svg?react';
import Check2 from '@/assets/images/icons/check2.svg?react';
import { Spinner, Input, Button } from '@/components';

const AccountPasswordForm = ({ value, setValue, success, isLoading, isOld, isNew }) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <>
      <Input
        roundedStyle={`rounded ${isOld ? '' : 'rounded-r-none'}`}
        placeholder={isNew ? 'New Password' : 'Password'}
        type={hidePassword ? 'password' : 'text'}
        autoComplete={isNew ? 'new-password' : 'password'}
        name={isNew ? 'new-password' : 'password'}
        value={value}
        required={true}
        onChange={(e) => setValue(e.target.value)}
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
            roundedStyle="rounded-r"
            borderStyle="border-r border-y"
            variant={success ? 'success' : 'primary'}
            type="submit"
          >
            {isLoading ? <Spinner /> : <Check2 />}
          </Button>
        </>
      )}
    </>
  );
};

export default AccountPasswordForm;
