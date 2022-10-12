import React from 'react';
import X from 'assets/images/icons/x.svg';
import { ButtonIconed } from 'components';

const TwdClearButton = ({ handleClick }) => {
  return (
    <ButtonIconed
      variant="primary"
      onClick={handleClick}
      title="Clear Forms & Results"
      icon={<X />}
    />
  );
};

export default TwdClearButton;
