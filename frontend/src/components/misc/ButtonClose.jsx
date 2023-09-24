import React from 'react';
import X from '@/assets/images/icons/x.svg?react';
import { ButtonIconed } from '@/components';

const ButtonClose = ({ handleClick, title, className }) => {
  return (
    <ButtonIconed
      className={className}
      title={title}
      variant="primary"
      onClick={handleClick}
      icon={<X />}
    />
  );
};

export default ButtonClose;
