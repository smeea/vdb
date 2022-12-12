import React, { useState } from 'react';
import Spinner from 'assets/images/icons/three-dots.svg';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import EyeSlashFill from 'assets/images/icons/eye-slash-fill.svg';
import Check2 from 'assets/images/icons/check2.svg';
import { Input, Button } from 'components';

const AccountPasswordForm = ({ value, setValue, spinnerState }) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <>
      <Input
        className="inline w-full"
        placeholder="Password"
        type={hidePassword ? 'password' : 'text'}
        autoComplete="new-password"
        id="new-password"
        value={value}
        required={true}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        className="rounded-l-none rounded-r-none"
        tabIndex="-1"
        variant="primary"
        onClick={() => setHidePassword(!hidePassword)}
      >
        {hidePassword ? <EyeFill /> : <EyeSlashFill />}
      </Button>
      <Button className="rounded-l-none " variant="primary" type="submit">
        {spinnerState ? <Spinner /> : <Check2 />}
      </Button>
    </>
  );
};

export default AccountPasswordForm;
