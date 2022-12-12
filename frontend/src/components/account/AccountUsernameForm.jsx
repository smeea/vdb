import React, { useState } from 'react';
import { Input } from 'components';

const AccountUsernameForm = ({ value, setValue }) => {
  return (
    <Input
      className="inline w-full"
      placeholder="New Username"
      type="text"
      name="username"
      value={value}
      required={true}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default AccountUsernameForm;
