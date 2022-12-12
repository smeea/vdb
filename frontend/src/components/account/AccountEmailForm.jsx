import React, { useState } from 'react';
import { Input } from 'components';

const AccountEmailForm = ({ value, setValue, isMobile }) => {
  return (
    <Input
      className="w-full rounded-r-none"
      placeholder={`Email (Optional${
        isMobile ? '' : ', only for password reset'
      })`}
      type="email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default AccountEmailForm;
