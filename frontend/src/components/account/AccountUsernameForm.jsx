import React from 'react';
import { Input } from '@/components';

const AccountUsernameForm = ({ value, setValue, isNew }) => {
  return (
    <Input
      className="w-full"
      placeholder={isNew ? 'New Username' : 'Username'}
      type="text"
      name="username"
      value={value}
      required={true}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default AccountUsernameForm;
