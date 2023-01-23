import React from 'react';
import { Input } from 'components';

const AccountEmailForm = ({ value, setValue }) => {
  return (
    <Input
      className="w-full"
      placeholder="Email (Optional, only for password reset)"
      type="email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default AccountEmailForm;
