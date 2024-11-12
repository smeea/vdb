import React from 'react';
import { Input } from '@/components';

const AccountUsernameForm = ({ value, setValue, autoFocus, isNew }) => {
  return (
    <Input
      autoFocus={autoFocus}
      placeholder={isNew ? 'New Username' : 'Username'}
      name="username"
      value={value}
      required
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default AccountUsernameForm;
